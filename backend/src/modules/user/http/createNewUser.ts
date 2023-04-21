import { NextFunction, Request, Response } from 'express'
import { IUserCreate } from '../service/interface'

import User from '../service'

export default async function createNewUser(request: Request, response: Response, next: NextFunction) {
    const userData = request.body as IUserCreate

    try {
        const { id, createdAt } = await User.create(userData)

        response.status(201).json({
            id,
            createdAt
        })
    } catch (e) {
        next(e)
    }
}