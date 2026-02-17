// main.js
import initIdCheck from "../js/service/gitApi.js"; // 이름이 달라도 export default면 상관없어요.

document.addEventListener("DOMContentLoaded", () => {
  console.log("앱 시작: 이벤트 리스너를 등록합니다.");

  // 여기서 함수를 실행하는 건 "지금 당장 ID를 체크해!"가 아니라
  // "버튼에 클릭 이벤트를 걸어둬라!"라는 뜻입니다.
  initIdCheck();
});
