import { describe, expect, it } from 'bun:test'
import { resolve } from 'path'
import run from './'

describe('2023/1 part1', () => {
  it('should return correctly for sample input', async () => {
    expect(await run(resolve(__dirname, 'sample.txt'))).toEqual(142)
  })
  it('should return correctly for main input', async () => {
    expect(await run(resolve(__dirname, '../input.txt'))).toEqual(56465)
  })
})
