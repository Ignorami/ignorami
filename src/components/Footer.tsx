import Link from 'next/link'
import { Box, Container, Group, Text, Anchor } from '@mantine/core'
import { RiRedditFill, RiTwitterXFill, RiBlueskyFill } from 'react-icons/ri'

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
            <Anchor href="/feed.xml" className={styles.navLink}>
              RSS
            </Anchor>
          </Group>
          <Group gap="sm" justify="center">
            <Anchor
              href="https://x.com/IgnoramiMedia"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="X"
            >
              <RiTwitterXFill size="1.25rem" />
            </Anchor>
            <Anchor
              href="https://bsky.app/profile/ignorami.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Bluesky"
            >
              <RiBlueskyFill size="1.25rem" />
            </Anchor>
            <Anchor
              href="https://reddit.com/r/ignorami"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Reddit"
            >
              <RiRedditFill size="1.25rem" />
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
