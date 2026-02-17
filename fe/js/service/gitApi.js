const initIdCheck = () => {
  const searchForm = document.getElementById("github-search-form");
  const searchInput = document.getElementById("github-search-input");

  if (!searchForm || !searchInput) {
    console.error("GitHub 검색 폼 또는 입력 요소를 찾을 수 없습니다.");
    return;
  }

  searchForm.addEventListener("submit", (event) => {
    // 1. 브라우저의 기본 제출 동작(새로고침)을 명시적으로 차단
    event.preventDefault();

    const userId = searchInput.value.trim();

    if (!userId) {
      alert("ID를 입력해주세요!");
      return;
    }

    // 2. 비동기 요청 수행
    fetch(`http://127.0.0.1:8000/api/v1/user/searched-user?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => console.log("결과:", data))
      .catch((err) => {
        // (canceled)가 발생하지 않도록 위에서 preventDefault가 먼저 보장되어야 함
        console.error("Fetch 에러:", err);
      });
  });
};

export default initIdCheck;
