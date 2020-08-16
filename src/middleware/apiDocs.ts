// File: middleware/apiDocs
// Description: Adds swagger docs for api endpoints.

import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json";

/*
 * Adds swagger docs for api endpoint.
 *
 * return null
 */
export const handleAPIDocs = (router: Router) => {
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
