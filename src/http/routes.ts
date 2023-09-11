import { FastifyInstance } from 'fastify'
import { createUser } from './controllers/register.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
}
