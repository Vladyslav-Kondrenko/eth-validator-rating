import { h } from 'vue'
import type { Validator } from '../validator.type'
import type { ColumnDef } from '@tanstack/vue-table';
import { splitLongNumber } from '@/composable/splitLongNumber'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-vue-next'

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
      const name: string = row.getValue('name') ?? '';
      return h('div', { class: 'text-xs' }, name)
    },
  },
  {
    accessorKey: 'staked',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'Staked'),
    cell: ({ row }) => {
      const staked = splitLongNumber(Number.parseFloat(row.getValue('staked')))
      const stakedUsd = splitLongNumber(row.original.staked_usd);

      return h('div', { class: 'font-medium' }, [
        h('div', {}, staked + ' ETH'),
        h('div', {class: 'text-xs font-normal text-[#575757]'}, '$ ' + stakedUsd)
      ]);
    },
  },
  // adding extra columns as apr_30days/apr_365days is not the best way to create filtering
  {
    accessorKey: 'apr',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'APR'),
    cell: ({ row }) => {
      let apr = Number.parseFloat(row.getValue('apr')) * 100;
      apr = +apr.toFixed(2);
      return h('div', { class: 'font-medium text-[#00FF47]' }, apr+'%')
    },
  },
  {
    accessorKey: 'apr_30days',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'APR'),
    cell: ({ row }) => {
      let apr = Number.parseFloat(row.getValue('apr_30days')) * 100;
      apr = +apr.toFixed(2);
      return h('div', { class: 'font-medium text-[#00FF47]' }, apr+'%')
    },
  },
  {
    accessorKey: 'apr_365days',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'APR'),
    cell: ({ row }) => {
      let apr = Number.parseFloat(row.getValue('apr_365days')) * 100;
      apr = +apr.toFixed(2);
      return h('div', { class: 'font-medium text-[#00FF47]' }, apr+'%')
    },
  },
  {
    accessorKey: 'executed_rewards',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'Execution Rewards'),
    cell: ({ row }) => {
      let executed_rewards = Number.parseFloat(row.getValue('executed_rewards'))
      executed_rewards = +executed_rewards.toFixed(2);
      return h('div', { class: 'font-medium' }, executed_rewards + ' ETH')
    },
  },
  {
    accessorKey: 'consensus_rewards',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'Consensus Rewards'),
    cell: ({ row }) => {
      let consensus_rewards = Number.parseFloat(row.getValue('consensus_rewards'))
      consensus_rewards = +consensus_rewards.toFixed(2);
      return h('div', { class: 'font-medium' }, consensus_rewards + ' ETH')
    },
  },
  {
    accessorKey: 'produced_blocks',
    header: () => h('div', { class: 'text-secondary uppercase' }, 'Produced Blocks'),
    cell: ({ row }) => {
      const produced_blocks = Number.parseFloat(row.getValue('produced_blocks'))
      return h('div', { class: 'font-medium' }, produced_blocks + '%')
    },
  },
]