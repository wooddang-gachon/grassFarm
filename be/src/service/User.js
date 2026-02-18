import GitApiService from "./GitApi.js";
import loggerCreator from "../loader/logger.js";

export default class User {
  constructor() {
    this.gitApiService = new GitApiService();
    this.logger = loggerCreator("UserService");
  }
  async serchedUserInformation({ userId }) {
    try {
      const userInfo = await this.gitApiService.getUserInfo({ userId });
      const userFollowing = await this.gitApiService.getUserFollowing({
        userId,
      });
      const userFollowers = await this.gitApiService.getUserFollowers({
        userId,
      });
      const userContribution =
        await this.gitApiService.getYearlyDetailedContribution({ userId });

      this.logger.info(`Successfully fetched data for user: ${userId}`);

      return { userInfo, userFollowing, userFollowers, userContribution };
    } catch (error) {
      this.logger.error("Error fetching searched user:", error);

      throw error;
    }
  }
}
