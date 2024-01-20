import express, { Request, Response, NextFunction } from 'express';
import controller from './injection/injection';

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) =>
  controller.getAllNotifications(req, res, next)
);

router.delete("/", (req: Request, res: Response, next: NextFunction) =>
  controller.deleteAllNotifications(req, res, next)
);

router.delete("/oneNotification/:id", (req: Request, res: Response, next: NextFunction) =>
  controller.deleteOneNotifications(req, res, next)
);

export default router;
