import { Router } from 'express'

import createNewUser from '../modules/user/http/createNewUser'
import authenticateUser from '../modules/user/http/authenticateUser'

const userRoutes = Router()

userRoutes.put('/', createNewUser)
userRoutes.post('/authenticate', authenticateUser)

export default userRoutes