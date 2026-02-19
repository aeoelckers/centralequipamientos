// Configuración editable para cotizaciones por WhatsApp (formato país + número sin +)
const whatsappNumber = "56912345678";

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const floatingWa = document.getElementById("floating-wa");
const waContact = document.getElementById("wa-contact");
const categoryButtons = document.querySelectorAll(".wa-category");
const quoteForm = document.getElementById("quote-form");
const formFeedback = document.getElementById("form-feedback");
const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (floatingWa) {
  floatingWa.href = buildWhatsAppUrl("Hola, necesito una cotización con Central Equipamientos.");
}

if (waContact) {
  waContact.href = buildWhatsAppUrl("Hola, quiero cotizar neumáticos o llantas.");
}

categoryButtons.forEach((button) => {
  const category = button.dataset.category || "Productos";
  button.href = buildWhatsAppUrl(`Hola, quiero cotizar ${category} con Central Equipamientos.`);
});

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!quoteForm.checkValidity()) {
      formFeedback.textContent = "Por favor completa todos los campos obligatorios antes de enviar.";
      formFeedback.style.color = "#d90429";
      return;
    }

    formFeedback.textContent =
      "Solicitud recibida. Te responderemos a la brevedad con una cotización formal.";
    formFeedback.style.color = "#0f5132";
    quoteForm.reset();
  });
}
