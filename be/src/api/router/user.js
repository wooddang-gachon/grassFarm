import { Router } from "express";
import loggerCreator from "../../loader/logger.js";
import githubLogService from "../../service/collector/githubLog.js";
import GitApiService from "../../service/GitApi.js";

const logger = loggerCreator("router");
const route = Router();

export default (app) => {
  app.use("/user", route);

  route.get("/searched-user/", async (req, res) => {
    const { userId } = req.query;
    logger.info(`Received request for user search: ${userId}`);
    const gitApiService = new GitApiService();
    const userInfo = await gitApiService.getUserInfo({ userId });
    logger.info(`Fetched user info for ${userId}: ${JSON.stringify(userInfo)}`);
    res.send(
      `Searched user with ID: ${userId}, User Info: ${JSON.stringify(userInfo)}`,
    );
  });

  return app;
};
