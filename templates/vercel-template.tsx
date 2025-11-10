import type { FC } from 'react'
import type { TemplateProps } from '../src/renderer/template'

export default function Template({ data }: TemplateProps) {
  const { frontmatter, sections } = data

  const contactItems = [
    frontmatter.email && (
      <a
        key="email"
        href={`mailto:${frontmatter.email}`}
        className="underline-offset-2 hover:underline"
      >
        {frontmatter.email}
      </a>
    ),
    frontmatter.phone && (
      <a
        key="phone"
        href={`tel:${frontmatter.phone}`}
        className="underline-offset-2 hover:underline"
      >
        {frontmatter.phone}
      </a>
    ),
    frontmatter.location && <span key="location">{frontmatter.location}</span>,
    frontmatter.website && (
      <a
        key="website"
        href={frontmatter.website}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-2 hover:underline"
      >
        {frontmatter.website}
      </a>
    ),
    frontmatter.x && (
      <a
        key="x"
        href={frontmatter.x}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-2 hover:underline"
      >
        X
      </a>
    ),
    frontmatter.linkedin && (
      <a
        key="linkedin"
        href={frontmatter.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-2 hover:underline"
      >
        LinkedIn
      </a>
    ),
    frontmatter.github && (
      <a
        key="github"
        href={frontmatter.github}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-2 hover:underline"
      >
        GitHub
      </a>
    ),
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <div className="max-w-3xl mx-auto">
        <header className="pb-8 mb-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            {frontmatter.name || 'Your Name'}
          </h1>

          {frontmatter.summary && (
            <p className="mt-4 text-sm leading-relaxed">
              {frontmatter.summary}
            </p>
          )}

          {contactItems.length > 0 && (
            <div className="mt-4 text-sm flex flex-wrap gap-x-3 gap-y-1">
              {contactItems.map((item, index) => (
                <span key={index} className="flex items-center">
                  {item}
                  {index < contactItems.length - 1 && (
                    <span className="mx-2">·</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </header>

        <main className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg uppercase tracking-widest font-bold pb-2 border-b border-black">
                {section.title}
              </h2>
              <div
                className="pt-2 text-sm leading-relaxed prose prose-xs"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}
