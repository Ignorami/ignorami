import Link from 'next/link'
import { Box, Container, Group, Text, Anchor } from '@mantine/core'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <Box component="footer" className={styles.footer}>
      <Container size={1100}>
        <Box className={styles.inner}>
          <Text className={styles.brand}>Ignorami</Text>
          <Group component="nav" gap="xl" justify="center">
            <Anchor component={Link} href="/about" className={styles.navLink}>
              About
            </Anchor>
            <Anchor component={Link} href="/privacy" className={styles.navLink}>
              Privacy Policy
            </Anchor>
            <Anchor
              href="https://buymeacoffee.com/ignorami"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              ☕ Buy Me a Coffee
            </Anchor>
          </Group>
          <Text className={styles.copy}>
            © {new Date().getFullYear()} Ignorami. All rights reserved, apparently.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
