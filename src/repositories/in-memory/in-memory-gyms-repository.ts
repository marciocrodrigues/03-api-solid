import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepostiory implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<{
    id: string
    title: string
    description: string | null
    phone: string | null
    latitude: Prisma.Decimal
    longitude: Prisma.Decimal
  } | null> {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
