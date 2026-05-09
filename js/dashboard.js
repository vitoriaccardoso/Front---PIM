const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

/* ================= MAIS VENDIDOS ================= */

let vendidos = {};

vendas.forEach(venda => {
  if (!vendidos[venda.produto]) {
    vendidos[venda.produto] = 0;
  }

  vendidos[venda.produto] += Number(venda.quantidade);
});

const nomesProdutos = Object.keys(vendidos);
const qtdVendidos = Object.values(vendidos);

const ctx2 = document.getElementById("graficoMaisVendidos");

new Chart(ctx2, {
  type: "bar",

  data: {
    labels: nomesProdutos,
    datasets: [{
      data: qtdVendidos,
      backgroundColor: "#0f5b7f"
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

/* ================= ENTRADA X SAÍDA REAL ================= */

const meses = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const entradas = Array(12).fill(0);
const saidas = Array(12).fill(0);

movimentacoes.forEach(mov => {
  const partesData = mov.data.split("/");
  const mes = Number(partesData[1]) - 1;

  if (mov.tipo === "entrada") {
    entradas[mes] += Number(mov.quantidade);
  }

  if (mov.tipo === "saida") {
    saidas[mes] += Number(mov.quantidade);
  }
});

const ctx = document.getElementById("graficoEntradaSaida");

const graficoEntradaSaida = new Chart(ctx, {
  type: "line",

  data: {
    labels: meses,

    datasets: [
      {
        label: "Entrada",
        data: entradas,
        borderColor: "#22c55e",
        backgroundColor: "transparent",
        tension: 0.4
      },

      {
        label: "Saída",
        data: saidas,
        borderColor: "#ef4444",
        backgroundColor: "transparent",
        tension: 0.4
      }
    ]
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

/* ================= FILTRO ================= */

function filtrarDashboard() {
  const mes = document.getElementById("filtroMes").value;

  if (mes === "") {
    graficoEntradaSaida.data.labels = meses;
    graficoEntradaSaida.data.datasets[0].data = entradas;
    graficoEntradaSaida.data.datasets[1].data = saidas;
  } else {
    const index = meses.indexOf(mes);

    graficoEntradaSaida.data.labels = [mes];

    graficoEntradaSaida.data.datasets[0].data = [
      entradas[index]
    ];

    graficoEntradaSaida.data.datasets[1].data = [
      saidas[index]
    ];
  }

  graficoEntradaSaida.update();
}