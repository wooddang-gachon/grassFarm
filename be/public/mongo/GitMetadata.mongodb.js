use("grassFarm");

db.getCollection("GitMetadata Collection").insertOne({
  userId: new ObjectId(),

  contribution_events: {
    userGithubId: "wooddang",
    repoGithubId: "repo123",
    type: "commit",
    occurredAt: new Date(),
    meta: {
      commitCount: NumberLong(3),
      "prNumber Field": "42",
    },
    createdAt: new Date(),
  },

  daily_contributions: {
    "userGithubId Field": "wooddang",
    date: new Date(),
    total: NumberLong(5),
    counts: [
      {
        repoCreate: 0,
        commit: 3,
        pr: 1,
        issue: 1,
        review: 0,
      },
    ],
  },

  repos: [
    {
      name: "grassFarm",
      "createdAt Field": new Date(),
      ownerGithubId: "wooddang",
      githubRepoId: "987654",
      isPrivate: false,
    },
  ],
});
