<template>
    <div class="card p-3 m-2 w-100">
        <div class="d-flex justify-content-between align-items-center">
            <div class="user d-flex flex-row align-items-center gap-2">
                <img v-if="comment.user.profile_image !== null" :src="`${storageUrl}/${image.image_path}`" width="30"
                    class="rounded-circle mr-2">
                <span v-else class="badge text-bg-secondary me-2 border border-light rounded-circle custom-badge position-relative">
                    <i class="bi bi-person-circle fs-6 position-absolute top-50 start-50 translate-middle"></i>
                </span>
                <span>
                    <small class="font-weight-bold text-primary me-2">{{ comment.user.name }}</small>
                    <small class="font-weight-bold">{{ comment.text }}</small>
                </span>
            </div>

            <small>{{ comment.created_at_formatted }}</small>
        </div>

        <div class="d-flex justify-content-end mt-2 align-items-center">
            <i class="bi bi-star-fill text-warning me-1"></i>
            <span>{{ comment.rating }}</span>
        </div>
        <div v-if="comment.user.id === userLogged.id" class="d-flex justify-content-end mt-2 align-items-center">
            <button class="btn btn-danger w-30" @click="submitDeleteComment"><i class="bi bi-trash3-fill"></i></button>
        </div>
    </div>
</template>
<script>
import { useToast } from "vue-toastification";
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CommentCard',
    props: {
        comment: {
            type: Object,
            default: () => { },
        }
    },
    setup() {
        const toast = useToast()
        return { toast };
    },
    computed: {
        userLogged() {
            return this.user()
        },
        storageUrl() {
            return import.meta.env.VITE_APP_API_STORAGE_URL
        }
    },
    methods: {
        ...mapActions(['deletePropertyComment']),
        ...mapGetters(['user']),
        submitDeleteComment() {
            try {
                this.deletePropertyComment(this.comment)
                this.toast.success("Seu comentário foi excluído!");
            } catch (error) {
                this.toast.error("Falha ao Tentar Excluir Comentário!");
            }
        },
    }
}
</script>
<style>
.custom-badge {
    width: 30px !important;
    height: 30px !important;
}
</style>