import { logger } from "./lib/infrastructure/logger";
import { app } from "./lib/app";

const environment = process.env.NODE_ENV;
const port = 3000;

logger.info("initialising`api server...");

app.listen(port, "0.0.0.0", () => {
  logger.info(`api listening on port ${port}`);
  logger.info(`NODE_ENV=${environment}`);
});
