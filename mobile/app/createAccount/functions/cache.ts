import AsyncStorage from '@react-native-async-storage/async-storage'
import { IRegisterUser } from '../types'

const REGISTER_CACHE = 'SessionRegisterCache'

export function saveRegisterCache(user: IRegisterUser) {
    return AsyncStorage.setItem(REGISTER_CACHE, JSON.stringify(user))
}

export function getRegisterCache() {
    return AsyncStorage.getItem(REGISTER_CACHE)
}

export function destroyRegisterCache() {
    return AsyncStorage.removeItem(REGISTER_CACHE)
}