import { prisma } from "../database/prismaClient.js";
import { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { CreateUserDTO } from "../../application/dtos/CreateUserDTO.js";

export class PrismaUserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    return new User(user.id, user.name ?? "", user.email, user.password, user.createdAt);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return new User(user.id, user.name ?? "", user.email, user.password, user.createdAt);
  }
}
