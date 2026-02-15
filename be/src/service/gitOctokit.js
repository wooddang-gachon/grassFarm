import { Octokit } from "@octokit/core";
import dotenv from "dotenv";

dotenv.config();

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY,
});

await octokit.request("GET /users/{username}/hovercard", {
  username: "USERNAME",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
