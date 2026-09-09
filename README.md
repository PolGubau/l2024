# L 2024 — Recorridos por el metro de Barcelona

Aplicación web que visualiza recorridos a pie por las líneas de metro de Barcelona. Incluye un mapa interactivo, información de cada línea y la contribución de cada participante.

## Tecnologías

- React 18 y TypeScript
- Vite
- MapLibre y MapComponents
- Tailwind CSS y pol-ui

## Requisitos

- Node.js 20 o posterior
- pnpm mediante Corepack

## Desarrollo

Activa Corepack e instala exactamente las versiones bloqueadas:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

La aplicación estará disponible en la URL que muestre Vite, normalmente `http://localhost:5173`.

## Calidad y compilación

```bash
pnpm lint
pnpm build
```

`pnpm build` ejecuta primero la comprobación de tipos y después genera los archivos estáticos en `dist/`.

## Datos y recursos

- Los trazados y estaciones se encuentran en `src/data/geojson/`.
- La información de líneas y participantes está en `src/data/`.
- Las imágenes, iconos y estilo de mapa se sirven desde `public/`.

## Despliegue

Vercel está configurado para redirigir rutas de la SPA a `index.html`. Para ejecutar una imagen de contenedor:

```bash
docker build -t l2024 .
docker run --rm -p 8080:8080 l2024
```

Nginx incluye una regla de fallback para que las rutas como `/people/1` funcionen al abrirse directamente.