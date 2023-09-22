import { useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { apiAxios } from './functions/api'

export default function Login() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const login = () => {
		apiAxios.post('/user/authenticate', { email, password }).then(({ data }) => {
			console.log('###########', data)
		}).catch(err => {
			console.log(JSON.stringify(err), 'aqui')
		})
	}

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 8, backgroundColor: '#e2e8f0' }}>
			<View style={{ marginVertical: 8 }}>
				<Text style={{ textAlign: 'center', fontSize: 24 }}>Edu<Text style={{ fontWeight: '600' }}>Social</Text></Text>
				<Text style={{ textAlign: 'center' }}>Criar slogan</Text>
			</View>

			<View style={{ margin: 12 }}>
				<Text style={{ color: '#374151', fontWeight: '600', fontSize: 18, textAlign: 'center', marginBottom: 16 }}>Entrar com seu email e senha</Text>

				<TextInput
					style={{ borderWidth: 1, borderRadius: 100, borderColor: '#475569', padding: 16 }}
					onChangeText={setEmail}
					value={email}
					placeholder='Email'
					autoCapitalize='none'
					textContentType='emailAddress'
					keyboardType='email-address'
				/>

				<View style={{ marginTop: 16 }}>
					<TextInput
						style={{ borderWidth: 1, borderRadius: 100, borderColor: '#475569', padding: 16 }}
						onChangeText={setPassword}
						value={password}
						placeholder='Senha'
						textContentType='password'
						secureTextEntry
					/>
				</View>

				<TouchableOpacity>
					<Text style={{ color: '#3b82f6', textAlign: 'right', marginTop: 8, marginRight: 4 }}>Esqueceu sua senha?</Text>
				</TouchableOpacity>

				<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
					<TouchableOpacity onPress={login}>
						<LinearGradient colors={['#3b82f6', '#6366f1']} start={{ x: 0.4, y: 0 }} style={{ padding: 24, width: 256, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
							<Text style={{ color: '#ffffff' }}>Entrar</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginTop: 8 }} onPress={() => router.push('/createAccount')}>
					<Text>Não tem uma conta? <Text style={{ fontWeight: '600', color: '#3b82f6' }}>Criar agora</Text></Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}