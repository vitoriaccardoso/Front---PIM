function ir(pagina) {
  window.location.href = pagina;
}

let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuarioLogado || 
   (usuarioLogado.nivel !== "Administrador" && usuarioLogado.nivel !== "Gerente")) {
  alert("Você não tem permissão para acessar esta tela");
  window.location.href = "dashboard.html";
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let indexEdicao = null;

function salvarUsuario() {
  let nome = document.getElementById("nomeUsuario").value;
  let email = document.getElementById("emailUsuario").value;
  let nivel = document.getElementById("nivelUsuario").value;
  let senha = document.getElementById("senhaUsuario").value;

  if (!nome || !email || !nivel || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  let usuario = { nome, email, nivel, senha };

  if (indexEdicao !== null) {
    usuarios[indexEdicao] = usuario;
    indexEdicao = null;
  } else {
    usuarios.push(usuario);
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  document.getElementById("nomeUsuario").value = "";
  document.getElementById("emailUsuario").value = "";
  document.getElementById("nivelUsuario").value = "";
  document.getElementById("senhaUsuario").value = "";

  carregarUsuarios();
}

function carregarUsuarios() {
  let tabela = document.getElementById("tabela-usuarios");
  tabela.innerHTML = "";

  usuarios.forEach((u, index) => {
    tabela.innerHTML += `
      <tr>
        <td>${u.nome}</td>
        <td>${u.email}</td>
        <td>${u.nivel}</td>
        <td>
          <button onclick="editarUsuario(${index})">Editar</button>
          <button onclick="excluirUsuario(${index})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

function editarUsuario(index) {
  let usuario = usuarios[index];

  document.getElementById("nomeUsuario").value = usuario.nome;
  document.getElementById("emailUsuario").value = usuario.email;
  document.getElementById("nivelUsuario").value = usuario.nivel;
  document.getElementById("senhaUsuario").value = usuario.senha;

  indexEdicao = index;
}

function excluirUsuario(index) {
  usuarios.splice(index, 1);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  carregarUsuarios();
}

carregarUsuarios();   