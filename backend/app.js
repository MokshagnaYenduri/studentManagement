import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRouter from './routers/authRouter.js';
import studentRouter from './routers/studentRouter.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:2000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Welcome to the Student Management System API');
});

app.use('/api/auth', authRouter);
app.use('/api/students', studentRouter);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.listen(process.env.PORT || 5172, () => {
    console.log(`Server is running on port ${process.env.PORT || 5172}`);
});
