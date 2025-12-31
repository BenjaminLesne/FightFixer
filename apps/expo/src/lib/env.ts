import { z } from "zod/v4";

const envSchema = z.object({
  // Build-time env vars
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  APP_VARIANT: z.enum(["development", "preview", "production"]),
});

const formatError = (error: z.ZodError) => {
  const errors = error.issues.map((issue) => {
    const path = issue.path.join(".") || "(root)";
    const received =
      "received" in issue
        ? ` (received: ${JSON.stringify(issue.received)})`
        : "";
    return `  ✗ ${path}: ${issue.message}${received}`;
  });

  return [
    "",
    "❌ Invalid environment variables:",
    "",
    ...errors,
    "",
    "💡 Check your .env file or app.config.ts extra field",
    "",
  ].join("\n");
};

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  APP_VARIANT: process.env.APP_VARIANT,
});

if (!parsed.success) {
  const message = formatError(parsed.error);
  console.error(message);
  throw new Error(message);
}

export const env = parsed.data;
export type Env = typeof env;
