
let usuarios = [
    { id: 1, nome: "Usuário Inicial" }
];

// Controlar o array 
const db = {
    
    buscarTodos: () => {
        return usuarios;
    },

    
    adicionar: (nome) => {
        const novoUsuario = { id: Date.now(), nome: nome };
        usuarios.push(novoUsuario);
        return novoUsuario;
    },

    deletar: (id) => {
        const index = usuarios.findIndex(u => u.id == id);
        if (index !== -1) {
            return usuarios.splice(index, 1);
        }
        return null;
    }
};

// Exporta para usar no exercício 7
module.exports = db;