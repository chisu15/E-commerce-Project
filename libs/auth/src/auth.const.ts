import * as dotenv from 'dotenv'

dotenv.config()

export const ROLES_KEY = 'roles'
export const USER_KEY = 'user'
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXP = process.env.JWT_EXP
