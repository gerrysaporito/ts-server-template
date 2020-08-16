// File: services/authentication/routes
// Description: Adds the handlers to the routes.

import { Request, Response } from "express";
import { authenticateUser } from "./handlers/authentication";
import { refreshToken } from "./handlers/refreshToken";
import { registerUser } from "./handlers/register";
import { refreshOptions } from "./handlers/common";

export default [
  {
    path: "/api/v1/register",
    method: "post",
    handler: [registerUser],
  },
  {
    path: "/api/v1/signin",
    method: "post",
    handler: [authenticateUser],
  },
  {
    path: refreshOptions.path,
    method: "get",
    handler: [refreshToken],
  },
  // DELETE AFTER TESTING FILE IS COMPLETE
  {
    path: "/",
    method: "get",
    handler: [
      (req: Request, res: Response) => {
        res.status(200).send(`
          <h1>Create new user</h1>
          <form action="/api/v1/signup" method="POST">
              <div style="margin-bottom: 10px">
                <label for="email">Your email:</label>
                <input id="email" name="email" type="text" />
              </div>
              <div style="margin-bottom: 10px">
                <label for="password">Your password:</label>
                <input id="password" name="password" type="password" />
              </div>
            
              <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
              <input type="submit" value="Submit" />
          </form>
        `);
      },
    ],
  },
];
