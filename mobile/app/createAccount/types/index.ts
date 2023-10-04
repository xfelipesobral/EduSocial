export interface IRegisterUser {
    fullname: string
    email: string
    date: Date
    confirmationCode: string
    password: string
    notifications: {
        receiveEmails: boolean
        connectWithNeighbors: boolean
        receiveNotifications: boolean
        termsOfUse: boolean
        privacyPolicy: boolean
    }
}