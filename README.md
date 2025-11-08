# Resume Generator

A modern resume generator that converts Markdown files into beautifully formatted PDFs using React templates and Playwright.

## Features

- **Markdown-based**: Write your resume in simple Markdown format
- **Frontmatter support**: Add metadata using YAML frontmatter
- **React templates**: Create custom, reusable resume templates with React/TSX
- **PDF output**: Generate professional PDFs using Playwright
- **Fast**: Built with Bun for blazing-fast performance
- **TypeScript**: Fully typed for better developer experience
- **Tailwind CSS**: Style your templates with Tailwind v4

## Installation

```bash
bun install
```

## Quick Start

1. Create a markdown file with your resume content:

```markdown
---
name: John Doe
email: john@example.com
phone: (555) 123-4567
location: San Francisco, CA
---

# Experience

## Senior Software Engineer @ Tech Company

_Jan 2020 - Present_

- Led development of key features
- Mentored junior developers
- Improved system performance by 50%

# Education

## Bachelor of Science in Computer Science

_University Name, 2016_
```

2. Create or use an existing template (see `examples/ModernTemplate.tsx`)

3. Generate your PDF:

```typescript
import { parseFrontmatter, parseSections } from './src/parser'
import { renderTemplate } from './src/renderer/template'
import { render } from './src/renderer/render'
import { ModernTemplate } from './examples/ModernTemplate'

const markdownContent = await Bun.file('./resume.md').text()
const { data: frontmatter, content } = parseFrontmatter(markdownContent)
const sections = await parseSections(content)

const html = await renderTemplate({ frontmatter, sections }, ModernTemplate)
const pdf = await render(html, {
  margin: {
    top: '3mm',
    right: '10mm',
    bottom: '10mm',
    left: '10mm',
  },
})

await Bun.write('./resume.pdf', pdf)
```

## Usage

Run the example:

```bash
bun examples/usage.ts
```

This will:

1. Parse the markdown file (`examples/resume.md`)
2. Extract frontmatter and sections
3. Render using the Modern Template
4. Generate a PDF (`examples/resume.pdf`)

## Project Structure

```
.
├── src/
│   ├── parser/
│   │   ├── frontmatter.ts    # YAML frontmatter parser
│   │   ├── markdown.ts       # Markdown to HTML converter
│   │   ├── sections.ts       # Section extractor
│   │   └── index.ts          # Parser exports
│   ├── renderer/
│   │   ├── template.tsx      # Template renderer
│   │   └── render.ts         # PDF renderer using Playwright
│   └── types.ts              # TypeScript type definitions
├── examples/
│   ├── resume.md             # Example resume in Markdown
│   ├── ModernTemplate.tsx    # Example React template
│   ├── usage.ts              # Usage example
│   └── resume.pdf            # Generated PDF output
└── package.json
```

## Creating Custom Templates

Templates are React components that receive `ResumeData` as props:

```typescript
interface ResumeData {
  frontmatter: {
    [key: string]: any
  }
  sections: Array<{
    title: string
    content: string // HTML content
  }>
}
```

Example template:

```tsx
export function MyTemplate({ frontmatter, sections }: ResumeData) {
  return (
    <html>
      <head>
        <title>{frontmatter.name}'s Resume</title>
      </head>
      <body>
        <h1>{frontmatter.name}</h1>
        <p>{frontmatter.email}</p>

        {sections.map((section, i) => (
          <div key={i}>
            <h2>{section.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        ))}
      </body>
    </html>
  )
}
```

## API

### Parser

```typescript
import { parseFrontmatter, parseSections } from './src/parser'

// Parse YAML frontmatter
const { data, content } = parseFrontmatter(markdownString)

// Parse sections from markdown
const sections = await parseSections(markdownContent)
```

### Renderer

```typescript
import { renderTemplate } from './src/renderer/template'
import { render } from './src/renderer/render'

// Render React template to HTML
const html = await renderTemplate(resumeData, TemplateComponent)

// Convert HTML to PDF
const pdf = await render(html, {
  margin: {
    top: '10mm',
    right: '10mm',
    bottom: '10mm',
    left: '10mm',
  },
})
```

## Dependencies

- **Bun**: Fast JavaScript runtime and bundler
- **React 19**: Template rendering
- **Playwright**: PDF generation
- **Tailwind CSS v4**: Styling
- **unified/remark/rehype**: Markdown processing
- **gray-matter**: YAML frontmatter parsing

## Development

```bash
# Install dependencies
bun install

# Run example
bun examples/usage.ts

# Type checking
bun run tsc --noEmit
```

## License

MIT
