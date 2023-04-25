import { NextFunction, Request, Response } from 'express'

import { AppError } from '../../../functions/AppError'
import { decoteToken } from '../../../functions/jwt'

import Token from '../service'

interface IRequestBodyDefault {
    refreshToken: string
}

// precisa terminar a funcao de renovacao de token
export default async function renewToken(request: Request, response: Response, next: NextFunction) {
    try {
        const { refreshToken } = request.body as IRequestBodyDefault

        if (refreshToken) {
            throw new AppError('Refresh token is missing')
        }

        const tokenRegistered = await Token.findByRefreshToken(refreshToken)

        const { sub } = decoteToken(refreshToken)

        if (!sub || !tokenRegistered) {
            throw new AppError('Refresh token is invalid or expired')
        }





    } catch (e) {
        next(e)
    }
}