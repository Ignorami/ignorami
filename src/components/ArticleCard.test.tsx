import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleCard } from './ArticleCard'
import { Article } from '@/payload-types'
import { ResolvedArticle } from '@/types/resolved'

vi.mock('next/link', () => ({
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, className }: any) => <img src={src} alt={alt} className={className} />,
}))

vi.mock('@mantine/core', () => ({
  Box: ({ children, component, className }: any) => {
    const Tag = component || 'div'
    return <Tag className={className}>{children}</Tag>
  },
  Text: ({ children, component, className }: any) => {
    const Tag = component || 'p'
    return <Tag className={className}>{children}</Tag>
  },
  Anchor: ({ children, href, component, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  Group: ({ children, className }: any) => <div className={className}>{children}</div>,
}))

vi.mock('./ContentTypeBadge', () => ({
  ContentTypeBadge: ({ contentType }: any) => (
    <span data-testid="content-type-badge">{contentType}</span>
  ),
}))

vi.mock('@/lib/readingTime', () => ({
  getReadingTime: () => '3 min read',
}))

const mockArticle: ResolvedArticle = {
  id: 1,
  title: 'Test Article Title',
  slug: 'test-article',
  dek: 'This is the article dek',
  status: 'published' as const,
  contentType: 'article' as const,
  featured: false,
  publishedAt: '2026-01-15T12:00:00.000Z',
  createdAt: '2026-01-15T00:00:00.000Z',
  updatedAt: '2026-01-15T00:00:00.000Z',
  content: {
    root: {
      type: 'root',
      children: [],
      direction: null,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  },
  author: {
    id: 1,
    name: 'Test Author',
    slug: 'test-author',
    avatar: null as any,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
  },
  category: {
    id: 1,
    name: 'Test Category',
    slug: 'test-category',
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
  },
  coverImage: {
    id: 1,
    url: 'https://example.com/image.jpg',
    alt: 'Test image',
    filename: 'image.jpg',
    mimeType: 'image/jpeg',
    filesize: 1000,
    width: 800,
    height: 600,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
  },
  seo: {
    metaTitle: 'blah',
    metaDescription: 'blah blah',
    ogImage: '' as any,
  },
  tags: [],
}

describe('ArticleCard', () => {
  it('renders the article title', () => {
    render(<ArticleCard article={mockArticle} />)
    expect(screen.getByText('Test Article Title')).toBeInTheDocument()
  })

  it('renders the article dek', () => {
    render(<ArticleCard article={mockArticle} />)
    expect(screen.getByText('This is the article dek')).toBeInTheDocument()
  })

  it('renders the author name', () => {
    render(<ArticleCard article={mockArticle} />)
    expect(screen.getByText('By Test Author')).toBeInTheDocument()
  })

  it('renders the category name', () => {
    render(<ArticleCard article={mockArticle} />)
    expect(screen.getByText('Test Category')).toBeInTheDocument()
  })

  it('links category to correct URL', () => {
    render(<ArticleCard article={mockArticle} />)
    const categoryLink = screen.getByText('Test Category').closest('a')
    expect(categoryLink).toHaveAttribute('href', '/category/test-category')
  })

  it('links title to correct article URL', () => {
    render(<ArticleCard article={mockArticle} />)
    const titleLink = screen.getByText('Test Article Title').closest('a')
    expect(titleLink).toHaveAttribute('href', '/articles/test-article')
  })

  it('renders the cover image', () => {
    render(<ArticleCard article={mockArticle} />)
    const img = screen.getByAltText('Test image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('links cover image to article URL', () => {
    render(<ArticleCard article={mockArticle} />)
    const img = screen.getByAltText('Test image')
    const link = img.closest('a')
    expect(link).toHaveAttribute('href', '/articles/test-article')
  })

  it('renders the published date', () => {
    render(<ArticleCard article={mockArticle} />)
    expect(screen.getByText('January 15, 2026')).toBeInTheDocument()
  })

  it('renders the reading time', () => {
    render(<ArticleCard article={mockArticle} />)
    expect(screen.getByText('3 min read')).toBeInTheDocument()
  })

  it('does not render date when publishedAt is not provided', () => {
    render(<ArticleCard article={{ ...mockArticle, publishedAt: null }} />)
    expect(screen.queryByText('January 15, 2026')).not.toBeInTheDocument()
  })

  it('does not render content type badge for article type', () => {
    render(<ArticleCard article={mockArticle} />)
    expect(screen.queryByTestId('content-type-badge')).not.toBeInTheDocument()
  })

  it('renders content type badge for short-form type', () => {
    render(<ArticleCard article={{ ...mockArticle, contentType: 'short-form' }} />)
    expect(screen.getByTestId('content-type-badge')).toBeInTheDocument()
  })

  it('uses title as image alt text when coverImage alt is missing', () => {
    render(
      <ArticleCard
        article={{
          ...mockArticle,
          coverImage: { ...(mockArticle.coverImage as any), alt: '' },
        }}
      />,
    )
    expect(screen.getByAltText('Test Article Title')).toBeInTheDocument()
  })

  it('applies featured class when featured prop is true', () => {
    const { container } = render(<ArticleCard article={mockArticle} featured />)
    const article = container.querySelector('article')
    expect(article?.className).toContain('featured')
  })

  it('does not apply featured class by default', () => {
    const { container } = render(<ArticleCard article={mockArticle} />)
    const article = container.querySelector('article')
    expect(article?.className).not.toContain('featured')
  })
})
