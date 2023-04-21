import Orm from './prisma'
import { sign as createAccessToken } from 'jsonwebtoken'

import { passwordToHash, validatePasswordHash } from '../../../functions/password'
import { AppError } from '../../../functions/AppError'

import { IUserCreate, IUser } from './interface'

class User extends Orm {
    constructor() {
        super()
    }

    async create({ name, password, email, birthday }: IUserCreate): Promise<IUser> {
        if (!name || !password || !email || !birthday) {
            throw new AppError('Required fields are missing')
        }

        if (await super.findByEmail(email)) {
            throw new AppError('Email already exists')
        }

        if (password.length < 8) {
            throw new AppError('The password entered is too weak. Please choose a stronger password with at least 8 characters, including uppercase and lowercase letters, and numbers')
        }

        password = await passwordToHash(password)

        return super.create({
            name,
            password,
            email,
            birthday
        })
    }

    async authenticate(email: string, password: string): Promise<string> {
        if (!password || !email) {
            throw new AppError('Required fields are missing')
        }

        const user = await super.findByEmail(email)

        if (user && await validatePasswordHash(password, user.password)) {
            if (!user.active) {
                throw new AppError('Account deactivated')
            }

            return createAccessToken({}, process.env.EDUSOCIAL_SECRET, {
                subject: user.id,
                issuer: 'EduSocial-API',
                expiresIn: '7d'
            })
        }

        throw new AppError('The email or password is incorrect')
    }
}

export default new User()