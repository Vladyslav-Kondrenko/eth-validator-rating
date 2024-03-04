<template>
  <div class="flex items-center space-x-2 md:space-x-6 py-2 md:py-6 rounded-lg mb-4 justify-center md:justify-end">
    <SignMessage/>
    <ConnectWallet/>
</div>
</template>

<script setup lang="ts">
import ConnectWallet from '@/components/ConnectWallet.vue';
import SignMessage from '@/components/SignMessage.vue';

</script>