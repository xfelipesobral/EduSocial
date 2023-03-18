import { Request, Response } from 'express'

import Instituicao from '../service'
import { IInstituicao } from '../service/interface'

export default async function criarInstituicao(request: Request, response: Response) {
    if (!request.usuario.id) {
        return response.status(403).json({ erro: 'Usuário não autenticado' })
    }

    const dadosInstituicao: IInstituicao = request.body

    try {
        const instituicao = await Instituicao.criar(dadosInstituicao, request.usuario.id)

        return response.status(201).json(instituicao)
    } catch (erro) {
        return response.status(400).json({ erro })
    }
}