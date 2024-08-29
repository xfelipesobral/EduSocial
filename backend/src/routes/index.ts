import { Router, Request, Response } from 'express'

import { userRoutes } from '@/modules/user/user.routes'
import { swaggerRoutes } from './swagger.routes'

const router = Router()

router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'API is running 🟢'
    })
})

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management and authentication
 */
router.use('/user', userRoutes)

router.use('/swagger', swaggerRoutes)

export default router