const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//Função para manipular requisições
const requestHandler = (req, res) => {
    res.statusCode = 200; //Status de resposta HTTP 200 (OK)
    res.setHeader('Content-Type', 'application/json'); //Define o tipo de conteúdo da resposta como JSON
    
    //Definir a lógica da rota
    if (req.url === '/hello' && req.method === 'GET') {
        res.end(JSON.stringify({
            message: 'Ola Mundo!'
        }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            error : 'Rota não encontrada'
        }));
        
    }
};

const server = http.createServer(requestHandler);

//Iniciando servidor
server.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});