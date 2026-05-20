import { describe, it, expect } from 'vitest'
import { getReadingTime } from './readingTime'

describe('getReadingTime', () => {
  it('returns empty string for null content', () => {
    expect(getReadingTime(null as any)).toBe('')
  })

  it('returns "1 min read" for very short content', () => {
    const content = {
      root: { children: [{ text: 'Hello world' }] },
    }
    expect(getReadingTime(content)).toBe('1 min read')
  })

  it('calculates reading time for longer content', () => {
    const words = Array(300).fill('word').join(' ')
    const content = {
      root: { children: [{ text: words }] },
    }
    expect(getReadingTime(content)).toBe('2 min read')
  })

  it('rounds to nearest minute', () => {
    const words = Array(450).fill('word').join(' ')
    const content = {
      root: { children: [{ text: words }] },
    }
    expect(getReadingTime(content)).toBe('3 min read')
  })

  it('handles nested content nodes', () => {
    const content = {
      root: {
        children: [
          { children: [{ text: 'First paragraph' }] },
          { children: [{ text: 'Second paragraph' }] },
        ],
      },
    }
    expect(getReadingTime(content)).toBe('1 min read')
  })

  it('uses 150 words per minute reading speed', () => {
    const words = Array(150).fill('word').join(' ')
    const content = {
      root: { children: [{ text: words }] },
    }
    expect(getReadingTime(content)).toBe('1 min read')
  })
})
