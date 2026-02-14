import winston from "winston";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

const {
  combine,
  timestamp,
  label,
  printf,
  colorize,
  errors,
  splat,
  json,
  cli,
} = winston.format;

// 1. 사람이 읽기 편한 커스텀 포맷 정의 (개발용)
const devLogFormat = printf(({ level, message, label, timestamp, stack }) => {
  // 에러 발생 시 스택 트레이스가 있다면 함께 출력, 없으면 메시지만 출력
  return `${timestamp} [${label}] ${level}: ${stack || message}`;
});

const transports = [];
const logDir = `${process.cwd()}/logs`;

// 2. 환경별 Transport 전략 설정
if (process.env.NODE_ENV === "development") {
  // [개발 환경] 콘솔 출력 위주, 색상과 가독성 강조
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize(), // 레벨별 색상 적용
        splat(), // %d, %s 등 포맷팅 지원
        devLogFormat, // 커스텀 텍스트 포맷 적용
      ),
    }),
    new winston.transports.File({
      filename: `${logDir}/dev_error.log`,
      level: "error",
      format: combine(
        splat(), // %d, %s 등 포맷팅 지원
        devLogFormat,
      ), // 커스텀 텍스트 포맷 적용
    }),
    new winston.transports.File({
      filename: `${logDir}/dev_combined.log`,
      format: combine(
        splat(), // %d, %s 등 포맷팅 지원
        devLogFormat,
      ), // 커스텀 텍스트 포맷 적용
    }),
  );
} else {
  // [운영 환경] 콘솔은 기본형태, 파일 저장 및 JSON 포맷 위주
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize(), // 레벨별 색상 적용
        splat(), // %d, %s 등 포맷팅 지원
        devLogFormat, // 커스텀 텍스트 포맷 적용
      ),
    }),
    new winston.transports.File({
      filename: `${logDir}/prod_error.log`,
      level: "error",
      format: combine(
        splat(), // %d, %s 등 포맷팅 지원
        devLogFormat,
      ), // 커스텀 텍스트 포맷 적용
    }),
    new winston.transports.File({
      filename: `${logDir}/prod_combined.log`,
      format: combine(
        splat(), // %d, %s 등 포맷팅 지원
        devLogFormat,
      ), // 커스텀 텍스트 포맷 적용
    }),
  );
}

// 3. Logger 인스턴스 생성
const loggerCreator = (logLabel) => {
  return winston.createLogger({
    level: process.env.LEVELS || "info", // 설정이 없으면 기본 info
    levels: winston.config.npm.LEVELS,
    format: combine(
      label({ label: logLabel || "none" }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }), // 에러 발생 시 스택 추적 활성화
      splat(),
    ),
    transports,
  });
};

export default loggerCreator;

// 레벨 (Level),우선순위 (Priority),설명
// error,0,시스템의 치명적인 오류
// warn,1,주의가 필요한 경고
// info,2,일반적인 정보성 메시지 (기본값)
// http,3,HTTP 요청 관련 로그
// verbose,4,상세한 동작 로그
// debug,5,개발 단계의 디버깅 메시지
// silly,6,아주 사소한 모든 정보
