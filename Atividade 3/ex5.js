const express = require('express');
const path = require('path');
const app = express();

// Configura a pasta public para arquivos estáticos
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log("Exercício 5: Acesse http://localhost:3000 para ver o HTML"));