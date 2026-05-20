import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockFind = vi.fn()
vi.mock('./payload', () => ({
  getPayloadClient: () => ({ find: mockFind }),
}))

const { getArticles, getFeaturedArticle, getShortFormArticles } = await import('./getArticles')

const mockArticle = {
  id: 1,
  title: 'Test Article',
  slug: 'test-article',
  status: 'published',
  contentType: 'article',
  featured: false,
  publishedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  author: { id: 1, name: 'Test Author', slug: 'test-author' },
  category: { id: 1, name: 'Test Category', slug: 'test-category' },
  coverImage: null,
}

const mockShortFormArticle = {
  ...mockArticle,
  id: 2,
  title: 'Short Form Article',
  slug: 'short-form-article',
  contentType: 'short-form',
}

const mockFeaturedArticle = {
  ...mockArticle,
  id: 3,
  title: 'Featured Article',
  slug: 'featured-article',
  featured: true,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getArticles', () => {
  it('returns articles and pagination data', async () => {
    mockFind.mockResolvedValueOnce({ docs: [mockArticle], totalDocs: 1 })

    const result = await getArticles()

    expect(result.articles).toHaveLength(1)
    expect(result.articles[0].title).toBe('Test Article')
    expect(result.totalDocs).toBe(1)
  })

  it('calculates totalPages correctly', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 9 })
    const result = await getArticles()
    expect(result.totalPages).toBe(1)
  })

  it('calculates totalPages correctly for multiple pages', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 10 })
    const result = await getArticles()
    expect(result.totalPages).toBe(2)
  })

  it('calculates totalPages correctly for exact multiple', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 18 })
    const result = await getArticles()
    expect(result.totalPages).toBe(2)
  })

  it('calculates totalPages correctly for 0 docs', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 0 })
    const result = await getArticles()
    expect(result.totalPages).toBe(0)
  })

  it('queries only published articles', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 0 })
    await getArticles()
    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: { equals: 'published' },
        }),
      }),
    )
  })

  it('queries only article content type', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 0 })
    await getArticles()
    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          contentType: { equals: 'article' },
        }),
      }),
    )
  })

  it('sorts by publishedAt descending', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 0 })
    await getArticles()
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ sort: '-publishedAt' }))
  })

  it('uses correct page parameter', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 0 })
    await getArticles(3)
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ page: 3 }))
  })

  it('defaults to page 1', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 0 })
    await getArticles()
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }))
  })

  it('limits to 9 articles per page', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 0 })
    await getArticles()
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ limit: 9 }))
  })

  it('fetches with depth 2', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 0 })
    await getArticles()
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ depth: 2 }))
  })

  it('returns empty articles array when no docs', async () => {
    mockFind.mockResolvedValueOnce({ docs: [], totalDocs: 0 })
    const result = await getArticles()
    expect(result.articles).toEqual([])
  })
})

describe('getFeaturedArticle', () => {
  it('returns the featured article', async () => {
    mockFind.mockResolvedValueOnce({ docs: [mockFeaturedArticle] })
    const result = await getFeaturedArticle()
    expect(result).not.toBeNull()
    expect(result?.title).toBe('Featured Article')
  })

  it('returns null when no featured article', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    const result = await getFeaturedArticle()
    expect(result).toBeNull()
  })

  it('queries only published articles', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getFeaturedArticle()
    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: { equals: 'published' },
        }),
      }),
    )
  })

  it('queries only featured articles', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getFeaturedArticle()
    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          featured: { equals: true },
        }),
      }),
    )
  })

  it('limits to 1 result', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getFeaturedArticle()
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ limit: 1 }))
  })

  it('fetches with depth 2', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getFeaturedArticle()
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ depth: 2 }))
  })
})

describe('getShortFormArticles', () => {
  it('returns short form articles', async () => {
    mockFind.mockResolvedValueOnce({ docs: [mockShortFormArticle] })
    const result = await getShortFormArticles()
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Short Form Article')
  })

  it('returns empty array when no short form articles', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    const result = await getShortFormArticles()
    expect(result).toEqual([])
  })

  it('queries only published articles', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getShortFormArticles()
    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: { equals: 'published' },
        }),
      }),
    )
  })

  it('queries only short-form content type', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getShortFormArticles()
    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          contentType: { equals: 'short-form' },
        }),
      }),
    )
  })

  it('sorts by publishedAt descending', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getShortFormArticles()
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ sort: '-publishedAt' }))
  })

  it('uses default limit of 5', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getShortFormArticles()
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ limit: 5 }))
  })

  it('respects custom limit', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getShortFormArticles(10)
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ limit: 10 }))
  })

  it('fetches with depth 2', async () => {
    mockFind.mockResolvedValueOnce({ docs: [] })
    await getShortFormArticles()
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ depth: 2 }))
  })
})
