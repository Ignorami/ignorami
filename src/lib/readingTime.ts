export function getReadingTime(content: { root: { text?: string; children?: any[] } }): string {
  if (!content) return ''

  // Extract text from Payload's Lexical rich text JSON
  const extractText = (node: {
    root?: { text?: string; children?: any[] }
    text?: string
    children?: any[]
  }): string => {
    if (node.text) return node.text
    if (node.children) return node.children.map(extractText).join(' ')
    return ''
  }

  const text = extractText(content.root)

  const wordCount = text.trim().split(/\s+/).length

  const minutes = Math.max(1, Math.round(wordCount / 150))

  return `${minutes} min read`
}
