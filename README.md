# Central Equipamientos - Sitio Corporativo

Sitio web corporativo en español (Chile) para **Central Equipamientos**, orientado a la venta de neumáticos y llantas, además de servicios de montaje, balanceo y coordinación de instalación.

## Estructura del proyecto

- `index.html`: estructura semántica del sitio.
- `css/styles.css`: estilos visuales, grilla responsive y paleta corporativa.
- `js/main.js`: interacciones básicas, enlaces WhatsApp configurables y validación de formulario.
- `assets/`: carpeta reservada para imágenes/logotipos locales futuras.
- `.github/workflows/deploy-pages.yml`: despliegue automático en GitHub Pages.

## Características incluidas

- Diseño sobrio y profesional con estética automotriz.
- Hero principal con llamados a la acción.
- Secciones de productos, servicios, soluciones para empresas, garantía, sobre nosotros y contacto.
- Formulario de cotización con campos solicitados.
- Botón flotante de WhatsApp global.
- SEO básico: title, description y etiquetas Open Graph.
- Arquitectura preparada para escalar a:
  - Catálogo dinámico vía JSON.
  - Integración e-commerce.
  - Módulo dedicado para "Central Equipamientos Empresas".
  - Nuevas líneas de equipamiento automotriz.

## Configuración rápida

1. Abrir `index.html` en navegador.
2. Editar el número de WhatsApp en `js/main.js`:

```js
const whatsappNumber = "56912345678";
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
- El formulario está preparado para integración con backend/API de cotizaciones.
