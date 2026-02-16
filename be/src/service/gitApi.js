import gitOctokit from "../loader/gitOctokit.js";

export default class GitApi {
  constructor() {
    this.octokit = gitOctokit();
  }

  async getUserInfo({ userId }) {
    try {
      const response = await this.octokit.request("GET /users/{username}", {
        username: userId,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  }
  async getUserFollowing({ userId }) {
    try {
      const response = await this.octokit.request(
        "GET /users/{username}/following",
        {
          username: userId,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user following:", error);
      throw error;
    }
  }
  async getUserFollowers({ userId }) {
    try {
      const response = await this.octokit.request(
        "GET /users/{username}/followers",
        {
          username: userId,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user followers:", error);
      throw error;
    }
  }
  async getFollowingWithFollowerCount({ userId, first = 10 }) {
    const query = `
    query($login: String!, $first: Int!) {
      user(login: $login) {
        following(first: $first) {
          nodes {
            login
            followers {
              totalCount
            }
          }
        }
      }
    }
  `;

    try {
      const response = await this.octokit.graphql(query, {
        login: userId,
        first: first,
      });

      // 데이터 정제: [{ login: "user1", followers: 120 }, ...]
      return response.user.following.nodes.map((node) => ({
        login: node.login,
        followers: node.followers.totalCount,
      }));
    } catch (error) {
      logger.error(`GraphQL Query Failed: ${error.message}`);
      throw error;
    }
  }
  async getFollowersWithFollowerCount({ userId, first = 100, after = null }) {
    const query = `
      query($login: String!, $first: Int!, $after: String) {
        user(login: $login) {
          followers(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              login
              followers {
                totalCount
              }
            }
          }
        }
      }
    `;

    try {
      const response = await this.octokit.graphql(query, {
        login: userId,
        first,
        after,
      });

      const { nodes, pageInfo } = response.user.followers;

      return {
        data: nodes.map((node) => ({
          login: node.login,
          followerCount: node.followers.totalCount,
        })),
        pageInfo,
      };
    } catch (error) {
      console.error("GraphQL followers request failed:", error.message);
      throw error;
    }
  }
  async getYearlyDetailedContribution({ userId }) {
    const now = new Date();
    const from = new Date(now.getFullYear(), 0, 1).toISOString();
    const to = now.toISOString();

    const query = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            # 1. 커밋 기여 (레포지토리별 노드 추출)
            commitContributionsByRepository(maxRepositories: 100) {
              contributions(first: 100) {
                nodes { occurredAt }
              }
            }
            # 2. PR 기여
            pullRequestContributions(first: 100) {
              nodes { occurredAt }
            }
            # 3. 이슈 기여
            issueContributions(first: 100) {
              nodes { occurredAt }
            }
            # 4. 레포지토리 생성 기여
            repositoryContributions(first: 100) {
              nodes { occurredAt }
            }
          }
        }
      }
    `;

    try {
      const response = await this.octokit.graphql(query, {
        login: userId,
        from,
        to,
      });
      const collection = response.user.contributionsCollection;
      const statsMap = {};

      // 날짜별 카운팅 헬퍼 함수
      const increment = (dateStr, type) => {
        const date = dateStr.split("T")[0];
        if (!statsMap[date]) {
          statsMap[date] = {
            date,
            commit: 0,
            pr: 0,
            issue: 0,
            repo: 0,
            total: 0,
          };
        }
        statsMap[date][type]++;
        statsMap[date].total++;
      };

      // 각 노드 순회 및 집계
      collection.commitContributionsByRepository.forEach((repo) => {
        repo.contributions.nodes.forEach((node) =>
          increment(node.occurredAt, "commit"),
        );
      });
      collection.pullRequestContributions.nodes.forEach((node) =>
        increment(node.occurredAt, "pr"),
      );
      collection.issueContributions.nodes.forEach((node) =>
        increment(node.occurredAt, "issue"),
      );
      collection.repositoryContributions.nodes.forEach((node) =>
        increment(node.occurredAt, "repo"),
      );

      // 0인 날짜는 제외하고 날짜순 정렬하여 반환
      return Object.values(statsMap).sort((a, b) =>
        a.date.localeCompare(b.date),
      );
    } catch (error) {
      console.error("Detailed contribution fetch failed:", error.message);
      throw error;
    }
  }
}
const gitApi = new GitApi();
const response = await gitApi.getYearlyDetailedContribution({
  userId: "wooddang-gachon",
});
console.log(response);
