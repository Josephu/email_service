import { EmailPayload } from "../../lib/email_processor";
import { expect } from "chai";
import { buildEmailBody } from "../../lib/providers/mailgun";

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
      from: "sender@example.com",
      to: "receipient1@example.com",
      subject: "test",
      text: "test"
    });
  });
  it("has cc", function() {
    payload.cc_recipients = ["cc1@example.com", "cc2@example.com"];
    expect(buildEmailBody(payload)).to.eql({
      from: "sender@example.com",
      cc: "cc1@example.com,cc2@example.com",
      to: "receipient1@example.com",
      subject: "test",
      text: "test"
    });
  });
  it("has bcc", function() {
    payload.bcc_recipients = ["bcc1@example.com", "bcc2@example.com"];
    expect(buildEmailBody(payload)).to.eql({
      from: "sender@example.com",
      bcc: "bcc1@example.com,bcc2@example.com",
      to: "receipient1@example.com",
      subject: "test",
      text: "test"
    });
  });
  it("has more than one recipient", function() {
    payload.recipients = ["r1@example.com", "r2@example.com"];
    expect(buildEmailBody(payload)).to.eql({
      from: "sender@example.com",
      to: "r1@example.com,r2@example.com",
      subject: "test",
      text: "test"
    });
  });
});
