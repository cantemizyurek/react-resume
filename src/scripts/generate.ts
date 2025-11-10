import { parseFrontmatter, parseSections } from '../parser'
import { renderTemplate } from '../renderer/template'
import { render } from '../renderer/render'

export async function generateResumes() {
  const templatesDir = new Bun.Glob('templates/*.{jsx,tsx}')
  const resumesDir = new Bun.Glob('resumes/*.md')

  const [templates, resumes] = await Promise.all([
    Array.fromAsync(templatesDir.scan('.')),
    Array.fromAsync(resumesDir.scan('.')),
  ])

  for (const template of templates) {
    const component = (await import(`${template}?t=${Date.now()}`)).default

    await Promise.all(
      resumes.map(async (resume) => {
        const markdownContent = await Bun.file(`${resume}`).text()
        const { data: frontmatter, content } = parseFrontmatter(markdownContent)
        const sections = await parseSections(content)

        const html = await renderTemplate({ frontmatter, sections }, component)
        const pdf = await render(html, {
          margin: {
            top: '3mm',
          },
        })

        const name = resume.split('/').pop()?.replace('.md', '')
        const templateName = template.split('/').pop()?.replace('.tsx', '')

        await Bun.write(`output/${name}/${templateName}.pdf`, pdf)
      })
    )
  }
}

if (import.meta.main) {
  await generateResumes()
}
