// 1. 시계열 데이터 매트릭스 생성 (과거 365일)
function generateTimeSeriesData(daysToGenerate) {
  return Array.from({ length: daysToGenerate }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (daysToGenerate - 1 - index));
    return {
      date: date.toISOString().split("T")[0],
      activityScore: Math.floor(Math.random() * 15), // 테스트용 난수 생성 (0~14)
    };
  });
}

// 2. 스칼라값의 양자화(Quantization) 함수
function calculateColorLevel(score) {
  if (score === 0) return 0;
  if (score < 4) return 1;
  if (score < 8) return 2;
  if (score < 12) return 3;
  return 4;
}

// 3. DOM 렌더링 엔진
function renderGraph(dataList) {
  const container = document.getElementById("contribution-graph");

  dataList.forEach((data) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");

    // 유의미한 활동이 존재할 경우 양자화 레벨에 따른 클래스 부여
    if (data.activityScore > 0) {
      const level = calculateColorLevel(data.activityScore);
      cellElement.classList.add(`level-${level}`);
    }

    // 데이터 검증용 툴팁 삽입
    cellElement.title = `Date: ${data.date} | Score: ${data.activityScore}`;
    container.appendChild(cellElement);
  });
}

// 실행
const timeSeriesData = generateTimeSeriesData(365);
renderGraph(timeSeriesData);
