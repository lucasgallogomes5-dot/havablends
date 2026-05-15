
// ENVIO DE FORMULÁRIO POR EMAIL
emailjs.init({
  publicKey: "MEaqW9yBgFJ5N4UD3",
});

document.getElementById("form-anamnese").addEventListener("submit", function (event) {
  event.preventDefault(); // Impede a página de recarregar e jogar na URL

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.textContent = "Enviando...";
  submitBtn.disabled = true;

  // Captura todos os dados do formulário
  const data = new FormData(event.target);
  const formData = Object.fromEntries(data.entries());

  // CORREÇÃO CRÍTICA: Transforma os arrays (checkboxes) em texto separado por vírgula
  // Sem o .join(", "), o EmailJS não consegue ler os dados múltiplos
  formData.Historico = data.getAll("Historico[]").join(", ");
  formData.Objetivo = data.getAll("Objetivo[]").join(", ");
  formData.Aromas = data.getAll("Aromas[]").join(", ");

  const serviceID = "service_1vqvh9g";
  const templateID = "template_en45sgh";

  emailjs.send(serviceID, templateID, formData)
    .then(() => {
      Toastify({
        text: "Perfil enviado com SUCESSO!",
        duration: 3000,
        style: {
          background: "#28a745",
          color: "#f4f4f4"
        }
      }).showToast();

      // Limpa o formulário após o sucesso
      document.getElementById("form-anamnese").reset();
    })
    .catch((error) => {
      console.error("Erro do EmailJS:", error);
      Toastify({
        text: "ERRO ao enviar! Tente novamente.",
        duration: 3000,
        style: {
          background: "#dc3545",
          color: "#f4f4f4"
        }
      }).showToast();
    })
    .finally(() => {
      submitBtn.textContent = "ENVIAR PERFIL SENSORIAL";
      submitBtn.disabled = false;
    });
    
});

//TOGGLE MOBILE
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');
const body = document.body;

// Abre/Fecha o menu ao clicar no hambúrguer
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navLinks.classList.toggle('active');

  // Trava/destrava o scroll da página
  body.classList.toggle('no-scroll');
});

// Fecha o menu automaticamente quando clica em algum link
navItems.forEach(item => {
  item.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
  });
});
// Opcional: Fecha o menu e destrava o scroll ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.classList.remove('no-scroll');
  });
});