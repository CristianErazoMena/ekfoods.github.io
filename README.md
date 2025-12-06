EK FOODS — Sitio demo

Instrucciones rápidas para adaptar las imágenes que nos pasaste:

1) Copia las imágenes que adjuntaste en la conversación a la carpeta `src/assets/` dentro del proyecto.
   - `logo.png` → logo de la empresa (opcional)
   - `harina-1.jpg`, `harina-2.jpg`, `leche-1.jpg`, `leche-2.jpg`, etc. — pon nombres que te sirvan.

   Recomendación específica para el logo que acabas de subir:
   - Guarda el archivo del logo en `src/assets/` con el nombre `ek-logo.png`.
   - El sistema intentará usar `/src/assets/ek-logo.png` automáticamente y, si no existe, usará el SVG placeholder.

2) Si quieres usar imágenes locales en vez de las URLs por defecto, abre `src/assets/images.js` y reemplaza las URLs por import local, por ejemplo:

   // Ejemplo
   // import harina1 from './harina-1.jpg'
   // export const productImages = { harina: harina1, ... }

3) Ejecuta:
```
cd 'C:\Users\erazo\OneDrive\Documentos\EK-FOODS\ek-foods-web'
npm install
npm run dev
```

4) Visita `http://localhost:5173`.

Notas:
- El botón de cada producto abre WhatsApp al número `+51 999 933 689` con un mensaje prellenado (el enlace usa formato internacional sin signos ni espacios: `51999933689`).
- No se han implementado compras; solo catálogo visual.
