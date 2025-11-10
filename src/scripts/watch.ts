import { watch } from 'fs'
import { generateResumes } from './generate'

async function generateAll() {
  console.log('Generating resumes...')
  const startTime = Date.now()

  await generateResumes()

  const duration = Date.now() - startTime
  console.log(`Done in ${duration}ms`)
}

await generateAll()

console.log('Watching for changes in templates/ and resumes/...')
console.log('Press Ctrl+C to stop')

watch('templates', { recursive: true }, async (event, filename) => {
  if (filename?.match(/\.(jsx|tsx)$/)) {
    console.log(`${event}: templates/${filename}`)
    await generateAll()
  }
})

watch('resumes', { recursive: true }, async (event, filename) => {
  if (filename?.match(/\.md$/)) {
    console.log(`${event}: resumes/${filename}`)
    await generateAll()
  }
})

watch('src', { recursive: true }, async (event, filename) => {
  if (filename?.match(/\.(ts|tsx)$/) && !filename?.includes('scripts/watch')) {
    console.log(`${event}: src/${filename}`)
    await generateAll()
  }
})
