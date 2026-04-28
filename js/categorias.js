function ir(pagina) {
  window.location.href = pagina;
}

let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

function salvarCategoria() {
  let nome = document.getElementById("nomeCategoria").value;

  if (!nome) {
    alert("Digite um nome");
    return;
  }

  categorias.push(nome);

  localStorage.setItem("categorias", JSON.stringify(categorias));

  document.getElementById("nomeCategoria").value = "";

  carregarCategorias();
}

function carregarCategorias() {
  let lista = document.getElementById("listaCategorias");
  lista.innerHTML = "";

  categorias.forEach((cat, index) => {
    lista.innerHTML += `
      <div class="categoria-item">
        <span>${cat}</span>
        <button onclick="excluirCategoria(${index})">Excluir</button>
      </div>
    `;
  });
}

function excluirCategoria(index) {
  if (confirm("Tem certeza que deseja excluir?")) {
    categorias.splice(index, 1);

    localStorage.setItem("categorias", JSON.stringify(categorias));

    carregarCategorias();
  }
}

carregarCategorias();