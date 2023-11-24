import express from 'express';
import mongoose from 'mongoose';
import noteRoute from './routes/noteRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

// app.use(
//   cors({
//     origin: 'https://noted-xi.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Noted App');
});

app.use('/notes', noteRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('App connected to database');
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((error) => {
    console.log(error);
  });
