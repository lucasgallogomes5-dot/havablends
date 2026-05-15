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

  // 1. GERAR DATA, HORA E PROTOCOLO INVENCÍVEL
  const agora = new Date();
  formData.data_envio = agora.toLocaleDateString('pt-BR'); // Ex: 15/05/2026
  formData.hora_envio = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Ex: 15:30

  // Formata o protocolo como AAAAMMDD-HHMM (Ex: 20260515-1530)
  const dataSimples = agora.toISOString().slice(0, 10).replace(/-/g, '');
  const horaSimples = agora.getHours().toString().padStart(2, '0') + agora.getMinutes().toString().padStart(2, '0');
  formData.protocolo = `${dataSimples}-${horaSimples}`;

  // CORREÇÃO CRÍTICA: Transforma os arrays (checkboxes) em texto separado por vírgula
  // Sem o .join(", "), o EmailJS não consegue ler os dados múltiplos
  formData.Historico = data.getAll("Historico[]").join(", ");
  formData.Objetivo = data.getAll("Objetivo[]").join(", ");
  formData.Aromas = data.getAll("Aromas[]").join(", ");

  // Nota: Se você já adicionou os novos campos de Pele e Cabelo no HTML, 
  // descomente as duas linhas abaixo para que eles também funcionem:
  // formData.Tipo_de_Pele = data.getAll("Tipo_de_Pele[]").join(", ");
  // formData.Cabelo = data.getAll("Cabelo[]").join(", ");

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