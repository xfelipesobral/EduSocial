declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        EDUSOCIAL_PORTA_BACKEND: number;
        EDUSOCIAL_SECRET: string;
    }
}