import expressLoader from "./express.js";
import loggerCreator from "./logger.js";

export default async (app) => {
  const logger = loggerCreator("loader");

  logger.info("🚀 Starting application loaders...");
  expressLoader(app);
};
