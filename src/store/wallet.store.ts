// store.ts
import { defineStore } from 'pinia';
import { sliceTransaction } from '@/helpers/sliceTransaction';
import Web3 from 'web3';

export const useWalletStore = defineStore({
  id: 'wallet',
  state: () => ({
    accountAddress: '',
    isMetaMaskInstalled: false,
    isMetaMaskConnected: false,
    accountBalance: 0,
  }),
  actions: {
    setAccountAddress(address:string):void{
      this.accountAddress = address;
    },
    setIsMetaMaskInstalled(installed:boolean):void{
      this.isMetaMaskInstalled = installed;
    },
    setIsMetaMaskConnected(connected:boolean):void{
      this.isMetaMaskConnected = connected;
    },
    setAccountBalance(balance:number):void{
      this.accountBalance = balance;
    }
  },
  getters: {
    getAccountAddress():string {
      return this.accountAddress;
    },
    getIsMetaMaskInstalled():boolean {
      return this.isMetaMaskInstalled;
    },
    getIsMetaMaskConnected():boolean {
      return this.isMetaMaskConnected;
    },
    getAccountBalance():number {
      return this.accountBalance;
    },

  },
});
