import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'

import PagerView from 'react-native-pager-view'

import imgNetwork from '../../assets/apresentation/network.png'

interface IParamsSlide {
    key: string
    image: string
    title: string
    description: string
}

export default function Apresentation() {

    const Slide = ({ key, image, title, description }: IParamsSlide) => (
        <View key={key} className='flex-1'>
            <View className='flex-1 items-center justify-center'>
                <Image
                    source={image}
                    className='w-[100%] h-[100%] max-w-[500px] p-2'
                    contentFit='contain'
                />
            </View>
            <View className='p-3 m-3 bg-slate-100 rounded-md'>
                <Text className='font-semibold text-lg text-slate-700'>{title}</Text>
                <Text className='mt-1'>{description}</Text>
            </View>
        </View>
    )

    return (
        <View className='flex-1 bg-slate-50' >
            <PagerView className='flex-1' initialPage={0}>
                <Slide
                    key='1'
                    image={imgNetwork}
                    title='EduSocial'
                    description='Cadastre-se agora e tenha acesso a uma agenda escolar detalhada, notificações de eventos imperdíveis e recursos de aprendizado incríveis!'
                />
                <Slide
                    key='2'
                    image={imgNetwork}
                    title='Fique por dentro de tudo'
                    description='O EduSocial mantém você sempre conectado com o que acontece nas instituições que você estuda'
                />
                <Slide
                    key='3'
                    image={imgNetwork}
                    title='Educação é parceria'
                    description='recursos de estudo, links úteis e agendamento de reuniões diretamente no app'
                />
            </PagerView>
            <View className='p-5'>
                <TouchableOpacity className='bg-sky-600 items-center justify-center rounded-md mb-2'>
                    <Text className='text-white font-semibold text-lg p-3'>Começar a usar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}