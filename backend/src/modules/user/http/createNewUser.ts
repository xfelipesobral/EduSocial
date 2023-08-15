import { NextFunction, Request, Response } from 'express'

import { passwordToHash } from '../../../functions/password'
import { AppError } from '../../../functions/AppError'

import { IUserCreate } from '../service/interface'

import User from '../service'


export default async function createNewUser(request: Request, response: Response, next: NextFunction) {
    let { name, password, email, birthday } = request.body as IUserCreate

    try {
        if (!name || !password || !email || !birthday) {
            throw new AppError('Required fields are missing')
        }

        if (await User.findByEmail(email)) {
            throw new AppError('Email already exists')
        }

        if (password.length < 8) {
            throw new AppError('Password entered is too weak. Please choose a stronger password with at least 8 characters, including uppercase and lowercase letters, and numbers')
        }

        password = await passwordToHash(password)

        const { id, createdAt } = await User.create({ name, password, email, birthday })

        response.status(201).json({
            id,
            createdAt
        })
    } catch (e) {
        next(e)
    }
}