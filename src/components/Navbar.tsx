import { Box } from '@mantine/core'
import { getPayloadClient } from '@/lib/payload'
import { NavbarClient } from './NavbarClient'

export async function Navbar() {
  const payload = await getPayloadClient()
  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 8,
  })

  return (
    <Box component="header">
      <NavbarClient categories={categories} />
    </Box>
  )
}
