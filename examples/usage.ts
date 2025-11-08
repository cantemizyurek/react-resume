import { parseFrontmatter, parseSections } from '../src/parser'
import { renderTemplate } from '../src/renderer/template'
import { ModernTemplate } from './ModernTemplate'
import { render } from '../src/renderer/render'

async function main() {
  const markdownContent = await Bun.file('./examples/resume.md').text()
  const { data: frontmatter, content } = parseFrontmatter(markdownContent)
  const sections = await parseSections(content)

  console.log('⚙️  Rendering resume...')
  const html = await renderTemplate({ frontmatter, sections }, ModernTemplate)
  console.log('⚙️  Rendering PDF...')
  const pdf = await render(html, {
    margin: {
      top: '3mm',
    },
  })

  console.log('⚙️  Writing PDF to file...')
  await Bun.write('./examples/resume.pdf', pdf)
  await Bun.write('./examples/resume.html', html)
}

main().catch(console.error)
