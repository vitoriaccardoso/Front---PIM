const nomeComercio = localStorage.getItem("nomeComercio");

if (nomeComercio && document.getElementById("nomeComercio")) {
  document.getElementById("nomeComercio").innerText = nomeComercio;
}

const perfilUsuario = localStorage.getItem("perfilUsuario");

function aplicarPermissoes() {

  if (!perfilUsuario) {
    window.location.href = "login-usuario.html";
    return;
  }

  if (perfilUsuario === "funcionario") {

    document.querySelectorAll(".somente-admin-gerente").forEach(item => {
      item.style.display = "none";
    });

    document.querySelectorAll(".somente-admin").forEach(item => {
      item.style.display = "none";
    });
  }

  if (perfilUsuario === "gerente") {

    document.querySelectorAll(".somente-admin").forEach(item => {
      item.style.display = "none";
    });
  }
}

function bloquearPagina() {

  const paginaAtual = window.location.pathname.split("/").pop();

  if (perfilUsuario === "funcionario") {

    const paginasBloqueadas = [
      "dashboard.html",
      "relatorios.html",
      "cadastro-produto.html"
    ];

    if (paginasBloqueadas.includes(paginaAtual)) {
      window.location.href = "estoque.html";
    }
  }
}

aplicarPermissoes();
bloquearPagina();
/*pronto*/