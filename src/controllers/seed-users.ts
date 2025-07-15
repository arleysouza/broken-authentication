import db from "./db"; // conexão com PostgreSQL
import bcrypt from "bcrypt";

async function seedUsers() {
  try {
    // Limpar dados existentes
    await db.query("DELETE FROM users_plaintext");
    await db.query("DELETE FROM users_hashed");

    // Inserção sem segurança (senhas em texto puro)
    await db.query(`
      INSERT INTO users_plaintext (username, password) VALUES
        ('ana', '123'),
        ('pedro', '456'),
        ('maria', '789')
    `);

    // Inserção segura (com bcrypt)
    const users = [
      { username: "ana", password: "123" },
      { username: "pedro", password: "456" },
      { username: "maria", password: "789" }
    ];

    for (const user of users) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      await db.query(
        "INSERT INTO users_hashed (username, password) VALUES ($1, $2)",
        [user.username, hashedPassword]
      );
    }

    console.log("Usuários inseridos com sucesso.");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao inserir usuários:", error);
    process.exit(1);
  }
}

seedUsers();
