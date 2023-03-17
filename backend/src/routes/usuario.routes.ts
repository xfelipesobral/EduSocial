import { Router } from 'express'

import criarUsuario from '../modules/usuario/http/criarUsuario'

const usuarioRotas = Router()

usuarioRotas.post('/', criarUsuario)

export default usuarioRotas