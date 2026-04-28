function ir(pagina) {
  window.location.href = pagina;
}

// pega produtos do localStorage
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// renderiza tabela
function renderizarTabela(lista) {
  let tabela = document.getElementById("tabela-produtos");
  tabela.innerHTML = "";

  lista.forEach((p) => {
    let indexReal = produtos.findIndex(prod => prod.nome === p.nome);

    tabela.innerHTML += `
      <tr>
        <td>${p.nome}</td>
        <td>${p.categoria}</td>
        <td>R$ ${p.preco}</td>
        <td>${p.quantidade}</td>
        <td>
          <button onclick="editar(${indexReal})">Editar</button>
          <button onclick="excluir(${indexReal})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

// excluir
function excluir(index) {
  produtos.splice(index, 1);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  renderizarTabela(produtos);
}

// editar
function editar(index) {
  localStorage.setItem("editarIndex", index);
  window.location.href = "cadastro-produto.html";
}

// carregar categorias
function carregarCategorias() {
  let select = document.getElementById("filtroCategoria");
  let categorias = [...new Set(produtos.map(p => p.categoria))];

  categorias.forEach(cat => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}

// filtrar
function filtrar() {
  let busca = document.getElementById("busca").value.toLowerCase();
  let categoria = document.getElementById("filtroCategoria").value;

  let filtrados = produtos.filter(p => {
    let nomeOk = p.nome.toLowerCase().includes(busca);
    let categoriaOk = categoria === "" || p.categoria === categoria;

    return nomeOk && categoriaOk;
  });

  renderizarTabela(filtrados);
}

// inicialização
renderizarTabela(produtos);
carregarCategorias();