import { InMemoryCheckInsRepostiory } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymsRepostiory } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInsRepostiory
let gymsRepository: InMemoryGymsRepostiory
let sut: CheckInUseCase

describe('Check-in User Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepostiory()
    gymsRepository = new InMemoryGymsRepostiory()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    vi.useFakeTimers()

    gymsRepository.items.push({
      id: 'gym-1',
      title: 'gym-1',
      description: 'gym-1',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -27.20922052,
      userLongitude: -49.64011091,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: -27.20922052,
        userLongitude: -49.64011091,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -27.20922052,
      userLongitude: -49.64011091,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -27.20922052,
      userLongitude: -49.64011091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
