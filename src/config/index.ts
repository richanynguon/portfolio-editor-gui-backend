import * as dotenv from 'dotenv'


dotenv.config()

export const origin = [
    'http://localhost:3000',
  ]

export const jwtSecret = process.env.JWT_SECRET;