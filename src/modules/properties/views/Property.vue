<template>
    <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link class="link-underline link-underline-opacity-0" to="/properties"
                    >Imóveis</router-link
                >
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ propertyData.title }}</li>
        </ol>
    </nav>
    <div
        v-if="hasImage"
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="carousel"
    >
        <div class="carousel-indicators">
            <button
                v-for="(image, index) in propertyData.images"
                :key="index"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                :data-bs-slide-to="index"
                :class="{ active: index === 0 }"
                :aria-label="'Slide ' + (index + 1)"
            ></button>
        </div>
        <div class="carousel-inner">
            <div
                v-for="(image, index) in propertyData.images"
                :key="image.id"
                class="carousel-item"
                :class="{ active: index === 0 }"
            >
                <img
                    :src="`${storageUrl}/${image.image_path}`"
                    class="d-block w-100 carousel-image"
                    alt="..."
                />
            </div>
        </div>
        <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
        >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <div class="row">
        <div id="details" class="col-xs-12">
            <h3 class="fw-semibold custom-title">{{ propertyData.title }}</h3>
            <div class="custom-border"></div>
        </div>
        <div class="col-xs-6 m-3 fs-6 fw-medium custom-details">
            <div class="mb-3">
                <span itemprop="description" id="desc_collapse" class="out">
                    {{ propertyData.description }}
                </span>
            </div>
            <div class="d-flex align-items-center gap-2">
                <i class="bi bi-coin"></i>
                <div class="it_dv text">
                    <span>R${{ propertyData.rental_price }} por mês</span>
                </div>
            </div>
            <div class="d-flex align-items-center gap-2">
                <i class="bi bi-geo-alt-fill"></i>
                <div class="it_dv text">
                    <span>{{ propertyData.address }}</span>
                </div>
            </div>
            <div class="d-flex align-items-center gap-2">
                <i class="bi bi-star-fill text-warning"></i>
                <div class="it_dv text">
                    <span>{{
                        Number.parseFloat(propertyData.comments_avg_rating).toFixed(1) || '0'
                    }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <h3 class="fw-semibold custom-section">Comodidades</h3>
            <div class="custom-border"></div>
            <div class="d-flex flex-wrap mt-3">
                <div v-for="amenity in propertyData.amenities" :key="amenity.id" class="p-2">
                    <div class="amenity-item d-flex align-items-center gap-2">
                        <i class="bi bi-check-lg text-success"></i>
                        <span>{{ amenity.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div id="description" class="col-xs-12">
            <h3 class="fw-semibold custom-section">Avaliações ({{ propertyData.comments_count }})</h3>
            <div class="custom-border"></div>
        </div>
    </div>
    <CommentForm v-if="propertyData.user_id !== userLogged.id" />
    <hr v-if="propertyCommentsData.length > 0" class="divider" />
    <FilterBar
        v-if="propertyCommentsData.length > 0"
        :options="optionsFilter"
        @filter-applied="applyFilter"
    />
    <Comments v-if="propertyCommentsData.length > 0" :comments="propertyCommentsData" />
</template>
<script>
import { useToast } from 'vue-toastification'
import CommentForm from '../../../components/comments/CommentForm.vue'
import FilterBar from '../../../components/filterBar/FilterBar.vue'
import Comments from '../../../components/comments/List.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'PropertyShow',
    components: {
        CommentForm,
        FilterBar,
        Comments,
    },
    setup() {
        const toast = useToast()
        return { toast }
    },
    data() {
        return {
            optionsFilter: [
                { value: 'most_recent', text: 'Mais Recentes' },
                { value: 'least_recent', text: 'Mais Antigos' },
                { value: 'highest_rating', text: 'Maiores Notas' },
                { value: 'lowest_rating', text: 'Menores Notas' },
            ],
        }
    },
    computed: {
        userLogged() {
            return this.user()
        },
        storageUrl() {
            return import.meta.env.VITE_APP_API_STORAGE_URL
        },
        propertyIdByRouteParams() {
            return this.$route.params.id
        },
        propertyData() {
            return this.property()
        },
        propertyCommentsData() {
            return this.propertyComments()
        },
        hasImage() {
            return this.propertyData.images && this.propertyData.images.length > 0
        },
    },
    async created() {
        if (this.$route.query.loginNow === 'true') {
            this.toast.success('Login Realizado com Sucesso!')
            this.$router.replace({ query: { ...this.$route.query, loginNow: undefined } })
        }
        if (this.$route.query.loginModal === 'open') {
            this.$router.replace({ query: { ...this.$route.query, loginModal: undefined } })
        }
        try {
            await this.getProperty(this.propertyIdByRouteParams)
        } catch (error) {
            console.error(error)
            this.toast.error('Falha ao buscar Imóvel!')
        }
        try {
            await this.getPropertyComments({ propertyId: this.propertyIdByRouteParams, filter: '' })
        } catch (error) {
            console.error(error)
            this.toast.error('Falha ao buscar os Comentários do Imóvel!')
        }
    },
    methods: {
        ...mapActions(['getProperty', 'getPropertyComments']),
        ...mapGetters(['user', 'property', 'propertyComments']),
        async applyFilter(filterValue) {
            try {
                await this.getPropertyComments({
                    propertyId: this.propertyIdByRouteParams,
                    filter: filterValue,
                })
                if (filterValue === '') {
                    this.toast.success('O filtro foi limpo com sucesso!')
                } else {
                    this.toast.success('Filtro Aplicado!')
                }
            } catch (error) {
                console.error(error)
                this.toast.error('Erro ao aplicar o filtro.')
            }
        },
    },
}
</script>
<style scoped>
.custom-border {
    height: 4px;
    width: 48px;
    border-radius: 5px;
    background-color: #7fc1fc;
    display: block;
    margin-right: auto;
    margin-left: 0;
    margin-bottom: auto;
}

.custom-section {
    font-size: 24px;
    color: #505458;
    margin: 10px 0;
}

.custom-title {
    color: #505458;
}

.custom-details {
    color: #505458;
}

.carousel-image {
    max-height: 500px;
    object-fit: contain;
    margin: auto;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 10px;
}

.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
    background-color: rgba(0, 0, 0, 0.7);
}
</style>
