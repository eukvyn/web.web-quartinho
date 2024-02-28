<template>
    <div class="container bg-main py-3">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'ContainerComponent'
    }
</script>
<style scoped>
.bg-main {
    background-color: #f5f5f5 !important;
}
</style>