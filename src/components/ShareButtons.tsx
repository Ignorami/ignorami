'use client'

import {
  RedditShareButton,
  RedditIcon,
  XShareButton,
  XIcon,
  BlueskyShareButton,
  BlueskyIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share'
import { Group, Text } from '@mantine/core'
import styles from './ShareButtons.module.css'

type Props = {
  url: string
  title: string
}

export function ShareButtons({ url, title }: Props) {
  return (
    <Group className={styles.wrapper} gap="md" align="center">
      <Text className={styles.label}>Share</Text>
      <RedditShareButton url={url} title={title} aria-label="Share on Reddit">
        <RedditIcon size={32} round />
      </RedditShareButton>
      <XShareButton url={url} title={title} aria-label="Share on X">
        <XIcon size={32} round />
      </XShareButton>
      <BlueskyShareButton url={url} title={title} aria-label="Share on Bluesky">
        <BlueskyIcon size={32} round />
      </BlueskyShareButton>
      <LinkedinShareButton url={url} aria-label="Share on LinkedIn">
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </Group>
  )
}
