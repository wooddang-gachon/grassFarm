import axios from "axios";

async function getVelogPostsByYear(username, targetYear = 2026) {
  const endpoint = "https://v2.velog.io/graphql";

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

  let cursor = null;
  let hasNextPage = true;
  let allPosts = [];

  console.log(`🔎 ID: '${username}' 님의 데이터를 조회 중입니다...`);

  try {
    // 1. 페이지네이션으로 모든 글 수집 (안전하게 다 긁어옴)
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
    }

    console.log(`📚 전체 글 수집 완료: 총 ${allPosts.length}개`);
    console.log(`---------------------------------------------------`);
    console.log(`🗓️  ${targetYear}년 작성 글 목록 (최신순)`);
    console.log(`---------------------------------------------------`);

    let count = 0;
    const resultList = [];

    // 2. 연도 필터링 및 출력
    allPosts.forEach((post) => {
      if (!post.released_at) return;

      const date = new Date(post.released_at);
      // 한국 시간(KST) 보정 (UTC+9) -> 새벽에 쓴 글 누락 방지
      const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
      const year = kstDate.getFullYear();

      if (year === targetYear) {
        const dateStr = kstDate.toISOString().split("T")[0];
        console.log(`[${count + 1}] ${dateStr} | ${post.title}`);

        resultList.push({
          date: dateStr,
          title: post.title,
          link: `https://velog.io/@${username}/${post.url_slug}`,
        });
        count++;
      }
    });

    if (count === 0) {
      console.log("   (이 해에 작성된 글이 없습니다)");
    }

    console.log(`---------------------------------------------------`);
    console.log(
      `✅ 최종 확인: ${targetYear}년에 총 ${count}개의 글을 찾았습니다.`,
    );

    return resultList;
  } catch (error) {
    console.error("❌ 에러 발생:", error.message);
    return [];
  }
}

// 🚀 실행: 여기서 아이디가 'surim014'인지 꼭 확인하세요!
getVelogPostsByYear("surim014", 2026);