function trocarTema() {
      document.body.classList.toggle("inferno");
      const btn = document.querySelector(".theme-btn");

      if (document.body.classList.contains("inferno")) {
        btn.textContent = "☁️ Mudar para tema Céu";
      } else {
        btn.textContent = "🔥 Mudar para tema Inferno";
      }
    }