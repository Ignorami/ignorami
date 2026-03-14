import Link from 'next/link'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>Ignorami</div>
        <nav className={styles.nav}>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/advertise">Advertise</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Ignorami. All rights reserved, apparently.
        </p>
      </div>
    </footer>
  )
}
