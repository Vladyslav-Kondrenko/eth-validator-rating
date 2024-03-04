<template>
  <div class="flex space-x-4">
    <div v-for="(switcher, index) in switchers" :key="index">
      <button @click="activateSwitcher(switcher.slag)"
              :class="{ active: activeSwitcherSlag === switcher.slag }">
        {{ switcher.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, watch } from 'vue'

  const emit = defineEmits(['activeSwitcherChanged'])

  interface Switcher {
    name: string;
    slag: string;
  }

  const props = defineProps<{
    switchers: Switcher[]
  }>()

  let activeSwitcherSlag = ref<string | null>(props.switchers && props.switchers.length ? props.switchers[0].slag : null)

  const activateSwitcher = (slag: string) => {
    activeSwitcherSlag.value = slag
  }

  watch(activeSwitcherSlag, (newValue) => {
    emit('activeSwitcherChanged', newValue)
  })
</script>

<style scoped>
  .active {
    background-color: lightblue;
  }
</style>