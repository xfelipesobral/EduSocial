import { Request, Response } from 'express'

import { sign } from 'jsonwebtoken'

import Usuario from '../service'

interface IAutenticacao {
    apelido?: string
    email?: string
    documento?: string
    senha?: string
}

export async function autenticaUsuario(request: Request, response: Response) {
    const { apelido, email, documento, senha }: IAutenticacao = request.body

    if (!senha || (!apelido && !email && !documento)) {
        return response.status(400).json({
            erro: 'Campos obrigatórios não preenchidos'
        })
    }

    try {
        let usuario

        if (apelido) {
            usuario = await Usuario.autenticarPeloApelido(senha, apelido)
        }

        if (email) {
            usuario = await Usuario.autenticarPeloEmail(senha, email)
        }

        if (documento) {
            usuario = await Usuario.autenticarPeloDocumento(senha, documento)
        }

        if (!usuario) {
            return response.status(500).json({ erro: 'Erro interno, tente novamente' })
        }

        const token = sign({}, process.env.EDUSOCIAL_SECRET, {
            subject: usuario.id,
            issuer: 'EduSocial',
            expiresIn: '7d'
        })

        return response.status(200).json({
            token,
            usuario: {
                nome: usuario.nome,
                email: usuario.email,
                ativo: usuario.ativo
            }
        })
    } catch (erro) {
        return response.status(401).json({ erro: 'Credenciais inválidas' })
    }
}