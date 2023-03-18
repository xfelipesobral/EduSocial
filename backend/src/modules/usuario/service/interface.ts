import { Usuario as IUsuario } from '@prisma/client'

interface IUsuarioInterface {
    // Cria usuário caso não exista
    criar(usuario: IUsuario): Promise<IUsuario> 

    // Busca usuário pelo apelido, email, id ou documento
    buscarApelido(apelido: string): Promise<IUsuario>
    buscarEmail(email: string): Promise<IUsuario>
    buscarId(id: string): Promise<IUsuario> 
    buscarDocumento(documento: string): Promise<IUsuario>
    
    // Autenticação via apelido, email, id ou documento
    autenticarPeloApelido(senha: string, apelido: string): Promise<IUsuario>
    autenticarPeloEmail(senha: string, email: string): Promise<IUsuario>
    autenticarPeloId(senha: string, id: string): Promise<IUsuario>
    autenticarPeloDocumento(senha: string, documento: string): Promise<IUsuario>
}

// Padrões de erros
const usuarioErros = {
    email: {
        jaExiste: 'Este e-mail já está sendo utilizado, por favor, tente outro e-mail',
        invalido: 'E-mail inválido',
        naoEncontrou: 'Não foi possível encontrar um usuário com este e-mail'
    },
    apelido: {
        naoEncontrou: 'Não foi possível encontrar um usuário com este apelido',
        jaExiste: 'Este usuário já está sendo utilizado por outra pessoa'
    },
    documento: {
        invalido: 'Documento inválido',
        naoEncontrou: 'Não foi possível encontrar um usuário com este documento',
        jaExiste: 'Este documento já está cadastrado no EduSocial'
    },
    id: {
        naoEncontrou: 'Não foi possível encontrar um usuário com este identificador'
    },
    autenticacao: {
        camposInvalidos: 'Campos obrigatórios não preenchidos',
        falha: 'Não foi possível encontrar nenhum usuário com estas credenciais'
    }
}

export { IUsuario, IUsuarioInterface, usuarioErros }