import { router } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface IPermission {
    id: string
    title: string
    description: string
    link?: string
}

export default function CreateAccountTerms() {

    const Permission = ({ title, description }: IPermission) => (
        <TouchableOpacity className='my-2 flex-row bg-white p-2 rounded-md'>
            <View className='h-full w-2 bg-green-600 rounded-full' />
            <View className='flex-1 ml-2'>
                <Text className='font-semibold'>{title}</Text>
                <Text>{description}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView className='flex-1 p-2 bg-slate-200'>
            <View className='flex'>
                <View className='absolute h-full justify-center left-1'>
                    <TouchableOpacity className='z-10' onPress={() => router.back()}>
                        <Text>voltar</Text>
                    </TouchableOpacity>
                </View>

                <Text className='text-center text-2xl'>Edu<Text className='font-semibold'>Social</Text></Text>
            </View>
            <View className='m-1'>
                <Text className='text-2xl my-3 mt-10'>Customizar sua experiência</Text>

                <View className='mt-2'>
                    <Permission
                        id='emails'
                        title='Receber emails'
                        description='Enviaremos emails de ajuda, notícias e avisos'
                    />
                    <Permission
                        id='known'
                        title='Conectar com conhecidos'
                        description='Buscaremos em sua agenda telefonica colegas que já estão cadastrados no EduSocial'
                    />
                    <Permission
                        id='notifications'
                        title='Receber notificações'
                        description='Enviaremos notificações de notícias, avisos e novidades'
                    />
                    <Permission
                        id='termsOfUse'
                        title='Termos de uso'
                        link='#'
                        description='Enviaremos notificações de notícias, avisos e novidades'
                    />
                    <Permission
                        id='privacyPolicies'
                        title='Política de privacidade'
                        link='#'
                        description='Enviaremos notificações de notícias, avisos e novidades'
                    />
                </View>
            </View>
            <View className='flex-1 justify-end items-end m-3'>
                <TouchableOpacity onPress={() => {
                    router.push('/createAccount/confirmation')
                }} className='bg-indigo-600 p-3 px-6 w-full items-center rounded-md'>
                    <Text className='text-white'>Confirmar conta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}