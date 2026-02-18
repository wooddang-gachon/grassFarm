export const renderFollowCount = (userInfo) => {
  console.log(userInfo); // 디버깅 로그 추가
  const followersCountElement = document.getElementById("followers-count");
  const followingCountElement = document.getElementById("following-count");

  followersCountElement.textContent = userInfo.followers;
  followingCountElement.textContent = userInfo.following;
};

export const renderFollowList = (users) => {
  const container = document.getElementById("follow-list-container");

  if (!container) return;

  // 1. 기존 리스트 초기화 (비우기)
  container.innerHTML = "";

  // 2. 데이터가 없을 경우 처리
  if (!users || users.length === 0) {
    container.innerHTML = `<div class="list-group-item bg-transparent text-muted">데이터가 없습니다.</div>`;
    return;
  }
  console.log(users); // 디버깅 로그 추가
  // 3. 배열 순회 및 HTML 생성
  // .map()을 사용하여 각 유저 데이터를 <a> 태그 문자열로 변환
  const listHtml = users
    .map(
      (user) => `
    <a href="https://github.com/${user.login}" 
       target="_blank" 
       class="list-group-item list-group-item-action bg-transparent text-secondary">
       ${user.login} ${user.followerCount ? `(${user.followerCount})` : ""}
    </a>
  `,
    )
    .join(""); // 배열을 하나의 문자열로 결합

  // 4. 생성된 HTML을 컨테이너에 주입
  container.innerHTML = listHtml;
};
