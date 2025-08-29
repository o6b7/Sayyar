import 'dotenv/config'; // This MUST be at the very top
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express();

// Connect 
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('server is running ya Qusai'));
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/booking', bookingRouter);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}...`);
});