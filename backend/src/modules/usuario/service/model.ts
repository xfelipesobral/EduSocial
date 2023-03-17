import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'
 
import { IUsuario, IUsuarioInterface, usuarioErros as erros } from './interface'

import validaDocumento from '../../../functions/documento'
import validaEmail from '../../../functions/email'

class UsuarioModel implements IUsuarioInterface {
    private prisma = new PrismaClient().usuario

    // Caso nao exista, cria um usuário
    async criar({ nome, senha, aniversario, apelido, documento, email }: IUsuario): Promise<IUsuario> {
        let erro = ''
        try {
            if (await this.buscarEmail(email)) erro = erros.email.jaExiste // Verificar se email valido e se existe
            if (await this.buscarApelido(apelido)) erro = erros.apelido.jaExiste // Verificar se apelido ja existe
            if (await this.buscarDocumento(documento)) erro = erros.documento.jaExiste // Verifica se ja existe documento
        } catch(e) {
            if (e === erros.email.invalido || e === erros.documento.invalido) erro = e
        }

        if (erro) throw (erro)

        return this.prisma.create({
            data: {
                id: uuid(),
                nome,
                senha,
                aniversario,
                apelido,
                documento,
                email
            }
        })
    }

    // Retorna usuário que tenha este apelido
    async buscarApelido(apelido: string): Promise<IUsuario> {
        const usuario = await this.prisma.findUnique({
            where: {
                apelido
            }
        })

        if (!usuario) {
            throw (erros.apelido.naoEncontrou)
        }

        return usuario
    }

    // Retorna usuário que tenha este documento
    async buscarDocumento(documento: string): Promise<IUsuario> {
        if (!validaDocumento(documento)) {
            throw (erros.documento.invalido)
        }

        const usuario = await this.prisma.findUnique({
            where: {
                documento
            }
        })

        if (!usuario) {
            throw new Error(erros.documento.naoEncontrou)
        }

        return usuario
    }

    // Retorna usuário que tenha este email
    async buscarEmail(email: string): Promise<IUsuario> {
        if (!validaEmail(email)) {
            throw (erros.email.invalido)
        }

        const usuario = await this.prisma.findUnique({
            where: {
                email
            }
        })

        if (!usuario) {
            throw (erros.email.naoEncontrou)
        }

        return usuario
    }

    // Retorna usuário que tenha este identificador
    async buscarId(id: string): Promise<IUsuario> {
        const usuario = await this.prisma.findUnique({
            where: {
                id
            }
        })

        if (!usuario) {
            throw (erros.id.naoEncontrou)
        }

        return usuario
    }   
}

export default UsuarioModel