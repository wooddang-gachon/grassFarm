// 1. 버튼이 아닌 'form' 요소를 선택합니다.
const searchForm = document.getElementById("github-search-form");
const searchInput = document.getElementById("github-search-input");

// 2. 'submit' 이벤트를 가로채서 제어합니다.
// 콜백 함수를 'async'로 선언하여 내부에서 'await' 사용 가능하게 처리
// 콜백 함수에 async 키워드 명시
searchForm.addEventListener("submit", async (event) => {
  // 1. 즉시 기본 동작 차단 (논리적 최우선 순위)
  event.preventDefault();

  const userId = searchInput.value.trim();
  if (!userId) return;

  const url = `http://127.0.0.1:8000/api/v1/user/searched-user/?userId=${userId}`;

  try {
    // 2. 비동기 요청 수행
    const response = await fetch(url);

    // 3. 응답 형식 검증 (서버가 문자열을 보낼 경우 json() 파싱 시 에러 발생 가능)
    const text = await response.json();
    console.log("서버 응답:", text);
  } catch (error) {
    // 요청 중단 또는 네트워크 오류 포착
    console.error("Fetch Exception:", error.message);
  }
});
