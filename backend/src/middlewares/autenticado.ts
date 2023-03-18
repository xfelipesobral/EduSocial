import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import Usuario from '../modules/usuario/service'

interface IPayload {
    sub: string
}

export default async function autenticado(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization

    if (!token) {
        return response.status(401).json({ erro: 'Token de autenticação não informado' })
    }

    const [, bearer] = token.split(' ')

    try {   
        const { sub: usuarioId } = verify(bearer, process.env.EDUSOCIAL_SECRET) as IPayload

        const usuario = await Usuario.buscarId(usuarioId)

        request.usuario = {
            id: usuario.id
        }

        next()
    } catch {
        return response.status(401).json({ erro: 'Token inválido' })
    }
}