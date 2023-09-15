import { InMemoryCheckInsRepostiory } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { describe, expect, it } from 'vitest'
import { beforeEach } from 'node:test'

let checkInRepository: InMemoryCheckInsRepostiory
let sut: CheckInUseCase

describe('Check-in User Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepostiory()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
