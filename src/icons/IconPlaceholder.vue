<template>
  <IconBase>
    <rect x="4" y="4" width="16" height="16" stroke="currentColor" fill="none" />
  </IconBase>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconBase from '../components/IconBase.vue'

export default defineComponent({
  name: 'IconPlaceholder',
  components: { IconBase }
})
</script>