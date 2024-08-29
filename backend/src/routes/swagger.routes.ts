import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'

const swaggerRoutes = Router()

swaggerRoutes.get('/', async (request, response) => {
    // https://github.com/Surnet/swagger-jsdoc
    const swaggerSpec = swaggerJsdoc({
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'EduSocial API',
                description: 'Documentação da API da aplicação EduSocial',
                version: '1.0.0'
            },
            servers: [
                {
                    url: 'https://edusocial.felipesobral.com.br',
                    variables: {}
                }, {
                    url: 'http://localhost:3000',
                    variables: {}
                }],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    }
                }
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
        apis: [
            './src/routes/*.ts',
            './src/modules/**/*.routes.ts'
        ]
    })

    response.setHeader('Content-Type', 'application/json')
    response.send(swaggerSpec)
})

export { swaggerRoutes }