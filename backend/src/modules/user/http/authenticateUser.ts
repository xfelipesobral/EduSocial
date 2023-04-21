import { NextFunction, Request, Response } from 'express'

import User from '../service'

export default async function authenticateUser(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body as { email: string, password: string }

    try {
        const accessToken = await User.authenticate(email, password)

        response.status(201).json({
            accessToken,
            tokenType: 'bearer'
        })
    } catch (e) {
        next(e)
    }
}