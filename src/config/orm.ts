// File: config/orm
// Description: Initializes TypeORM.

import "reflect-metadata";
import { logger } from "./logger";
import { createConnection } from "typeorm";

import { seed_db } from "../db/config/seed";

const init = async () => {
  await createConnection()
    .then(async (connection) => {
      await seed_db();
      return;
    })
    .catch((err) => {
      logger.info({
        message: `TypeORM Connection: Unexpected error on connection`,
        extra: err,
      });

      process.exit(1);
    });

  logger.info({
    message: `TypeORM successfully connected to PostgreSQL`,
  });
};

export { init };
