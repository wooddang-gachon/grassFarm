import gitOctokit from "../loader/gitOctokit.js";
import dotenv from "dotenv";
import logggerCreator from "../loader/logger.js";

const logger = logggerCreator("gitOctokit");
dotenv.config();

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = gitOctokit();

// Octokit.js
// https://github.com/octokit/core.js#readme

const response = await octokit.request("GET /users/{username}", {
  username: "wooddang-gachon",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

// Octokit.js
// https://github.com/octokit/core.js#readme
// const response = await octokit.request("GET /users/{username}/hovercard", {
//   username: "wooddang-gachon",
//   subject_type: "repository",
//   headers: {
//     "X-GitHub-Api-Version": "2022-11-28",
//   },
// });

console.log(response);
