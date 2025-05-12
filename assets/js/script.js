// ANIMAÇÕES
document.addEventListener("DOMContentLoaded", function () {
  const textoAnimado = document.getElementById("texto-animado");
  const textos = [
    "sites profissionais",
    "aplicações mobile",
    "marketing digital",
    "hosting de sites  ",
  ];
  let index = 0;
  const tempoTroca = 2000; // Tempo em milissegundos para trocar o texto

  function trocarTexto() {
    textoAnimado.classList.add("fade-out");
    textoAnimado.classList.add("animating");

    setTimeout(() => {
      textoAnimado.textContent = textos[index];
      textoAnimado.classList.remove("fade-out");
      setTimeout(() => {
        textoAnimado.classList.remove("animating");
      }, 500); // Tempo da transição da faixa azul (deve corresponder ao CSS)
      index = (index + 1) % textos.length;
    }, 500); // Tempo do fade-out do texto (deve corresponder ao CSS)
  }

  // Inicia a animação do texto principal
  setInterval(trocarTexto, tempoTroca);
});

// FORMULÁRIO DE CONTATO
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector(".submit-btn");
      if (!submitBtn) return;

      // Estado de carregamento
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        'Enviando <span class="dots"><span>.</span><span>.</span><span>.</span></span>';

      // Estilo para animação dos pontos de carregamento
      const style = document.createElement("style");
      style.innerHTML = `
                .dots span {
                    animation: blink 1s infinite;
                    opacity: 0;
                }
                .dots span:nth-child(1) { animation-delay: 0s; }
                .dots span:nth-child(2) { animation-delay: 0.2s; }
                .dots span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes blink {
                    50% { opacity: 1; }
                }
            `;
      document.head.appendChild(style);

      try {
        // Tenta enviar via FormSubmit
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          window.location.href = form.querySelector('[name="_next"]').value;
        } else {
          throw new Error("Erro no FormSubmit");
        }
      } catch (error) {
        console.error("Erro:", error);
        // Fallback para mailto
        const mailto = `mailto:contato@emcomp.com.br?subject=${encodeURIComponent(
          form.subject.value
        )}&body=${encodeURIComponent(
          `Nome: ${form.name.value}\nEmail: ${form.email.value}\n\nMensagem:\n${form.message.value}`
        )}`;
        window.location.href = mailto;

        // Redireciona após 2 segundos (mesmo no fallback)
        setTimeout(() => {
          window.location.href = "obrigado.html";
        }, 2000);
      } finally {
        // Remove o estado de carregamento (em caso de sucesso ou falha)
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Enviar Mensagem";
        const dotsStyle = document.querySelector(
          'style[data-animation="dots"]'
        );
        if (dotsStyle) {
          dotsStyle.remove();
        }
      }
    });
  }
});
