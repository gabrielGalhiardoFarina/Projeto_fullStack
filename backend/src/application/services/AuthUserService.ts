import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { LoginDTO } from "../dtos/LoginUserDTO.js";

interface LoginResponse {
  token: string;
  user: {
    id: number | null;
    name: string;
    email: string;
  };
}

export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponse> {
    const email = data.email.trim().toLowerCase();

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("E-mail ou senha inválidos");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password!);
    if (!isPasswordValid) {
      throw new Error("E-mail ou senha inválidos");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Erro interno: Chave secreta JWT não configurada no servidor.");
    }

    const token = jwt.sign(
      { id: user.id }, 
      secret, 
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}