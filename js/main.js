// Configuración editable para cotizaciones por WhatsApp (formato país + número sin +)
const whatsappNumber = "56973392197";

const buildWhatsAppUrl = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const floatingWa = document.getElementById("floating-wa");
const waContact = document.getElementById("wa-contact");
const waSimulator = document.getElementById("wa-simulator");
const waPatenteHero = document.getElementById("wa-patente-hero");
const categoryButtons = document.querySelectorAll(".wa-category");
const quoteForm = document.getElementById("quote-form");
const formFeedback = document.getElementById("form-feedback");
const currentYear = document.getElementById("current-year");

const simulatorForm = document.getElementById("search-simulator");
const simFeedback = document.getElementById("sim-feedback");
const simResults = document.getElementById("sim-results");
const modeButtons = document.querySelectorAll(".mode-chip");

const topQuickSearch = document.getElementById("top-quick-search");
const topTabs = document.querySelectorAll(".top-tab");
const topFieldGroups = {
  neumatico: document.getElementById("top-fields-neumatico"),
  llanta: document.getElementById("top-fields-llanta"),
  patente: document.getElementById("top-fields-patente")
};
let activeTopMode = "neumatico";
const modeGroups = {
  vehiculo: document.getElementById("group-vehiculo"),
  neumatico: document.getElementById("group-neumatico"),
  llanta: document.getElementById("group-llanta"),
  patente: document.getElementById("group-patente")
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

const plateSamples = {
  ABCD12: { vehiculo: "Toyota Hilux 4x4", medida: "265/65R17", uso: "Trabajo / carga" },
  AB1234: { vehiculo: "Mitsubishi L200", medida: "265/70R16", uso: "Mixto" },
  CD4567: { vehiculo: "Nissan X-Trail", medida: "225/65R17", uso: "Ciudad" }
};

if (currentYear) currentYear.textContent = new Date().getFullYear();
if (floatingWa) floatingWa.href = buildWhatsAppUrl("Hola, necesito una cotización con Central Equipamientos.");
if (waContact) waContact.href = buildWhatsAppUrl("Hola, quiero cotizar neumáticos o llantas.");
if (waSimulator) waSimulator.href = buildWhatsAppUrl("Hola, quiero consultar una medida específica.");
if (waPatenteHero) waPatenteHero.href = buildWhatsAppUrl("Hola, quiero cotizar con mi patente.");

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
    formFeedback.textContent = "Solicitud recibida. Te responderemos a la brevedad con una cotización formal.";
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
    if (element) element.classList.toggle("hidden", groupMode !== mode);
  });

  simResults.innerHTML = "";
  simFeedback.textContent = "";
};

modeButtons.forEach((button) => button.addEventListener("click", () => switchMode(button.dataset.mode)));


const switchTopMode = (mode) => {
  activeTopMode = mode;
  topTabs.forEach((button) => {
    const selected = button.dataset.topMode === mode;
    button.classList.toggle("active", selected);
  });
  Object.entries(topFieldGroups).forEach(([k, el]) => {
    if (el) el.classList.toggle("hidden", k !== mode);
  });
};

topTabs.forEach((button) => button.addEventListener("click", () => switchTopMode(button.dataset.topMode)));

if (topQuickSearch) {
  topQuickSearch.addEventListener("submit", (event) => {
    event.preventDefault();

    if (activeTopMode === "neumatico") {
      switchMode("neumatico");
      document.getElementById("sim-width").value = document.getElementById("top-width").value.trim();
      document.getElementById("sim-profile").value = document.getElementById("top-profile").value.trim();
      document.getElementById("sim-diameter").value = document.getElementById("top-diameter").value.trim();
    }

    if (activeTopMode === "llanta") {
      switchMode("llanta");
      document.getElementById("sim-rim-diameter").value = document.getElementById("top-rim").value.trim();
      document.getElementById("sim-pcd").value = document.getElementById("top-pcd").value.trim();
      document.getElementById("sim-rim-width").value = document.getElementById("top-rim-width").value.trim();
    }

    if (activeTopMode === "patente") {
      switchMode("patente");
      document.getElementById("sim-plate").value = document.getElementById("top-plate").value.trim();
      document.getElementById("sim-plate-use").value = document.getElementById("top-plate-use").value;
    }

    const target = document.getElementById("simulador");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (simulatorForm) simulatorForm.requestSubmit();
  });
}

