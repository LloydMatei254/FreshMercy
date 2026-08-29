import { describe, it, expect } from 'vitest'
import { slugify, truncate, estimateReadingTime } from '@/lib/utils'

describe('slugify', () => {
  it('converts title to slug', () => {
    expect(slugify('Running Toward the Prodigal')).toBe('running-toward-the-prodigal')
  })

  it('removes special characters', () => {
    expect(slugify("God's Mercy!")).toBe('gods-mercy')
  })

  it('collapses multiple dashes', () => {
    expect(slugify('Fresh  Mercy')).toBe('fresh-mercy')
  })
})

describe('truncate', () => {
  it('does not truncate short strings', () => {
    expect(truncate('Short', 100)).toBe('Short')
  })

  it('truncates long strings', () => {
    const long = 'The steadfast love of the LORD never ceases; his mercies never come to an end'
    const result = truncate(long, 30)
    expect(result.length).toBeLessThanOrEqual(33) // + ellipsis
    expect(result.endsWith('…')).toBe(true)
  })
})

describe('estimateReadingTime', () => {
  it('returns at least 1 minute', () => {
    expect(estimateReadingTime('short')).toBe(1)
  })

  it('estimates based on 200 wpm', () => {
    const words = Array.from({ length: 400 }, (_, i) => `word${i}`).join(' ')
    expect(estimateReadingTime(words)).toBe(2)
  })
})
