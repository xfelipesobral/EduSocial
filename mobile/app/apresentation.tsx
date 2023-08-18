import { View, Text, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import constants from 'expo-constants'
import { Link } from 'expo-router'
import { Image } from 'expo-image'

import PagerView from 'react-native-pager-view'

import imgNetwork from '../assets/apresentation/network.png'
import imgClassroom from '../assets/apresentation/classroom.png'
import imgSchool from '../assets/apresentation/school.png'

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
            <View className='p-3 m-3 bg-slate-100 rounded-md'>
                <Text className='font-semibold text-lg text-slate-700'>{title}</Text>
                <Text className='mt-1'>{description}</Text>
            </View>
        </View>
    )

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: withSpring(currentPageTranslateX.value)
        }]
    }))

    return (
        <View className='flex-1 bg-slate-50' style={{ paddingTop: constants.statusBarHeight }} >
            <Text className='text-center text-xl my-3' >Edu<Text className='font-semibold'>Social</Text></Text>
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
                <View className='h-2 mx-3 bg-slate-200 rounded-full'>
                    <Animated.View
                        style={[{ 
                            height: '100%', 
                            width: 123, 
                            backgroundColor: '#64748b',
                            borderRadius: 100,  
                        }, animatedStyle]}
                    />
                </View>
            </View>
            <View className='p-3 mb-2'>
                <Link href='/login' asChild>
                    <TouchableOpacity className='bg-sky-600 items-center justify-center rounded-md mb-2'>
                        <Text className='text-white font-semibold text-lg p-3'>Começar a usar</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}