import { Container, Box, Text } from '@mantine/core'
import styles from './page.module.css'

export const metadata = {
  title: 'Privacy Policy | Ignorami',
  description: 'Privacy policy for Ignorami.',
}

export default function PrivacyPage() {
  return (
    <Container size={680} py="xl">
      <Box component="header" className={styles.header}>
        <Text className={styles.eyebrow}>Legal</Text>
        <Text component="h1" className={styles.title}>
          Privacy Policy
        </Text>
        <Text className={styles.date}>Last updated: March 17, 2026</Text>
      </Box>

      <Box className={`article-body ${styles.body}`}>
        <h2>The Short Version</h2>
        <p>
          Ignorami does not collect, store, or sell your personal data. We are a small, independent
          publication and have no interest in your browsing habits, your email address, or anything
          else about you. We just want you to read the articles.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We do not collect any personal information from visitors to this site. There are no
          accounts, no comment systems, no newsletters, and no tracking pixels. If you visit
          Ignorami and leave without doing anything, we have no record that you were ever here.
        </p>

        <h2>Cookies</h2>
        <p>
          Ignorami does not use cookies for tracking or advertising purposes. Your browser may store
          basic session data as part of normal web browsing, but we do not use this data in any way.
        </p>

        <h2>Third Party Services</h2>
        <p>
          Ignorami uses the following third party services, each of which has its own privacy
          policy:
        </p>
        <p>
          <strong>Vercel</strong> — this site is hosted on Vercel, which may collect basic server
          log data such as IP addresses and request timestamps as part of normal hosting operations.
          You can read Vercel's privacy policy at{' '}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            vercel.com/legal/privacy-policy
          </a>
          .
        </p>
        <p>
          <strong>Buy Me a Coffee</strong> — if you choose to support Ignorami through Buy Me a
          Coffee, any personal or payment information you provide is handled by Buy Me a Coffee, not
          by us. You can read their privacy policy at{' '}
          <a
            href="https://www.buymeacoffee.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            buymeacoffee.com/privacy-policy
          </a>
          .
        </p>

        <h2>Future Changes</h2>
        <p>
          If Ignorami ever introduces advertising, analytics, or any other service that affects your
          privacy, this policy will be updated to reflect that before those changes take effect. We
          will note the date of any updates at the top of this page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions, concerns, or strongly worded letters about this privacy policy can be directed
          to <a href="mailto:helloignorami@gmail.com">helloignorami@gmail.com</a>.
        </p>
      </Box>
    </Container>
  )
}
