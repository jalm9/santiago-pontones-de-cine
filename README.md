# Santiago-Pontones de cine

Sitio web de la Asociación Cultural Alma Serrana, dedicado a la divulgación de los
proyectos documentales de la Sierra de Segura (Jaén). Hecho con Astro 5, TypeScript
y content collections en YAML. Desplegado en Vercel.

- **Producción:** https://santiagopontonesdecine.com
- **Autor:** Sakuro (José Lara Muñoz)

## Estructura

```
src/
  assets/            imágenes procesadas por Astro (WebP + AVIF automáticos)
    equipo/          fotos del equipo técnico
    carteles/        carteles de cada documental
    logos/           patrocinadores y colaboradores
    premios/         galardones
  components/        cabecera, pie, tarjetas de la cartelera, teaser…
  content/           datos del sitio en YAML (Content Collections)
    documentales/    un YAML por peli (bombardeo, maquis, maderadas, quevedo)
    prensa/          un YAML por nota de prensa
  layouts/           Base.astro con head, fuentes y estructura común
  pages/             rutas
    index.astro                    home
    documentales/[slug].astro      página dinámica por documental
    prensa/[slug].astro            página dinámica por nota de prensa
  styles/            global.css con todas las variables y utilidades
public/              archivos que se sirven tal cual, sin procesar
  audio/             mp3 de las entrevistas
  videos/            mp4 del teaser de Quevedo
```

## Cómo añadir una nueva nota de prensa

1. Crear un fichero YAML en `src/content/prensa/`, por ejemplo `nueva-nota.yaml`:

   ```yaml
   title: Título de la nota
   fecha: 2026-05-14
   fecha_humana: 14 may 2026
   categoria: En prensa
   medio: Diario Jaén
   lede: Una frase resumen que aparece bajo el título.
   body: |
     Primer párrafo del cuerpo de la nota.

     Segundo párrafo. Se puede usar Markdown:
     **negritas**, *cursivas*, y `código`.

     > Citas en bloque para las declaraciones.
     >
     > — Persona citada
   ```

2. Commit y push a `main`. Vercel despliega automáticamente en 30 segundos.

Si la nota lleva imagen final:

```yaml
figura:
  src: ../../assets/premios/mumbai-caracola-dorada.jpeg
  caption: Pie de la imagen.
```

Si la nota está asociada a un documental, en el YAML de ese documental
(`src/content/documentales/[slug].yaml`) añade el slug de la nota al array
`prensa_slugs`.

## Cómo añadir un nuevo documental

1. Colocar el cartel en `src/assets/carteles/nombre.jpeg`.
2. Crear un YAML en `src/content/documentales/nombre.yaml` con la misma estructura
   que los que ya hay. Solo `title`, `title_h1`, `estado`, `lede`, `poster`, `meta`,
   `sinopsis` y `ficha` son obligatorios. Todo lo demás (`contexto`, `premio`,
   `reparto`, `equipo_visual`, `director_bio`, `youtube_id`, `prensa_slugs`) es
   opcional y solo se renderiza si está presente.
3. `order` controla el orden en la cartelera de la home (menor = antes).

## Desarrollo local

```
pnpm install
pnpm dev
```

Se sirve en `http://localhost:4321`.

## Build de producción

```
pnpm build
pnpm preview
```

El resultado va a `dist/` — es lo que Vercel despliega.

## Despliegue en Vercel

1. Conectar el repositorio en https://vercel.com/new
2. Framework preset: **Astro** (lo detecta solo)
3. Root directory: `astro/` (si el Astro vive como subcarpeta)
4. Build command: `pnpm build`
5. Output directory: `dist`
6. Deploy

En cada `git push` a `main` Vercel construye y publica. Pull requests generan
previews con URL única.
