<template>
  <div class="min-h-screen flex flex-col mx-auto">
    <div class="container px-1 md:px-5">
      <MainHeader/>
    </div>

    <div class="container px-1 md:px-5">
      <h1>Stay on top of crypto.
        Task for front end.
      </h1>
      <ValidatorsRating/>
    </div>

    
    <Toaster />
  </div>
</template>

<script setup lang="ts">
  import MainHeader from '@/components/MainHeader.vue';
  import ValidatorsRating from '@/components/ValidatorRating.vue';
  import Toaster from '@/components/ui/toast/Toaster.vue'

</script>

<style scoped>
</style>
