import { useEffect } from 'react'
import { Text } from 'react-native'
import { router } from 'expo-router'

export default function App() { 

	useEffect(() => {
		setTimeout(() => {
			router.replace('/apresentation')
		}, 50)
	}, [])

	return (
		<Text>carregando...</Text>
	)
}