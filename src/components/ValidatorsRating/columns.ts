import { h } from 'vue'
import type { Validator } from './validator.type'
import type { ColumnDef } from '@tanstack/vue-table';

import { Button } from '@/components/ui/button'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
// TODO REFACTOR HERE
export const columns: ColumnDef<Validator>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return h(Button, {
          variant: 'ghost',
          onClick: () => {
            // default sortingOrder can be as asc|desc|null. With this code order can be only asc|desc
            const nextSortingOrder = column.getNextSortingOrder();
            column.toggleSorting(nextSortingOrder === 'asc' ? false : true)
            
          },
      }, () => ['id', h(ChevronDown, { class: 'ml-2 h-4 w-4' })])
  },
    cell: ({ row }) => {
      const id = Number.parseInt(row.id) + 1;
      
      return h('div', { class: 'font-medium' }, id)
    },
    enableSorting: true
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: '' }, 'Name'),
    cell: ({ row }) => {
      const id = row.getValue('name') ?? '';
      return h('div', { class: 'font-medium' }, id)
    },
  },
  {
    accessorKey: 'staked',
    header: () => h('div', { class: '' }, 'Staked'),
    cell: ({ row }) => {
      const id = Number.parseFloat(row.getValue('staked'))
      return h('div', { class: 'font-medium' }, id)
    },
  },
  {
    accessorKey: 'apr',
    header: () => h('div', { class: '' }, 'APR def'),
    cell: ({ row }) => {
      const apr = Number.parseFloat(row.getValue('apr'))
      
      console.log(row.getValue('apr_30days'), 'apr_30days')
      return h('div', { class: 'font-medium' }, apr)
    },
  },
  {
    accessorKey: 'apr_30days',
    header: () => h('div', { class: '' }, 'APR 30'),
    cell: ({ row }) => {
      const apr = Number.parseFloat(row.getValue('apr_30days'))
      console.log(row)
      return h('div', { class: 'font-medium' }, apr)
    },
  },
  {
    accessorKey: 'apr_365days',
    header: () => h('div', { class: '' }, 'APR 365'),
    cell: ({ row }) => {
      const apr = Number.parseFloat(row.getValue('apr_365days'))
      console.log(row)
      return h('div', { class: 'font-medium' }, apr)
    },
  },
  {
    accessorKey: 'executed_rewards',
    header: () => h('div', { class: '' }, 'Execution Rewards'),
    cell: ({ row }) => {
      const id = Number.parseFloat(row.getValue('executed_rewards'))
      return h('div', { class: 'font-medium' }, id)
    },
  },
  {
    accessorKey: 'consensus_rewards',
    header: () => h('div', { class: '' }, 'Consensus Rewards'),
    cell: ({ row }) => {
      const id = Number.parseFloat(row.getValue('consensus_rewards'))
      return h('div', { class: 'font-medium' }, id)
    },
  },
  {
    accessorKey: 'produced_blocks',
    header: () => h('div', { class: '' }, 'Produced Blocks'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('produced_blocks'))
      return h('div', { class: 'font-medium' }, amount + '%')
    },
  },
]