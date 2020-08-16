// File: services/authentication/handlers/register
// Description: Contains the registration handler.

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { HTTP400Error } from "../../../utils/httpErrors";
import { refreshOptions } from "./common";
import dotenv from "dotenv";
import randtoken from "rand-token";

dotenv.config();

let id = 1;
const getId = () => id++;
const users = new Map();
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

/* Registers a new user.
 *
 * @return null
 */
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let { accessToken, refreshToken } = registerNewUser(email, password);

  res
    .cookie("refreshToken", refreshToken, refreshOptions)
    .status(200)
    .send({ auth: true, accessToken });
};

/*
 * Adds a user to the database.
 *
 * @param email: string
 * @param password: string
 * @return accessToken, refreshToken : string, string
 */
const registerNewUser = (email: string, password: string) => {
  if (!email || !password) {
    throw new HTTP400Error();
  }

  let hash_password = bcrypt.hashSync(password, 8);
  let refreshToken = randtoken.uid(256);
  let id = getId();
  users.set(email, { hash_password, id, refreshToken });

  const accessToken = jwt.sign({ sub: id }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: 300,
  });

  return { accessToken, refreshToken };
};
