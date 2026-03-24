import type { Article, Category, Author, Media } from '@/payload-types'

export type ResolvedArticle = Article & {
  featured: boolean
  category: Category
  author: Author & {
    avatar: Media
  }
  coverImage: Media
  contentType: 'article' | 'short-form'
  seo?: Article['seo'] & {
    ogImage: Media
  }
}
