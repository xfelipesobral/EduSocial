import express from 'express'

import rotas from '../routes'

import { temPermissao } from '../modules/permissoes'

interface IServidor {
	porta: number
}

function inicializaServidor({ porta }: IServidor) {
	const app = express()

	app.use(express.json())

	app.use(rotas)

	const server = app.listen(porta, () => {
		console.log(`Servidor iniciado na porta ${porta}`)
	})

	return { app, server }
}


export { inicializaServidor }