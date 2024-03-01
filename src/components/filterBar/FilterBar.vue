<template>
    <div class="filter-bar d-flex flex-column flex-md-row align-items-center gap-2 my-2">
        <select class="form-select" v-model="selectedFilter">
            <option value="">Escolher Filtros</option>
            <option v-for="(opt, index) in options" :key="index" :value="opt.value">
                {{ opt.text }}
            </option>
        </select>
        <button
            type="button"
            class="btn btn-info px-md-5 d-flex align-items-center gap-2 buttons-filter"
            @click="applyFilter"
            :disabled="!selectedFilter"
        >
            <i class="bi bi-filter"></i>Filtrar
        </button>
        <button
            type="button"
            class="btn btn-transparent d-flex align-items-center gap-2 buttons-filter"
            @click="clearFilter"
            :disabled="!selectedFilter"
        >
            <i class="bi bi-x-lg"></i>Limpar
        </button>
    </div>
</template>

<script>
export default {
    name: 'FilterBar',
    props: {
        options: {
            type: Array[Object],
            default: [],
        },
    },
    data() {
        return {
            selectedFilter: '',
        }
    },
    methods: {
        applyFilter() {
            this.$emit('filter-applied', this.selectedFilter)
        },
        clearFilter() {
            this.selectedFilter = ''
            this.$emit('filter-applied', this.selectedFilter)
        },
    },
}
</script>
<style scoped>
.buttons-filter {
    width: 100%;
}

@media (min-width: 768px) {
    .buttons-filter {
        width: auto;
    }
}
</style>