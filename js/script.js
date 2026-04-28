function login() {
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let erro = document.getElementById("erro");

  if (email === "" || senha === "") {
    erro.innerText = "Preencha todos os campos";
    return;
  }

  // Admin padrão
  if (email === "admin@email.com" && senha === "123456") {
    let admin = {
      nome: "Admin",
      email: "admin@email.com",
      senha: "123456",
      nivel: "Admin"
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(admin));
    window.location.href = "dashboard.html";
    return;
  }

  // Usuários cadastrados
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let usuarioEncontrado = usuarios.find(u =>
    u.email === email && u.senha === senha
  );

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    window.location.href = "dashboard.html";
  } else {
    erro.innerText = "Email ou senha inválidos";
  }
}