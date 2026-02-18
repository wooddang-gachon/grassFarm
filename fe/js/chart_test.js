// Chart_test.js
let contributionChartInstance = null;

const getContributionTotals = (contributionData) => {
  const totals = { commit: 0, pr: 0, issue: 0, review: 0 };
  contributionData.forEach((item) => {
    totals.commit += item.commit || 0;
    totals.pr += item.pr || 0;
    totals.issue += item.issue || 0;
    totals.review += item.review || 0;
  });
  return totals;
};

export const renderContributionChart = (contributionData) => {
  const canvasId = "contributionChart";
  const canvasElement = document.getElementById(canvasId);

  if (!canvasElement) {
    console.error("Canvas element not found");
    return;
  }

  // 1. 내부 변수 확인 및 Chart.js 전역 레지스트리 확인 (이중 검증)
  const existingChart = Chart.getChart(canvasElement);
  if (existingChart) {
    existingChart.destroy();
  }

  const totals = getContributionTotals(contributionData);
  // const totals = { commit: 30, pr: 20, issue: 25, review: 25 }; // 임시 데이터
  const ctx = canvasElement.getContext("2d");

  // 2. 신규 인스턴스 생성 및 할당
  contributionChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Commits", "PRs", "Issues", "Code Reviews"],
      datasets: [
        {
          data: [totals.commit, totals.pr, totals.issue, totals.review],
          backgroundColor: ["#333333", "#5bc0de", "#f0ad4e", "#d9534f"],
          borderWidth: 2,
          borderColor: "#000",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
};
