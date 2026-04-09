const prompt = require("prompt-sync")();

async function consultarRAÇA() {
  try {
    let raca = prompt("Digite a raça: ").trim().toLowerCase();

    // remove espaços e traços
    let limpa = raca.replace(/[\s-]/g, "");

    if (limpa === "bordercollie") {
      raca = "collie/border";
    }

    const url = `https://dog.ceo/api/breed/${raca}/images/random`;
    const resposta = await fetch(url);

    const dados = await resposta.json();

    if (dados.status === "error") {
      console.log("Raça não encontrada!");
      return;
    }

    console.log("Imagem da raça:", dados.message);
  } catch (erro) {
    console.log("ERRO ao consultar a raça:");
    console.log(erro.message);
  }
}

consultarRAÇA();

