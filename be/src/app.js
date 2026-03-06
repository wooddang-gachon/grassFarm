import express from "express";
import dotenv from "dotenv";
import loader from "./loader/index.js";
import loggerCreator from "./loader/logger.js";

const logger = loggerCreator("app");

dotenv.config();

const app = express();
loader(app);

function startServer() {
  app.listen(process.env.PORT || 9999, () => {
    logger.info(`Server is running on port ${process.env.PORT || 9999}`);
  });
}
startServer();
