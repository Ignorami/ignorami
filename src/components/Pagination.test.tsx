import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string
    children: React.ReactNode
    className?: string
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

// Mock Mantine Group
vi.mock('@mantine/core', () => ({
  Group: ({ children, ...props }: { children: React.ReactNode }) => (
    <div {...props}>{children}</div>
  ),
}))

describe('Pagination', () => {
  it('renders nothing when totalPages is 1', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when totalPages is 0', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={0} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('shows page count', () => {
    render(<Pagination currentPage={2} totalPages={5} />)
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument()
  })

  it('shows disabled Newer on first page', () => {
    render(<Pagination currentPage={1} totalPages={3} />)
    expect(screen.getByText('← Newer').tagName).toBe('SPAN')
  })

  it('shows disabled Older on last page', () => {
    render(<Pagination currentPage={3} totalPages={3} />)
    expect(screen.getByText('Older →').tagName).toBe('SPAN')
  })

  it('links Newer to / on page 2', () => {
    render(<Pagination currentPage={2} totalPages={5} />)
    const newer = screen.getByText('← Newer')
    expect(newer.tagName).toBe('A')
    expect(newer).toHaveAttribute('href', '/')
  })

  it('links Newer to /page/N-1 on pages beyond 2', () => {
    render(<Pagination currentPage={4} totalPages={5} />)
    const newer = screen.getByText('← Newer')
    expect(newer.tagName).toBe('A')
    expect(newer).toHaveAttribute('href', '/page/3')
  })

  it('links Older to /page/N+1', () => {
    render(<Pagination currentPage={2} totalPages={5} />)
    const older = screen.getByText('Older →')
    expect(older.tagName).toBe('A')
    expect(older).toHaveAttribute('href', '/page/3')
  })

  it('shows both links as active on a middle page', () => {
    render(<Pagination currentPage={3} totalPages={5} />)
    expect(screen.getByText('← Newer').tagName).toBe('A')
    expect(screen.getByText('Older →').tagName).toBe('A')
  })

  it('shows both as disabled on single page beyond 1', () => {
    render(<Pagination currentPage={1} totalPages={2} />)
    expect(screen.getByText('← Newer').tagName).toBe('SPAN')
    expect(screen.getByText('Older →').tagName).toBe('A')
  })
})
