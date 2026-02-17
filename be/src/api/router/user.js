import { Router } from "express";
import githubLogService from "../../service/collector/githubLog.js";
import GitApiService from "../../service/GitApi.js";

const route = Router();

export default (app) => {
  app.use("/user", route);

  route.get("/searched-user/", async (req, res) => {
    const { userId } = req.query;
    const gitApiService = new GitApiService();
    const userInfo = await gitApiService.getUserInfo({ userId });
    res.send(
      `Searched user with ID: ${userId}, User Info: ${JSON.stringify(userInfo)}`,
    );
  });

  return app;
};
