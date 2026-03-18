'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Box, Container, Group, Text, Anchor, Burger } from '@mantine/core'
import styles from './Navbar.module.css'

type Category = {
  id: string
  name: string
  slug: string
}

type Props = {
  categories: Category[]
}

export function NavbarClient({ categories }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Box className={styles.header}>
      <Container size={1100}>
        {/* Desktop top row */}
        <Group className={styles.topDesktop} justify="space-between" align="center">
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
            Journalism, but worse.
          </Text>
        </Group>

        {/* Mobile top row */}
        <Group className={styles.topMobile} justify="space-between" align="center">
          <Burger
            opened={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            color="rgba(255,255,255,0.8)"
            size="sm"
          />
          <Anchor component={Link} href="/" className={styles.wordmark}>
            Ignorami
          </Anchor>
          <Box style={{ width: 30 }} /> {/* spacer to center wordmark */}
        </Group>

        {/* Mobile tagline */}
        <Box className={styles.mobileTagline}>
          <Text className={styles.tagline} component="span">
            Journalism, but worse.
          </Text>
        </Box>

        {/* Desktop nav */}
        <Box component="nav" className={styles.navDesktop}>
          <Group justify="center" gap="xl">
            {categories.map((cat) => (
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

        {/* Mobile dropdown */}
        <Box
          component="nav"
          className={`${styles.navMobile} ${menuOpen ? styles.navMobileOpen : ''}`}
        >
          {categories.map((cat) => (
            <Anchor
              key={cat.id}
              component={Link}
              href={`/category/${cat.slug}`}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {cat.name}
            </Anchor>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
