const express = require('express');
const app = express();

// O Middleware de Registro
app.use((req, res, next) => {
    console.log(`[LOG] Método: ${req.method} | URL: ${req.url}`);
    next(); 
});

app.get('/teste', (req, res) => {
    res.send("Verifica o teu terminal para ver o log!");
});

app.listen(3000, () => console.log("Exercício 3: Middleware de Log ativo."));