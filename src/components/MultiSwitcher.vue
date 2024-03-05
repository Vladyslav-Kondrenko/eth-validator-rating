<script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from 'vue'
  interface Switcher {
    name: string;
    slag: string;
  }

  const emit = defineEmits(['activeSwitcherChanged'])
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

<template>
  <div class="flex space-x-4 bg-background py-1 px-1 rounded-xl">
      <button v-for="(switcher, index) in switchers" :key="index" @click="activateSwitcher(switcher.slag)"
              :class="{'bg-primary text-[#fff]': activeSwitcherSlag === switcher.slag }" class="font-sans text-[8px] font-normal leading-none uppercase py-1 px-3 rounded-xl text-[#494949] transition-colors hover:text-[#fff]">
        {{ switcher.name }}
      </button>
  </div>
</template>
