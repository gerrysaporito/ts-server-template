// File: server
// Description: Server configuraioon file.

// Required External Modules
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import "reflect-metadata";

// Required Internal Modules
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import { applyMiddleware, applyRoutes } from "./utils";
import { initDependencies } from "./config/index";
import { logger } from "./config/logger";

// Exception Handling
process.on("uncaughtException", (e) => {
  logger.error({
    message: `uncaughtException`,
    extra: e,
  });
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  logger.error({
    message: `unhandledRejection`,
    extra: e,
  });
  process.exit(1);
});

// Router Variables
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
const router = express();

// Router Configuration
router.use(cors());
router.use(express.json());
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

// Server Activation
const server = http.createServer(router);
async function start() {
  await initDependencies();
  server.listen(PORT, () => {
    const msg: string = `Express server listening on port ${PORT} in ${router.settings.env} mode.`;
    logger.info({
      message: msg,
    });
  });
}

start();
