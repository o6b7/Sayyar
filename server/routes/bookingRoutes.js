import express from "express";
import { 
    autoCancelBookings,
    cancelBooking,
    changeBookingStatus, 
    checkAvailabilityOfCar, 
    createBooking,
    getOwnerBookings, 
    getUnavailableDates, 
    getUserBookings 
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityOfCar);
bookingRouter.post('/create', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, changeBookingStatus);
bookingRouter.get('/unavailable-dates/:carId', getUnavailableDates);
bookingRouter.post('/auto-cancel', protect, autoCancelBookings);
bookingRouter.post('/cancel', protect, cancelBooking);

export default bookingRouter;