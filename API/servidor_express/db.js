let usuarios = [];
let id = 1;

function getUsuarios() {
  return usuarios;
}

function addUsuario(nome) {
  const user = { id: id++, nome };
  usuarios.push(user);
  return user;
}

function deleteUsuario(id) {
  usuarios = usuarios.filter(u => u.id !== id);
}

module.exports = {
  getUsuarios,
  addUsuario,
  deleteUsuario
};