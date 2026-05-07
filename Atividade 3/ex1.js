const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.send("Olá, Mundo!");
});

app.listen(3000, () => console.log("Ex 1: Servidor na porta 3000"));