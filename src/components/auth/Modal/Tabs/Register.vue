<template>
	<div class="modal-header p-5 pb-4 border-bottom-0">
		<h1 class="fw-bold mb-0 fs-2 text-start">Cadastre-se no WebQuartinho</h1>
	</div>

	<div class="modal-body p-5 pt-0">
		<FormVeeValidate @submit="submitRegister" class="form">
			<div class="form-floating mb-3">
				<Field name="Nome" rules="required" class="form-control rounded-3" id="floatingInputNameRegister">
					<template #default="{ field, errors }">
						<input v-bind="field" placeholder="Nome Completo" class="form-control rounded-3"
							:class="{ 'input-error': errors.length > 0 }" />
						<label for="floatingInputNameRegister">Nome</label>
						<span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
					</template>
				</Field>
			</div>
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
				<Field name="Senha"
					:rules="{ required: true, min: 8, regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/ }"
					class="form-control rounded-3" id="floatingInputPasswordRegister">
					<template #default="{ field, errors }">
						<div class="input-group">
							<input spellcheck="false" autocorrect="off" autocapitalize="off" v-bind="field" :type="showPassword ? 'text' : 'password'" placeholder="Senha"
							class="form-control rounded-3 form-icon-trailing" :class="{ 'input-error': errors.length > 0 }" />
							<button class="btn btn-lg bs-none btn-show-password" type="button" @click="toggleShow()">
								<i v-if="!showPassword" class="bi bi-eye-fill trailing"></i>
								<i v-else class="bi bi-eye-slash-fill trailing"></i>
							</button>
						</div>
						<span class="error-message" v-if="errors.length">
							<p v-if="errors[0] === 'O campo Senha possui um formato inválido'">
								Deve conter no mínimo 1 número, 1 maiúscula, 1 minúscula e 1 caractere
								especial
							</p>
							<p v-else>
								{{ errors[0] }}
							</p>
						</span>
					</template>
				</Field>
			</div>
			<button type="submit" class="w-100 mb-2 btn btn-lg rounded-3 btn-primary">Criar Conta</button>
		</FormVeeValidate>
		<hr class="my-4">
		<div class="d-flex align-items-center">
			<small class="text-body-secondary text-center align-center">Já é cadastrado?</small>
			<button class="btn btn-link btn-sm text-center align-center" @click="changeTab">Acesse sua conta</button>
		</div>
	</div>
</template>

<script>
import { Form, Field } from 'vee-validate';
import { useToast } from "vue-toastification";
import { mapActions } from 'vuex';

export default {
	name: 'RegisterTabAuthModal',
	data() {
		return {
			showPassword: false,
		}
	},
	components: {
		FormVeeValidate: Form,
		Field,
	},
	setup() {
		const toast = useToast();
		return { toast };
	},
	methods: {
		...mapActions(['register']),
		toggleShow() {
			this.showPassword = !this.showPassword;
		},
		changeTab() {
			this.$emit('changeTab');
		},
		async submitRegister(values) {
			try {
				const user = {
					name: values.Nome,
					email: values.Email,
					password: values.Senha,
				}
				await this.register(user);
				this.$nextTick(() => window.location.reload());
				this.toast.success("Conta Criada com Sucesso!");
                this.toast.success("Login Realizado com Sucesso!");
			} catch (error) {
				if (error.response && error.response.data && error.response.data.errors) {
					const errors = error.response.data.errors;
					Object.keys(errors).forEach(key => {
						errors[key].forEach(message => {
							if (message === 'The email has already been taken.') {
								this.toast.error('Esse email já foi cadastrado na plataforma.')
							} else {
								this.toast.error(message)
							}
						});
					});
				} else {
					this.toast.error("Falha na Criação da Conta!");
				}
			}
		}
	}
}
</script>
<style scoped>
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