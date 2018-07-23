import * as rp from "request-promise";
import { EmailPayload } from "../email_processor";
import { logger } from "../infrastructure/logger";
import * as config from "config";

const API_KEY = config.get<string>("providers.sendgrid.secret");

export async function sendEmail(payload: EmailPayload) {
  const options: any = {
    method: "POST",
    uri: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: buildEmailBody(payload),
    json: true
  };
  const response = await rp(options);
  logger.info(response);
}

export function buildEmailBody(payload: EmailPayload) {
  const body: any = {
    personalizations: [{}],
    from: {
      email: payload.sender
    },
    subject: payload.subject,
    content: [
      {
        type: "text/plain",
        value: payload.content
      }
    ]
  };
  body.personalizations[0].to = mapEmail(payload.recipients);
  if (payload.cc_recipients && payload.cc_recipients.length > 0) {
    body.personalizations[0].cc = mapEmail(payload.cc_recipients);
  }
  if (payload.bcc_recipients && payload.bcc_recipients.length > 0) {
    body.personalizations[0].bcc = mapEmail(payload.bcc_recipients);
  }
  return body;
}

function mapEmail(emailList: string[]) {
  return emailList.map(r => {
    return { email: r };
  });
}
