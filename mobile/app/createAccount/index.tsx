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
        <SafeAreaView style={{ flex: 1, padding: 8, backgroundColor: '#e2e8f0' }}>
            <View style={{ display: 'flex' }}>
                <View style={{ position: 'absolute', height: '100%', justifyContent: 'center', left: 4 }}>
                    <TouchableOpacity style={{ zIndex: 10 }} onPress={() => router.back()}>
                        <Text>cancelar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ textAlign: 'center', fontSize: 24 }}>Edu<Text style={{ fontWeight: '600' }}>Social</Text></Text>
            </View>
            <View style={{ margin: 4 }}>
                <Text style={{ fontSize: 24, marginVertical: 12, marginTop: 40 }}>Criar uma conta</Text>

                <View style={{ marginTop: 16 }}>
                    <Text>Nome completo</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderRadius: 6, borderColor: '#475569', padding: 12, marginTop: 4 }}
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
                        style={{ borderWidth: 1, borderRadius: 6, borderColor: '#475569', padding: 12, marginTop: 4 }}
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
                    <TouchableOpacity 
                        style={{ borderWidth: 1, borderRadius: 6, borderColor: '#475569', padding: 12, marginTop: 4 }} 
                        onPress={() => setDatePickerVisibility(true)}
                    >
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
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', margin: 12 }}>
                <TouchableOpacity onPress={() => {
                    router.push('/createAccount/terms')
                }} style={{ backgroundColor: '#4f46e5', padding: 12, paddingHorizontal: 24, width: '100%', alignItems: 'center', borderRadius: 6 }}>
                    <Text style={{ color: '#ffffff' }}>Próxima etapa</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}