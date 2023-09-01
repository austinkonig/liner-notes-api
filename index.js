import express from 'express';
import mongoose from 'mongoose';
import { config as dotenvConfig } from 'dotenv';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

dotenvConfig();

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  });
  next();
});

app.use(cors({
  origin: 'https://liner-notes.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const connectionUrl = process.env.CONNECTION_URL;
const port = process.env.PORT || 3000;

mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`)))
  .catch((error) => console.log(`${error} did not connect`));