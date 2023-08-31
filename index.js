import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

const corsOptions = {
  origin: 'https://liner-notes-api.onrender.com',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
