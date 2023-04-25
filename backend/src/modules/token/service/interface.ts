import { Token as IToken } from '@prisma/client'

export interface ITokenCreate {
    accessToken: string
    refreshToken: string
}
 
export interface ITokenFunctions {
    create(userId: string): Promise<ITokenCreate>

    updateToken(id: string): Promise<void>

    findByRefreshToken(token: string): Promise<IToken | null>
}

export { IToken }