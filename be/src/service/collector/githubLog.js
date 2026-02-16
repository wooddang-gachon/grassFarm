import axios from "axios";

export default {
  async getGithubGrass({ username }, targetYear = 2026) {
    // 3rd party Open API 사용 (토큰 필요 없음)
    const url = `https://github-contributions-api.jogruber.de/v4/${username}`;

    try {
      console.log(`📡 GitHub 데이터 요청 중... (${username})`);

      const response = await axios.get(url);

      // 이 API는 전체 연도 데이터를 다 줍니다.
      // response.data.contributions 배열에 { date, count, level } 형태로 들어있습니다.
      const allContributions = response.data.contributions;

      const yearlyGrass = {};
      let totalCount = 0;

      allContributions.forEach((item) => {
        // item.date 예시: "2026-02-11"
        const date = new Date(item.date);
        const year = date.getFullYear();

        // 목표 연도(2026)만 필터링
        if (year === targetYear) {
          // 잔디가 심긴 날만 저장할지, 0개인 날도 저장할지 결정 (여기선 1개 이상만)
          if (item.count > 0) {
            yearlyGrass[item.date] = item.count;
            totalCount += item.count;
          }
        }
      });

      console.log(`✅ [GitHub] ${targetYear}년 총 커밋/활동: ${totalCount}개`);
      return yearlyGrass;
    } catch (error) {
      console.error("❌ GitHub 데이터 가져오기 실패:", error.message);
      return {};
    }
  },
};


