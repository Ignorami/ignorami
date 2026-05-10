import { Container, Box, Text, Anchor } from '@mantine/core'
import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <Container size={720} py="xl">
      <Box className={styles.wrapper}>
        <Text className={styles.code}>404</Text>
        <Text component="h1" className={styles.title}>
          Page Not Found
        </Text>
        <Text className={styles.message}>
          The page you were looking for does not exist, has been moved, or was never real to begin
          with. Much like several of our sources.
        </Text>
        <Anchor component={Link} href="/" className={styles.link}>
          ← Back to Ignorami
        </Anchor>
      </Box>
    </Container>
  )
}
