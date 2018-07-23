// tslint:disable-next-line:no-submodule-imports
import "source-map-support/register";
import * as express from "express";
import * as sourceMapSupport from "source-map-support";
import * as bodyParser from "body-parser";
const swaggerUi = require("swagger-tools/middleware/swagger-ui");
import { sendEmailMessage } from "./delivery_controller";
import * as swaggerTools from "swagger-tools";
const initMiddleware = swaggerTools.initializeMiddleware;
const sway = require("sway");

sourceMapSupport.install();

export const app = express();

app.use(bodyParser.json());
app.get("/", (_, res) => res.send("email API working"));

setupSwaggerAndSetupRoutes();

async function setupSwaggerAndSetupRoutes() {
  const defaultConfig = {
    validateRequest: true,
    validateResponse: false,
    // path to your swagger file
    swaggerPath: "./docs/swagger.yaml",
    swaggerObject: null
  };
  const api = await sway.create({ definition: defaultConfig.swaggerPath });
  const definition = api.definition;
  app.use(swaggerUi(definition));
  const middleware = (await new Promise(resolve =>
    initMiddleware(definition, resolve)
  )) as any;
  app.use(middleware.swaggerMetadata());
  if (defaultConfig.validateRequest) {
    app.use(
      middleware.swaggerValidator({
        validateResponse: defaultConfig.validateResponse
      })
    );
  }

  app.post("/send_email", sendEmailMessage);
}
