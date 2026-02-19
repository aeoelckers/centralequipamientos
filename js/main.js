// Configuración editable para cotizaciones por WhatsApp (formato país + número sin +)
const whatsappNumber = "56973392197";

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const floatingWa = document.getElementById("floating-wa");
const waContact = document.getElementById("wa-contact");
const waSimulator = document.getElementById("wa-simulator");
const categoryButtons = document.querySelectorAll(".wa-category");
const quoteForm = document.getElementById("quote-form");
const formFeedback = document.getElementById("form-feedback");
const currentYear = document.getElementById("current-year");

const simulatorForm = document.getElementById("search-simulator");
const simFeedback = document.getElementById("sim-feedback");
const simResults = document.getElementById("sim-results");

const tireSamples = [
  { medida: "265/70R16", tipo: "AT", uso: "Camioneta / 4x4" },
  { medida: "265/65R17", tipo: "HT", uso: "SUV" },
  { medida: "245/70R16", tipo: "AT", uso: "Camioneta" },
  { medida: "205/55R16", tipo: "HT", uso: "Automóvil" }
];

const rimSamples = [
  { aro: "15", pcd: "5x139", ancho: "8", material: "Aleación" },
  { aro: "16", pcd: "6x139.7", ancho: "8", material: "Acero" },
  { aro: "17", pcd: "6x139.7", ancho: "8.5", material: "Aleación" },
  { aro: "18", pcd: "5x114.3", ancho: "8", material: "Aleación" }
];

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (floatingWa) {
  floatingWa.href = buildWhatsAppUrl("Hola, necesito una cotización con Central Equipamientos.");
}

if (waContact) {
  waContact.href = buildWhatsAppUrl("Hola, quiero cotizar neumáticos o llantas.");
}

if (waSimulator) {
  waSimulator.href = buildWhatsAppUrl("Hola, quiero consultar una medida específica.");
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

const renderResults = (items, type) => {
  if (!simResults) return;

  if (!items.length) {
    simResults.innerHTML =
      "<h3>Sin coincidencias en demo</h3><p>No encontramos resultados exactos en la muestra. Te recomendamos cotizar por WhatsApp para validar stock real.</p>";
    return;
  }

  if (type === "neumatico") {
    simResults.innerHTML = `
      <h3>Coincidencias referenciales de neumáticos</h3>
      <ul>
        ${items
          .map(
            (item) =>
              `<li><strong>${item.medida}</strong> · ${item.tipo} · ${item.uso}</li>`
          )
          .join("")}
      </ul>
    `;
    return;
  }

  simResults.innerHTML = `
    <h3>Coincidencias referenciales de llantas</h3>
    <ul>
      ${items
        .map(
          (item) =>
            `<li><strong>Aro ${item.aro}</strong> · PCD ${item.pcd} · ${item.ancho}\" · ${item.material}</li>`
        )
        .join("")}
    </ul>
  `;
};

if (simulatorForm) {
  simulatorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const type = document.getElementById("sim-type").value.trim().toLowerCase();
    const width = document.getElementById("sim-width").value.trim();
    const profile = document.getElementById("sim-profile").value.trim();
    const diameter = document.getElementById("sim-diameter").value.trim();
    const pcd = document.getElementById("sim-pcd").value.trim().toLowerCase();
    const rimWidth = document.getElementById("sim-rim-width").value.trim();

    if (!type || !width || !diameter) {
      simFeedback.textContent = "Completa tipo, ancho/aro y diámetro para buscar.";
      simFeedback.style.color = "#d90429";
      return;
    }

    let matches = [];
    let summary = "";

    if (type === "neumatico") {
      const expected = `${width}/${profile}R${diameter}`.toLowerCase();
      matches = tireSamples.filter((item) => {
        const normalized = item.medida.toLowerCase();
        if (profile) {
          return normalized === expected;
        }
        return normalized.includes(`${width.toLowerCase()}/`) && normalized.endsWith(`r${diameter.toLowerCase()}`);
      });
      summary = `Neumático buscado: ${profile ? `${width}/${profile}R${diameter}` : `${width}/_R${diameter}`}`;
    }

    if (type === "llanta") {
      matches = rimSamples.filter((item) => {
        const aroOk = item.aro === width || item.aro === diameter;
        const pcdOk = pcd ? item.pcd.toLowerCase() === pcd : true;
        const widthOk = rimWidth ? item.ancho === rimWidth : true;
        return aroOk && pcdOk && widthOk;
      });
      summary = `Llanta buscada: Aro ${width || diameter}${pcd ? ` · ${pcd}` : ""}${
        rimWidth ? ` · ${rimWidth}\"` : ""
      }`;
    }

    simFeedback.textContent = `${summary}. Resultados demo generados correctamente.`;
    simFeedback.style.color = "#0f5132";

    if (waSimulator) {
      waSimulator.href = buildWhatsAppUrl(
        `Hola, quiero cotizar ${summary}. ¿Qué opciones disponibles tienen?`
      );
    }

    renderResults(matches, type);
  });
}
