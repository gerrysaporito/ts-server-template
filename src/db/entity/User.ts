// File: db/entity/User
// Description: User TypeORM definition.

import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

/*
 * The User entity defines the SQL architecture for an user that is on the platform.
 * The User entity will be a general entity for every user, and will have a profile
 * associated with it that will contain more information about the user.
 */
@Entity({ name: "users" })
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string; // '!' = required

  @Column()
  last_name?: string; // '?' = optional

  @Column()
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;
}

export default User;
