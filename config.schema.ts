import { z } from 'zod';

export const configValidationSchema = z.object({
  STAGE: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  JWT_SECRET: z.string(),
});

export const validate = (configuration: Record<string, unknown>) => {
  const validation = configValidationSchema.safeParse(configuration);

  if (validation.success === false) {
    throw new Error(validation.error.toString());
  }

  return validation.data;
};
