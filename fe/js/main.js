import { renderContributionChart } from "./chart_test.js";
import { renderFollowCount, renderFollowList } from "./follow.js";

// 버튼이 아닌 FORM 자체를 선택하십시오.
const searchForm = document.getElementById("github-search-form");

searchForm.addEventListener("submit", async (event) => {
  // 최상단에서 즉시 차단
  event.preventDefault();

  const userId = document.getElementById("github-search-input").value.trim();

  try {
    const url = `http://127.0.0.1:8000/api/v1/user/searched-user/?userId=${userId}`;
    const response = await fetch(url);
    const result = await response.json();
    renderContributionChart(result.userInfo.userContribution);
    renderFollowCount(result.userInfo.userProfileInfo);
    const followers = result.userInfo.userFollowers.data || []; // 팔로워 데이터가 없을 경우 빈 배열로 초기화

    // 리스트 렌더링 함수 실행
    renderFollowList(followers);
  } catch (error) {
    console.error("Fetch Exception:", error);
  }
});
