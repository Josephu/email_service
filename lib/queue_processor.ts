import * as Queue from "bull";
import { EmailPayload, sendEmail } from "./email_processor";
import { logger } from "./infrastructure/logger";
import * as config from "config";

export const scheduledJobQueue = new Queue("email_queue", {
  redis: {
    host: config.get<string>("redis.host"),
    db: config.get<number>("redis.db")
  } as any
});

export async function insertJobIntoQueue(
  payload: EmailPayload,
  queue: Queue.Queue
) {
  await queue.add(payload, {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 60000 // 60 seconds retry
    },
    removeOnComplete: true
  });
}

export async function handleJob(job: Queue.Job, done: Queue.DoneCallback) {
  const payload = job.data;
  logger.debug(`Worker process: ${JSON.stringify(payload, null, 2)}`);
  await sendEmail(payload);
  return done();
}
