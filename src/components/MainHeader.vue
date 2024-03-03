<template>
  <div class="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md mb-4 justify-center md:justify-end">
    <SignMessage/>
    <ConnectWallet/>
</div>
</template>

<script setup lang="ts">
import ConnectWallet from '@/components/ConnectWallet.vue';
import SignMessage from '@/components/SignMessage.vue';

</script>