import bcrypt from "bcrypt";
import { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { CreateUserDTO } from "../dtos/CreateUserDTO.js";

export class CreateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();
    const password = data.password;

    if (name.length < 3) {
      throw new Error("O nome deve ter no minimo 3 caracteres");
    }

    if (!email.includes("@")) {
      throw new Error("Email invalido");
    }

    if (password.length < 6) {
      throw new Error("A senha deve ter no minimo 6 caracteres");
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Este email ja esta em uso");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
