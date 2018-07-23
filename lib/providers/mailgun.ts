import * as rp from "request-promise";
import { EmailPayload } from "../email_processor";
import { logger } from "../infrastructure/logger";
import * as config from "config";

const API_KEY = config.get<string>("providers.mailgun.secret");
const DOMAIN = config.get<string>("providers.mailgun.domain");

export async function sendEmail(payload: EmailPayload) {
  const options: any = {
    method: "POST",
    uri: `https://api:${API_KEY}@api.mailgun.net/v3/${DOMAIN}/messages`,
    form: buildEmailBody(payload)
  };

  const response = await rp(options);
  logger.info(response);
}

export function buildEmailBody(payload: EmailPayload) {
  const body: any = {
    from: payload.sender,
    to: payload.recipients.join(","),
    subject: payload.subject,
    text: payload.content
  };
  if (payload.cc_recipients && payload.cc_recipients.length > 0) {
    body.cc = payload.cc_recipients.join(",");
  }
  if (payload.bcc_recipients && payload.bcc_recipients.length > 0) {
    body.bcc = payload.bcc_recipients.join(",");
  }
  return body;
}
