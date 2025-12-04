function trocarTema() {
      document.body.classList.toggle("inferno");
      const btn = document.querySelector(".theme-btn");

      if (document.body.classList.contains("inferno")) {
        btn.textContent = "☁️ Mudar para tema Céu";
      } else {
        btn.textContent = "🔥 Mudar para tema Inferno";
      }
    }

// === Configuração da URL base ===
const url_base = "http://localhost:3000";   

// === Script do Cadastro ===
const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
  formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value
    };

    const resposta = await fetch(`${url_base}/cadastrar`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    alert(resultado.mensagem || "Cadastro realizado!");
  });
}

// === Script do login ===
const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      email: document.getElementById("emailLogin").value,
      senha: document.getElementById("senhaLogin").value
    };

    const resposta = await fetch(`${url_base}/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (resultado.ok) {
      alert("Login realizado com sucesso!");
      window.location.href = "home.html";
    } else {
      alert(resultado.mensagem || "Email ou senha incorretos.");
    }
  });
}
