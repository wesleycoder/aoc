import { describe, expect, it } from 'bun:test'
import { resolve } from 'path'
import partOne from './'

describe('2023/1 part One', () => {
  it.only('should return correctly for sample input', async () => {
    expect(await partOne(resolve(__dirname, 'sample.txt'))).toEqual(8722)
  })
  it('should return correctly for main input', async () => {
    expect(await partOne(resolve(__dirname, '../input.txt'))).toEqual(0)
  })
})
