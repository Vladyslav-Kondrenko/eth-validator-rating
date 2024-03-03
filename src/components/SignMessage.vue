<template>
  <Button v-if="accountAddress" @click="signMessage" class="flex gap-1 items-center">
    <span>
      {{ signButtonText }}
    </span>
</Button>
</template>

<script setup lang="ts">
  import Button from './ui/button/Button.vue';
  import Web3 from 'web3'
  import { computed, ref } from 'vue';
  import { useWalletStore } from '@/store/wallet.store';
  import { sliceTransaction } from '@/composable/sliceTransaction';
  import { createToast } from '@/composable/createToast'

  const ethereum = (window as any).ethereum;
  const web3 = new Web3(ethereum);
  const wallet = useWalletStore();
  let accountAddress = computed(() => wallet.getAccountAddress);
  let signButtonText = ref('Sign Message');

  const signMessage = async function(){
    try{
      const signatureData = await web3.eth.personal.sign(web3.utils.utf8ToHex("test message"), accountAddress.value, "")
      signButtonText.value = sliceTransaction(signatureData)
      createToast('MetaMask Personal Message Signature', 'User signed message signature', 'success')
    } catch(error){
      createToast('MetaMask Personal Message Signature', 'User denied message signature', 'error')
    }
  }

</script>