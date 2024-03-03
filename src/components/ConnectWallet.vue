<template>
  <Button @click="connectWallet" class="flex gap-1 items-center">
    <span>
      {{ buttonText }}
    </span>
</Button>
</template>

<script setup lang="ts">
import Button from './ui/button/Button.vue';
import { useWalletStore } from '@/store/wallet.store';
import { onMounted,computed, ref } from 'vue';
import { sliceTransaction } from '@/composable/sliceTransaction';
import Web3 from 'web3'
import { createToast } from '@/composable/createToast'

const wallet = useWalletStore();
let accountAddress = computed(() => wallet.getAccountAddress);
let connected = computed(() => wallet.getIsMetaMaskConnected);
let installed = computed(() => wallet.getIsMetaMaskInstalled);
const ethereum = (window as any).ethereum;
const web3 = new Web3(ethereum);

onMounted(async ()=> {
  await initialise();

  if(isMetaMaskInstalled.value){
    ethereum.on('accountsChanged', async () => {
      console.log('accountsChanged')
        initialise();
    })
      // We recommend reloading the page, unless you must do otherwise. (c) Metamask // https://docs.metamask.io/wallet/how-to/detect-network/
    ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }
})

const buttonText = computed( () => {
  return accountAddress.value ? sliceTransaction(accountAddress.value) : 'Connect Metamask';
} )

let isMetaMaskInstalled = computed( () => {
  return Boolean(ethereum && ethereum.isMetaMask);
})

async function isMetaMaskConnected() {
  const accounts = await ethereum.request({method: 'eth_accounts'});
  return accounts && accounts.length > 0;
}

async function initialise() {
  wallet.setIsMetaMaskInstalled(isMetaMaskInstalled.value);
  if(!installed.value){
    createToast('Metamask not installed', 'Please, install Metamask and try again', 'error')
    return;
  } 
  wallet.setIsMetaMaskConnected(await isMetaMaskConnected());

  if(connected.value){
    const accounts = await ethereum.request({method: 'eth_requestAccounts'})
    wallet.setAccountAddress(accounts[0]);
  } else{
    wallet.setAccountAddress('');
  }
}

async function connectWallet() {
if(!installed.value){
  createToast('Metamask not installed', 'Please, install Metamask and try again', 'error')
  return;
}
try {
    const adressesLinks: string[] = await web3.eth.requestAccounts();
    wallet.setAccountAddress(adressesLinks[0]);
    createToast('Wallet connected', 'Your wallet was connected successfully', 'success')
  } catch (error: any) {
    createToast('Error', error.message, 'error')
  }
}
</script>
