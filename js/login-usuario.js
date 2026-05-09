 function loginUsuario() {

  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senhaUsuario").value.trim();
  const perfil = document.getElementById("perfil").value;

  const erro = document.getElementById("erro");

  erro.innerText = "";

  if (!usuario || !senha || !perfil) {
    erro.innerText = "Preencha todos os campos.";
    return;
  }

  // LOGIN FAKE TEMPORÁRIO

  if (senha !== "123") {
    erro.innerText = "Senha inválida.";
    return;
  }

  localStorage.setItem("usuarioNome", usuario);
  localStorage.setItem("perfilUsuario", perfil);

  window.location.href = "dashboard.html";
}
/*pronto*/