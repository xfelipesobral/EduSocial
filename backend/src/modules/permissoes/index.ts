import lista from './lista.json'

interface Permissoes {
    convidado: number
    professor: number
    moderador: number
    diretor: number
    responsavel: number
    aluno: number
    administrador: number
    [key: string]: string | number
}

export function temPermissao(perfil: string, permissao: string, nivelSolicitado: number) {
    perfil = perfil.toUpperCase()

    if (perfil === 'ADMINISTRADOR') return true

    const nivelDeAcessoPorPerfil: Permissoes | undefined = lista.find(item => item.permissao === permissao)
    if (!nivelDeAcessoPorPerfil) return false

    const nivelDeAcesso = nivelDeAcessoPorPerfil[perfil.toLowerCase()]

    // 0 -> Não liberado
    // 1 -> Liberado apenas para ações que tem associação com o usuário
    // 2 -> Liberado completamente
    return nivelDeAcesso >= nivelSolicitado
}