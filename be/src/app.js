import express from "express";
import dotenv from "dotenv";
import loader from "./loader/index.js";

dotenv.config();

const app = express();
loader(app);

function startServer() {
    
  app.listen(process.env.PORT || 9999, () => {
    console.log(`Server is running on port ${process.env.PORT || 9999}`);
  });
}
startServer();
console.log("Hello World!");
