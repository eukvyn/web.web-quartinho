<template>
    <HeaderComponent />
    <div class="bg-main">
        <Container>
            <router-view />
        </Container>
    </div>
</template>
 
<script>
import HeaderComponent from '../components/header/Header.vue'
import Container from '../components/container/Container.vue'

export default {
    name: 'DashboardTemplate',
    components: {
        HeaderComponent,
        Container
    }
}
</script>
<style scoped>
.bg-main {
    background-color: #f5f5f5 !important;
}
</style>