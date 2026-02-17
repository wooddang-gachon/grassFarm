import exrpess from "express";
import cors from "cors";

import routes from "../api/index.js";

export default (app) => {
  app.use(
    cors({
      origin: "*", // 모든 출처 허용
      methods: ["GET", "POST", "OPTIONS"], // OPTIONS가 포함되어야 함
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(exrpess.json());
  //   app.use(exrpess.urlencoded({ extended: true }));

  app.use("/api/v1", routes());
};
