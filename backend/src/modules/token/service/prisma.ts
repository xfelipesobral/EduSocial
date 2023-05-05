import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'

import { generateAccessToken, generateRefreshToken } from '../../../functions/jwt'

import { IToken, ITokenCreate, ITokenFunctions } from './interface'

export default class TokenModel implements ITokenFunctions {
    private prisma = new PrismaClient().token

    async create(userId: string): Promise<ITokenCreate> {
        const accessToken = generateAccessToken(userId)
        const refreshToken = generateRefreshToken(userId)

        // adicionar criptografia no access e refresh token

        await this.prisma.create({
            data: {
                id: uuid(),
                userId,
                accessToken: generateAccessToken(userId),
                refreshToken: generateRefreshToken(userId)
            }
        })

        return { accessToken, refreshToken  }
    }

    async updateToken(id: string): Promise<void> {
        return
    }

    findByRefreshToken(refreshToken: string): Promise<IToken | null> {
        return this.prisma.findFirst({
            where: {
                refreshToken
            }
        })
    }
}