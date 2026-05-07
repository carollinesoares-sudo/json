const express = require('express');
const app = express();
app.use(express.json()); 

let tarefas = [];


app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// Adicionar tarefa
app.post('/tarefas', (req, res) => {
    const novaTarefa = { id: tarefas.length + 1, nome: req.body.nome };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// Deletar tarefa 
app.delete('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tarefas = tarefas.filter(t => t.id !== id);
    res.json({ mensagem: "Tarefa removida" });
});

app.listen(3000, () => console.log("Exercício 2: Rodando em http://localhost:3000/tarefas"));