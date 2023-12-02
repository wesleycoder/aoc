import { describe, expect, it } from 'bun:test'
import { partOne } from './part1'
import { partTwo } from './part2'

describe('2023/1', () => {
  describe('Part One', () => {
    it('should return 142 for sample input', async () => {
      expect(await partOne('sample1.txt')).toEqual(142)
    })
  })

  describe('Part Two', () => {
    it('should return 142 for sample input', async () => {
      expect(await partTwo('sample2.txt')).toEqual(281)
    })
  })
})
