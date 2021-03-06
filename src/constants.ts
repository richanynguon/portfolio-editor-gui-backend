import * as dotenv from 'dotenv'

dotenv.config()
export const SESSION_SECRET = process.env.SESSION_SECRET
export const PG_USERNAME = process.env.PG_USERNAME
export const PG_PASSWORD = process.env.PG_PASSWORD
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
export const SENDGRID_USERNAME = process.env.SENDGRID_USERNAME
export const VOTE_PREFIX = process.env.VOTE_PREFIX