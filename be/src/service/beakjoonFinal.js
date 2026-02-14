import axios from "axios";
import * as cheerio from "cheerio";

// 서버 부하 방지를 위한 딜레이 함수 (필수!)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getBojOneYearHistory(username) {
  // 1. 수집 목표 날짜 설정 (오늘로부터 1년 전)
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  console.log(
    `📅 수집 기준일: ${oneYearAgo.toISOString().split("T")[0]} 이후의 데이터만 수집합니다.`,
  );

  let currentUrl = `https://www.acmicpc.net/status?user_id=${username}`;
  let allHistory = [];
  let isTargetReached = false;
  let pageCount = 1;

  try {
    while (!isTargetReached) {
      console.log(`[Page ${pageCount}] 요청 중... ${currentUrl}`);

      const { data } = await axios.get(currentUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      const $ = cheerio.load(data);
      const rows = $("#status-table > tbody > tr");

      if (rows.length === 0) {
        console.log("더 이상 데이터가 없습니다.");
        break;
      }

      // 현재 페이지의 행(row) 파싱
      rows.each((index, element) => {
        const resultText =
          $(element).find(".result-text").find("span").text().trim() ||
          $(element).find(".result-text").text().trim();
        const timeElement = $(element).find(".real-time-update"); // <a class="real-time-update" title="...">
        const timestampStr = timeElement.attr("title"); // "YYYY-MM-DD HH:mm:ss"

        if (timestampStr) {
          const recordDate = new Date(timestampStr);

          // 날짜 비교: 기록 날짜가 1년 전보다 과거라면 수집 중단 플래그 설정
          if (recordDate < oneYearAgo) {
            isTargetReached = true;
            return false; // each 반복 탈출
          }

          allHistory.push({
            result: resultText,
            date: timestampStr, // 원본 문자열 유지 (DB 저장용)
            isSuccess: resultText.includes("맞았습니다"),
          });
        }
      });

      if (isTargetReached) break;

      // '다음' 버튼 찾기 (id="next_page")
      const nextPageBtn = $("#next_page");
      if (nextPageBtn.length > 0) {
        const nextLink = nextPageBtn.attr("href"); // "/status?user_id=...&top=..."
        currentUrl = `https://www.acmicpc.net${nextLink}`;
        pageCount++;

        // ⚠️ 중요: 백준 서버 보호를 위해 1초 대기 (없으면 차단됨)
        await sleep(1000);
      } else {
        console.log("마지막 페이지입니다.");
        break;
      }
    }

    console.log(
      `✅ 수집 완료! 총 ${allHistory.length}개의 기록을 가져왔습니다.`,
    );
    return allHistory;
  } catch (error) {
    console.error("수집 중 에러 발생:", error.message);
    return allHistory; // 에러 나기 전까지 모은 거라도 반환
  }
}

// 실행
getBojOneYearHistory("dn457616").then((data) => {
  const grassMap = {};

  data.forEach((item) => {
    // '2026-01-20 14:13:36' -> '2026-01-20' (날짜만 추출)
    const dateKey = item.date.split(" ")[0];

    if (!grassMap[dateKey]) {
      grassMap[dateKey] = { total: 0, success: 0, fail: 0 };
    }

    grassMap[dateKey].total += 1; // 시도 횟수 (수정 횟수 개념)
    if (item.isSuccess) {
      grassMap[dateKey].success += 1; // 성공 횟수 (잔디 색깔)
    } else {
      grassMap[dateKey].fail += 1; // 실패 횟수
    }
  });

  console.log(grassMap);
});
