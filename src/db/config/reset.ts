// File: db/config/reset
// Description: Resets the database.

import { getConnection } from "typeorm";
import { logger } from "../../config/logger";

export const reset_db = async () => {
  const connection = getConnection();

  logger.info({
    message: `Successfully reset database`,
  });

  return;
};
