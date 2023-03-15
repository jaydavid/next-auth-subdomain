declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
