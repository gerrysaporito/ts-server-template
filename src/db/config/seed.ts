// File: db/config/seed
// Description: Seeds the database if database is empty.

import { getConnection, Repository } from "typeorm";
import { logger } from "../../config/logger";
import User from "../entity/User";

/*
 * Seeds the database if empty.
 *
 * return null
 */
export const seed_db = async () => {
  const connection = getConnection();

  // List of repositories
  let userRepository = connection.getRepository(User);

  // Seeding users if none exist in DB
  let users = await userRepository.find();
  if (users.length < 1) {
    await seed_users(userRepository);
  }

  logger.info({
    message: `Successfully seeded database`,
  });

  return;
};

/*
 * Seeds all users.
 *
 * return null
 */
const seed_users = async (userRepository: Repository<User>) => {
  let Gerry = new User();
  Gerry.first_name = "Gerry";
  Gerry.last_name = "Saporito";
  Gerry.email = "gerrysaporito@gmail.com";
  Gerry.username = "test";
  Gerry.password = "tested";
  await userRepository.save(Gerry);
};

