import { Logger } from '@nestjs/common';
import { z } from 'zod';

const logger = new Logger('EnvService');
logger.debug('EnvService initialized');

const envSchema = z.object({
  ENVIRONMENT: z.union([
    z.literal('development'),
    z.literal('uat'),
    z.literal('production')
  ]),
  DATABASE_CENTRAL_URL: z.string(),
  FRONTEND_BASE_URL: z.string()
});

const res = envSchema.safeParse(process.env);

if (res.success === false) {
  logger.error(res.error.issues);
  throw new Error('There is an error with the server environment variables');
}

export const Env = res.data;
