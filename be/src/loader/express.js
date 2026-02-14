import exrpess from "express";
import cors from "cors";

import routes from "../api/index.js";

export default (app) => {
  app.use(cors());
  app.use(exrpess.json());
  //   app.use(exrpess.urlencoded({ extended: true }));

  app.use("/api/v1", routes());
};
