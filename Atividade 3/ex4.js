const express = require('express');
const app = express();

app.get('/erro', (req, res, next) => {
    const erro = new Error("Algo deu errado propositalmente!");
    erro.status = 500;
    next(erro); // Envia o erro 
});

//Trata os erros
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        erro: true,
        mensagem: err.message
    });
});

app.listen(3000, () => console.log("Exercício 4: Teste o erro em http://localhost:3000/erro"));