const prompt = require("prompt-sync")();//API para consultar a raça de um cachorro e exibir uma imagem aleatória da raça usando a API Dog CEO

async function consultarRAÇA() {//Função
  try {
    let raca = prompt("Digite a raça: ").trim().toLowerCase();//Solicita ao usuário que digite a raça do cachorro, remove espaços em branco e converte para minúsculas

    // remove espaços e traços
    let limpa = raca.replace(/[\s-]/g, "");//Remove espaços e traços da string para facilitar a comparação

    if (limpa === "bordercollie") {//Verifica se a raça é "border collie" e ajusta a string para o formato esperado pela API
      raca = "collie/border";//A API Dog CEO espera a raça "border collie" como "collie/border", então ajustamos a string para esse formato
    }

    const url = `https://dog.ceo/api/breed/${raca}/images/random`;//URL da API para consultar uma imagem aleatória da raça especificada pelo usuário
    const resposta = await fetch(url);

    const dados = await resposta.json();//Converte a resposta da API para JSON

    if (dados.status === "error") {//Verifica se a API retornou um erro, o que indica que a raça não foi encontrada
      console.log("Raça não encontrada!");
      return;
    }

    console.log("Imagem da raça:", dados.message);//Exibe a URL da imagem da raça encontrada
  } catch (erro) {
    console.log("ERRO ao consultar a raça:");
    console.log(erro.message);
  }
}

consultarRAÇA();//Chama a função para iniciar o processo de consulta da raça do cachorro e exibição da imagem aleatória

