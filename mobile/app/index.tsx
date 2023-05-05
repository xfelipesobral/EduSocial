import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function Page() {

	return (
		<View className='flex-1 bg-gray-800 items-center justify-center'>
			<Link href='/login'>
				<Text className='text-white'>teste aaaaaaaaaaaaa</Text>
			</Link>
			<StatusBar style='light' />
		</View>
	)
}