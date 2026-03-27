'use client'

import { useEffect } from 'react'
import { Box } from '@mantine/core'

type Props = {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
}

export function AdUnit({ slot, format = 'auto' }: Props) {
  useEffect(() => {
    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {}
  }, [])

  return (
    <Box my="xl">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </Box>
  )
}
