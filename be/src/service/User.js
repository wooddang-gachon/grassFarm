import GitApiService from "./GitApi.js";
import loggerCreator from "../loader/logger.js";

export default class User {
  constructor() {
    this.gitApiService = new GitApiService();
    this.logger = loggerCreator("UserService");
  }
  async serchedUserInformation({ userId }) {
    try {
      const {
        login,
        html_url,
        name,
        avatar_url,
        email,
        twitter_username,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        company,
        blog,
        location,
        hireable,
        bio,
      } = await this.gitApiService.getUserInfo({ userId });
      const userProfileInfo = {
        login,
        html_url,
        name,
        avatar_url,
        twitter_username,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        company,
        blog,
        location,
        email,
        hireable,
        bio,
      };
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
        userFollowing,
        userFollowers,
        userContribution,
      };
    } catch (error) {
      this.logger.error("Error fetching searched user:", error);

      throw error;
    }
  }
}
