import GitApiService from "./GitApi.js";
import loggerCreator from "../loader/logger.js";
import { UserProfileInfo } from "../model/user.js";

export default class User {
  constructor() {
    this.gitApiService = new GitApiService();
    this.logger = loggerCreator("UserService");
  }
  async searchedUserInformation({ userId }) {
    const start = performance.now(); // 측정 시작
    try {
      // dto 할당
      const rawData = await this.gitApiService.getUserInfo({ userId });
      const userProfileInfo = new UserProfileInfo(rawData);

      const userFollowing =
        await this.gitApiService.getFollowingWithFollowerCount({
          userId,
        });
      const userFollowers =
        await this.gitApiService.getFollowersWithFollowerCount({
          userId,
        });
      const userContribution =
        await this.gitApiService.getYearlyDetailedContribution({ userId });
      this.logger.info(`Successfully fetched data for user: ${userId}`);

      return {
        userProfileInfo,
        // userFollowing,
        // userFollowers,
        // userContribution,
      };
    } catch (error) {
      this.logger.error("Error fetching searched user:", error);

      throw error;
    }
  }
}
