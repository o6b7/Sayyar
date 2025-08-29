import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from 'fs';

// To change role of the user
export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"});
        return res.json({success: true, message: "الآن يمنكنك اضافة سيارات"})
    } catch (err) {
        console.log(err.message)
        return res.json({success: false, message: err.message})
    }
}

// To list cars
export const addCar = async(req, res) => {
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // Upload image to image kit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        var optimizedImageURL = imagekit.url({
            path : response.filePath,
            transformation : [
                {width: '1280'}, // width resizing
                {quality: 'auto'}, // auto compression
                {format: 'webp'} // webp is compatible with all browser and lightweight
            ]
        });

        const image = optimizedImageURL;

        await Car.create({...car, owner: _id, image})

        return res.json({success: true, message: "تم إضافة السيارة"})

    } catch (err) {
        console.log(err.message)
        return res.json({success: false, message: err.message})
    }
}

// To list owner cars
export const getOwnerCars = async(req, res) => {
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id})
        return res.json({success: true, cars})
    } catch (err) {
        console.log(err.message)
        return res.json({success: false, message: err.message})
    }
}

// To toggle car availability
export const toggleCarAvailability = async(req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        // is car belong to user?
        if (car.owner.toString() !== _id.toString()) {
            // Added return statement here:
            return res.json({success: false, message: "لا تملك التصريح لهذا العمل"})
        }

        car.isAvailable = !car.isAvailable;
        await car.save();
        
        return res.json({success: true, message: "تم تغيير حالة توافر السيارة"})
    } catch (err) {
        console.log(err.message)
        return res.json({success: false, message: err.message})
    }
}

// To delete a car
export const deleteCar = async(req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        // is car belong to user?
        if (car.owner.toString() !== _id.toString()) {
            return res.json({success: false, message: "لا تملك التصريح لهذا العمل"})
        }

        // I wont delete the car to remain in the booking history for other users
        car.owner = null;
        car.isAvailable = false;

        await car.save();
        
        return res.json({success: true, message: "تم حذف السيارة"})
    } catch (err) {
        console.log(err.message)
        return res.json({success: false, message: err.message})
    }
}

// To get dashbiard data
export const getDashboardData = async(req, res) => {
    try {
        const {_id, role} = req.user;

        if(role !== 'owner') {
            return res.json({success: false, message: "لا تملك التصريح لهذا العمل"})
        }

        const cars = await Car.find({owner: _id})

        const bookings = await Booking.find({ owner: _id }).populate('car').sort({createdAt: -1})

        const pendingBookings = await Booking.find({owner: _id, status: 'pending'})
        const completedBookings = await Booking.find({owner: _id, status: 'confirmed'})

        // calc monthly revenue
        const monthlyRevenue = bookings
            .filter(booking => booking.status === 'confirmed')
            .reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }

        // Missing return statement added:
        return res.json({success: true, dashboardData})

    } catch (err) {
        console.log(err.message)
        return res.json({success: false, message: err.message})
    }
}

// Update user profile image
export const updateUserImage = async (req, res)=>{
    try {
        const { _id } = req.user;

        const imageFile = req.file;

        // Upload image to image kit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        var optimizedImageURL = imagekit.url({
            path : response.filePath,
            transformation : [
                {width: '400'}, // width resizing
                {quality: 'auto'}, // auto compression
                {format: 'webp'} // webp is compatible with all browser and lightweight
            ]
        });

        const image = optimizedImageURL;

        await User.findByIdAndUpdate(_id, {image}) ;
        return res.json({success: true, message: "تم تحديث الصورة"})

    } catch (err) {
        console.log(err.message) ;
        return res.json({success: false, message: err.message})
    }
}

