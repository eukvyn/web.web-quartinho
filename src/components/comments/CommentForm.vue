<template>
    <FormVeeValidate @submit="submitComment" class="border-info form card-custom">
        <div class="row mb-3 d-flex align-items-start justify-content-center">
            <div class="col-md-8">
                <Field
                    name="Comentário"
                    rules="required"
                    class="form-control rounded-3"
                    id="floatingTextAreaComment"
                >
                    <template #default="{ field, errors }">
                        <label for="property-description" class="form-label fw-medium"
                            >Faça um Comentário:</label
                        >
                        <textarea
                            :disabled="!isAuthenticated"
                            v-bind="field"
                            type="text"
                            class="form-control"
                            id="property-description"
                        ></textarea>
                        <div id="descriptionHelp" class="form-text text-muted">
                            Escreva aqui a sua avaliação, dúvidas, etc..
                        </div>
                        <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
                    </template>
                </Field>
            </div>
            <div class="col-md-4">
                <Field
                    name="Nota"
                    rules="required"
                    class="form-control rounded-3"
                    id="floatingSelectRatingComment"
                >
                    <template #default="{ field, errors }">
                        <label for="property-description" class="form-label fw-medium"
                            >Escolha uma nota de 1 a 5.</label
                        >
                        <select class="form-select" v-bind="field" :disabled="!isAuthenticated">
                            <option value="">Notas...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
                    </template>
                </Field>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-end my-2">
            <button
                v-if="isAuthenticated"
                type="submit"
                class="transition-3d-hover btn btn-primary"
            >
                <i class="bi bi-chat-dots-fill"></i>
                Enviar Comentário
            </button>
            <a
                v-else
                type="button"
                class="transition-3d-hover btn btn-primary"
                :href="`/property/${propertyIdByRouteParams}?loginModal=open`"
            >
                <i class="bi bi-chat-dots-fill"></i>
                Faça Login Para Enviar um Comentário
            </a>
        </div>
    </FormVeeValidate>
</template>
<script>
import { Form as FormVeeValidate, Field } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { mapActions } from 'vuex'

export default {
    name: 'CommentForm',
    components: {
        FormVeeValidate,
        Field,
    },
    setup() {
        const toast = useToast()
        return { toast }
    },
    props: {
        comments: {
            type: Array[Object],
            default: [],
        },
    },
    computed: {
        propertyIdByRouteParams() {
            return this.$route.params.id
        },
        isAuthenticated() {
            return !!this.$store.state.auth.token
        },
    },
    methods: {
        ...mapActions(['addPropertyComment']),
        submitComment(values) {
            try {
                const payload = { text: values.Comentário, rating: values.Nota }
                this.addPropertyComment({
                    comment: payload,
                    propertyId: this.propertyIdByRouteParams,
                })
                this.toast.success('Comentário Enviado!')
            } catch (error) {
                this.toast.error('Falha ao Tentar Adicionar Comentário!')
            }
        },
    },
}
</script>
<style scoped></style>
