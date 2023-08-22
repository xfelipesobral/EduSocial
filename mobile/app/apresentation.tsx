import { View, Text, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import constants from 'expo-constants'
import { Link } from 'expo-router'
import { Image } from 'expo-image'

import PagerView from 'react-native-pager-view'

import imgNetwork from '../assets/apresentation/network.png'
import imgClassroom from '../assets/apresentation/classroom.png'
import imgSchool from '../assets/apresentation/school.png'
import { LinearGradient } from 'expo-linear-gradient'

interface IParamsSlide {
    key: string
    image: string
    title: string
    description: string
}

const pages = [
    {
        image: imgNetwork,
        title: 'Bem-vindo',
        description: 'Cadastre-se agora e tenha acesso a uma agenda escolar detalhada, notificações de eventos imperdíveis e recursos de aprendizado incríveis!'
    },
    {
        image: imgClassroom,
        title: 'Fique por dentro de tudo',
        description: 'O EduSocial mantém você sempre conectado com o que acontece nas instituições que você estuda'
    },
    {
        image: imgSchool,
        title: 'Educação é parceria',
        description: 'recursos de estudo, links úteis e agendamento de reuniões diretamente no app'
    }
]

export default function Apresentation() {
    const currentPageTranslateX = useSharedValue(0)

    const Slide = ({ key, image, title, description }: IParamsSlide) => (
        <View key={key} className='flex-1'>
            <View className='flex-1 items-center justify-center'>
                <Image
                    source={image}
                    className='w-[100%] h-[100%] max-w-[500px] p-2'
                    contentFit='contain'
                />
            </View>
            <View className='p-3 m-3 rounded-md'>
                <Text className='font-semibold text-lg text-white'>{title}</Text>
                <Text className='mt-1 text-white'>{description}</Text>
            </View>
        </View>
    )

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: withSpring(currentPageTranslateX.value)
        }]
    }))

    return (
        <View className='flex-1 bg-slate-50'>
            <LinearGradient colors={['#3b82f6', '#6366f1']} className='flex-1 absolute z-0 w-full h-full' />

            <View style={{ paddingTop: constants.statusBarHeight + 10 }} className='flex-1'>
                <Text className='text-center text-2xl my-3 text-white' >Edu<Text className='font-semibold'>Social</Text></Text>
                <PagerView className='flex-1' initialPage={0} onPageSelected={({ nativeEvent: { position } }) => {
                    currentPageTranslateX.value = 123 * position
                }}>
                    {
                        pages.map((slideParams, i) => (
                            <Slide
                                key={`slide-${i}`}
                                {...slideParams}
                            />
                        ))
                    }
                </PagerView>
                <View>
                    <View className='h-2 mx-3 bg-indigo-600 opacity-80 rounded-full'>
                        <Animated.View
                            style={[{
                                height: '100%',
                                width: 123,
                                backgroundColor: '#ffffff',
                                borderRadius: 100,
                            }, animatedStyle]}
                        />
                    </View>
                </View>
                <View className='p-3 mb-6'>
                    <Link href='/login' asChild>
                        <TouchableOpacity className='bg-white items-center justify-center rounded-md mb-1'>
                            <Text className='text-lg p-3'>Entrar agora</Text>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity className='mt-2'>
                        <Text className='text-center text-white'>Não tem uma conta? <Text className='font-bold'>Criar agora</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}