import { describe, expect, it } from 'bun:test'
import { resolve } from 'path'
import run from './'

describe('2023/1 part2', () => {
  it('should return correctly for sample input', async () => {
    expect(await run(resolve(__dirname, 'sample.txt'))).toEqual(281)
  })
  it('should return correctly for main input', async () => {
    expect(await run(resolve(__dirname, '../input.txt'))).toEqual(55902)
  })
})
