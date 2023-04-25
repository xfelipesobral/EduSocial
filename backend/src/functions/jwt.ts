import { sign as signToken, SignOptions, verify as verifyToken } from 'jsonwebtoken'

export function generateToken(userId: string, expiresIn: SignOptions['expiresIn']) {
    const token = signToken({}, process.env.EDUSOCIAL_SECRET, {
        subject: userId,
        issuer: 'EduSocial-API',
        expiresIn
    })

    return token
}

export function decoteToken(token: string) {
    return verifyToken(token, process.env.EDUSOCIAL_SECRET)
}

export function generateAccessToken(userId: string) {
    return generateToken(userId, '1h')
}

export function generateRefreshToken(userId: string) {
    return generateToken(userId, '7d')
}