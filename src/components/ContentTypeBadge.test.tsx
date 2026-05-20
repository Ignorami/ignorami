import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContentTypeBadge } from './ContentTypeBadge'

describe('ContentTypeBadge', () => {
  it('renders nothing for article content type', () => {
    const { container } = render(<ContentTypeBadge contentType="article" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders "Short Form" label for short-form content type', () => {
    render(<ContentTypeBadge contentType="short-form" />)
    expect(screen.getByText('Short Form')).toBeInTheDocument()
  })

  it('renders a span element for short-form', () => {
    render(<ContentTypeBadge contentType="short-form" />)
    expect(screen.getByText('Short Form').tagName).toBe('SPAN')
  })

  it('applies badge class for short-form', () => {
    render(<ContentTypeBadge contentType="short-form" />)
    const badge = screen.getByText('Short Form')
    expect(badge.className).toContain('badge')
    expect(badge.className).toContain('short_form')
  })
})
