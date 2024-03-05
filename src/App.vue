<template>
  <div class="min-h-screen flex flex-col mx-auto">
    <div class="container px-1 md:px-5">
      <MainHeader/>
    </div>

    <div class="container px-1 md:px-5">
      <h1 class="text-2xl md:text-4xl font-medium leading-7 md:leading-10 tracking-normal text-center md:text-left ">Stay on top of crypto. <br>
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
