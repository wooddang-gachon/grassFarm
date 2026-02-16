import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
import loggerCreator from "./logger.js";

const logger = loggerCreator("gitOctokitLoader");

dotenv.config();

let instance = null;
const auth = process.env.GITHUB_API_KEY;

export default () => {
  if (instance) return instance;

  if (!auth) {
    const errorMsg = "GITHUB_API_KEY is not defined in environment variables.";
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    instance = new Octokit({
      auth,
      timeZone: "Asia/Seoul",
    });

    logger.info("Octokit instance initialized successfully.");
    return instance;
  } catch (error) {
    logger.error(`Failed to initialize Octokit: ${error.message}`);
    throw error;
  }
};
