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

        // Verifica se já existe um vinculo, caso exista, retorna o perfil atual
        let existeVinculo
        try {
            existeVinculo = await this.existeVinculo(instituicaoId, usuarioId)
        } catch (e) { }
        if (existeVinculo) return existeVinculo

        // Verifica se existe usuário
        let usuario
        try {
            usuario = await Usuario.buscarId(usuarioId)
        } catch (e) { }
        if (!usuario) throw erro.usuarioNaoExiste

        // Verifica se existe instituição
        let instituicao
        try {
            instituicao = await Instituicao.buscaPeloId(instituicaoId)
        } catch (e) { }
        if (!instituicao) throw erro.instituicaoNaoExiste

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