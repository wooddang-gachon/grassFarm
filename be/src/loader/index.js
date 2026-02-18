import expressLoader from "./express.js";
import loggerCreator from "./logger.js";
import gitoctokit from "./gitOctokit.js";

export default async (app) => {
  const logger = loggerCreator("loader");

  logger.info("🚀 Starting application loaders...");
  expressLoader(app);
  gitoctokit();
  await logger.info("✅ All loaders initialized successfully.");
};
