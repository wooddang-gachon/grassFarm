import axios from "axios";

async function listAllVelogPosts(username) {
  const endpoint = "https://v2.velog.io/graphql";

  // url_slug를 추가로 요청해서 링크를 만들 수 있게 함
  const query = `
    query Posts($username: String!, $cursor: ID) {
      posts(username: $username, limit: 100, cursor: $cursor) {
        id
        title
        released_at
        url_slug 
      }
    }
  `;

  let allPosts = [];
  let cursor = null;
  let hasNextPage = true;

  console.log(`🚀 '${username}' 님의 모든 글을 수집 중입니다...`);

  try {
    // 1. 전체 데이터 수집 (페이지네이션)
    while (hasNextPage) {
      const variables = { username, cursor };
      const response = await axios.post(endpoint, { query, variables });

      const posts = response.data.data.posts;

      if (!posts || posts.length === 0) {
        hasNextPage = false;
        break;
      }

      allPosts = [...allPosts, ...posts];
      cursor = posts[posts.length - 1].id;

      process.stdout.write(`.`); // 로딩 중 표시
    }
    console.log(`\n✅ 수집 완료! 총 ${allPosts.length}개의 글을 찾았습니다.\n`);

    // 2. 전체 리스트 출력 & 특정 글 찾기
    console.log("================ [ 전체 글 리스트 ] ================");

    let targetFound = false;

    allPosts.forEach((post, index) => {
      const date = post.released_at
        ? post.released_at.split("T")[0]
        : "날짜없음";
      const link = `https://velog.io/@${username}/${post.url_slug}`;

      // 우리가 찾는 그 글인지 확인
      const isTarget = link.includes("claude-md-guide");
      if (isTarget) targetFound = true;

      // 콘솔 출력 (찾는 글이면 ✨ 표시)
      const mark = isTarget ? "✨✨✨ [찾았다!!!] " : "";
      console.log(`${mark}[${index + 1}] ${date} | ${post.title}`);
      console.log(`    🔗 ${link}`);
      if (isTarget) console.log("    👆 이 글의 날짜를 확인해보세요!");
    });

    console.log("==================================================");

    if (!targetFound) {
      console.error(`❌ 경고: 'claude-md-guide' 글이 리스트에 없습니다!`);
      console.error(`   가능성 1. 비공개(임시저장) 상태일 수 있습니다.`);
      console.error(`   가능성 2. 아이디가 '${username}'이 아닐 수 있습니다.`);
    }
  } catch (error) {
    console.error("❌ 에러 발생:", error.message);
  }
}

// 🚀 실행 (surim014 아이디로 조회)
listAllVelogPosts("eunseo9808");
