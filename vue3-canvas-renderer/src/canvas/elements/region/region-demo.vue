<script setup lang="ts">
import { reactive } from 'vue'
import { Random } from 'mockjs'

function mockData() {
  const items = []
  const length = 3 || Random.natural(1, 4)
  for (let i = 0; i < length; i++) {
    const pointNum = 3 || Random.natural(1, 6)
    items.push({
      id: Random.id(),
      color: Random.color(),
      points: new Array(pointNum).fill(1).map(() => {
        return {
          x: Random.natural(0, 1000),
          y: Random.natural(0, 1000)
        }
      })
    })
  }
  return items
}

const data = reactive({
  items: mockData()
})

const onClick = (e, node) => {
  console.log(node)
}

// setInterval(() => {
//   data.items = mockData()
// }, 3000)

// requestAnimationFrame
</script>

<template>
  <region
    v-for="item in data.items"
    :key="item.id"
    :points="item.points"
    :color="item.color"
    @click="onClick"
  ></region>
</template>