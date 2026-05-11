import { getPayloadClient } from '@/lib/payload'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')

  if (!query || query.trim().length < 2) {
    return Response.json({ docs: [] })
  }

  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      and: [
        { status: { equals: 'published' } },
        {
          or: [{ title: { like: query } }, { dek: { like: query } }, { slug: { like: query } }],
        },
      ],
    },
    sort: '-publishedAt',
    depth: 2,
    limit: 10,
  })

  return Response.json({ docs })
}
