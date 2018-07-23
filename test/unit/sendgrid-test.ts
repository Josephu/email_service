import { EmailPayload } from "../../lib/email_processor";
import { expect } from "chai";
import { buildEmailBody } from "../../lib/providers/sendgrid";

describe("#buildEmailBody", function() {
  let payload: EmailPayload;
  beforeEach(() => {
    payload = {
      sender: "sender@example.com",
      recipients: ["receipient1@example.com"],
      subject: "test",
      content: "test"
    };
  });
  it("no cc and no bcc", function() {
    expect(buildEmailBody(payload)).to.eql({
      personalizations: [
        {
          to: [{ email: "receipient1@example.com" }]
        }
      ],
      from: {
        email: "sender@example.com"
      },
      subject: "test",
      content: [
        {
          type: "text/plain",
          value: "test"
        }
      ]
    });
  });
  it("has cc", function() {
    payload.cc_recipients = ["cc1@example.com", "cc2@example.com"];
    expect(buildEmailBody(payload).personalizations[0].cc).to.eql([
      { email: "cc1@example.com" },
      { email: "cc2@example.com" }
    ]);
  });
  it("has bcc", function() {
    payload.bcc_recipients = ["bcc1@example.com", "bcc2@example.com"];
    expect(buildEmailBody(payload).personalizations[0].bcc).to.eql([
      { email: "bcc1@example.com" },
      { email: "bcc2@example.com" }
    ]);
  });
  it("has more than one recipient", function() {
    payload.recipients = ["r1@example.com", "r2@example.com"];
    expect(buildEmailBody(payload).personalizations[0].to).to.eql([
      { email: "r1@example.com" },
      { email: "r2@example.com" }
    ]);
  });
});
