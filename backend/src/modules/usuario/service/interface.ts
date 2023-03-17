import { Usuario as IUsuario } from '@prisma/client'

interface IUsuarioInterface {
    criar(usuario: IUsuario): Promise<IUsuario> // Caso nao exista, cria um usuário
    buscarApelido(apelido: string): Promise<IUsuario> // Retorna usuário que tenha este apelido
    buscarEmail(email: string): Promise<IUsuario> // Retorna usuário que tenha este email
    buscarId(id: string): Promise<IUsuario> // Retorna usuário que tenha este id
    buscarDocumento(documento: string): Promise<IUsuario> // Retorna usuário que tenha este documento
}

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
    }
}

export { IUsuario, IUsuarioInterface, usuarioErros }