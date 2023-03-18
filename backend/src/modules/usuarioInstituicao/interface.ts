import { UsuarioInstituicao as IUsuarioInstituicao } from '@prisma/client'

interface IUsuarioInstituicaoInterface {
    // Criar vinculo entre a instituicao e o usuário (retorna perfil)
    vincular(instituicaoId: string, usuarioId: string, perfil: string): Promise<string> 
    
    // Retorna se há vinculo com o usuário e retorna seu perfil
    existeVinculo(instituicaoId: string, usuarioId: string): Promise<string>
}

// Padrões de erros
const usuarioInstituicaoErros = {
    camposInvalidos: 'Campos não preenchidos',
    instituicaoNaoExiste: 'Instituição inválida',
    usuarioNaoExiste: 'Usuário inválido',
    naoExisteVinculo: 'Vínculo entre instituição e usuário não existe'
}

export { IUsuarioInstituicao, IUsuarioInstituicaoInterface, usuarioInstituicaoErros }