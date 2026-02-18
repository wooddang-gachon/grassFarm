import { Router } from "express";
import loggerCreator from "../../loader/logger.js";
// import githubLogService from "../../service/collector/githubLog.js";
// import GitApiService from "../../service/GitApi.js";
import UserService from "../../service/user.js";

const logger = loggerCreator("router");
const route = Router();

export default (app) => {
  app.use("/user", route);

  route.get("/searched-user/", async (req, res) => {
    const { userId } = req.query;

    const userService = new UserService();
    const userInfo = await userService.serchedUserInformation({ userId });

    res.send({ message: `Searched user`, ID: userId, userInfo });
    logger.info(`Fetched user info for ${userId}`);
  });

  return app;
};
