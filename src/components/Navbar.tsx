import Link from 'next/link'
import { Box, Container, Group, Text, Anchor } from '@mantine/core'
import { getPayloadClient } from '@/lib/payload'
import styles from './Navbar.module.css'

export async function Navbar() {
  const payload = await getPayloadClient()
  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 8,
  })

  return (
    <Box component="header" className={styles.header}>
      <Container size={1100}>
        <Group className={styles.top} justify="space-between" align="center">
          <Text className={styles.dateline} component="span">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Anchor component={Link} href="/" className={styles.wordmark}>
            Ignorami
          </Anchor>
          <Text className={styles.tagline} component="span">
            Journalism, But Worse.
          </Text>
        </Group>
        <Box component="nav" className={styles.nav}>
          <Group justify="center" gap="xl">
            {categories.map((cat: any) => (
              <Anchor
                key={cat.id}
                component={Link}
                href={`/category/${cat.slug}`}
                className={styles.navLink}
              >
                {cat.name}
              </Anchor>
            ))}
          </Group>
        </Box>
      </Container>
    </Box>
  )
}
