<template>
    <Root>
        <div v-for="(property, index) in properties" :key="index" class="col-md-6">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary-emphasis">R${{ property.rental_price }} por mês</strong>
                    <h3 class="mb-0">{{ property.title }}</h3>
                    <div class="mb-1 text-body-secondary"><i class="bi bi-geo-alt-fill"></i>{{ property.address }}</div>
                    <p class="card-text mb-auto text-truncate">{{ property.description }}</p>
                    <div class="col-xs-12 m-b-15 d-flex align-items-center gap-3">
                        <span data-toggle="tooltip" data-placement="top" title=""
                            data-original-title="Disponível para homens e mulheres" class="icons">
                            <i class="bi bi-chat-fill me-1"></i>
                            <span>{{ property.comments_count }}</span>
                        </span>
                        <span data-toggle="tooltip" data-placement="top" class="icons pull">
                            <i class="bi bi-star-fill text-warning me-1"></i>
                            <span>{{ Number.parseFloat(property.comments_avg_rating) || '0' }}</span>
                        </span>
                    </div>
                    <router-link class="link-underline link-underline-opacity-0" :to="`/property/${property.id}`">
                        ver detalhes
                        <i class="bi bi-caret-right-fill"></i>
                    </router-link>
                </div>
                <div class="col-auto d-none d-lg-block">
                    <img v-if="property.images.length > 0"
                        :src="`${storageUrl}/${property.images[0].image_path}`" width="200" height="250" alt="Property Image">
                </div>
            </div>
        </div>
    </Root>
</template>
<script>
import Root from './Root.vue'

export default {
    name: 'ListProperties',
    components: {
        Root
    },
    props: {
        properties: {
            type: Array[Object],
            default: [],
        }
    },
    computed: {
        storageUrl() {
            return import.meta.env.VITE_APP_API_STORAGE_URL
        }
    },
}
</script>