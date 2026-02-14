// DOM 렌더링이 완료된 후 이벤트 리스너 바인딩


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("github-id");
  const searchBtn = document.getElementById("search-btn");

  searchBtn.addEventListener("click", fetchGraph);
  searchInput.addEventListener("keypress", handleKeyPress);
});

function fetchGraph() {
  const userId = document.getElementById("github-id").value.trim();
  const graphImg = document.getElementById("contribution-graph");
  const placeholder = document.getElementById("placeholder-text");

  if (!userId) {
    alert("검색할 GitHub ID를 입력하십시오.");
    return;
  }

  const chartUrl = `https://ghchart.rshah.org/${userId}`;

  graphImg.src = chartUrl;
  graphImg.style.display = "block";
  placeholder.style.display = "none";

  // 예외 처리: 유효하지 않은 계정 또는 네트워크 오류
  graphImg.onerror = function () {
    alert("데이터를 불러올 수 없습니다. 유효한 ID인지 확인하십시오.");
    graphImg.style.display = "none";
    placeholder.style.display = "block";
    document.getElementById("github-id").value = "";
  };
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    fetchGraph();
  }
}
