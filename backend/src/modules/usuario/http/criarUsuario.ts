import { Request, Response } from 'express'

import Usuario from '../service'
import { IUsuario } from '../service/interface'

import { hashSenha } from '../../../functions/senha'

export default async function criarUsuario(request: Request, response: Response) {
    const dadosUsuario: IUsuario = request.body

    dadosUsuario.senha = await hashSenha(dadosUsuario.senha)

    try {
        const usuario = await Usuario.criar(dadosUsuario)

        return response.status(201).json(usuario)
    } catch (e) {
        return response.status(403).send({ erro: e })
    }
}