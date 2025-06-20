import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production', 'preview']).default('development'),
    SESSION_SECRET: z.string().min(32),
    S3_ACCESS_KEY_ID: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
    S3_ENDPOINT: z.string().url()
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_BASE_ASSET_URL: z.string().url(),

    NEXT_PUBLIC_S3_PUB_LAB_ACCESS_URL: z.string().url(),
    NEXT_PUBLIC_S3_LAB_BUCKET_NAME: z.string()
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV:
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_VERCEL_ENV
        : process.env.NODE_ENV,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_BASE_ASSET_URL: process.env.NEXT_PUBLIC_BASE_ASSET_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_S3_LAB_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_LAB_BUCKET_NAME,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    NEXT_PUBLIC_S3_PUB_LAB_ACCESS_URL: process.env.NEXT_PUBLIC_S3_PUB_LAB_ACCESS_URL
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
});
