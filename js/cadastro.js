function cadastrarEmpresa() {
  const empresa = document.getElementById("empresa").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  const erro = document.getElementById("erro");

  erro.innerText = "";

  if (!empresa || !email || !senha || !confirmarSenha) {
    erro.innerText = "Preencha todos os campos.";
    return;
  }

  if (senha !== confirmarSenha) {
    erro.innerText = "As senhas não coincidem.";
    return;
  }

  const dadosEmpresa = {
    empresa,
    email,
    senha
  };

  localStorage.setItem("empresaCadastrada", JSON.stringify(dadosEmpresa));
  localStorage.setItem("nomeComercio", empresa);

  alert("Empresa cadastrada com sucesso!");
  window.location.href = "login.html";
}
/*pronto*/