import * as mailgun from "./providers/mailgun";
import * as sendGrid from "./providers/sendgrid";
import { logger } from "./infrastructure/logger";

export interface EmailPayload {
  sender: string;
  recipients: string[];
  cc_recipients: string[];
  bcc_recipients: string[];
  subject: string;
  content: string;
}

export async function sendEmail(payload: EmailPayload) {
  logger.debug(JSON.stringify(payload, null, 2));
  try {
    await mailgun.sendEmail(payload);
  } catch (error) {
    logger.error(error);
    try {
      await sendGrid.sendEmail(payload);
    } catch (error) {
      logger.error(error);
      throw new Error("email cannot be delivered");
    }
  }
}
