import { Router } from "express";
import userRouter from "./router/user.js";

export default () => {
  const app = Router();
  userRouter(app);

  return app;
};
