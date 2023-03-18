import { Router } from 'express'

import criarUsuario from '../modules/usuario/http/criarUsuario'
import { autenticaUsuario } from '../modules/usuario/http/autenticacao'

const usuarioRotas = Router()

usuarioRotas.post('/', criarUsuario)
usuarioRotas.post('/autenticacao', autenticaUsuario)

export default usuarioRotas