const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

const ARQUIVO = "./contatos.json";

// Ler dados
function lerDados() {
  const dados = fs.readFileSync(ARQUIVO, "utf-8");
  return JSON.parse(dados);
}

// Salvar dados
function salvarDados(dados) {
  fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
}

// GET
app.get("/contatos/:grupo", (req, res) => {
  const grupo = req.params.grupo;
  const dados = lerDados();

  if (!dados[grupo]) {
    return res.status(404).json({ erro: "Grupo não encontrado" });
  }

  res.json(dados[grupo]);
});

// POST
app.post("/contatos/:grupo", (req, res) => {
  const grupo = req.params.grupo;
  const { nome, telefone } = req.body;

  const dados = lerDados();

  if (!dados[grupo]) {
    return res.status(404).json({ erro: "Grupo não encontrado" });
  }

  if (!nome || !telefone) {
    return res.status(400).json({ erro: "Nome e telefone são obrigatórios" });
  }

  dados[grupo].push({ nome, telefone });

  salvarDados(dados);

  res.status(201).json({
    mensagem: "Contato adicionado com sucesso!",
    contato: { nome, telefone },
  });
});

// PUT
app.put("/contatos/:grupo/:index", (req, res) => {
  const grupo = req.params.grupo;
  const index = parseInt(req.params.index);
  const { nome, telefone } = req.body;

  const dados = lerDados();

  if (!dados[grupo]) {
    return res.status(404).json({ erro: "Grupo não encontrado" });
  }

  if (index < 0 || index >= dados[grupo].length) {
    return res.status(404).json({ erro: "Contato não encontrado" });
  }

  dados[grupo][index] = { nome, telefone };

  salvarDados(dados);

  res.json({
    mensagem: "Contato atualizado com sucesso!",
    contato: dados[grupo][index],
  });
});

// DELETE
app.delete("/contatos/:grupo/:index", (req, res) => {
  const grupo = req.params.grupo;
  const index = parseInt(req.params.index);

  const dados = lerDados();

  if (!dados[grupo]) {
    return res.status(404).json({ erro: "Grupo não encontrado" });
  }

  if (index < 0 || index >= dados[grupo].length) {
    return res.status(404).json({ erro: "Contato não encontrado" });
  }

  const removido = dados[grupo].splice(index, 1);

  salvarDados(dados);

  res.json({
    mensagem: "Contato excluído com sucesso!",
    contato: removido[0],
  });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
