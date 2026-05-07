const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

/* =========================
   MIDDLEWARE DE LOG
========================= */
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});


app.get('/hello', (req, res) => {
  res.send('Olá, Mundo!');
});


let tarefas = [];
let id = 1;

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const tarefa = { id: id++, nome: req.body.nome };
  tarefas.push(tarefa);
  res.status(201).json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const idReq = parseInt(req.params.id);
  const existe = tarefas.find(t => t.id === idReq);

  if (!existe) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefas = tarefas.filter(t => t.id !== idReq);
  res.json({ mensagem: 'Tarefa removida' });
});


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use((err, req, res, next) => {
  res.status(500).json({ erro: err.message });
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀');
});