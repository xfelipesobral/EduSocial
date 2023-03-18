import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'

import { validaCnpj } from '../../../functions/documento'

import {
    IInstituicao,
    IInstituicaoInterface,
    instituicaoErros as erro
} from './interface'

import UsuarioInstituicao from '../../usuarioInstituicao'

class InstituicaoModel implements IInstituicaoInterface {
    private prisma = new PrismaClient().instituicao

    /**
     * Ações de criar e alterar instituição
     */

    async criar({ documento, nomeFantasia, nomeRazao }: IInstituicao, usuarioId: string): Promise<IInstituicao> {
        documento = documento.replace(/[^\d]+/g, '')

        if (!validaCnpj(documento)) throw erro.documento.invalido

        let existeInstituicao
        try {
            existeInstituicao = await this.buscaPeloDocumento(documento)
        } catch (e) {
            // Continua...
        } 
        if (existeInstituicao) throw erro.documento.jaExiste
        
        const instituicaoId = uuid()

        const instituicao = await this.prisma.create({
            data: {
                id: instituicaoId,
                documento,
                nomeFantasia,
                nomeRazao
            }
        })

        if (!instituicao) throw erro.instituicao.naoInseriu

        // Criar vinculo entre usuario e instituicao
        let errVinculo
        try {
            UsuarioInstituicao.vincular(instituicaoId, usuarioId, 'DIRETOR')
        } catch (e) {
            errVinculo = e
        }

        if (errVinculo) throw errVinculo

        return instituicao
    }

    aprovar(id: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    /**
     * Ações de busca
     */

    async buscaPeloDocumento(documento: string): Promise<IInstituicao> {
        if (!validaCnpj(documento)) throw erro.documento.invalido

        const instituicao = await this.prisma.findUnique({
            where: {
                documento
            }
        })

        if (!instituicao) throw erro.documento.naoEncontrou

        return instituicao
    }

    async buscaPeloId(id: string): Promise<IInstituicao> {
        const instituicao = await this.prisma.findUnique({
            where: {
                id
            }
        })

        if (!instituicao) throw erro.id.naoEncontrou

        return instituicao
    }
}

export default InstituicaoModel