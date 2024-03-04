import { h } from 'vue'
import type { Validator } from './validator.type'
import type { ColumnDef } from '@tanstack/vue-table';

import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-vue-next'
// TODO REFACTOR HERE
export const columns: ColumnDef<Validator>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      const nextSortingOrder = column.getNextSortingOrder() === 'asc' ? false : true;
      const iconClass = nextSortingOrder ? 'rotate-180' : '';
      return h(Button, {
          variant: 'link',
          class: 'text-secondary uppercase hover:no-underline hover:opacity-75 transition-opacity	',
          onClick: () => {
            // default sortingOrder can be as asc|desc|null. With this code order can be only asc|desc
            column.toggleSorting(nextSortingOrder)
            
          },
      }, () => [h(ArrowDown, { class: `mr-2 h-4 w-4 ${iconClass}` }),'#'])
  },
    cell: ({ row }) => {
      const id = Number.parseInt(row.id) + 1;
      return h('div', { class: 'font-medium  text-xs leading-5 bg-primary rounded-xl w-min h-5 px-[7px] mx-auto' }, id)
    },
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'Name'),
    cell: ({ row }) => {
      const id = row.getValue('name') ?? '';
      return h('div', { class: 'text-xs' }, id)
    },
  },
  {
    accessorKey: 'staked',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'Staked'),
    cell: ({ row }) => {
      const id = Number.parseFloat(row.getValue('staked'))
      return h('div', { class: 'font-medium' }, id)
    },
  },
  {
    accessorKey: 'apr',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'APR def'),
    cell: ({ row }) => {
      const apr = Number.parseFloat(row.getValue('apr'))
      
      console.log(row.getValue('apr_30days'), 'apr_30days')
      return h('div', { class: 'font-medium text-[#00FF47]' }, apr+'%')
    },
  },
  {
    accessorKey: 'apr_30days',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'APR 30'),
    cell: ({ row }) => {
      const apr = Number.parseFloat(row.getValue('apr_30days'))
      console.log(row)
      return h('div', { class: 'font-medium text-[#00FF47]' }, apr+'%')
    },
  },
  {
    accessorKey: 'apr_365days',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'APR 365'),
    cell: ({ row }) => {
      const apr = Number.parseFloat(row.getValue('apr_365days'))
      console.log(row)
      return h('div', { class: 'font-medium text-[#00FF47]' }, apr+'%')
    },
  },
  {
    accessorKey: 'executed_rewards',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'Execution Rewards'),
    cell: ({ row }) => {
      const id = Number.parseFloat(row.getValue('executed_rewards'))
      return h('div', { class: 'font-medium' }, id)
    },
  },
  {
    accessorKey: 'consensus_rewards',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'Consensus Rewards'),
    cell: ({ row }) => {
      const id = Number.parseFloat(row.getValue('consensus_rewards'))
      return h('div', { class: 'font-medium' }, id)
    },
  },
  {
    accessorKey: 'produced_blocks',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'Produced Blocks'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('produced_blocks'))
      return h('div', { class: 'font-medium' }, amount + '%')
    },
  },
]