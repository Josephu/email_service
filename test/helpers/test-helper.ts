import { scheduledJobQueue } from "../../lib/queue_processor";

async function cleanupDatabaseAndRedis() {
  await scheduledJobQueue.empty();
}

// Truncate database for every test
afterEach(cleanupDatabaseAndRedis);
before(cleanupDatabaseAndRedis);
