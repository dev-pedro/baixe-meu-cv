// app/lib/schemas/portfolio.schema.ts

import { z } from 'zod';
import validator from 'validator';

export const PortfolioSchema = z.object({
  name: z.string().min(1, 'O nome do projeto é obrigatório').max(100, 'Máximo de 100 caracteres'),

  url: z
    .string()
    .url('Informe uma URL válida')
    .refine((val) => validator.isURL(val), {
      message: 'Informe uma URL válida e segura (sem caracteres inválidos)',
    }),

  description: z
    .string()
    .min(10, 'A descrição deve ter no mínimo 10 caracteres')
    .max(500, 'Máximo de 500 caracteres'),

  tags: z.array(z.string()).optional(),
  customTags: z.array(z.string()).optional(),

  category: z.string().optional(),
  customCategory: z.string().optional(),
});

export const BioSchema = z.object({
  bio: z.string().max(100, 'Máximo de 700 caracteres').optional(),
});
