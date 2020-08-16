// File: services/authentication/handlers/authentication
// Description: Contains the authentication handler to login a user.

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { HTTP400Error, HTTP401Error } from "../../../utils/httpErrors";
import { refreshOptions } from "./common";
import dotenv from "dotenv";

dotenv.config();

const users = new Map();
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

/*
 * Authenticates a user by checking their email and password.
 *
 * @return null
 */
export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let { accessToken, refreshToken } = authenticate(email, password);

  res
    .cookie("refreshToken", refreshToken, refreshOptions)
    .status(200)
    .send({ auth: true, accessToken });
};

/*
 * Validates a user's email and password.
 *
 * @param email: string
 * @param password: string
 * @return accessToken, refreshToken : string, string
 */
const authenticate = (email: string, password: string) => {
  if (!email || !password) {
    throw new HTTP400Error();
  }

  let user = users.get(email);

  if (!user || !bcrypt.compareSync(password, user.hash_password)) {
    throw new HTTP401Error();
  }

  const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: 300,
  });

  let { refreshToken } = user;

  return { accessToken, refreshToken };
};
