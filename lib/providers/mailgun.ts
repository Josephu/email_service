import * as rp from "request-promise";
import { EmailPayload } from "../email_processor";
import { logger } from "../infrastructure/logger";
import * as config from "config";

const API_KEY = config.get<string>("providers.mailgun.secret");
const DOMAIN = config.get<string>("providers.mailgun.domain");

export async function sendEmail(payload: EmailPayload) {
  const options = {
    method: "POST",
    uri: `https://api:${API_KEY}@api.mailgun.net/v3/${DOMAIN}/messages`,
    form: {
      from: payload.sender,
      to: payload.recipients.join(","),
      cc: payload.cc_recipients.join(","),
      bcc: payload.bcc_recipients.join(","),
      subject: payload.subject,
      text: payload.content
    }
  };

  const response = await rp(options);
  logger.info(response);
}
