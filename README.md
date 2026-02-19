# Central Equipamientos - Sitio Corporativo

Sitio web corporativo en español (Chile) para **Central Equipamientos**, orientado a la venta de neumáticos y llantas, además de servicios de montaje, balanceo y coordinación de instalación.

## Estructura del proyecto

- `index.html`: estructura semántica del sitio.
- `css/styles.css`: estilos visuales, grilla responsive y paleta corporativa.
- `js/main.js`: interacciones, enlaces WhatsApp configurables, buscador demo y validación de formulario.
- `assets/hero-camioneta.svg`: imagen local del hero para evitar fallas de carga externas.
- `assets/`: carpeta reservada para imágenes/logotipos futuras.
- `.github/workflows/deploy-pages.yml`: despliegue automático en GitHub Pages.

## Características incluidas

- Diseño sobrio, moderno y tecnológico con enfoque automotriz.
- Hero con imagen local + panel flotante de “Cotiza en 3 pasos”.
- Barra de búsqueda rápida bajo el menú superior (tipo neumático/llanta/patente) para cotizar con menos clics.
- **Buscador rápido en 4 modos**:
  - Por vehículo.
  - Por neumático.
  - Por llanta.
  - Por patente chilena (demo, preparado para integración real futura).
- Flujo de pocos clics orientado a conversión por WhatsApp.
- Secciones de productos, servicios, soluciones para empresas, garantía, sobre nosotros y contacto.
- SEO básico: title, description y etiquetas Open Graph.

## Configuración rápida

1. Abrir `index.html` en navegador.
2. Editar el número de WhatsApp en `js/main.js`:

```js
const whatsappNumber = "56973392197";
```

## Publicar en GitHub Pages (listo para usar)

1. Sube estos cambios a la rama `main`.
2. En GitHub, entra a **Settings → Pages**.
3. En **Source**, selecciona **GitHub Actions**.
4. Al hacer push a `main`, el workflow publicará el sitio.

## Notas

- El modo patente es una simulación inicial para luego integrar fuentes reales de Chile.
- El formulario está preparado para integración con backend/API de cotizaciones.
