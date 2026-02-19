# Central Equipamientos - Sitio Corporativo

Sitio web corporativo en español (Chile) para **Central Equipamientos**, orientado a la venta de neumáticos y llantas, además de servicios de montaje, balanceo y coordinación de instalación.

## Estructura del proyecto

- `index.html`: estructura semántica del sitio.
- `css/styles.css`: estilos visuales, grilla responsive y paleta corporativa.
- `js/main.js`: interacciones, enlaces WhatsApp configurables, buscador demo y validación de formulario.
- `assets/`: carpeta reservada para imágenes/logotipos locales futuras.
- `.github/workflows/deploy-pages.yml`: despliegue automático en GitHub Pages.

## Características incluidas

- Diseño sobrio, moderno y tecnológico con enfoque automotriz.
- Hero principal con llamados a la acción.
- **Buscador rápido en 3 modos**:
  - Por vehículo (año, marca, modelo, versión).
  - Por neumático (ancho, perfil, aro y uso AT/MT/HT).
  - Por llanta (aro, PCD, ancho y material).
- Resultados demo preparados para conectar inventario real futuro.
- Secciones de productos, servicios, soluciones para empresas, garantía, sobre nosotros y contacto.
- Formulario de cotización con campos solicitados.
- Botón flotante de WhatsApp global.
- SEO básico: title, description y etiquetas Open Graph.

## Configuración rápida

1. Abrir `index.html` en navegador.
2. Editar el número de WhatsApp en `js/main.js`:

```js
const whatsappNumber = "56973392197";
```

## Publicar en GitHub Pages (listo para usar)

Este repositorio quedó preparado para publicar automáticamente en GitHub Pages.

1. Sube estos cambios a la rama `main`.
2. En GitHub, entra a **Settings → Pages**.
3. En **Source**, selecciona **GitHub Actions**.
4. Al hacer push a `main`, el workflow `Deploy static site to GitHub Pages` publicará el sitio.

> URL final esperada: `https://<tu-usuario>.github.io/<tu-repo>/`

## Notas

- Las imágenes están referenciadas desde Unsplash para prototipado.
- El buscador usa una base demo en JS para futura conexión a inventario real.
- El formulario está preparado para integración con backend/API de cotizaciones.
