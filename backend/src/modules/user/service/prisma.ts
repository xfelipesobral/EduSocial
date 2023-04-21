import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'

import { IUser, IUserFunctions } from './interface'

class UserModel implements IUserFunctions {
    private prisma = new PrismaClient().user

    create({ name, password, email, birthday }: { name: string, password: string, email: string, birthday: Date }): Promise<IUser> {
        return this.prisma.create({
            data: {
                id: uuid(),
                name,
                password,
                birthday,
                email
            }
        })
    }

    findById(id: string): Promise<IUser | null> {
        return this.prisma.findUnique({
            where: {
                id
            }
        })
    }

    findByEmail(email: string): Promise<IUser | null> {
        return this.prisma.findUnique({
            where: {
                email
            }
        })
    }

    findByDocument(document: string): Promise<IUser | null> {
        return this.prisma.findUnique({
            where: {
                document
            }
        })
    }

    findByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
        return this.prisma.findFirst({
            where: {
                email,
                password
            }
        })
    }
}

export default UserModel