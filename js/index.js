function login() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const erro = document.getElementById("erro");

  erro.innerText = "";

  const empresa = JSON.parse(localStorage.getItem("empresaCadastrada"));

  if (!empresa) {
    erro.innerText = "Nenhuma empresa cadastrada.";
    return;
  }

  if (email === empresa.email && senha === empresa.senha) {
    localStorage.setItem("empresaLogada", "true");
    window.location.href = "login-usuario.html";
  } else {
    erro.innerText = "E-mail ou senha inválidos.";
  }
}