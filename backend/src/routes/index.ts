import { Router, Request, Response } from 'express'

import usuarioRotas from './usuario.routes'
import instituicaoRotas from './instituicao.routes'

const router = Router()

router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'online'
    })
})

router.use('/usuario', usuarioRotas)
router.use('/instituicao', instituicaoRotas)

export default router