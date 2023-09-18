import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

export default function CreateAccount() {
    const [password, setPassword] = useState<string>('')

    return (
        <SafeAreaView className='flex-1 p-2 bg-slate-200'>
            <View className='flex'>
                <Text className='text-center text-2xl'>Edu<Text className='font-semibold'>Social</Text></Text>
            </View>
            <View className='m-1'>
                <Text className='text-2xl my-3 mt-10'>Defina uma senha</Text>

                <View className='mt-4'>
                    <Text>Senha</Text>
                    <TextInput
                        className='border rounded-md border-slate-600 p-2 mt-1'
                        onChangeText={setPassword}
                        value={password}
                        placeholder='Min. 8 caracteres'
                        textContentType='password'
                        secureTextEntry
                    />
                </View>
            </View>
            <View className='flex-1 justify-end items-end m-3'>
                <TouchableOpacity onPress={() => {
                    router.push('/createAccount/terms')
                }} className='bg-indigo-600 p-3 px-6 w-full items-center rounded-md'>
                    <Text className='text-white'>Entrar no seu perfil</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}