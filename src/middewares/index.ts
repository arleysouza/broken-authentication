import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

// Middleware de autenticação
export function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.cookies.user) {
    res.status(401).json({ error: "Usuário não autenticado" });
  } else {
    next();
  }
}

export const loginRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 3, // 3 tentativas por IP por minuto
  standardHeaders: true, // Retorna headers rate-limit padrão
  legacyHeaders: false,
  message: {error:"Muitas tentativas. Tente novamente em 1 minuto."}
});
