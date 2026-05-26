import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ReadingProgressBar } from './ReadingProgressBar'

beforeEach(() => {
  // Set up scrollable document
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    writable: true,
    configurable: true,
    value: 1000,
  })
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 })
})

afterEach(() => {
  vi.restoreAllMocks()
})

function fireScroll(scrollY: number) {
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: scrollY })
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
}

describe('ReadingProgressBar', () => {
  it('renders the track and bar elements', () => {
    render(<ReadingProgressBar />)
    expect(screen.getByTestId('progress-track')).toBeInTheDocument()
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument()
  })

  it('starts at 0% progress', () => {
    render(<ReadingProgressBar />)
    const bar = screen.getByTestId('progress-bar') as HTMLElement
    expect(bar.style.width).toBe('0%')
  })

  it('updates progress on scroll', () => {
    render(<ReadingProgressBar />)
    // scrollHeight = 1000, innerHeight = 500, so docHeight = 500
    // scrollY = 250 → 50%
    fireScroll(250)
    const bar = screen.getByTestId('progress-bar') as HTMLElement
    expect(bar.style.width).toBe('50%')
  })

  it('caps progress at 100%', () => {
    render(<ReadingProgressBar />)
    fireScroll(1000)
    const bar = screen.getByTestId('progress-bar') as HTMLElement
    expect(bar.style.width).toBe('100%')
  })

  it('shows 0% when docHeight is 0', () => {
    render(<ReadingProgressBar />)
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 500,
    })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 })
    fireScroll(0)
    const bar = screen.getByTestId('progress-bar') as HTMLElement
    expect(bar.style.width).toBe('0%')
  })

  it('rounds progress to nearest integer', () => {
    render(<ReadingProgressBar />)
    // scrollY = 100, docHeight = 500 → 20%
    fireScroll(100)
    const bar = screen.getByTestId('progress-bar') as HTMLElement
    expect(bar.style.width).toBe('20%')
  })

  it('removes scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<ReadingProgressBar />)
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('adds scroll listener on mount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    render(<ReadingProgressBar />)
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {
      passive: true,
    })
  })
})
