import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

export default function Login() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	return (
		<SafeAreaView className='flex-1 justify-center p-2 bg-slate-200' >
			<View className='my-4'>
				<Text className='text-center text-2xl'>Edu<Text className='font-semibold'>Social</Text></Text>
				<Text className='text-center'>Criar slogan</Text>
			</View>

			<View className='m-3'>
				<Text className='text-gray-700 font-semibold text-lg text-center mb-4'>Entrar com seu email e senha</Text>

				<TextInput
					className='border rounded-full border-slate-600 p-4'
					onChangeText={setEmail}
					value={email}
					placeholder='Email'
					autoCapitalize='none'
					textContentType='emailAddress'
					keyboardType='email-address'
				/>

				<View className='mt-4'>
					<TextInput
						className='border rounded-full border-slate-600 p-4'
						onChangeText={setPassword}
						value={password}
						placeholder='Senha'
						textContentType='password'
						secureTextEntry
					/>
				</View>

				<TouchableOpacity>
					<Text className='text-sky-600 text-right mt-2 text-xs'>Esqueceu sua senha?</Text>
				</TouchableOpacity>

				<View className='items-center justify-center mt-6'>
					<TouchableOpacity>
						<LinearGradient colors={['#3b82f6', '#6366f1']} start={{ x: 0.4, y: 0 }} className='p-5 w-64 items-center justify-center rounded-full'>
							<Text className='text-white'>Entrar</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>

				<TouchableOpacity className='items-center justify-center mt-5' onPress={() => router.push('/createAccount')}>
					<Text>Não tem uma conta? <Text className='font-semibold text-sky-700'>Criar agora</Text></Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}