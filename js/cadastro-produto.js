let indexEdicao = localStorage.getItem("editarIndex");

if (indexEdicao !== null) {
  let lista = JSON.parse(localStorage.getItem("produtos")) || [];
  let produto = lista[indexEdicao];

  document.getElementById("nome").value = produto.nome;
  document.getElementById("categoria").value = produto.categoria;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("quantidade").value = produto.quantidade;
  document.getElementById("fornecedor").value = produto.fornecedor;
}

function ir(pagina) {
  window.location.href = pagina;
}

function carregarCategorias() {
  let select = document.getElementById("categoria");
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

  select.innerHTML = "<option value=''>Selecione uma categoria</option>";

  categorias.forEach(cat => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

function salvar() {
  let nome = document.getElementById("nome").value;
  let categoria = document.getElementById("categoria").value;
  let preco = document.getElementById("preco").value;
  let quantidade = document.getElementById("quantidade").value;
  let fornecedor = document.getElementById("fornecedor").value;
  let erro = document.getElementById("erro");

  if (!nome || !categoria || !preco || !quantidade || !fornecedor) {
    erro.innerText = "Preencha todos os campos";
    return;
  }

  if (preco < 0) {
    erro.innerText = "Preço inválido";
    return;
  }

  let produto = {
    nome,
    categoria,
    preco,
    quantidade,
    fornecedor
  };

  let lista = JSON.parse(localStorage.getItem("produtos")) || [];
    if (indexEdicao !== null) {
  lista[indexEdicao] = produto;
  localStorage.removeItem("editarIndex");
} else {
  lista.push(produto);
}
  localStorage.setItem("produtos", JSON.stringify(lista));

  alert("Produto cadastrado com sucesso!");

  window.location.href = "produtos.html";
}

carregarCategorias();