import { getDb } from '@repo/database';
import dotenv from "dotenv"

dotenv.config({
    path:"../../.env"
})

export const prismaClient : any = getDb({connectionString:process.env.DATABASE_URL!})