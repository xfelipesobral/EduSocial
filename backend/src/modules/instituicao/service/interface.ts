import { Instituicao as IInstituicao } from '@prisma/client'

interface IInstituicaoInterface {
    // Criação e alteração da instituição
    criar(instituicao: IInstituicao, usuarioId: string): Promise<IInstituicao>
    aprovar(id: string): Promise<boolean>

    // Busca
    buscaPeloDocumento(documento: string): Promise<IInstituicao>
    buscaPeloId(id: string): Promise<IInstituicao>
}

const instituicaoErros = {
    documento: {
        invalido: 'Documento inválido',
        naoEncontrou: 'Não encontramos uma instituição com este documento',
        jaExiste: 'Já existe uma instituição com este documento'
    },
    id: {
        naoEncontrou: 'Não foi possível encontrar uma instituição com este identificador'
    },
    instituicao: {
        naoInseriu: 'Falha ao cadastrar instituição'
    }
}

export {
    IInstituicao,
    IInstituicaoInterface,
    instituicaoErros
}