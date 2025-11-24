/**
 * @file app/middlewares/loggers/winston.logger.js
 * @description winston Logger
 * 251124 v1.0.0 seon init
 */

import dayjs from "dayjs";
import winston from "winston";

// ----------------
// private
// ----------------
// 커스텀 포맷 작성
const customFormat = winston.format.printf(({message, level})=> {
  // 출력 예) [2025-11-24 10:12:50] error - message
  const now = dayjs().locale(process.env.APP_TZ).format('YYYY-MM-DD HH:mm:ss');
  return `[${now}] ${level} - ${message}`;
});

// ----------------
// public
// ----------------
// 범용 로거 인스턴스
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL, // 로그 레벨 제한
  format: winston.format.combine(customFormat),
  transports: [ // 로그를 출력하는 관리 설정 ( 파일로 출력, 콘솔로 출력 등 설정)
    new winston.transports.File({
      filename: `${process.env.LOG_BASE_PATH}/${dayjs().locale(process.env.APP_TZ).format('YYYYMMDD')}_${process.env.LOG_FILE_NAME}`,
      // level: 'error' // 파일 작성 로그 레벨 제한
    }),
    new winston.transports.Console({
      level: process.env.LOG_LEVEL
    }),
  ],
});