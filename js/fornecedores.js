function ir(pagina) {
  window.location.href = pagina;
}

let fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

function salvarFornecedor() {
  let nome = document.getElementById("nomeFornecedor").value;
  let contato = document.getElementById("contatoFornecedor").value;

  if (!nome || !contato) {
    alert("Preencha todos os campos");
    return;
  }

  fornecedores.push({ nome, contato });

  localStorage.setItem("fornecedores", JSON.stringify(fornecedores));

  document.getElementById("nomeFornecedor").value = "";
  document.getElementById("contatoFornecedor").value = "";

  carregarFornecedores();
}

function carregarFornecedores() {
  let tabela = document.getElementById("tabela-fornecedores");
  tabela.innerHTML = "";

  fornecedores.forEach(f => {
    tabela.innerHTML += `
      <tr>
        <td>${f.nome}</td>
        <td>${f.contato}</td>
      </tr>
    `;
  });
}

carregarFornecedores();