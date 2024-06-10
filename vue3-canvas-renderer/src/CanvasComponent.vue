<script setup lang="ts">
import { onBeforeUpdate, onMounted, ref } from 'vue'
import { createCanvasApp, isCustomElement } from './canvas'
import RegionDemo from './canvas/elements/region/region-demo.vue'

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (canvas.value) {
    canvas.value.width = 1000
    canvas.value.height = 1000
    canvas.value.style.background = '#ccc'

    const createApp = createCanvasApp(canvas.value)
    const app = createApp(RegionDemo)
    isCustomElement(app)
    app.mount(canvas.value)
  }
})
onBeforeUpdate(() => {
  // if (canvas.value) {
  //   const ctx = canvas.value.getContext('2d')
  //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  // }
})
</script>

<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>