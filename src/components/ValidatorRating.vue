<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { columns } from "@/components/ValidatorsRating/columns"
import type { Validator } from '@/components/ValidatorsRating/validator.type';
import type { Switcher } from '@/components/switcher.type';
import DataTable from "@/components/ValidatorsRating/DataTable.vue"
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
let data = ref<Validator[]>([])

async function getData(){
  const url = `https://api.ethrewards.io/entities/stats?page=${pagination.value.pageIndex + 1}&limit=${pagination.value.pageSize}&sort_by=${getActiveSwitcher()}&order=desc`;

  try {
    const response = await axios.get<{ items: Validator[], count: number }>(url);
      data.value = response.data.items;
      rowCount.value = response.data.count;
      console.log(data.value)
    } catch (error) {
      console.error('Error fetching data:', error);
  }
}

onMounted( () => {
  getData();
});

const handleSortChange = function(slag: string){
  console.log(slag)
}

const handlePaginationChange = function(e: PaginationState){
  console.log(e)
  pagination.value = e;
  console.log(pagination.value, 'handlePaginationChange')
}

const handleSwitcherChanges = function(slag: string) {
  Object.keys(aprSwitcher).forEach(key => {
    aprSwitcher[key] = key === slag;
  });
};

const getActiveSwitcher = function() {
  let activeElement = null;
  Object.keys(aprSwitcher).forEach(key => {
    if (aprSwitcher[key] === true) {
      activeElement = key;
    }
  });
  return activeElement;
};

watch(pagination, () => {
  console.log('Pagination state changed:');
  getData()
}, { deep: true });

watch(aprSwitcher, () => {
  console.log('aprSwitcher state changed:');
  getData()
}, { deep: true });

</script>
<!-- TODO: change someevent to normal name -->
<template>
  <div class="container py-10 mx-auto">
    <div class="py-3 px-4 flex justify-between bg-primary rounded-lg text-sm items-center mb-4">
      <p class="color-secondary">Ethereum validator rating</p>
      <MultiSwitcher :switchers="AprSwitchers" @activeSwitcherChanged="handleSwitcherChanges" />
    </div>
    <DataTable :filteredColumns="aprSwitcher" :columns="columns" :data="data" :rowCount="rowCount" :pagination="pagination" @someEvent="handleSortChange" @pageEvent="handlePaginationChange" />
  </div>
</template>