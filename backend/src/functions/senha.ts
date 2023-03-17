import bcrypt from 'bcrypt'

export function hashSenha(senha: string): Promise<string> {
    return bcrypt.hash(senha, 12)
}

export function validaSenha(senha: string, hash: string): Promise<boolean> {
    return bcrypt.compare(senha, hash)      
}