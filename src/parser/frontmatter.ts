import matter from 'gray-matter'

export function parseFrontmatter(markdown: string) {
  const { data, content } = matter(markdown)
  return { data, content }
}
