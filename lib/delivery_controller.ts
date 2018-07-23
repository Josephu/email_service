import { sendEmail, EmailPayload } from "./email_processor";
import * as express from "express";
import { logger } from "./infrastructure/logger";
import { insertJobIntoQueue, scheduledJobQueue } from "./queue_processor";

export async function sendEmailMessage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const payload: EmailPayload = req.body;
    logger.debug(JSON.stringify(payload, null, 2));
    // await sendEmail(payload);
    await insertJobIntoQueue(payload, scheduledJobQueue);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
}
