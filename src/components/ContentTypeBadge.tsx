import styles from './ContentTypeBadge.module.css'

type Props = {
  contentType: 'article' | 'short-form'
}

const labels: Record<Props['contentType'], string> = {
  article: 'Article',
  'short-form': 'Short Form',
}

export function ContentTypeBadge({ contentType }: Props) {
  if (contentType === 'article') return null

  return <span className={`${styles.badge} ${styles.short_form}`}>{labels[contentType]}</span>
}
