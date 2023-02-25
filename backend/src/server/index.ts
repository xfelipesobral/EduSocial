import express from 'express'

interface IServidor {
	porta: number
}

function inicializaServidor({ porta }: IServidor) {
	const app = express()

	app.get('/', (req, res) => {
		res.send('Servidor disponível')
	})

	app.listen(porta, () => {
		console.log(`Servidor iniciado na porta ${porta}`)
	})
}


export { inicializaServidor }