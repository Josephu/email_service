import * as request from "supertest";
import { app } from "../../lib/app";
import { expect } from "chai";
import { scheduledJobQueue } from "../../lib/queue_processor";

describe("POST send_emails", function() {
  it("should get Bad Command Error if send bad payload", async function() {
    const response = await sendEmail({});
    expect(response.status).to.equal(400);
    expect(await scheduledJobQueue.count()).to.equal(0);
  });
  it("should get 201 and add a job", async function() {
    const response = await sendEmail({
      sender: "imagegospel@gmail.com",
      recipients: ["imagegospel@gmail.com"],
      cc_recipients: ["imagegospel+1@gmail.com"],
      bcc_recipients: ["imagegospel+2@gmail.com"],
      subject: "test",
      content: "test"
    });
    expect(response.status).to.equal(201);
    expect(await scheduledJobQueue.count()).to.equal(1);
  });
});

function sendEmail(body: any) {
  return request(app).post(`/send_email`).send(body);
}
