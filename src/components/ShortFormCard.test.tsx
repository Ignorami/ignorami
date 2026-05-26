import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ShortFormCard } from './ShortFormCard'

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
  Anchor: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

const mockArticle = {
  id: 1,
  title: 'Short Form Title',
  slug: 'short-form-title',
  dek: 'A short dek',
  status: 'published' as const,
  contentType: 'short-form' as const,
  featured: false,
  publishedAt: '2026-01-15T12:00:00.000Z',
  createdAt: '2026-01-15T12:00:00.000Z',
  updatedAt: '2026-01-15T12:00:00.000Z',
  content: {
    root: { type: 'root', children: [], direction: null, format: '', indent: 0, version: 1 },
  } as any,
  author: { id: 1, name: 'Test Author', slug: 'test-author', avatar: null } as any,
  category: { id: 1, name: 'Test Category', slug: 'test-category' } as any,
  coverImage: null,
  seo: null,
  tags: [],
} as any

describe('ShortFormCard', () => {
  it('renders the article title', () => {
    render(<ShortFormCard article={mockArticle} />)
    expect(screen.getByText('Short Form Title')).toBeInTheDocument()
  })

  it('renders the dek', () => {
    render(<ShortFormCard article={mockArticle} />)
    expect(screen.getByText('A short dek')).toBeInTheDocument()
  })

  it('does not render dek when not provided', () => {
    render(<ShortFormCard article={{ ...mockArticle, dek: null }} />)
    expect(screen.queryByText('A short dek')).not.toBeInTheDocument()
  })

  it('renders the category name', () => {
    render(<ShortFormCard article={mockArticle} />)
    expect(screen.getByText('Test Category')).toBeInTheDocument()
  })

  it('links category to correct URL', () => {
    render(<ShortFormCard article={mockArticle} />)
    const categoryLink = screen.getByText('Test Category').closest('a')
    expect(categoryLink).toHaveAttribute('href', '/category/test-category')
  })

  it('does not render category when not provided', () => {
    render(<ShortFormCard article={{ ...mockArticle, category: null }} />)
    expect(screen.queryByText('Test Category')).not.toBeInTheDocument()
  })

  it('links title to correct article URL', () => {
    render(<ShortFormCard article={mockArticle} />)
    const titleLink = screen.getByText('Short Form Title').closest('a')
    expect(titleLink).toHaveAttribute('href', '/articles/short-form-title')
  })

  it('renders the published date in short format', () => {
    render(<ShortFormCard article={mockArticle} />)
    expect(screen.getByText('Jan 15')).toBeInTheDocument()
  })

  it('does not render date when publishedAt is not provided', () => {
    render(<ShortFormCard article={{ ...mockArticle, publishedAt: null }} />)
    expect(screen.queryByText('Jan 15')).not.toBeInTheDocument()
  })

  it('does not render an image', () => {
    render(<ShortFormCard article={mockArticle} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders as an article element', () => {
    const { container } = render(<ShortFormCard article={mockArticle} />)
    expect(container.querySelector('article')).toBeInTheDocument()
  })
})
