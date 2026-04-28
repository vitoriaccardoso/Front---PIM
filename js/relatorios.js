function ir(pagina) {
  window.location.href = pagina;
}

// pega histórico do localStorage
let historico = JSON.parse(localStorage.getItem("historico")) || [];

// função de filtro
function filtrarRelatorio() {
  let inicio = document.getElementById("dataInicio").value;
  let fim = document.getElementById("dataFim").value;

  let tabela = document.getElementById("tabela-relatorio");
  tabela.innerHTML = "";

  let filtrados = historico.filter(h => {
    // transforma "28/04/2026, 21:30:10" em "2026-04-28"
    let dataTexto = h.data.split(",")[0];
    let partes = dataTexto.split("/");
    let dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;

    return (!inicio || dataFormatada >= inicio) &&
           (!fim || dataFormatada <= fim);
  });

  if (filtrados.length === 0) {
    tabela.innerHTML = "<tr><td colspan='4'>Nenhum resultado encontrado</td></tr>";
    return;
  }

  filtrados.forEach(h => {
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