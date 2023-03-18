import { Router } from 'express'

import autenticado from '../middlewares/autenticado'

import criarInstituicao from '../modules/instituicao/http/criarInstituicao'

const instituicaoRotas = Router()

instituicaoRotas.post('/', autenticado, criarInstituicao)

export default instituicaoRotas