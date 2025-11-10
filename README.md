# Resume Generator

A modern, template-based resume generator built with Bun, React, and TypeScript. Write your resume in Markdown and generate beautiful PDFs using customizable React templates.

## Features

- **Markdown-based content**: Write your resume in simple Markdown with frontmatter for metadata
- **React templates**: Design custom resume layouts using React components with TypeScript
- **Multiple templates**: Generate multiple versions of your resume using different templates
- **PDF output**: Automatically generate print-ready PDFs using Playwright
- **Tailwind CSS**: Style your templates with Tailwind CSS
- **Fast builds**: Powered by Bun for instant bundling and execution
- **Watch mode**: Automatically regenerate resumes when files change

## Prerequisites

- [Bun](https://bun.sh) (v1.0+)

## Installation

```bash
bun install
```

## Usage

### Quick Start

1. Create or edit your resume in `resumes/resume.md`:

```markdown
---
name: John Doe
title: Software Engineer
email: john@example.com
phone: (555) 123-4567
location: San Francisco, CA
---

## Experience

### Senior Developer | Company Name
*2020 - Present*

- Built scalable web applications
- Led team of 5 developers

## Skills

JavaScript, TypeScript, React, Node.js
```

2. Generate your resume:

```bash
bun start
```

Your PDF will be generated in `output/resume/vercel-template.pdf`

### Development Mode

Watch for changes and regenerate automatically:

```bash
bun dev
```

### Project Structure

```
res/
├── resumes/              # Your resume markdown files
│   └── resume.md
├── templates/            # React template components
│   └── vercel-template.tsx
├── output/               # Generated PDFs (created automatically)
├── src/
│   ├── parser/           # Markdown parsing logic
│   ├── renderer/         # Template rendering and PDF generation
│   ├── scripts/          # Build and watch scripts
│   └── types.ts          # TypeScript type definitions
└── package.json
```

## Creating Custom Templates

Create a new template in `templates/` directory:

```tsx
// templates/my-template.tsx
import React from 'react'
import type { ResumeData } from '../src/types'

export default function MyTemplate({ frontmatter, sections }: ResumeData) {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{frontmatter.name}</h1>
      <p className="text-xl">{frontmatter.title}</p>

      {sections.map((section, i) => (
        <div key={i}>
          <h2 className="text-2xl font-semibold mt-6">{section.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: section.html }} />
        </div>
      ))}
    </div>
  )
}
```

The generator will automatically pick up your new template and generate a PDF.

## Resume Format

Resumes use Markdown with YAML frontmatter:

```markdown
---
name: Your Name
title: Your Title
email: your@email.com
phone: (555) 555-5555
location: Your Location
website: https://yoursite.com
linkedin: https://linkedin.com/in/yourprofile
github: https://github.com/yourusername
---

## Section Title

Your content here using standard Markdown syntax.

### Subsection

- Bullet points
- More bullets

**Bold text** and *italic text*
```

## Scripts

- `bun start` - Generate all resumes with all templates
- `bun dev` - Watch mode: regenerate on file changes

## Technologies

- **Runtime**: [Bun](https://bun.sh)
- **UI**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **PDF Generation**: [Playwright](https://playwright.dev)
- **Markdown**: [unified](https://unifiedjs.com) + [remark](https://remark.js.org) + [rehype](https://rehype.js.org)
- **Frontmatter**: [gray-matter](https://github.com/jonschlinkert/gray-matter)

## How It Works

1. **Parse**: Markdown files are parsed using `gray-matter` for frontmatter and `unified`/`remark` for content
2. **Transform**: Content is converted from Markdown to HTML using `remark-rehype`
3. **Render**: React templates receive parsed data and generate HTML
4. **Generate**: Playwright renders the HTML and generates PDFs

## License

MIT
