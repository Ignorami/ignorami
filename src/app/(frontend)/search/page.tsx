import { Container, Box, Text } from '@mantine/core'
import { SearchResults } from '@/components/SearchResults'
import styles from './page.module.css'

export const metadata = {
  title: 'Search | Ignorami',
  description: 'Search Ignorami articles.',
}

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams

  return (
    <Box className={styles.page}>
      <Container size={900} py="xl">
        <Box component="header" className={styles.header}>
          <Text className={styles.eyebrow}>Search</Text>
          <Text component="h1" className={styles.title}>
            {q ? `Results for "${q}"` : 'Search Ignorami'}
          </Text>
        </Box>
        <SearchResults query={q || ''} />
      </Container>
    </Box>
  )
}
