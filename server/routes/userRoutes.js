import express from 'express';
import { gatCars, getCar, getUserData, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', protect, gatCars);
userRouter.get('/car/:id', protect, getCar);

export default userRouter;