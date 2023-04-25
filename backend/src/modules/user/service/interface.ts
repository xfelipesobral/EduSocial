import { User as IUser } from '@prisma/client'

export interface IUserCreate {
    name: string
    password: string
    email: string
    birthday: Date
}

export interface IUserFunctions {
    create(user: IUserCreate): Promise<IUser>

    findById(id: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
    findByDocument(document: string): Promise<IUser | null>
    findByEmailAndPassword(email: string, password: string): Promise<IUser | null>
}

export { IUser }