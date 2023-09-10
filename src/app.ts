import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    email: 'teste@teste.com.br',
    name: 'teste',
  },
})

export const app = fastify()
