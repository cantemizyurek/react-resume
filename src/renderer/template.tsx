import type { ResumeData } from '@/types'
import type { FC } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { compile } from 'tailwindcss'
import { resolve } from 'path'

export interface TemplateProps {
  data: ResumeData
}

export async function renderTemplate(
  data: ResumeData,
  Component: FC<TemplateProps>
): Promise<string> {
  const bodyContent = renderToStaticMarkup(<Component data={data} />)

  const title = data.frontmatter.name
    ? `${data.frontmatter.name} - Resume`
    : 'Resume'

  return await generateHTMLDocument(title, bodyContent)
}

function extractClassNames(html: string): Set<string> {
  const classNames = new Set<string>()

  const classRegex = /class(?:Name)?=["']([^"']+)["']/g

  let match
  while ((match = classRegex.exec(html)) !== null) {
    const classes = match[1]?.split(/\s+/).filter(Boolean) || []
    classes.forEach((cls) => classNames.add(cls))
  }

  return classNames
}

async function generateCSS(classNames: Set<string>): Promise<string> {
  const baseCSSPath = require
    .resolve('tailwindcss')
    .replace('dist/lib.js', 'index.css')

  const baseCSS = await Bun.file(baseCSSPath).text()

  const compiler = await compile(baseCSS)

  const generatedCSS = compiler.build(Array.from(classNames))

  return generatedCSS
}

async function generateHTMLDocument(
  title: string,
  bodyContent: string
): Promise<string> {
  const classNames = extractClassNames(bodyContent)

  const generatedCSS = await generateCSS(classNames)

  const geistFontPath = resolve(
    process.cwd(),
    'node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2'
  )

  const fontFile = Bun.file(geistFontPath)
  const fontBuffer = await fontFile.arrayBuffer()
  const fontBase64 = Buffer.from(fontBuffer).toString('base64')
  const fontDataUrl = `data:font/woff2;base64,${fontBase64}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @font-face {
      font-family: 'Geist Sans';
      src: url('${fontDataUrl}') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }

    * {
      font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }

    ${generatedCSS}

    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
      .no-print {
        display: none;
      }
      @page {
        margin: 0.5in;
      }
    }

    .prose ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin: 0.5rem 0;
    }

    .prose ol {
      list-style-type: decimal;
      padding-left: 1.5rem;
      margin: 0.5rem 0;
    }

    .prose li {
      margin: 0.25rem 0;
    }

    .prose strong {
      font-weight: 600;
    }

    .prose a {
      color: #000000;
      text-decoration: underline;
    }

    .prose p {
      margin: 0.5rem 0;
    }

    .prose h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }

    .prose h4 {
      font-size: 1rem;
      font-weight: 600;
      margin-top: 0.75rem;
      margin-bottom: 0.25rem;
    }
  </style>
</head>
<body>
${bodyContent}
</body>
</html>`
}
