import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookiesParser from 'cookie-parser';
import path from 'path';
import hbs from 'hbs';
import router from '#routers/index.ts';
export default hbs;

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookiesParser());
app.use('/api', router);

const start = async () => {
  try {
    await mongoose.connect(`${process.env.BASE_URL}`);
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`error during start server: ${error}`);
  }
};

start();
