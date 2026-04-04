import { User } from "../entities/User.js";
import type { CreateUserDTO } from "../../application/dtos/CreateUserDTO.js";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
 