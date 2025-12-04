const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const db = new Pool({
  user: "postgres", // Usuário do banco de dados
  host: "localhost", // Host do banco de dados
  database: "projeto_simples", // Nome do banco de dados
  password: "admin", // Senha do banco de dados
  port: 5434 // Porta padrão do PostgreSQL é 5432, mude se necessário
});

// Rota de cadastro de usuário
app.post("/cadastrar", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
      [nome, email, senha]
    );
    res.json({ ok: true, mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.json({ ok: false, mensagem: "Erro ao cadastrar usuário." });
  }
});

// Rota de login de usuário
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const resultado = await db.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (resultado.rowCount === 0) {
      return res.json({ ok: false, mensagem: "Usuário não encontrado." });
    }

    const usuario = resultado.rows[0];

    if (usuario.senha === senha) {
      return res.json({ ok: true, mensagem: "Login bem-sucedido!" });
    } else {
      return res.json({ ok: false, mensagem: "Senha incorreta." });
    }
  } catch (error) {
    console.error(error);
    res.json({ ok: false, mensagem: "Erro ao realizar login." });
  }
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

// Teste de inicialização do Banco de Dados
db.connect(err => {
  if (err) {
    console.error("Erro ao conectar no Banco de Dados:", err);
    return;
  }
  console.log("PostgreSQL conectado!");
});