const renderResults = (items, mode) => {
  if (!simResults) return;
  if (!items.length) {
    simResults.innerHTML = "<h3>Sin coincidencias en demo</h3><p>Te recomendamos cotizar por WhatsApp para validar stock real y alternativas equivalentes.</p>";
    return;
  }

  if (mode === "neumatico") {
    simResults.innerHTML = `<h3>Coincidencias de neumáticos</h3><ul>${items
      .map((i) => `<li><strong>${i.medida}</strong> · ${i.tipo} · ${i.uso}</li>`)
      .join("")}</ul>`;
    return;
  }

  if (mode === "llanta") {
    simResults.innerHTML = `<h3>Coincidencias de llantas</h3><ul>${items
      .map((i) => `<li><strong>Aro ${i.aro}</strong> · PCD ${i.pcd} · ${i.ancho}" · ${i.material}</li>`)
      .join("")}</ul>`;
    return;
  }

  if (mode === "patente") {
    simResults.innerHTML = `<h3>Resultado por patente (referencial)</h3><ul>${items
      .map((i) => `<li><strong>${i.vehiculo}</strong> · Medida común: ${i.medida} · Uso: ${i.uso}</li>`)
      .join("")}</ul><p>Integración real con fuentes vehiculares de Chile: etapa futura.</p>`;
    return;
  }

  simResults.innerHTML = "<h3>Recomendación inicial por vehículo</h3><ul><li>Opciones sugeridas según configuración.</li><li>Alternativas HT/AT según uso.</li><li>Validación final con asesor técnico.</li></ul>";
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
        simFeedback.textContent = "Completa año, marca y modelo.";
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
        simFeedback.textContent = "Completa ancho, perfil y aro.";
        simFeedback.style.color = "#d90429";
        return;
      }
      const expected = `${width}/${profile}R${diameter}`.toLowerCase();
      matches = tireSamples.filter((item) => item.medida.toLowerCase() === expected && (!terrain || item.tipo === terrain));
      summary = `Neumático ${width}/${profile}R${diameter}${terrain ? ` ${terrain}` : ""}`;
    }

    if (activeMode === "llanta") {
      const rimDiameter = document.getElementById("sim-rim-diameter").value.trim();
      const pcd = document.getElementById("sim-pcd").value.trim().toLowerCase();
      const rimWidth = document.getElementById("sim-rim-width").value.trim();
      const material = document.getElementById("sim-material").value.trim();
      if (!rimDiameter || !pcd) {
        simFeedback.textContent = "Completa aro y PCD.";
        simFeedback.style.color = "#d90429";
        return;
      }
      matches = rimSamples.filter((item) => item.aro === rimDiameter && item.pcd.toLowerCase() === pcd && (!rimWidth || item.ancho === rimWidth) && (!material || item.material === material));
      summary = `Llanta Aro ${rimDiameter} · ${pcd}${rimWidth ? ` · ${rimWidth}"` : ""}${material ? ` · ${material}` : ""}`;
    }

    if (activeMode === "patente") {
      const plateRaw = document.getElementById("sim-plate").value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      const plateUse = document.getElementById("sim-plate-use").value.trim();
      if (!plateRaw || plateRaw.length < 6) {
        simFeedback.textContent = "Ingresa una patente válida (ej: ABCD12).";
        simFeedback.style.color = "#d90429";
        return;
      }
      const plateData = plateSamples[plateRaw] || { vehiculo: "Vehículo no identificado en demo", medida: "Por confirmar", uso: plateUse || "No indicado" };
      matches = [plateData];
      summary = `Patente ${plateRaw}${plateUse ? ` · uso ${plateUse}` : ""}`;
    }

    simFeedback.textContent = `${summary}. Resultado demo generado.`;
    simFeedback.style.color = "#0f5132";

    if (waSimulator) {
      waSimulator.href = buildWhatsAppUrl(`Hola, quiero cotizar ${summary}. ¿Qué opciones tienen disponibles?`);
    }

    renderResults(matches, activeMode);
  });
}
