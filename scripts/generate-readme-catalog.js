/**
 * Script to generate a catalog section for README.md with compact icons
 * Icons are displayed horizontally (icon + name in a row) with smaller size
 */
const fs = require('fs')
const path = require('path')

const svgsDir = path.join(__dirname, '..', 'cooliocns SVG')
const readmeFile = path.join(__dirname, '..', 'README.md')

function pascalCase(name) {
  name = name.replace(/\..+$/, '')
  return name
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '')
}

function getSvgContent(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    return raw.replace(/<svg[^>]*>/i, '').replace(/<\/svg>/i, '').trim()
  } catch (error) {
    return ''
  }
}

function getAllCategories() {
  const categories = []
  const items = fs.readdirSync(svgsDir, { withFileTypes: true })
  
  items.forEach(item => {
    if (item.isDirectory()) {
      categories.push(item.name)
    }
  })
  
  return categories.sort()
}

function getIconsInCategory(categoryName) {
  const categoryPath = path.join(svgsDir, categoryName)
  const files = fs.readdirSync(categoryPath)
  const icons = []
  
  files.forEach(file => {
    if (file.endsWith('.svg')) {
      const filePath = path.join(categoryPath, file)
      const name = pascalCase(file)
      const componentName = `Icon${name}`
      const svgContent = getSvgContent(filePath)
      
      icons.push({
        componentName: componentName,
        svgContent: svgContent
      })
    }
  })
  
  return icons.sort((a, b) => a.componentName.localeCompare(b.componentName))
}

// Generate catalog section
let catalogSection = `\n## 📋 Catálogo Visual de Iconos\n\n`

const categories = getAllCategories()
let totalIcons = 0

categories.forEach(category => {
  const icons = getIconsInCategory(category)
  totalIcons += icons.length
  
  // Convert category name to lowercase for anchor ID
  const anchorId = category.toLowerCase()
  catalogSection += `<h3 id="${anchorId}">${category} (${icons.length} iconos)</h3>\n\n`
  catalogSection += `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 8px; margin-bottom: 30px;">\n\n`
  
  icons.forEach(icon => {
    catalogSection += `<div style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border: 1px solid #e0e0e0; border-radius: 6px; background: #fafafa; font-size: 0.875em;">\n`
    catalogSection += `<div style="flex-shrink: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">\n`
    catalogSection += `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;" stroke="currentColor" stroke-width="2">\n`
    catalogSection += `${icon.svgContent}\n`
    catalogSection += `</svg>\n`
    catalogSection += `</div>\n`
    catalogSection += `<div style="font-family: 'Monaco', 'Menlo', 'Courier New', monospace; color: #2c3e50; font-weight: 500; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${icon.componentName}</div>\n`
    catalogSection += `</div>\n\n`
  })
  
  catalogSection += `</div>\n\n`
})

catalogSection += `**Total: ${totalIcons} iconos**\n\n`

// Read current README
const readmeContent = fs.readFileSync(readmeFile, 'utf8')

// Find the position to insert the catalog (after "## 📚 Iconos disponibles" section)
const iconosDisponiblesIndex = readmeContent.indexOf('## 📚 Iconos disponibles')
const ejemploCompletoIndex = readmeContent.indexOf('## 📖 Ejemplo completo')

if (iconosDisponiblesIndex !== -1 && ejemploCompletoIndex !== -1) {
  // Find the end of the "Iconos disponibles" section
  const sectionEnd = readmeContent.indexOf('\n## 📖 Ejemplo completo', iconosDisponiblesIndex)
  
  // Insert catalog before "Ejemplo completo"
  const newReadme = 
    readmeContent.substring(0, sectionEnd) + 
    '\n' + catalogSection + 
    readmeContent.substring(sectionEnd)
  
  fs.writeFileSync(readmeFile, newReadme, 'utf8')
  console.log(`✅ Catálogo agregado al README`)
  console.log(`📊 Total de iconos: ${totalIcons}`)
  console.log(`📁 Categorías: ${categories.length}`)
} else {
  console.error('❌ No se encontró la sección "Iconos disponibles" en el README')
  process.exit(1)
}

