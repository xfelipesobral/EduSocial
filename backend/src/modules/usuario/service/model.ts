import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'

import { IUsuario, IUsuarioInterface, usuarioErros as erros } from './interface'

import validaDocumento from '../../../functions/documento'
import validaEmail from '../../../functions/email'
import { validaSenha, hashSenha } from '../../../functions/senha'

class UsuarioModel implements IUsuarioInterface {
    private prisma = new PrismaClient().usuario

    /**
     * Ações de criar e alterar usuário
     */

    async criar({ nome, senha, aniversario, apelido, documento, email }: IUsuario): Promise<IUsuario> {
        let erro = ''
        try {
            if (!documento || !aniversario || !email || !senha || !apelido) erro = 'Campos obrigatórios não preenchidos'
            if (await this.buscarEmail(email)) erro = erros.email.jaExiste // Verificar se email valido e se existe
            if (await this.buscarApelido(apelido)) erro = erros.apelido.jaExiste // Verificar se apelido ja existe
            if (await this.buscarDocumento(documento)) erro = erros.documento.jaExiste // Verifica se ja existe documento
        } catch (e) {
            if (e === erros.email.invalido || e === erros.documento.invalido) erro = e
        }

        if (erro) throw erro

        return this.prisma.create({
            data: {
                id: uuid(),
                nome,
                senha: await hashSenha(senha),
                aniversario,
                apelido,
                documento: documento.replace(/[^\d]+/g, ''),
                email,
                ativo: true
            }
        })
    }

    /**
     * Ações de busca
     */

    async buscarApelido(apelido: string): Promise<IUsuario> {
        const usuario = await this.prisma.findUnique({
            where: {
                apelido
            }
        })

        if (!usuario) {
            throw erros.apelido.naoEncontrou
        }

        return usuario
    }

    async buscarDocumento(documento: string): Promise<IUsuario> {
        if (!validaDocumento(documento)) {
            throw erros.documento.invalido
        }

        const usuario = await this.prisma.findUnique({
            where: {
                documento
            }
        })

        if (!usuario) {
            throw erros.documento.naoEncontrou
        }

        return usuario
    }

    async buscarEmail(email: string): Promise<IUsuario> {
        if (!validaEmail(email)) {
            throw erros.email.invalido
        }

        const usuario = await this.prisma.findUnique({
            where: {
                email
            }
        })

        if (!usuario) {
            throw erros.email.naoEncontrou
        }

        return usuario
    }

    async buscarId(id: string): Promise<IUsuario> {
        const usuario = await this.prisma.findUnique({
            where: {
                id
            }
        })

        if (!usuario) {
            throw erros.id.naoEncontrou
        }

        return usuario
    }

    /**
     * Ações de autenticação do usuário
     */

    async autenticarPeloApelido(senha: string, apelido: string): Promise<IUsuario> {
        const usuario = await this.buscarApelido(apelido)

        if (
            !usuario ||
            !await validaSenha(senha, usuario.senha)
        ) throw erros.autenticacao.falha

        return usuario
    }

    async autenticarPeloDocumento(senha: string, documento: string): Promise<IUsuario> {
        documento = documento.replace(/[^\d]+/g, '')

        if (!validaDocumento(documento)) throw erros.documento.invalido

        const usuario = await this.buscarDocumento(documento)

        if (
            !usuario ||
            !await validaSenha(senha, usuario.senha)
        ) throw erros.autenticacao.falha

        return usuario
    }

    async autenticarPeloEmail(senha: string, email: string): Promise<IUsuario> {
        if (!validaEmail(email)) throw erros.email.invalido

        const usuario = await this.buscarEmail(email)

        if (
            !usuario ||
            !await validaSenha(senha, usuario.senha)
        ) throw erros.autenticacao.falha

        return usuario
    }

    async autenticarPeloId(senha: string, id: string): Promise<IUsuario> {
        const usuario = await this.buscarId(id)

        if (
            !usuario ||
            !await validaSenha(senha, usuario.senha)
        ) throw erros.autenticacao.falha

        return usuario
    }
}

export default UsuarioModel