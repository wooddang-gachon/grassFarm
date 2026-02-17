// 1. 대상 데이터베이스 활성화 (없으면 논리적 생성)
use("grassFarm");

// 3. JSON Schema Validator를 포함한 컬렉션 생성
db.createCollection("GitMetadata", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "GitMetadata Validation",
      required: ["userId", "contribution_events"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        contribution_events: {
          bsonType: "object",
          properties: {
            userGithubId: { bsonType: "string" },
            repoGithubId: { bsonType: "string" },
            type: { bsonType: "string" },
            occurredAt: { bsonType: "date" },
            meta: {
              bsonType: "object",
              properties: {
                commitCount: { bsonType: "long" },
                prNumber: { bsonType: "string" },
              },
            },
            createdAt: { bsonType: "date" },
          },
        },
        daily_contributions: {
          bsonType: "object",
          properties: {
            userGithubId: { bsonType: "string" },
            date: { bsonType: "date" },
            total: { bsonType: "long" },
            counts: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  repoCreate: { bsonType: "int" },
                  commit: { bsonType: "int" },
                  pr: { bsonType: "int" },
                  issue: { bsonType: "int" },
                  review: { bsonType: "int" },
                },
              },
            },
          },
        },
        repos: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              name: { bsonType: "string" },
              createdAt: { bsonType: "date" },
              ownerGithubId: { bsonType: "string" },
              githubRepoId: { bsonType: "string" },
              isPrivate: { bsonType: "bool" },
            },
          },
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

// 4. 물리적 생성을 위한 초기 데이터 삽입 (더미 데이터)
db.getCollection("GitMetadata").insertOne({
  // mongosh 환경에서는 ObjectId() 생성자를 직접 사용합니다.
  userId: ObjectId("000000000000000000000001"),
  contribution_events: {
    userGithubId: "testUser",
    repoGithubId: "testRepo",
    type: "commit",
    occurredAt: new Date(),
    createdAt: new Date(),
  },
});
