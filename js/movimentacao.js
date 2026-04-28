function ir(pagina) {
  window.location.href = pagina;
}

// carregar produtos no select
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let select = document.getElementById("produto");

produtos.forEach((p, index) => {
  select.innerHTML += `<option value="${index}">${p.nome}</option>`;
});

// movimentação
function movimentar() {
  let index = document.getElementById("produto").value;
  let quantidade = parseInt(document.getElementById("quantidade").value);
  let tipo = document.getElementById("tipo").value;
  let erro = document.getElementById("erro");

  if (!quantidade || quantidade <= 0) {
    erro.innerText = "Quantidade inválida";
    return;
  }

  let produto = produtos[index];

  if (tipo === "saida") {
    if (produto.quantidade < quantidade) {
      erro.innerText = "Estoque insuficiente";
      return;
    }
    produto.quantidade -= quantidade;
  } else {
    produto.quantidade += quantidade;
  }

  // salvar atualização
  localStorage.setItem("produtos", JSON.stringify(produtos));

  // 🔥 salvar histórico
  let historico = JSON.parse(localStorage.getItem("historico")) || [];

historico.push({
  produto: produto.nome,
  quantidade,
  tipo,
  data: new Date().toLocaleString()
});

// salva histórico
localStorage.setItem("historico", JSON.stringify(historico));

// mensagem + redirecionamento
localStorage.setItem("msg", "Movimentação registrada com sucesso!");
window.location.href = "historico.html";

}