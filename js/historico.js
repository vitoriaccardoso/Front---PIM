
let msg = localStorage.getItem("msg");

if (msg) {
  document.getElementById("mensagem").innerText = msg;
  localStorage.removeItem("msg");
}

function ir(pagina) {
  window.location.href = pagina;
}

let historico = JSON.parse(localStorage.getItem("historico")) || [];

function carregarHistorico() {
  let tabela = document.getElementById("tabela-historico");
  tabela.innerHTML = "";

  historico.reverse().forEach(h => {
    tabela.innerHTML += `
      <tr>
        <td>${h.data}</td>
        <td>${h.produto}</td>
        <td>${h.tipo}</td>
        <td>${h.quantidade}</td>
      </tr>
    `;
  });
}

carregarHistorico();