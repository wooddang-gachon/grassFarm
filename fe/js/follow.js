export const renderFollowCount = (userInfo) => {
  console.log(userInfo); // 디버깅 로그 추가
  const followersCountElement = document.getElementById("followers-count");
  const followingCountElement = document.getElementById("following-count");

  followersCountElement.textContent = userInfo.followers;
  followingCountElement.textContent = userInfo.following;
};

export const renderFollowList = (follows) => {
  console.log(follows); // 디버깅 로그 추가
  const followingContainer = document.getElementById(
    "following-list-container",
  );
  const followersContainer = document.getElementById(
    "followers-list-container",
  );

  const followingData = follows.userFollowing;
  const followerData = follows.userFollowers;

  // 1. 기존 리스트 초기화 (비우기)
  followingContainer.innerHTML = "";
  followersContainer.innerHTML = "";
  console.log(followingData); // 디버깅 로그 추가
  console.log(followerData); // 디버깅 로그 추가

  console.log(follows); // 디버깅 로그 추가
  // 3. 배열 순회 및 HTML 생성
  // .map()을 사용하여 각 유저 데이터를 <a> 태그 문자열로 변환
  const followinglistHtml = followingData
    .map(
      (followingData) => `
    <a href="https://github.com/${followingData.login}" 
       target="_blank" 
       class="list-group-item list-group-item-action bg-transparent text-secondary">
       ${followingData.login} ${followingData.followers ? `(${followingData.followers})` : ""}
    </a>
  `,
    )
    .join(""); // 배열을 하나의 문자열로 결합
  const followerslistHtml = followerData
    .map(
      (followerData) => `
    <a href="https://github.com/${followerData.login}" 
       target="_blank" 
       class="list-group-item list-group-item-action bg-transparent text-secondary">
       ${followerData.login} ${followerData.followers ? `(${followerData.followers})` : ""}
    </a>
  `,
    )
    .join(""); // 배열을 하나의 문자열로 결합

  // 4. 생성된 HTML을 컨테이너에 주입
  followingContainer.innerHTML = followinglistHtml;
  followersContainer.innerHTML = followerslistHtml;
};

export const getFlollowData = () => {
  const followerButton = document.getElementById("followers-tab");
  const followingButton = document.getElementById("following-tab");
};
