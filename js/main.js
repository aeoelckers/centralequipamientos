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
const modeButtons = document.querySelectorAll(".mode-chip");
const modeGroups = {
  vehiculo: document.getElementById("group-vehiculo"),
  neumatico: document.getElementById("group-neumatico"),
  llanta: document.getElementById("group-llanta")
};

let activeMode = "vehiculo";

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

const switchMode = (mode) => {
  activeMode = mode;
  modeButtons.forEach((button) => {
    const selected = button.dataset.mode === mode;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", selected ? "true" : "false");
  });

  Object.entries(modeGroups).forEach(([groupMode, element]) => {
    if (!element) return;
    element.classList.toggle("hidden", groupMode !== mode);
  });

  simResults.innerHTML = "";
  simFeedback.textContent = "";
};

modeButtons.forEach((button) => {
  button.addEventListener("click", () => switchMode(button.dataset.mode));
});

const renderResults = (items, mode) => {
  if (!simResults) return;

  if (!items.length) {
    simResults.innerHTML =
      "<h3>Sin coincidencias en demo</h3><p>No encontramos resultados exactos en la muestra. Te recomendamos cotizar por WhatsApp para validar stock real y alternativas equivalentes.</p>";
    return;
  }

  if (mode === "neumatico") {
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

  if (mode === "llanta") {
    simResults.innerHTML = `
      <h3>Coincidencias referenciales de llantas</h3>
      <ul>
        ${items
          .map(
            (item) =>
              `<li><strong>Aro ${item.aro}</strong> · PCD ${item.pcd} · ${item.ancho}" · ${item.material}</li>`
          )
          .join("")}
      </ul>
    `;
    return;
  }

  simResults.innerHTML = `
    <h3>Recomendación inicial por vehículo</h3>
    <ul>
      <li>Opciones sugeridas de neumáticos para tu configuración.</li>
      <li>Alternativas HT/AT según uso urbano o mixto.</li>
      <li>Validación final con asesor técnico antes de compra.</li>
    </ul>
  `;
};

if (simulatorForm) {
  simulatorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let matches = [];
    let summary = "";

    if (activeMode === "vehiculo") {
      const year = document.getElementById("sim-year").value.trim();
      const brand = document.getElementById("sim-brand").value.trim();
      const model = document.getElementById("sim-model").value.trim();
      const trim = document.getElementById("sim-trim").value.trim();

      if (!year || !brand || !model) {
        simFeedback.textContent = "Completa año, marca y modelo para buscar por vehículo.";
        simFeedback.style.color = "#d90429";
        return;
      }

      summary = `Vehículo ${year} ${brand} ${model}${trim ? ` ${trim}` : ""}`;
      matches = [{ ok: true }];
    }

    if (activeMode === "neumatico") {
      const width = document.getElementById("sim-width").value.trim();
      const profile = document.getElementById("sim-profile").value.trim();
      const diameter = document.getElementById("sim-diameter").value.trim();
      const terrain = document.getElementById("sim-terrain").value.trim().toUpperCase();

      if (!width || !profile || !diameter) {
        simFeedback.textContent = "Completa ancho, perfil y aro para buscar neumáticos.";
        simFeedback.style.color = "#d90429";
        return;
      }

      const expected = `${width}/${profile}R${diameter}`.toLowerCase();
      matches = tireSamples.filter((item) => {
        const tireOk = item.medida.toLowerCase() === expected;
        const terrainOk = terrain ? item.tipo === terrain : true;
        return tireOk && terrainOk;
      });

      summary = `Neumático ${width}/${profile}R${diameter}${terrain ? ` ${terrain}` : ""}`;
    }

    if (activeMode === "llanta") {
      const rimDiameter = document.getElementById("sim-rim-diameter").value.trim();
      const pcd = document.getElementById("sim-pcd").value.trim().toLowerCase();
      const rimWidth = document.getElementById("sim-rim-width").value.trim();
      const material = document.getElementById("sim-material").value.trim();

      if (!rimDiameter || !pcd) {
        simFeedback.textContent = "Completa aro y PCD para buscar llantas.";
        simFeedback.style.color = "#d90429";
        return;
      }

      matches = rimSamples.filter((item) => {
        const aroOk = item.aro === rimDiameter;
        const pcdOk = item.pcd.toLowerCase() === pcd;
        const widthOk = rimWidth ? item.ancho === rimWidth : true;
        const materialOk = material ? item.material === material : true;
        return aroOk && pcdOk && widthOk && materialOk;
      });

      summary = `Llanta Aro ${rimDiameter} · ${pcd}${rimWidth ? ` · ${rimWidth}"` : ""}${
        material ? ` · ${material}` : ""
      }`;
    }

    simFeedback.textContent = `${summary}. Resultado demo generado.`;
    simFeedback.style.color = "#0f5132";

    if (waSimulator) {
      waSimulator.href = buildWhatsAppUrl(
        `Hola, quiero cotizar ${summary}. ¿Qué opciones disponibles tienen?`
      );
    }

    renderResults(matches, activeMode);
  });
}
