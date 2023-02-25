import { config as configDotEnv } from 'dotenv'
import { inicializaServidor } from './src/server'

configDotEnv()

inicializaServidor({
    porta: Number(process.env.EDUSOCIAL_PORTA_BACKEND) || 3000
})