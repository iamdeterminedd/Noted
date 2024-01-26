import express from 'express';
import mongoose from 'mongoose';
import noteRoute from './routes/noteRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// app.use(cors());

// Enable CORS (Cross-Origin Resource Sharing) middleware
app.use(
  cors({
    origin: 'https://noted-xi.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Noted App');
});

// Middleware to handle routes
app.use('/notes', noteRoute);

// Connecting to MongoDB database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('App connected to database');
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((error) => {
    console.log(error);
  });
