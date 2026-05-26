import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NavbarClient } from './NavbarClient'

vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

vi.mock('@mantine/core', () => ({
  Box: ({ children, component, className, style }: any) => {
    const Tag = component || 'div'
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    )
  },

  Container: ({ children }: any) => <div>{children}</div>,
  Group: ({ children, className }: any) => <div className={className}>{children}</div>,
  Text: ({ children, component, className }: any) => {
    const Tag = component || 'p'
    return <Tag className={className}>{children}</Tag>
  },
  Anchor: ({
    children,
    href,
    component,
    className,
    onClick,
    'aria-label': ariaLabel,
    style,
  }: any) => (
    <a href={href} className={className} onClick={onClick} aria-label={ariaLabel} style={style}>
      {children}
    </a>
  ),
  Burger: ({ opened, onClick }: any) => (
    <button onClick={onClick} aria-label="menu" aria-expanded={opened}>
      {opened ? 'Close' : 'Open'}
    </button>
  ),
}))

vi.mock('react-icons/ri', () => ({
  RiSearchLine: () => <svg data-testid="search-icon" />,
}))

const mockCategories = [
  { id: 1, name: 'Politics', slug: 'politics' },
  { id: 2, name: 'Science', slug: 'science' },
  { id: 3, name: 'Culture', slug: 'culture' },
  { id: 4, name: 'Sports', slug: 'sports' },
  { id: 5, name: 'Tech', slug: 'tech' },
  { id: 6, name: 'Lifestyle', slug: 'lifestyle' },
  { id: 7, name: 'Business', slug: 'business' },
  { id: 8, name: 'Health', slug: 'health' },
]

beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('NavbarClient', () => {
  it('renders the Ignorami wordmark', () => {
    render(<NavbarClient categories={mockCategories} />)
    const wordmarks = screen.getAllByText('Ignorami')
    expect(wordmarks.length).toBeGreaterThan(0)
  })

  it('links wordmark to homepage', () => {
    render(<NavbarClient categories={mockCategories} />)
    const wordmarks = screen.getAllByText('Ignorami')
    wordmarks.forEach((w) => {
      expect(w.closest('a')).toHaveAttribute('href', '/')
    })
  })

  it('renders the tagline', () => {
    render(<NavbarClient categories={mockCategories} />)
    const taglines = screen.getAllByText('Journalism, but worse.')
    expect(taglines.length).toBeGreaterThan(0)
  })

  it('renders the current date', () => {
    render(<NavbarClient categories={mockCategories} />)
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    expect(screen.getByText(date)).toBeInTheDocument()
  })

  it('renders primary categories in desktop nav', () => {
    render(<NavbarClient categories={mockCategories} />)
    expect(screen.getAllByText('Politics').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Science').length).toBeGreaterThan(0)
  })

  it('renders More button when categories exceed PRIMARY_COUNT', () => {
    render(<NavbarClient categories={mockCategories} />)
    expect(screen.getByText(/More/)).toBeInTheDocument()
  })

  it('does not render More button when categories are within PRIMARY_COUNT', () => {
    render(<NavbarClient categories={mockCategories.slice(0, 6)} />)
    expect(screen.queryByText(/More/)).not.toBeInTheDocument()
  })

  it('toggles More dropdown when More button is clicked', () => {
    render(<NavbarClient categories={mockCategories} />)
    const moreButton = screen.getByText(/More/)
    expect(moreButton).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(moreButton)
    expect(moreButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('shows overflow categories in More dropdown', () => {
    render(<NavbarClient categories={mockCategories} />)
    fireEvent.click(screen.getByText(/More/))
    expect(screen.getAllByText('Business').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Health').length).toBeGreaterThan(0)
  })

  it('More button shows ▴ when open', () => {
    render(<NavbarClient categories={mockCategories} />)
    const moreButton = screen.getByText(/More/)
    fireEvent.click(moreButton)
    expect(screen.getByText('More ▴')).toBeInTheDocument()
  })

  it('More button shows ▾ when closed', () => {
    render(<NavbarClient categories={mockCategories} />)
    expect(screen.getByText('More ▾')).toBeInTheDocument()
  })

  it('renders search icon link', () => {
    render(<NavbarClient categories={mockCategories} />)
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('links search icon to search page', () => {
    render(<NavbarClient categories={mockCategories} />)
    const searchLink = screen.getByLabelText('Search')
    expect(searchLink).toHaveAttribute('href', '/search')
  })

  it('opens mobile menu when burger is clicked', () => {
    render(<NavbarClient categories={mockCategories} />)
    const burger = screen.getByLabelText('menu')
    expect(burger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders all categories in mobile menu', () => {
    render(<NavbarClient categories={mockCategories} />)
    // All 8 categories appear in mobile nav
    mockCategories.forEach((cat) => {
      expect(screen.getAllByText(cat.name).length).toBeGreaterThan(0)
    })
  })

  it('renders Search link in mobile menu', () => {
    render(<NavbarClient categories={mockCategories} />)
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('links Search in mobile menu to search page', () => {
    render(<NavbarClient categories={mockCategories} />)
    const searchLink = screen.getByText('Search').closest('a')
    expect(searchLink).toHaveAttribute('href', '/search')
  })

  it('closes mobile menu when category link is clicked', () => {
    render(<NavbarClient categories={mockCategories} />)
    const burger = screen.getByLabelText('menu')
    fireEvent.click(burger)
    expect(burger).toHaveAttribute('aria-expanded', 'true')
    const mobileLinks = screen.getAllByText('Politics')
    fireEvent.click(mobileLinks[mobileLinks.length - 1])
    expect(burger).toHaveAttribute('aria-expanded', 'false')
  })

  it('links primary categories to correct URLs', () => {
    render(<NavbarClient categories={mockCategories} />)
    const politicsLinks = screen.getAllByText('Politics')
    politicsLinks.forEach((link) => {
      expect(link.closest('a')).toHaveAttribute('href', '/category/politics')
    })
  })

  it('renders with empty categories', () => {
    render(<NavbarClient categories={[]} />)
    expect(screen.getAllByText('Ignorami').length).toBeGreaterThan(0)
    expect(screen.queryByText(/More/)).not.toBeInTheDocument()
  })
})
