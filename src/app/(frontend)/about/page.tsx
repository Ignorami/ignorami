import { Container, Box, Text, Anchor, Divider } from '@mantine/core'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata = {
  title: 'About | Ignorami',
  description: 'About Ignorami.',
}

export default function AboutPage() {
  return (
    <Container size={680} py="xl">
      <Box component="header" className={styles.header}>
        <Text className={styles.section}>About</Text>
        <Text component="h1" className={styles.title}>
          Who We Are
        </Text>
      </Box>

      <Box className={`article-body ${styles.body}`}>
        <p>
          We are a team of scholars, experts, visionaries, and earthshakers dedicated to bringing
          you hard-hitting stories, timely journalism, and thought-provoking opinions. We cover
          politics, culture, science, and everything in between, and our experts are here to help
          you understand it all because you probably wouldn't get it otherwise.
        </p>
        <Divider />
        <p>
          Now, all of those experts are actually just me: the founder, editor-in-chief,
          ignoramus-in-chief, and sole writer of Ignorami. I hope that the name "Ignorami (pl.,
          ignoramus)" conveys that these are all satire, and should not be taken seriously. I also
          hope that I can help you smile at least once. :)
        </p>
      </Box>

      <Box className={styles.contact}>
        <Text component="h2" className={styles.contactTitle}>
          Get in Touch
        </Text>
        <Text className={styles.contactText}>
          Tips, complaints, unsolicited opinions, and cease-and-desist letters can be directed to{' '}
          <Anchor href="mailto:hello@ignorami.com" className={styles.contactLink}>
            hello@ignorami.com
          </Anchor>
          .
        </Text>
        <Box className={styles.support}>
          <Text className={styles.supportText}>
            Ignorami is an independent publication. If you enjoy what we do, consider buying us a
            coffee.
          </Text>
          <Anchor
            component={Link}
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.coffeeButton}
          >
            ☕ Buy Us a Coffee
          </Anchor>
        </Box>
      </Box>
    </Container>
  )
}
