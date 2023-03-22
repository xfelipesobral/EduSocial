import { Request, Response } from 'express'

import Usuario from '../service'
import { IUsuario } from '../service/interface'

export default async function criarUsuario(request: Request, response: Response) {
    const dadosUsuario: IUsuario = request.body

    try {
        const { id, apelido, nome, email, ativo, aniversario } = await Usuario.criar(dadosUsuario)

        return response.status(201).json({
            id,
            apelido,
            nome,
            email,
            ativo,
            aniversario
        })
    } catch (erro) {
        console.log(erro)
        return response.status(403).send({ erro })
    }
}