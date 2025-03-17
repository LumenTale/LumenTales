declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_API_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    MONGODB_URI: string;
    NEXT_PUBLIC_INFURA_ID: string;
    NEXT_PUBLIC_CHAIN_ID: string;
    NEXT_PUBLIC_CONTRACT_ADDRESS: string;
    GEMINI_API_KEY: string;
  }
  
  interface Process {
    env: ProcessEnv;
  }
}

declare const process: NodeJS.Process; 