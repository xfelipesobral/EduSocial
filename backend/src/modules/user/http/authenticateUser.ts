import { NextFunction, Request, Response } from 'express'

import { AppError } from '../../../functions/AppError'
import { validatePasswordHash } from '../../../functions/password'

import User from '../service'
import Token from '../../token/service'

interface IRequestBodyDefault {
    email: string
    password: string
}

export default async function authenticateUser(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body as IRequestBodyDefault

    try {
        if (!password || !email) {
            throw new AppError('Required fields are missing')
        }

        const user = await User.findByEmail(email)

        if (user && await validatePasswordHash(password, user.password)) {
            if (!user.active) {
                throw new AppError('Account deactivated')
            }

            const token = await Token.create(user.id)
            
            return response.status(201).json(token)
        }

        throw new AppError('The email or password is incorrect')
    } catch (e) {
        next(e)
    }
}