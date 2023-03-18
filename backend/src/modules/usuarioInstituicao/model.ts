import { PrismaClient } from '@prisma/client'

import {
    IUsuarioInstituicao,
    IUsuarioInstituicaoInterface,
    usuarioInstituicaoErros as erro
} from './interface'

import Usuario from '../usuario/service'
import Instituicao from '../instituicao/service'

class UsuarioInstituicaoModel implements IUsuarioInstituicaoInterface {
    private prisma = new PrismaClient().usuarioInstituicao

    async vincular(instituicaoId: string, usuarioId: string, perfil: string): Promise<string> {
        if (!instituicaoId || !usuarioId || !perfil) throw erro.camposInvalidos

        let existeVinculo
        let erroTry

        try {
            // Verifica se já existe um vinculo, caso exista, retorna o perfil atual
            existeVinculo = await this.existeVinculo(instituicaoId, usuarioId)
            // Verifica se existe usuário
            if (await Usuario.buscarId(usuarioId)) erroTry = erro.usuarioNaoExiste 
            // Verifica se existe instituição
            if (await Instituicao.buscaPeloId(instituicaoId)) erroTry = erro.instituicaoNaoExiste
        } catch (e) { }

        if (existeVinculo) return existeVinculo
        if (erroTry) throw erroTry

        await this.prisma.create({
            data: {
                instituicaoId,
                usuarioId,
                perfil
            }
        })

        return perfil
    }

    async existeVinculo(instituicaoId: string, usuarioId: string): Promise<string> {
        const conexao = await this.prisma.findFirst({
            where: {
                usuarioId,
                instituicaoId
            }
        })

        if (!conexao) throw erro.naoExisteVinculo

        return conexao.perfil
    }
}

export default UsuarioInstituicaoModel