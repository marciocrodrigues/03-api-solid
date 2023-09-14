import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-erro'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const authenticateUserCase = new AuthenticateUseCase(userRepository)

    await authenticateUserCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
