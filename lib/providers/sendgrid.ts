import * as rp from "request-promise";
import { EmailPayload } from "../email_processor";
import { logger } from "../infrastructure/logger";
import * as config from "config";

const API_KEY = config.get<string>("providers.sendgrid.secret");

export async function sendEmail(payload: EmailPayload) {
  const options = {
    method: "POST",
    uri: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: {
      personalizations: [
        {
          to: [{ email: payload.recipients.join(",") }],
          cc: [{ email: payload.cc_recipients.join(",") }],
          bcc: [{ email: payload.bcc_recipients.join(",") }]
        }
      ],
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
    },
    json: true
  };

  const response = await rp(options);
  logger.info(response);
}
