const ctx = document.getElementById("contributionChart").getContext("2d");

new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Commits", "PRs", "Issues", "Documentation"],
    datasets: [
      {
        data: [40, 30, 20, 10], // 임의 데이터
        backgroundColor: ["#333333", "#5bc0de", "#f0ad4e", "#5cb85c"],
        borderWidth: 2,
        borderColor: "#000",
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
  },
});
