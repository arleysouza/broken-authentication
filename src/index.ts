import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import router from "./routes";

// Carrega as variáveis de ambiente definidas no arquivo .env
dotenv.config();

// Inicializa a aplicação Express
const app = express();

// Define a porta utilizada pelo servidor
const PORT = process.env.PORT || 3000;

// Middleware para permitir o envio de dados em formato JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir o envio de dados em formato URL-encoded no corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Middleware para cookies
app.use(cookieParser());

// Inicializa o servidor na porta definida
app.listen(PORT, function () {
  console.log(`Servidor rodando em http://vitima.local:${PORT}`);
});

app.use("/api", router);

app.use(function (_: Request, res: Response) {
  res.status(404).json({error: "Rota não encontrada"});
});
