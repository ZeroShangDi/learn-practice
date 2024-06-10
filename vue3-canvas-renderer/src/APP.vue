<script setup lang="ts">
import CanvasComponent from './CanvasComponent.vue'
</script>

<template>
  <div>
    <h1>这是一个canvas自定义渲染器的组件实例</h1>
    <!-- 如果出现警告, 请注意vite.config.ts中关于vue的isCustomElement配置是否正确 -->
    <CanvasComponent />
  </div>
</template>