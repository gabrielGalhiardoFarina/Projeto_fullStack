import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authUserMiddleware } from "../middlewares/authUserMiddleware.js";

export const userRoutes = Router();

userRoutes.post("/register", UserController.register);

userRoutes.post("/login", UserController.login);

userRoutes.get("/my", authUserMiddleware, (req: any, res) => {
  res.json({
    message: "Acesso autorizado",
    user: req.user 
  });
});