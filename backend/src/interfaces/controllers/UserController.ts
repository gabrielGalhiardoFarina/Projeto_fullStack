import type { Request, Response } from "express";
import { CreateUserService } from "../../application/services/CreateUserService.js";
import { AuthService } from "../../application/services/AuthUserService.js";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const userRepository = new PrismaUserRepository();
      const createUserService = new CreateUserService(userRepository);
      const user = await createUserService.execute({ name, email, password });

      res.status(201).json({
        message: "Usuario cadastrado com sucesso",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao cadastrar usuario";
      const isDuplicateEmail = message === "Este email ja esta em uso";
      const isDatabaseError = /access denied|pool timeout|econnrefused|can't reach database|p1000|p1001/i.test(message);

      const statusCode = isDuplicateEmail ? 409 : isDatabaseError ? 503 : 400;
      const responseMessage = isDatabaseError
        ? "Falha na conexao com o banco. Verifique o DATABASE_URL e se o MySQL esta ativo."
        : message;

      res.status(statusCode).json({ message: responseMessage });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const userRepository = new PrismaUserRepository();
      const authService = new AuthService(userRepository);

      const result = await authService.execute({ email, password });

      res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro no login";
      res.status(401).json({ message });
    }
  }
}
