import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const parts = authHeader.split(" ");
  
  if (parts.length !== 2) {
    res.status(401).json({ message: "Erro no formato do token" });
    return;
  }

  const [scheme, token] = parts;

  if (!scheme || !token) {
    res.status(401).json({ message: "Token malformatado" });
    return;
  }

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ message: "Token malformatado" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não definida");
    }

    const decoded = jwt.verify(token, secret);

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
};