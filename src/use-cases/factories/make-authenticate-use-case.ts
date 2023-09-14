import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase(): AuthenticateUseCase {
  const userRepository = new PrismaUsersRepository()
  const authenticateUserCase = new AuthenticateUseCase(userRepository)

  return authenticateUserCase
}
