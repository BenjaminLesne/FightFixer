declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: unknown;
    NODE_ENV: "development" | "production" | "test";
  }
}
