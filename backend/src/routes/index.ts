import { Router, Request, Response } from 'express'

import usuarioRotas from './usuario.routes'

const router = Router()

router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'online'
    })
})

router.use('/usuario', usuarioRotas)

export default router