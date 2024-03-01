<template>
    <!-- Conteúdo da Tab Login -->
    <div class="modal-header p-5 pb-4 border-bottom-0">
        <h1 class="fw-bold mb-0 fs-2">Acesse sua conta</h1>
    </div>

    <div class="modal-body p-5 pt-0">
        <FormVeeValidate @submit="submitLogin" class="form">
            <div class="form-floating mb-3">
                <Field name="Email" rules="required|email" class="form-control rounded-3" id="floatingInputEmailRegister">
                    <template #default="{ field, errors }">
                        <input v-bind="field" type="email" placeholder="Email" class="form-control rounded-3"
                            :class="{ 'input-error': errors.length > 0 }" />
                        <label for="floatingInputEmailRegister">Email</label>
                        <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
                    </template>
                </Field>
            </div>
            <div class="form-floating mb-3">
                <Field name="Senha" :rules="{ required: true }" class="form-control rounded-3"
                    id="floatingInputPasswordRegister">
                    <template #default="{ field, errors }">
                        <div class="input-group">
                            <input spellcheck="false" autocorrect="off" autocapitalize="off" v-bind="field"
                                :type="showPassword ? 'text' : 'password'" placeholder="Senha"
                                class="form-control rounded-3 form-icon-trailing"
                                :class="{ 'input-error': errors.length > 0 }" />
                            <button class="btn btn-lg bs-none btn-show-password" type="button" @click="toggleShow()">
                                <i v-if="!showPassword" class="bi bi-eye-fill trailing"></i>
                                <i v-else class="bi bi-eye-slash-fill trailing"></i>
                            </button>
                        </div>
                        <span class="error-message" v-if="errors.length">
                            <p>
                                {{ errors[0] }}
                            </p>
                        </span>
                    </template>
                </Field>
            </div>
            <button type="submit" class="w-100 mb-2 btn btn-lg rounded-3 btn-primary">Entrar</button>
        </FormVeeValidate>
    </div>
</template>

<script>
import { Form, Field } from 'vee-validate';
import { useToast } from "vue-toastification";
import { mapActions } from 'vuex';

export default {
    name: 'LoginTabAuthModal',
    components: {
        FormVeeValidate: Form,
        Field,
    },
    setup() {
        const toast = useToast()
        return { toast }
    },
    data() {
        return {
            showPassword: false,
        };
    },
    methods: {
        ...mapActions(['login']),
        changeTab() {
            this.$emit('changeTab')
        },
        toggleShow() {
			this.showPassword = !this.showPassword;
		},
        async submitLogin(values) {
            try {
                const user = {
                    email: values.Email,
                    password: values.Senha,
                }
                const currentRoute = this.$router.currentRoute.value.fullPath
                await this.login(user);
                if (this.$route.query.redirect) {
                    window.location.replace(this.$route.query.redirect + "?loginNow=true");
                } else {
                    window.location.replace(currentRoute + "?loginNow=true");
                }
            } catch (error) {
                if (error.response.data.message === 'The provided credentials are incorrect.') {
                    this.toast.error("Credenciais Inválidas!");
                } else {
                    this.toast.error("Falha no Login!");
                }
            }
        }
    }
}
</script>

<style>
.error-message {
    color: red;
}

.input-error {
    border-color: red !important;
}

.btn-show-password:focus {
    box-shadow: 0 0 0 0 !important;
    border: 0 none !important;
    outline: 0 !important;
}
</style>