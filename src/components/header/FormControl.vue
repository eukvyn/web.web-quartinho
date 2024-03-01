<template>
    <div v-if="isAuthenticated" class="dropdown text-end">
        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false">
            <img :src="profileImageDate" alt="mdo" width="32" height="32" class="rounded-circle">
        </a>
        <ul class="dropdown-menu text-small" style="">
            <li>
                <router-link class="dropdown-item" to="/user/profile">
                    <i class="bi bi-person-fill me-2"></i>Meu Perfil
                </router-link>
            </li>
            <li>
                <router-link class="dropdown-item" to="/user/properties">
                    <i class="bi bi-key-fill me-2"></i>Meus Imóveis
                </router-link>
            </li>
            <li>
                <router-link class="dropdown-item" to="/user/comments">
                    <i class="bi bi-chat-fill me-2"></i>Meus Comentários
                </router-link>
            </li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="#" @click="submitLogout()"><i class="bi bi-power me-2"></i>Sair</a></li>
        </ul>
    </div>

    <div v-else class="text-end">
        <button type="button" class="btn btn-primary me-2" @click="openModal('login')">Login</button>
        <button type="button" class="btn btn-secondary" @click="openModal('register')">Criar Conta</button>
        <AuthModal ref="authModal" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { useToast } from "vue-toastification";
import AuthModal from '../auth/Modal/Modal.vue'
import { Modal } from 'bootstrap'

export default {
    name: 'FormControlHeader',
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            imageDefaultUrl:
                'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
        }
    },
    components: {
        AuthModal
    },
    computed: {
        isAuthenticated() {
            return !!this.$store.state.auth.token;
        },
        storageUrl() {
            return import.meta.env.VITE_APP_API_STORAGE_URL
        },
        profileImageDate() {
            return this.user().profile_image !== null ? `${this.storageUrl}/${this.user().profile_image}` : this.imageDefaultUrl
        },
    },
    async created() {
        if (this.$route.query.loginModal === 'open') {
            this.openModal('login')
            this.toast.info("Você precisa fazer login para acessar esse recurso!");
            this.$router.replace({ query: { ...this.$route.query, loginNow: undefined } });
        }
    },
    methods: {
        ...mapActions(['logout']),
        ...mapGetters(['user']),
        submitLogout() {
            try {
                this.logout()
                window.location.reload();
                this.toast.success("Logout realizado com sucesso!");
            } catch (error) {
                this.toast.error("Falha durante o Logout!");
            }
        },
        openModal(tab = 'login') {
            this.$nextTick(() => {
                if (this.$refs.authModal) {
                    this.$refs.authModal.setActiveTab(tab);
                    let modalElement = this.$refs.authModal.$el;
                    let authModal = new Modal(modalElement);
                    authModal.show();
                }
            });
        }
    }
}
</script>

<style></style>