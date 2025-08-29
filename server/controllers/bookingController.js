import Booking from "../models/Booking.js"
import Car from "../models/Car.js";


// Check availability of a car for a specific date
const checkAvailability = async (carId, pickup_date, return_date) => {
    const bookings = await Booking.find({
        car: carId,
        status: { $ne: 'cancelled' }, // Exclude cancelled bookings
        $or: [
            {
                pickup_date: { $lte: new Date(pickup_date) },
                return_date: { $gte: new Date(pickup_date) }
            },
            {
                pickup_date: { 
                    $gte: new Date(pickup_date),
                    $lte: new Date(return_date)
                }
            },
            {
                pickup_date: { $lte: new Date(pickup_date) },
                return_date: { 
                    $gte: new Date(pickup_date),
                    $lte: new Date(return_date)
                }
            }
        ]
    });

    return bookings.length === 0;
}

// Check availability of a car on a given date and location
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { carId, pickup_date, return_date } = req.body;

        if (!carId || !pickup_date || !return_date) {
            return res.json({ success: false, message: 'بيانات ناقصة' });
        }

        const isAvailable = await checkAvailability(carId, pickup_date, return_date);
        
        res.json({ success: true, isAvailable });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// API to get unavailable dates for a car
export const getUnavailableDates = async (req, res) => {
    try {
        const { carId } = req.params;
        
        // Get all bookings for this car (excluding cancelled ones)
        const bookings = await Booking.find({
            car: carId,
            status: { $ne: 'cancelled' }
        });
        
        // Extract all unavailable dates from bookings
        const unavailableDates = [];
        
        bookings.forEach(booking => {
            const start = new Date(booking.pickup_date);
            const end = new Date(booking.return_date);
            
            // Add all dates between start and end (inclusive)
            for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                unavailableDates.push(new Date(date).toISOString().split('T')[0]);
            }
        });
        
        // Remove duplicates
        const uniqueDates = [...new Set(unavailableDates)];
        
        res.json({ success: true, unavailableDates: uniqueDates });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// API to Create Booking
export const createBooking = async (req, res) => {
    try {
        const {_id} = req.user;
        const {car, pickup_date, return_date} = req.body;
        
        const isAvailable = await checkAvailability(car, pickup_date, return_date)
        if(!isAvailable){
            return res.json({success: false, message: 'السيارة المُراةد غير متوفرة'})
        }

        const carData = await Car.findById(car)

        // Calculate price based on pickup_date and return_date
        const picked = new Date(pickup_date);
        const returned = new Date(return_date);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = carData.price_per_day * noOfDays;

        await Booking.create({car, owner: carData.owner, user: _id, pickup_date, return_date, price})
        
        res.json({success: true, message: "تم إنشاء الحجز بنجاح"})

    } catch (err) {
        console.log(err.message);
        return res.json({success: false, message: err.message});
    }
}

// API to List User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user: _id}).populate("car").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (err) {
        console.log(err.message);
        return res.json({success: false, message: err.message})
    }
}

// API to get Owner Bookings
export const getOwnerBookings = async (req, res) => {
    try {
        if(req.user.role !== 'owner'){
            return res.json({success: false, message: "لا تملك التصريح لهذا العمل"})
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt: -1})
        res.json({success: true, bookings})
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}

// API to change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const {_id} = req.user;
        const {bookingId, status, cancellationReason, autoCancel} = req.body;

        const booking = await Booking.findById(bookingId).populate('car');

        // For auto-cancellation, skip ownership check
        if (!autoCancel && booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "لا تملك التصريح لهذا العمل" });
        }

        // Check if trying to cancel and apply the 3-hour rule (skip for auto-cancellation)
        if (status === 'cancelled' && !autoCancel) {
            const now = new Date();
            const pickup_date = new Date(booking.pickup_date);
            const timeDifference = pickup_date - now;
            const hoursDifference = timeDifference / (1000 * 60 * 60);
            
            if (hoursDifference < 3) {
                return res.json({ 
                    success: false, 
                    message: "لا يمكن إلغاء الحجز قبل أقل من 3 ساعات من موعد الاستلام" 
                });
            }
            
            // Save cancellation reason if provided
            if (cancellationReason) {
                booking.cancellationReason = cancellationReason;
            }
        }

        booking.status = status;
        await booking.save();
        
        res.json({ success: true, message: "تم تحديث حالة الحجز" });
    } catch (err) {
        console.log(err.message);
        return res.json({success: false, message: err.message});
    }
}

export const autoCancelBookings = async (req, res) => {
  try {
    // Find all bookings that should be auto-cancelled
    const overdueBookings = await Booking.find({
      return_date: { $lt: new Date() },
      status: { $in: ['pending', 'confirmed', 'قيد التنفيذ'] }
    });
    
    // Update their status to cancelled
    for (const booking of overdueBookings) {
      booking.status = 'cancelled';
      await booking.save();
    }
    
    res.json({ success: true, message: `تم إلغاء ${overdueBookings.length} من الحجوزات تلقائياً` });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// To cancel by user
export const cancelBooking = async (req, res) => {
  try {
    const {_id} = req.user;
    const {bookingId} = req.body;

    const booking = await Booking.findById(bookingId).populate('car');

    if (!booking) {
      return res.json({ success: false, message: "الحجز غير موجود" });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== _id.toString()) {
      return res.json({ success: false, message: "لا تملك التصريح لهذا العمل" });
    }

    // Apply the 3-hour rule
    const now = new Date();
    const pickup_date = new Date(booking.pickup_date);
    const timeDifference = pickup_date - now;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
        
    if (hoursDifference < 3) {
      return res.json({ 
        success: false, 
        message: "لا يمكن إلغاء الحجز قبل أقل من 3 ساعات من موعد الاستلام" 
      });
    }

    booking.status = 'cancelled';
    await booking.save();
    
    res.json({ success: true, message: "تم إلغاء الحجز" });
  } catch (err) {
    return res.json({success: false, message: err.message});
  }
};