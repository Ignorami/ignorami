import { createTheme, MantineColorsTuple } from '@mantine/core'

const forestGreen: MantineColorsTuple = [
  '#f0f4f0',
  '#e0eae0',
  '#c8d5c8',
  '#a8c4a8',
  '#7aa87a',
  '#4a6b54',
  '#3d6b57',
  '#2d4a3e',
  '#1e3329',
  '#162318',
]

export const theme = createTheme({
  primaryColor: 'forestGreen',
  colors: {
    forestGreen,
  },
  fontFamily: 'var(--font-body)',
  fontFamilyMonospace: 'monospace',
  headings: {
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.1' },
      h2: { fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: '1.2' },
      h3: { fontSize: '1.25rem', lineHeight: '1.3' },
    },
  },
  defaultRadius: 0,
  black: '#162318',
  white: '#f5efe0',
  other: {
    colorBg: '#f5efe0',
    colorMuted: '#4a6b54',
    colorBorder: '#ddd4b8',
    maxWidth: '1100px',
  },
  components: {
    Anchor: {
      styles: {
        root: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
  },
})
