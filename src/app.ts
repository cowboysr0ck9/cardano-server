import express, { Request, Response } from "express";
import morgan, { Morgan, TokenIndexer } from "morgan";
import * as bodyParser from "body-parser";
import { ROUTES } from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as redisCache from "redis";

dotenv.config();

const app = express();

const PORT = process.env.NODE_ENV || 3000;
app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// load our API routes
app.use("/api/v1", [...ROUTES]);

export const redis = redisCache.createClient({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

// establish http server connection
app.listen(PORT, async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  } catch (error) {
    console.error("Failed to connect to database", error);
  }

  console.info(`Server @ https://localhost:${PORT}/api/v1/`);
});

mongoose.connection.on("error", (err) => {
  // TODO: Log via Morgan
  console.error("Database failed while running.", err);
});

mongoose.connection.once("open", () => {
  // TODO: Log a successful connection to the DB
  console.info("Database Successfully Connected");
});

redis.on("connect", function () {
  console.log("Redis Connected");
});

redis.on("ready", function (err) {
  console.log("redis ready ");
});

redis.on("error", function (err) {
  console.log("redis error" + err);
});
