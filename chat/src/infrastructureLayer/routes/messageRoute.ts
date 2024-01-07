import express, { Request, Response, NextFunction } from "express";
import chatAdapter from "./injection/injection";
import { signinverify } from "@auth-middlewares/common";

const route = express.Router();

route.get(
  "/:id",
  signinverify,
  (req: Request, res: Response, next: NextFunction) =>
    chatAdapter.getMessage(req, res, next)
);

export default route;
