declare namespace NodeJS {
  export interface ProcessEnv {
    // DB
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;

    // JWT
    JWT_SECRET_KEY: string;
    JWT_REFRESH_TOKEN_KEY: string;
  }
}

// Common
type QueryType = Record<string, any>;
