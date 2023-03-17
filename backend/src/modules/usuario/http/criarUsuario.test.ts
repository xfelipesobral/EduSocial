import request from 'supertest'

import { inicializaServidor } from '../../../server'

const { app, server } = inicializaServidor({ porta: 3001 })

test('Criar um usuário com sucesso', async () => {
    const dadosUsuario = {
        apelido: 'jest',
        nome: 'Usuário Jest',
        email: 'xfelipesobral@gmail.com',
        senha: 'teste',
        documento: '507.327.465-23',
        aniversario: '1984-05-01T00:00:00Z',
    }

    const resposta = await request(app).post('/usuario').send(dadosUsuario)

    expect(resposta.status).toBe(201)
    expect(resposta.body.id).toBeDefined()
})

afterAll(done => {
    server.close(done)
})