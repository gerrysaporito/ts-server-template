// File: config/db
// Description: Initializes PostgreSQL.

import { Client, ClientConfig } from "pg";
import dotenv from "dotenv";
import { logger } from "./logger";

dotenv.config();

const client_config: ClientConfig = {
  user: process.env.DB_CONNECTION_USER || "",
  password: process.env.DB_CONNECTION_PASSWORD || "",
  host: process.env.DB_CONNECTION_HOST || "localhost",
  database: process.env.DB_CONNECTION_DATABASE || "",
  port: parseInt(process.env.DB_CONNECTION_PORT || "5432"),
  connectionString: process.env.DB_CONNECTION_STRING || "",
};

const dbClient = new Client(client_config);

dbClient.on("error", (err: Error) => {
  logger.info({
    message: `Postgres client: Unexpected error on idle client`,
    extra: err,
  });

  process.exit(1);
});

const init = async () => {
  await dbClient.connect();
  logger.info({
    message: `Postgres client connected at ${process.env.DB_CONNECTION_PORT}`,
  });
};

export { init, dbClient };
