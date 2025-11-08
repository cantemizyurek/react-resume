import { markdownToHtml } from './markdown'

export async function parseSections(markdown: string) {
  const headers = getHeaders(markdown)
  const lines = markdown.split('\n')

  const headerTwos = headers.filter((header) => header.level === 2)

  const sections: Array<{ title: string; content: string }> = []

  for (let i = 0; i < headerTwos.length; i++) {
    const headerTwo = headerTwos[i]
    if (!headerTwo) continue

    const title = headerTwo.text

    const startLine = headerTwo.line + 1

    let endLine = lines.length
    if (i < headerTwos.length - 1) {
      const nextHeaderTwo = headerTwos[i + 1]
      if (nextHeaderTwo) {
        endLine = nextHeaderTwo.line
      }
    } else {
      const nextHeader = headers.find(
        (header) => header.line > headerTwo.line && header.level <= 2
      )
      if (nextHeader) {
        endLine = nextHeader.line
      }
    }

    const content = lines.slice(startLine, endLine).join('\n').trim()

    sections.push({ title, content: await markdownToHtml(content) })
  }

  return sections
}

function getHeaders(markdown: string) {
  const lines = markdown.split('\n')
  const headers: Array<{ level: number; text: string; line: number }> = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line) continue
    const match = line.match(/^(#+)\s+(.*)$/)
    if (match) {
      const [_, hashes, text] = match
      if (hashes && text !== undefined) {
        const level = hashes.length
        headers.push({ level, text, line: i })
      }
    }
  }

  return headers
}
