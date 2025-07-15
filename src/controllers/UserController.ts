import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../controllers/db";
import { isPasswordStrong } from "../utils/password-validator";

// Exemplo inseguro (senha em texto plano)
export async function loginInsecure(req: Request, res: Response) {
  const { username, password } = req.body;

  const result = await db.query(
    "SELECT id, username FROM users_plaintext WHERE username = $1 AND password = $2",
    [username, password]
  );

  if (result.rows.length > 0) {
    // Definindo cookie de autenticação
    res.cookie("user", {
      id: result.rows[0].id,
      username: result.rows[0].username,
    });

    res.json({ message: "Login efetuado com sucesso!" });
  } else {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
}

// Exemplo seguro com bcrypt e middleware
export async function loginSecure(req: Request, res: Response) {
  const { username, password } = req.body;

  const result = await db.query(
    "SELECT id, password, username FROM users_hashed WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    res.status(401).json({ error: "Credenciais inválidas" });
  } else if (await bcrypt.compare(password, result.rows[0].password)) {
    // Definindo cookie de autenticação
    res.cookie(
      "user",
      { id: result.rows[0].id, username: result.rows[0].username },
      { 
        httpOnly: true, 
        sameSite: "lax", 
        secure: false
      }
    );

    res.json({ message: "Login efetuado com sucesso!" });
  } else {
    res.status(401).json({ error: "Dados incorretos" });
  }
}

// Exercício 2
export async function register(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!isPasswordStrong(password)) {
    res.status(400).json({
      error:
        "Senha fraca. Use pelo menos 8 caracteres, incluindo uma letra maiúscula, número e símbolo.",
    });
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users_hashed (username, password) VALUES ($1, $2)",
      [username, hashed]
    );

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  }
}

// Exercício 3
export async function loginSecureExpire(req: Request, res: Response) {
  const { username, password } = req.body;

  const result = await db.query(
    "SELECT id, password, username FROM users_hashed WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    res.status(401).json({ error: "Credenciais inválidas" });
  } else if (await bcrypt.compare(password, result.rows[0].password)) {
    // Definindo cookie de autenticação
    res.cookie(
      "user",
      { id: result.rows[0].id, username: result.rows[0].username },
      { 
        httpOnly: true, 
        sameSite: "lax", 
        secure: false, 
        maxAge: 2 * 60 * 1000 // 2 minutos em milissegundos
      }
    );

    res.json({ message: "Login efetuado com sucesso!" });
  } else {
    res.status(401).json({ error: "Dados incorretos" });
  }
}

// Exercício 3
export async function isLogged(_: Request, res: Response) {
  res.json({ message: "Você ainda está logado!", });
}

// Exercício 3
export function logout(req: Request, res: Response) {
  res.clearCookie("user");

  res.status(200).json({ message: "Logout realizado com sucesso." });
}
