// 1. 컨텍스트 전환
use("grassFarm");

// 2. 기존 컬렉션 초기화 (필요 시)
db.getCollection("Users").drop();

// 3. 스키마 검증이 적용된 컬렉션 생성
db.createCollection("Users", {
  capped: false,
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Users Schema Validation",
      // 필수 필드 정의: 개체 식별 및 인증에 필수적인 요소
      required: ["githubId", "email", "username", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        githubId: { bsonType: "string" },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$", // 기본적인 이메일 형식 검증 추가
        },
        accessToken: { bsonType: "string" },
        profileUrl: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        username: { bsonType: "string" },
        profile: {
          bsonType: "object",
          properties: {
            avatar_url: { bsonType: "string" },
            gender: { bsonType: "string" },
            // 정밀도를 위해 number 대신 int/long 사용 권장
            public_repos: { bsonType: "int" },
            followers: { bsonType: "int" },
            following: { bsonType: "int" },
          },
          additionalProperties: false,
        },
        connectedGit: { bsonType: "bool" },
      },
      additionalProperties: false,
    },
  },
  // 검증 수준을 strict로 변경하여 스키마 위반 데이터 삽입을 원천 차단
  validationLevel: "strict",
  validationAction: "error",
});

// 4. 초기 데이터 삽입 (검증 테스트용)
db.getCollection("Users").insertOne({
  githubId: "gh_12345",
  email: "user@example.com",
  username: "developer_kb",
  createdAt: new Date(),
  profile: {
    avatar_url: "https://github.com/avatar.png",
    gender: "undisclosed",
    public_repos: NumberInt(10),
    followers: NumberInt(100),
    following: NumberInt(50),
  },
  connectedGit: true,
});
