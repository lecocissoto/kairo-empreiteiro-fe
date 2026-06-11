/**
 * Gera as versões web das fotos a partir de fotos-originais/.
 *
 * - fotos-originais/<categoria>/  → public/portfolio/<categoria>/thumb/*.webp (grade, máx 640px)
 *                                 → public/portfolio/<categoria>/full/*.webp  (lightbox, máx 1600px)
 * - fotos-originais/perfil/       → public/profile/<nome>.webp (máx 1200px)
 *
 * Também escreve src/data/galleryManifest.json com a lista de fotos por categoria,
 * em ordem numérica natural. Saídas já existentes são puladas; saídas sem original
 * correspondente são removidas. Uso: npm run fotos
 */
import { readdir, mkdir, writeFile, unlink, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC_DIR = path.join(ROOT, 'fotos-originais')
const PORTFOLIO_OUT = path.join(ROOT, 'public', 'portfolio')
const PROFILE_OUT = path.join(ROOT, 'public', 'profile')
const MANIFEST = path.join(ROOT, 'src', 'data', 'galleryManifest.json')

const IMAGE_RE = /\.(jpe?g|png|webp)$/i
const CONCURRENCY = 8
const naturalCompare = new Intl.Collator('pt-BR', { numeric: true }).compare

const sizes = {
  thumb: { maxDim: 640, quality: 72 },
  full: { maxDim: 1600, quality: 80 },
  profile: { maxDim: 1200, quality: 80 },
}

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return entries
    .filter(e => e.isFile() && IMAGE_RE.test(e.name))
    .map(e => e.name)
    .sort(naturalCompare)
}

function webpName(srcName) {
  return srcName.replace(IMAGE_RE, '').toLowerCase().replace(/\s+/g, '-') + '.webp'
}

async function exists(file) {
  return stat(file).then(() => true, () => false)
}

async function convert(srcPath, outPath, { maxDim, quality }) {
  if (await exists(outPath)) return 'skipped'
  // .rotate() sem argumento aplica a orientação EXIF; o WebP final sai sem EXIF/GPS
  await sharp(srcPath)
    .rotate()
    .resize(maxDim, maxDim, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath)
  return 'converted'
}

async function runPool(jobs) {
  const counts = { converted: 0, skipped: 0, failed: 0 }
  let next = 0
  async function worker() {
    while (next < jobs.length) {
      const job = jobs[next++]
      counts[await job()]++
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  return counts
}

// Converte todas as variantes de uma foto; falha em uma foto não derruba o resto
async function processPhoto(srcPath, outputs, failures) {
  try {
    const results = []
    for (const [outPath, size] of outputs) {
      results.push(await convert(srcPath, outPath, size))
    }
    return results.includes('converted') ? 'converted' : 'skipped'
  } catch (err) {
    failures.push(`${path.relative(SRC_DIR, srcPath)}: ${String(err.message).split('\n')[0]}`)
    return 'failed'
  }
}

async function pruneOrphans(dir, expectedNames) {
  if (!(await exists(dir))) return 0
  let pruned = 0
  for (const name of await readdir(dir)) {
    if (name.endsWith('.webp') && !expectedNames.has(name)) {
      await unlink(path.join(dir, name))
      pruned++
    }
  }
  return pruned
}

const categories = (await readdir(SRC_DIR, { withFileTypes: true }))
  .filter(e => e.isDirectory() && e.name !== 'perfil')
  .map(e => e.name)
  .sort(naturalCompare)

const manifest = {}
const failures = []

for (const cat of categories) {
  const srcFiles = await listImages(path.join(SRC_DIR, cat))
  const thumbDir = path.join(PORTFOLIO_OUT, cat, 'thumb')
  const fullDir = path.join(PORTFOLIO_OUT, cat, 'full')
  await mkdir(thumbDir, { recursive: true })
  await mkdir(fullDir, { recursive: true })

  const catFailures = []
  const counts = await runPool(
    srcFiles.map(name => () =>
      processPhoto(
        path.join(SRC_DIR, cat, name),
        [
          [path.join(thumbDir, webpName(name)), sizes.thumb],
          [path.join(fullDir, webpName(name)), sizes.full],
        ],
        catFailures
      )
    )
  )
  failures.push(...catFailures)

  // só entram no manifest (e ficam em disco) fotos convertidas com sucesso
  const okFiles = srcFiles.filter(
    name => !catFailures.some(f => f.startsWith(`${cat}/${name}:`))
  )
  const outNames = new Set(okFiles.map(webpName))
  const pruned =
    (await pruneOrphans(thumbDir, outNames)) + (await pruneOrphans(fullDir, outNames))

  manifest[cat] = okFiles.map(name => ({
    thumb: `/portfolio/${cat}/thumb/${webpName(name)}`,
    full: `/portfolio/${cat}/full/${webpName(name)}`,
  }))
  console.log(
    `${cat}: ${okFiles.length} fotos (${counts.converted} convertidas, ${counts.skipped} já existiam${counts.failed ? `, ${counts.failed} com erro` : ''}${pruned ? `, ${pruned} órfãs removidas` : ''})`
  )
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Manifest: ${path.relative(ROOT, MANIFEST)} (${categories.length} categorias)`)

// Fotos de perfil — nome preservado, tamanho único
const profileFiles = await listImages(path.join(SRC_DIR, 'perfil'))
await mkdir(PROFILE_OUT, { recursive: true })
const profileCounts = await runPool(
  profileFiles.map(name => () =>
    processPhoto(
      path.join(SRC_DIR, 'perfil', name),
      [[path.join(PROFILE_OUT, webpName(name)), sizes.profile]],
      failures
    )
  )
)
await pruneOrphans(PROFILE_OUT, new Set(profileFiles.map(webpName)))
console.log(
  `perfil: ${profileFiles.length} fotos (${profileCounts.converted} convertidas, ${profileCounts.skipped} já existiam${profileCounts.failed ? `, ${profileCounts.failed} com erro` : ''}) → public/profile/`
)

if (failures.length) {
  console.error(`\nATENÇÃO — ${failures.length} foto(s) não convertida(s) (fora do site):`)
  for (const f of failures) console.error(`  - ${f}`)
  console.error('Converta para JPEG/PNG (ex.: sips -s format jpeg foto.jpg --out foto-ok.jpg) e rode npm run fotos de novo.')
  process.exitCode = 1
}
