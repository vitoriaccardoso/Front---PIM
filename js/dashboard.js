let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let historico = JSON.parse(localStorage.getItem("historico")) || [];

// TOTAL EM ESTOQUE
let totalItens = produtos.reduce((total, p) => total + Number(p.quantidade), 0);

document.getElementById("total").innerText =
  "Total em estoque: " + totalItens;

// ESTOQUE BAIXO
let baixo = produtos.filter(p => p.quantidade < 10);

document.getElementById("baixo").innerText =
  "Estoque Baixo: " + baixo.length;

// PRODUTO MAIS MOVIMENTADO
let contagem = {};

historico.forEach(h => {
  contagem[h.produto] = (contagem[h.produto] || 0) + h.quantidade;
});

let mais = "";
let maior = 0;

for (let produto in contagem) {
  if (contagem[produto] > maior) {
    maior = contagem[produto];
    mais = produto;
  }
}

document.getElementById("mais").innerText =
  mais ? "Mais movimentado: " + mais : "Sem movimentações";

// DADOS DOS PRODUTOS
let nomes = produtos.map(p => p.nome);
let quantidades = produtos.map(p => p.quantidade);

// 🔥 CORES (vermelho = baixo / verde = ok)
let cores = quantidades.map(q => 
  q < 10 ? "#e53935" : "#4caf50"
);

// CRIAR GRÁFICO
let ctx = document.getElementById("graficoProdutos").getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: nomes,
    datasets: [{
      label: "", // 🔥 removido
      data: quantidades,
      backgroundColor: cores,
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false 
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});