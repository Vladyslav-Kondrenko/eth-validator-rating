<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  SortingState,
  PaginationState,
  VisibilityState
} from '@tanstack/vue-table'

import { valueUpdater } from '@/lib/utils'
import DataTablePagination from "@/components/ValidatorsRating/DataTablePagination.vue"

import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { h, ref, defineEmits, watch } from 'vue'

import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
} from "@tanstack/vue-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const emit = defineEmits(['sortChanged', 'pageChanged'])

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    rowCount: number,
    pagination: PaginationState,
    filteredColumns: VisibilityState,
}>()

const rowCount = ref(props.rowCount)

watch(() => props.rowCount, (newVal, oldVal) => {
    console.log('rowCountrowCountrowCount');
    rowCount.value = newVal
})
const sorting = ref<SortingState>([])
const pagination = ref<PaginationState>(props.pagination)


const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    get rowCount() { return props.rowCount },
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updaterOrValue => {
        valueUpdater(updaterOrValue, sorting)
        emit('sortChanged', sorting.value?.[0])
    },
    onPaginationChange: updaterOrValue => {
        valueUpdater(updaterOrValue, pagination)
        console.log(pagination)
        emit('pageChanged', pagination.value)
    },
  
    state: {
        get sorting() { return sorting.value },
        get pagination() { return pagination.value }
    },
})

table.setColumnVisibility(props.filteredColumns)
console.log(props.filteredColumns)

watch(() => props.filteredColumns, () => {
    console.log(props.filteredColumns)
    table.setColumnVisibility(props.filteredColumns)
})


</script>

<template>
    <div class="mb-4">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                        :data-state="row.getIsSelected() ? 'selected' : undefined">
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableRow>
                        <TableCell :colSpan="columns.length" class="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>
    </div>
    <DataTablePagination :table="table" />
</template>