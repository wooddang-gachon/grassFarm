github이라는 외부 api를 연동해서 report를 만들어주는 프로젝트

기술스택
1. node
2. express
3. graphQL


- [ ] git api에서 비동기에 대한 동작 확인 필요(promise all을 안쓸 때와 쓸 때가 속도가 다름)




/**
 * @param {Array} contributionData - JSON의 userContribution 배열
 */
const renderContributionChart = (contributionData) => {
  const totals = getContributionTotals(contributionData);
  const ctx = document.getElementById("contributionChart").getContext("2d");

  // 기존 차트 객체가 있다면 파기 후 재생성 (Canvas 재사용 시 필수)
  if (window.myChart instanceof Chart) {
    window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Commits", "PRs", "Issues", "Code Reviews"], // 데이터에 맞게 라벨 조정
      datasets: [
        {
          data: [
            totals.commits || 25,
            totals.prs || 25,
            totals.issues || 25,
            totals.codeReviews || 25,
          ], // 데이터에 맞게 값 조정
          backgroundColor: ["#333333", "#5bc0de", "#f0ad4e", "#d9534f"], // 색상 조정
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
        tooltip: {
          callbacks: {
            label: (item) => `${item.label}: ${item.raw} units`,
          },
        },
      },
    },
  });
};
export { renderContributionChart };
