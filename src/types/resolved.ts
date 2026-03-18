import type { Article, Category, Author, Media } from '@/payload-types'

export type ResolvedArticle = Article & {
  category: Category
  author: Author & {
    avatar: Media
  }
  coverImage: Media
  contentType: 'satire' | 'opinion' | 'short-form'
  seo?: Article['seo'] & {
    ogImage: Media
  }
}
