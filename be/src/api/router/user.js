import { Router } from "express";
import githubLogService from "../../service/githubLog.js";

const route = Router();

export default (app) => {
  app.use("/user", route);

  route.get("/searched-user/", async (req, res) => {
    const { userId } = req.query;

    const log = await githubLogService.getGithubGrass({ username: userId });
    res.send(`Searched user with ID: ${userId}, Log: ${JSON.stringify(log)}`);
  });

  return app;
};
