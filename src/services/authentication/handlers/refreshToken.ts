// File: services/authentication/handlers/refreshToken
// Description: Contains the handler to refresh a JWT for a user.

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HTTP401Error } from "../../../utils/httpErrors";
import dotenv from "dotenv";

dotenv.config();

const users = new Map();
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

/*
 * Refreshes JWT token.
 *
 * @return null
 */
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  let accessToken = generateAccessToken(refreshToken);

  res.status(200).send({ auth: true, accessToken });
};

/*
 * Generates a new JWT.
 *
 * @param refreshToken: string
 * @return accessToken: string
 */
const generateAccessToken = (refreshToken: string) => {
  let user = Array.from(users.values()).find(
    (it) => it.refreshToken == refreshToken
  );

  if (!user) {
    throw new HTTP401Error();
  }

  const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: 300,
  });

  return accessToken;
};
