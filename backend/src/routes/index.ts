import { Router, Request, Response } from 'express'

import userRoutes from './user.routes'

const router = Router()

router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'online'
    })
})

router.use('/user', userRoutes)

export default router