export interface ResumeData {
  frontmatter: Frontmatter
  sections: Section[]
}

export interface Section {
  title: string
  content: string
}

export interface Frontmatter {
  [key: string]: any
}

export interface RenderOptions {
  margin?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
}
