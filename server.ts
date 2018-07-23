import { logger } from "./lib/infrastructure/logger";
import { app } from "./lib/app";
import * as Queue from "bull";
import { scheduledJobQueue, handleJob } from "./lib/queue_processor";

// HTTP API Server
const environment = process.env.NODE_ENV;
const port = 3000;

logger.info("initialising`api server...");

app.listen(port, "0.0.0.0", () => {
  logger.info(`api listening on port ${port}`);
  logger.info(`NODE_ENV=${environment}`);
});

// Background Worker
scheduledJobQueue.process(async (job: Queue.Job, done: Queue.DoneCallback) => {
  try {
    logger.info(`picked up job with id: ${job.id}`);
    await handleJob(job, done);
  } catch (error) {
    logger.error("#worker: Unexpected error running #handleJob.", error);
    done(new Error("unknown fail"));
  }
});
