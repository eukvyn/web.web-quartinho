<template>
    <div v-if="isAuthenticated" class="dropdown text-end">
        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
        </a>
        <ul class="dropdown-menu text-small" style="">
            <li><a class="dropdown-item" href="#"><i class="bi bi-person-fill me-2"></i>Minha Conta</a></li>
            <li><a class="dropdown-item" href="#"><i class="bi bi-key-fill me-2"></i>Meus Imóveis</a></li>
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
import { mapActions } from 'vuex';
import { useToast } from "vue-toastification";
import AuthModal from '../auth/Modal/Modal.vue'
import { Modal } from 'bootstrap'

export default {
    name: 'FormControlHeader',
    setup() {
		const toast = useToast();
		return { toast };
	},
    components: {
        AuthModal
    },
    computed: {
        isAuthenticated() {
            return !!this.$store.state.auth.token;
        }
    },
    methods: {
        ...mapActions(['logout']),
        submitLogout() {
            try {
                this.logout()
                this.toast.success("Logout realizado com sucesso!");
            } catch (error) {
                this.toast.error("Falha durante o Logout!");
            }
        },
        openModal(tab) {
            this.$refs.authModal.setActiveTab(tab);
            let modalElement = this.$refs.authModal.$el;
            let authModal = new Modal(modalElement);
            authModal.show();
        }
    }
}
</script>

<style></style>