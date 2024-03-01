<template>
    <div class="card p-3 m-2 w-100">
        <div class="d-flex flex-column flex-sm-row justify-content-between">
            <div
                class="d-flex flex-column flex-md-row justify-content-start gap-2 mb-2 mb-sm-0"
            >
                <div class="d-flex align-items-center">
                    <img
                        v-if="comment.user.profile_image"
                        :src="`${storageUrl}/${comment.user.profile_image}`"
                        width="30"
                        class="rounded-circle me-2"
                        alt="User profile"
                    />
                    <span
                        v-else
                        class="badge text-bg-secondary border border-light rounded-circle custom-badge me-2"
                    >
                        <i class="bi bi-person-circle fs-6"></i>
                    </span>
                    <small class="font-weight-bold text-primary me-2">{{
                        comment.user.name
                    }}</small>
                </div>
                <div class="d-flex flex-column flex-sm-row align-items-start">
                    <p class="font-weight-bold mb-0 text-break">
                        {{ comment.text }}
                    </p>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="d-flex align-items-center gap-2">
                <small class="text-muted">{{ comment.created_at_formatted }}</small>
                <div>
                    <i class="bi bi-star-fill text-warning me-1"></i>
                    <span>{{ comment.rating }}</span>
                </div>
            </div>
            <div v-if="comment.user.id === userLogged.id">
                <button class="btn btn-danger" @click="submitDeleteComment">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'CommentCard',
    props: {
        comment: {
            type: Object,
            default: () => {},
        },
    },
    setup() {
        const toast = useToast()
        return { toast }
    },
    computed: {
        userLogged() {
            return this.user()
        },
        storageUrl() {
            return import.meta.env.VITE_APP_API_STORAGE_URL
        },
    },
    methods: {
        ...mapActions(['deletePropertyComment']),
        ...mapGetters(['user']),
        submitDeleteComment() {
            try {
                this.deletePropertyComment(this.comment)
                this.toast.success('Seu comentário foi excluído!')
            } catch (error) {
                this.toast.error('Falha ao Tentar Excluir Comentário!')
            }
        },
    },
}
</script>
<style scoped>
.custom-badge {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 576px) {
    .text-truncate {
        max-width: 100px; /* Ajuste conforme necessário para telas menores */
    }
}
</style>
