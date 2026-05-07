const express = require('express');
const db = require('./ex6_db.js'); // Importa as funções do Exercício 6
const app = express();

app.use(express.json());

app.get('/usuarios', (req, res) => {
    const todos = db.buscarTodos();
    res.json(todos);
});


app.post('/usuarios', (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });
    
    const novo = db.adicionar(nome);
    res.status(201).json(novo);
});

app.get('/usuarios/:id', (req, res) => {
    const lista = db.buscarTodos();
    const usuario = lista.find(u => u.id == req.params.id);
    
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
});

app.put('/usuarios/:id', (req, res) => {
    const lista = db.buscarTodos();
    const usuario = lista.find(u => u.id == req.params.id);
    
    if (usuario) {
        usuario.nome = req.body.nome;
        return res.json(usuario);
    }
    res.status(404).json({ erro: "Não encontrado" });
});


app.delete('/usuarios/:id', (req, res) => {
    const removido = db.deletar(req.params.id);
    if (!removido) return res.status(404).json({ erro: "ID inexistente" });
    
    res.json({ mensagem: "Usuário removido com sucesso" });
});

app.listen(3000, () => {
    console.log("Exercício 7: rodando em http://localhost:3000/usuarios");
});