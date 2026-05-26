import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

vi.mock('@mantine/core', () => ({
  Box: ({ children, component, className }: any) => {
    const Tag = component || 'div'
    return <Tag className={className}>{children}</Tag>
  },
  Container: ({ children }: any) => <div>{children}</div>,
  Group: ({ children, component, className }: any) => {
    const Tag = component || 'div'
    return <Tag className={className}>{children}</Tag>
  },
  Text: ({ children, className }: any) => <p className={className}>{children}</p>,
  Anchor: ({ children, href, className, 'aria-label': ariaLabel, target, rel }: any) => (
    <a href={href} className={className} aria-label={ariaLabel} target={target} rel={rel}>
      {children}
    </a>
  ),
}))

vi.mock('react-icons/ri', () => ({
  RiTwitterXFill: () => <svg data-testid="icon-x" />,
  RiBlueskyFill: () => <svg data-testid="icon-bluesky" />,
  RiRedditFill: () => <svg data-testid="icon-reddit" />,
}))

describe('Footer', () => {
  it('renders the Ignorami brand name', () => {
    render(<Footer />)
    expect(screen.getByText('Ignorami')).toBeInTheDocument()
  })

  it('renders the About link', () => {
    render(<Footer />)
    const link = screen.getByText('About').closest('a')
    expect(link).toHaveAttribute('href', '/about')
  })

  it('renders the Privacy Policy link', () => {
    render(<Footer />)
    const link = screen.getByText('Privacy Policy').closest('a')
    expect(link).toHaveAttribute('href', '/privacy')
  })

  it('renders the Buy Me a Coffee link', () => {
    render(<Footer />)
    const link = screen.getByText('☕ Buy Me a Coffee').closest('a')
    expect(link).toHaveAttribute('href', 'https://buymeacoffee.com/ignorami')
  })

  it('renders Buy Me a Coffee link with target blank', () => {
    render(<Footer />)
    const link = screen.getByText('☕ Buy Me a Coffee').closest('a')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders the RSS link', () => {
    render(<Footer />)
    const link = screen.getByText('RSS').closest('a')
    expect(link).toHaveAttribute('href', '/feed.xml')
  })

  it('renders the X social icon', () => {
    render(<Footer />)
    expect(screen.getByTestId('icon-x')).toBeInTheDocument()
  })

  it('renders the X link with correct href', () => {
    render(<Footer />)
    const link = screen.getByLabelText('X')
    expect(link).toHaveAttribute('href', 'https://x.com/IgnoramiMedia')
  })

  it('renders the Bluesky social icon', () => {
    render(<Footer />)
    expect(screen.getByTestId('icon-bluesky')).toBeInTheDocument()
  })

  it('renders the Bluesky link with correct href', () => {
    render(<Footer />)
    const link = screen.getByLabelText('Bluesky')
    expect(link).toHaveAttribute('href', 'https://bsky.app/profile/ignorami.bsky.social')
  })

  it('renders the Reddit social icon', () => {
    render(<Footer />)
    expect(screen.getByTestId('icon-reddit')).toBeInTheDocument()
  })

  it('renders the Reddit link with correct href', () => {
    render(<Footer />)
    const link = screen.getByLabelText('Reddit')
    expect(link).toHaveAttribute('href', 'https://reddit.com/r/ignorami')
  })

  it('renders social links with target blank', () => {
    render(<Footer />)
    const xLink = screen.getByLabelText('X')
    const blueskyLink = screen.getByLabelText('Bluesky')
    const redditLink = screen.getByLabelText('Reddit')
    expect(xLink).toHaveAttribute('target', '_blank')
    expect(blueskyLink).toHaveAttribute('target', '_blank')
    expect(redditLink).toHaveAttribute('target', '_blank')
  })

  it('renders the copyright notice', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(`© ${year} Ignorami. All rights reserved, apparently.`),
    ).toBeInTheDocument()
  })

  it('renders as a footer element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('renders nav as a nav element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})
