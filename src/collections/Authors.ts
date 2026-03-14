// src/collections/Authors.ts
import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'A short, possibly absurd author bio.',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      unique: true,
      admin: {
        description: 'Link this author profile to a Payload login account.',
      },
    },
  ],
}
