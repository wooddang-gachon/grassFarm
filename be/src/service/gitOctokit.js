import { Octokit } from "@octokit/core";
import dotenv from "dotenv";

dotenv.config();

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY,
});

// Octokit.js
// https://github.com/octokit/core.js#readme

// const log = await octokit.request("GET /users/{username}", {
//   username: "wooddang-gachon",
//   headers: {
//     "X-GitHub-Api-Version": "2022-11-28",
//   },
// });
const username = "wooddang-gachon";
const commits = await octokit.request(
  `GET /search/commits?q=user:${username}`,
  {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  },
);
console.log(commits.data);
