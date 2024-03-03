<template>
  <div class="min-h-screen flex flex-col mx-auto">
    <div class="container px-1 md:px-5">
      <MainHeader/>
    </div>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
  import MainHeader from '@/components/MainHeader.vue';
  import Toaster from '@/components/ui/toast/Toaster.vue'

</script>

<style scoped>
</style>
