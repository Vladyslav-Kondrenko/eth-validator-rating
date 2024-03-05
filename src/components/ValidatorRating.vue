<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { columns } from "@/components/DataTable/columns"
import type { Validator } from '@/components/validator.type';
import type { Switcher } from '@/components/switcher.type';
import DataTable from "@/components/DataTable/DataTable.vue"
import MultiSwitcher from "@/components/MultiSwitcher.vue"
import axios from 'axios'
import type { PaginationState, VisibilityState } from '@tanstack/vue-table'

const AprSwitchers: Switcher[] = [
  {
    name: 'Monthly',
    slag: 'apr_30days',
  },
  {
    name: 'Annual',
    slag: 'apr_365days',
  },
  {
    name: 'All',
    slag: 'apr',
  },
]

let aprSwitcher = reactive<VisibilityState>({'apr': false, 'apr_30days': true, 'apr_365days': false});
let pagination = ref<PaginationState>({pageSize: 10, pageIndex: 0 });
let rowCount = ref<number>(0);
let sortBy = ref<string>('asc')
let data = ref<Validator[]>([])
let ethPrice = 0;

async function getData(){
  const activeSwitcher = getActiveSwitcher();
  let url = `https://api.ethrewards.io/entities/stats?page=${pagination.value.pageIndex + 1}&limit=${pagination.value.pageSize}&order=${sortBy.value}`;

  if (activeSwitcher !== null) {
    url += `&sort_by=${activeSwitcher}`;
  }

  try {
    const response = await axios.get<{ items: Validator[], count: number }>(url);
      data.value = response.data.items;
      rowCount.value = response.data.count;
      data.value = data.value.map(item => {
        return { ...item, staked_usd: item.staked * ethPrice };
      });
    } catch (error) {
      console.error('Error fetching data:', error);
  }
}

async function getEthPrice(){
  const url = 'https://api.ethrewards.io/historical/info';

  try {
    const response = await axios.get(url);
    ethPrice = response.data.eth_price.current;
    } catch (error) {
      console.error('Error fetching data:', error);
  }
}

onMounted(async () => {
  await getEthPrice();
  await getData();
});

const handleSortChange = function(sortSettings: { desc: boolean }){
  sortBy.value = sortSettings.desc ? 'desc' : 'asc';
}

const handlePaginationChange = function(e: PaginationState){
  pagination.value = e;
}

const handleSwitcherChanges = function(slag: string) {
  Object.keys(aprSwitcher).forEach(key => {
    aprSwitcher[key] = key === slag;
  });
};

const getActiveSwitcher = function() {
  return Object.keys(aprSwitcher).find(key => aprSwitcher[key] === true) || null;
};

watch(pagination, () => {
  getData();
}, { deep: true });

watch(aprSwitcher, () => {
  pagination.value.pageIndex = 0;
  getData();
}, { deep: true });

watch(sortBy, () => {
  pagination.value.pageIndex = 0;
  getData();
});

</script>
<template>
  <div class="py-10 mx-auto">
    <div class="py-3 px-4 flex justify-between bg-primary rounded-lg text-sm items-center mb-4 flex-col md:flex-row">
      <p class="color-secondary mb-2 md:mb-0 text-secondary">Ethereum validator rating</p>
      <MultiSwitcher :switchers="AprSwitchers" @activeSwitcherChanged="handleSwitcherChanges" />
    </div>
    <DataTable :filteredColumns="aprSwitcher" :columns="columns" :data="data" :rowCount="rowCount" :pagination="pagination" @sortChanged="handleSortChange" @pageChanged="handlePaginationChange" />
  </div>
</template>