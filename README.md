# icons-cool-vue

Biblioteca de iconos como componentes Vue (Vue 3 + TypeScript).

## Instalación

```bash
npm i icons-cool-vue
```

## Scripts útiles

- `npm run generate:icons` - genera componentes desde `cooliocns SVG/**/*.svg` (lee recursivamente todas las subcarpetas)
- `npm run dev` - levantar demo / vite
- `npm run build` - construir la librería (genera iconos y construye)
- `npm run test` - ejecutar tests

## Publicar en npm

Esta repo incluye un workflow que publica en npm cuando se publica una Release en GitHub. Antes de usarlo, añade el secreto `NPM_TOKEN` en Settings > Secrets del repositorio con un token con permisos de publicación en npm.

Para publicar:

1. Crea una Release (vanilla GitHub release). Al publicarse el evento `release.published` dispara el workflow y publicará la versión.

## Uso

Registro global:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import IconLibrary from 'icons-cool-vue'

createApp(App).use(IconLibrary).mount('#app')
```

Import individual:

```ts
import { IconPlaceholder } from 'icons-cool-vue'
```