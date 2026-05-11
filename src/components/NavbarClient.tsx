'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Box, Container, Group, Text, Anchor, Burger } from '@mantine/core'
import styles from './Navbar.module.css'
import { RiSearchLine } from 'react-icons/ri'

type Category = {
  id: number
  name: string
  slug: string
}

type Props = {
  categories: Category[]
}

const PRIMARY_COUNT = 6

export function NavbarClient({ categories }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  const primaryCategories = categories.slice(0, PRIMARY_COUNT)
  const moreCategories = categories.slice(PRIMARY_COUNT)

  // Close more dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
          <Box style={{ width: 30 }} />
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
            {primaryCategories.map((cat) => (
              <Anchor
                key={cat.id}
                component={Link}
                href={`/category/${cat.slug}`}
                className={styles.navLink}
              >
                {cat.name}
              </Anchor>
            ))}
            {moreCategories.length > 0 && (
              <Box className={styles.moreWrapper} ref={moreRef}>
                <button
                  className={styles.moreButton}
                  onClick={() => setMoreOpen((o) => !o)}
                  aria-expanded={moreOpen}
                >
                  More {moreOpen ? '▴' : '▾'}
                </button>
                <Box
                  className={`${styles.moreDropdown} ${moreOpen ? styles.moreDropdownOpen : ''}`}
                >
                  {moreCategories.map((cat) => (
                    <Anchor
                      key={cat.id}
                      component={Link}
                      href={`/category/${cat.slug}`}
                      className={styles.moreLink}
                      onClick={() => setMoreOpen(false)}
                    >
                      {cat.name}
                    </Anchor>
                  ))}
                </Box>
              </Box>
            )}
            <Anchor
              component={Link}
              href="/search"
              className={styles.searchIcon}
              aria-label="Search"
              style={{ display: 'flex', alignItems: 'center', lineHeight: 1, marginBottom: 6 }}
            >
              <RiSearchLine size="0.9rem" />
            </Anchor>
          </Group>
        </Box>

        {/* Mobile dropdown — shows all categories */}
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
          <Anchor
            component={Link}
            href="/search"
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Anchor>
        </Box>
      </Container>
    </Box>
  )
}
