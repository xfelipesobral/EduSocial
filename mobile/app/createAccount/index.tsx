import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

export default function CreateAccount() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [birthdayDate, setBirthdayDate] = useState<Date>()
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false)

    return (
        <SafeAreaView className='flex-1 p-2 bg-slate-200'>
            <View className='flex'>
                <View className='absolute h-full justify-center left-1'>
                    <TouchableOpacity className='z-10' onPress={() => router.back()}>
                        <Text>cancelar</Text>
                    </TouchableOpacity>
                </View>

                <Text className='text-center text-2xl'>Edu<Text className='font-semibold'>Social</Text></Text>
            </View>
            <View className='m-1'>
                <Text className='text-2xl my-3 mt-10'>Criar uma conta</Text>

                <View className='mt-4'>
                    <Text>Nome completo</Text>
                    <TextInput
                        className='border rounded-md border-slate-600 p-3 mt-1'
                        onChangeText={setName}
                        value={name}
                        placeholder='Seu nome completo'
                        autoCapitalize='words'
                        textContentType='name'
                    />
                </View>

                <View className='my-4'>
                    <Text>Email</Text>
                    <TextInput
                        className='border rounded-md border-slate-600 p-3 mt-1'
                        onChangeText={setEmail}
                        value={email}
                        placeholder='Ex: contato@edusocial.com.br'
                        autoCapitalize='none'
                        textContentType='emailAddress'
                        keyboardType='email-address'
                    />
                </View>

                <View>
                    <Text>Data de nascimento</Text>
                    <TouchableOpacity className='border rounded-md border-slate-600 p-3 mt-1' onPress={() => setDatePickerVisibility(true)}>
                        <Text>{ birthdayDate ? birthdayDate.toLocaleDateString('pt-BR')  : <Text className='text-gray-400'>Sua data de aniversário</Text> }</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        onConfirm={(date) => {
                            setBirthdayDate(date)
                            setDatePickerVisibility(false)
                        }}
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onCancel={() => setDatePickerVisibility(false)}
                        locale='pt-BR'
                        cancelTextIOS='Fechar'
                        confirmTextIOS='Confirmar'
                    />
                </View>
            </View>
            <View className='flex-1 justify-end items-end m-3'>
                <TouchableOpacity onPress={() => {
                    router.push('/createAccount/terms')
                }} className='bg-slate-700 p-3 px-6 rounded-md'>
                    <Text className='text-white'>Próxima etapa</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}