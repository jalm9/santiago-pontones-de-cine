import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const documentales = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/documentales' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      title_h1: z.string(),
      estado: z.string(),
      lede: z.string(),
      meta: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      ),
      poster: image(),
      youtube_id: z.string().optional(),
      sinopsis: z.object({
        titulo: z.string(),
        body: z.string(),
      }),
      contexto: z
        .object({
          sub: z.string(),
          titulo: z.string(),
          body: z.string(),
        })
        .optional(),
      premio: z
        .object({
          titulo: z.string(),
          medio: z.string(),
          cuerpo: z.string(),
          cita: z.string(),
          cita_autor: z.string(),
          img: image(),
          img_alt: z.string(),
        })
        .optional(),
      ficha: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      ),
      reparto: z
        .object({
          titulo: z.string(),
          actores: z.array(z.string()),
        })
        .optional(),
      equipo_visual: z
        .array(
          z.object({
            nombre: z.string(),
            rol: z.string(),
            foto: image(),
          })
        )
        .optional(),
      director_bio: z
        .object({
          nombre: z.string(),
          titulo: z.string(),
          foto: image(),
          bio: z.string(),
        })
        .optional(),
      prensa_slugs: z.array(z.string()).default([]),
      order: z.number().default(100),
    }),
});

const prensa = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/prensa' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      fecha: z.date(),
      fecha_humana: z.string(),
      categoria: z.string(),
      medio: z.string(),
      lede: z.string(),
      body: z.string(),
      figura: z
        .object({
          src: image(),
          caption: z.string(),
        })
        .optional(),
      order: z.number().default(100),
    }),
});

export const collections = { documentales, prensa };
