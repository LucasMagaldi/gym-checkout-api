import 'dotenv'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'acc', 'prod']).default('dev'),
    PORT: z.coerce.number().default(8080)
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.log('Environment Error: Invalid environment variables', _env.error.format())

    throw new Error('Environment Error: Invalid environment variables')
}

export const env = _env.data