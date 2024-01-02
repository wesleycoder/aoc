import { describe, expect, it } from 'bun:test'
import run from './'

describe('2023/1 part One', () => {
  it('should return correctly for sample input', async () => {
    expect(await run('sample1.txt')).toEqual(0)
  })
  it('should return correctly for main input', async () => {
    expect(await run('input.txt')).toEqual(0)
  })
})
