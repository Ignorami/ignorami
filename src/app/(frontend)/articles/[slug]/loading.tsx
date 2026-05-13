import { Container, Box, Skeleton, Group } from '@mantine/core'
import styles from './page.module.css'

export default function ArticleLoading() {
  return (
    <Container size={720} py="xl">
      <Box component="article">
        {/* Header */}
        <Box className={styles.header}>
          <Skeleton height={10} width="20%" mb="sm" />
          <Skeleton height={48} mb="sm" />
          <Skeleton height={36} width="85%" mb="sm" />
          <Skeleton height={24} mb="sm" />
          <Skeleton height={20} width="75%" mb="md" />
          <Group gap="md">
            <Skeleton height={10} width="120px" />
            <Skeleton height={10} width="100px" />
            <Skeleton height={10} width="80px" />
          </Group>
        </Box>

        {/* Hero image */}
        <Skeleton style={{ aspectRatio: '16 / 9', width: '100%', marginBottom: '0.5rem' }} />
        <Skeleton height={10} width="40%" mb="xl" />

        {/* Article body */}
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton height={14} />
          <Skeleton height={14} />
          <Skeleton height={14} width="90%" />
          <Skeleton height={14} />
          <Skeleton height={14} width="95%" />
          <Skeleton height={14} width="80%" />
          <Skeleton height={14} mt="md" />
          <Skeleton height={14} />
          <Skeleton height={14} width="85%" />
          <Skeleton height={14} />
          <Skeleton height={14} width="70%" />
          <Skeleton height={14} mt="md" />
          <Skeleton height={14} />
          <Skeleton height={14} width="90%" />
          <Skeleton height={14} width="60%" />
        </Box>

        {/* Author box */}
        <Box
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <Skeleton circle height={56} width={56} style={{ flexShrink: 0 }} />
          <Box style={{ flex: 1 }}>
            <Skeleton height={12} width="30%" mb="sm" />
            <Skeleton height={12} width="80%" />
            <Skeleton height={12} width="60%" mt="xs" />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
