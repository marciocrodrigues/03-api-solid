import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepostiory implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<{
    id: string
    created_at: Date
    validated_at: Date | null
    user_id: string
    gym_id: string
  }> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByUSerIdOnDate(
    userId: string,
    date: Date,
  ): Promise<{
    id: string
    created_at: Date
    validated_at: Date | null
    user_id: string
    gym_id: string
  } | null> {
    const startOfTheDay = dayjs(date).startOf('date') // pega o dia com seu inicio
    const endOfTheDay = dayjs(date).endOf('date') // pega o final do dia

    const checkOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay) // valida se a data do checkIn esta entre o inicio e fim do dia

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }
}
