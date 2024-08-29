import { Router } from 'express'

import renewToken from '../session/http/renewSession'

import authenticateUser from './http/authenticateUser'
import createNewUser from './http/createNewUser'

const userRoutes = Router()

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate user with email and password.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: contato@felipesobral.com.br
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Authorized
 *         content:
 *          application/json:
 *            examples:
 *              Created:
 *                value: '{"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "refreshToken": "01919c9f-0f1a-755c-84bc-e57e19e0c96b"}'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 */
userRoutes.post('/login', authenticateUser)
userRoutes.patch('/login', renewToken)

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Create a new user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - birthday
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Felipe Vieira Sobral'
 *               email:
 *                 type: string
 *                 example: 'contato@felipesobral.com.br'
 *               password:
 *                 type: string
 *                 example: '12345678'
 *               birthday:
 *                 type: string
 *                 example: '1990-01-01'
 *               pictureUrl:
 *                 type: string
 *                 example: 'https://www.gravatar.com/avatar/e5d243c1406b8864ed5b09513357619d59f2a3e02da6b94196f6d9641e00735a'
 *               phone:
 *                 type: string
 *                 example: '5544999999999'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *          application/json:
 *            examples:
 *              Created:
 *                value: '{"id": "01919c99-4b56-74be-aaaf-4ab27e03efa9", "createdAt": "2024-08-29T00:00:00"}'
 *       '400':
 *         description: 'Bad request'
 *       '500':
 *         description: 'Internal Server Error'
 * 
 */
userRoutes.post('/register', createNewUser)

export { userRoutes }