import { PrismaClient } from "../generated/prisma/client.ts";
import {PrismaPg} from "@prisma/adapter-pg";


export type GetDbParams = {
  connectionString: string
}

export function getDb({ connectionString }: GetDbParams): PrismaClient {
  const pool = new PrismaPg({ connectionString })
  const prisma = new PrismaClient({ adapter: pool })

  return prisma
}