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

const onClick = (node: any, idx: number) => {
  console.log(node)
  data.items[idx].color = Random.color()
}

// setTimeout(() => {
//   data.items = mockData()
// }, 3000)

// requestAnimationFrame
</script>

<template>
  <region
    v-for="(item, idx) in data.items"
    :key="item.id"
    :points="item.points"
    :color="item.color"
    @click="(e, node, nodes) => onClick(node, idx)"
  ></region>
</template>