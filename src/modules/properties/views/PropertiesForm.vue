<template>
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link class="link-underline link-underline-opacity-0"
                    to="/properties">Imóveis</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ isEditing ? 'Editar' : 'Adicionar' }} Imóvel</li>
        </ol>
    </nav>
    <div v-if="isEditing" class="mb-2 card text-dark">
        <div class="card-body">
            <div class="row">
                <div class="text-left align-self-sm-center col-md-6 col-sm-12 col-12">
                    <h5 class="d-inline m-0 mr-2 h5">{{ propertyData.Titulo }}</h5>
                    <span class="badge text-bg-info mx-2">
                        Publicado
                    </span>
                </div>
            </div>
            <div class="mt-2">
                <router-link class="link-underline link-underline-opacity-0" :to="'/property/' + propertyIdByRouteParams">
                    Ver página online
                </router-link>
            </div>
        </div>
    </div>
    <FormVeeValidate @submit="submitProperty" :initial-values="propertyData" class="form">
        <div class="mb-3">
            <h2 class="h5 mb-0">Dados Pessoais & Contato</h2>
            <p class="text-muted">Confirme os dados pessoais para contato cadastrados.</p>
        </div>
        <div class="mb-3">
            <label for="user-name" class="form-label text-uppercase fw-medium">Nome Completo<span
                    class="text-danger">*</span></label>
            <input type="text" class="form-control" id="user-name" :value="userLogged.name" disabled readonly>
        </div>
        <div class="mb-3">
            <label for="user-email" class="form-label text-uppercase fw-medium">Email<span
                    class="text-danger">*</span></label>
            <input type="email" class="form-control" id="user-email" :value="userLogged.email" disabled readonly>
        </div>
        <hr class="mt-1 mb-7" id="">
        <div class="mb-3">
            <h2 class="h5 mb-0">Detalhes</h2>
            <p class="text-muted">Informe os detalhes da vaga.</p>
        </div>
        <div class="mb-3">
            <Field name="Titulo" v-model="propertyData.Titulo" rules="required" class="form-control rounded-3"
                id="floatingInputNameRegister">
                <template #default="{ field, errors }">
                    <label for="property-title" class="form-label text-uppercase fw-medium">Título<span
                            class="text-danger">*</span></label>
                    <input type="text" v-bind="field" class="form-control" id="property-title" aria-describedby="titleHelp">
                    <div id="titleHelp" class="form-text text-muted">Ex: Apartamento Mobiliado na Região Alphaville</div>
                    <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
                </template>
            </Field>
        </div>
        <div class="mb-3">
            <Field name="Descrição" v-model="propertyData.Descrição" rules="required" class="form-control rounded-3"
                id="floatingInputNameRegister">
                <template #default="{ field, errors }">
                    <label for="property-description" class="form-label text-uppercase fw-medium">Descrição<span
                            class="text-danger">*</span></label>
                    <textarea v-bind="field" type="text" class="form-control" id="property-description"></textarea>
                    <div id="descriptionHelp" class="form-text text-muted">Defina os detalhes sobre Localização, Locação,
                        Despesas,
                        Mobília ...
                    </div>
                    <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
                </template>
            </Field>
        </div>
        <div class="mb-3">
            <div class="row">
                <div class="col">
                    <Field name="Preço" v-model="propertyData.Preço" rules="required" class="form-control rounded-3"
                        id="floatingInputNameRegister">
                        <template #default="{ field, errors }">
                            <label for="property-price" class="form-label text-uppercase fw-medium">Preço Mensal (R$)<span
                                    class="text-danger">*</span></label>
                            <input v-bind="field" type="number" class="form-control"
                                aria-label="Amount (to the nearest real)" id="property-price">
                            <div id="priceHelp" class="form-text text-muted">Informe o preço do aluguel Mensal em reais (R$)
                            </div>
                            <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
                        </template>
                    </Field>
                </div>
                <div class="col">
                    <Field name="Endereço" v-model="propertyData.Endereço" rules="required" class="form-control rounded-3"
                        id="floatingInputNameRegister">
                        <template #default="{ field, errors }">
                            <label for="property-address" class="form-label text-uppercase fw-medium">Endereço em uma
                                linha<span class="text-danger">*</span></label>
                            <input v-bind="field" type="text" class="form-control" id="property-address"
                                aria-describedby="addressHelp">
                            <div id="addressHelp" class="form-text text-muted">Ex: Jardim Tupanci, Barueri - SP</div>
                            <span class="error-message" v-if="errors.length">{{ errors[0] }}</span>
                        </template>
                    </Field>

                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="formFileMultiple" class="form-label text-uppercase fw-medium">Fotos do Imóvel</label>
            <input type="file" class="form-control" id="property-images" @change="handleFiles" multiple>
        </div>
        <div v-if="isEditing && propertyData.images" class="mb-3">
            <div v-for="(image) in propertyData.images" :key="image.id" class="d-inline-block position-relative m-1">
                <img :src="`${storageUrl}/${image.image_path}`" alt="" class="img-thumbnail" style="width: 100px; height: 100px;">
                <button type="button" class="btn btn-danger position-absolute top-0 end-0"
                    @click="markImageForDeletion(image.id)"><i class="bi bi-trash-fill"></i></button>
            </div>
        </div>
        <div class="my-5 col-12">
            <router-link class="link-underline link-underline-opacity-0 btn btn-link btn-lg" to="/properties">
                Cancelar
            </router-link>
            <button type="submit" class="transition-3d-hover btn btn-primary btn-lg">
                {{ isEditing ? 'Editar' : 'Adicionar' }}
            </button>
        </div>
    </FormVeeValidate>
</template>
<script>
import { Form as FormVeeValidate, Field, useForm } from 'vee-validate';
import { useToast } from "vue-toastification";
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            isEditing: false,
            propertyData: {
                Titulo: '',
                Descrição: '',
                Preço: '',
                Endereço: '',
                images: []
            },
            selectedFiles: [],
            imagesToDelete: [],
        };
    },
    setup() {
        const toast = useToast()
        const { resetForm } = useForm();
        return { toast, resetForm };
    },
    components: {
        FormVeeValidate,
        Field,
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
        }
    },
    async created() {
        if (this.propertyIdByRouteParams) {
            this.isEditing = true;
            try {
                await this.getProperty(this.propertyIdByRouteParams);
                const property = this.property();
                this.propertyData = {
                    Titulo: property.title,
                    Descrição: property.description,
                    Preço: property.rental_price,
                    Endereço: property.address,
                    images: property.images,
                };
                this.resetForm({ values: this.propertyData });
            } catch (error) {
                console.error(error);
                this.toast.error("Falha ao buscar Imóvel!");
            }
        }
    },
    methods: {
        ...mapActions(['addProperty', 'editProperty', 'getProperty']),
        ...mapGetters(['user', 'property']),
        handleFiles(event) {
            this.selectedFiles = Array.from(event.target.files);
        },
        markImageForDeletion(imageId) {
            this.imagesToDelete.push(imageId);
            this.propertyData.images = this.propertyData.images.filter(image => image.id !== imageId);
        },
        async submitProperty(values) {
            const formData = new FormData();
            formData.append('title', values.Titulo);
            formData.append('description', values.Descrição);
            formData.append('rental_price', values.Preço);
            formData.append('address', values.Endereço);
            this.selectedFiles.forEach(file => {
                formData.append('images[]', file);
            });
            this.imagesToDelete.forEach(id => {
                formData.append('images_to_delete[]', id);
            });
            if (this.isEditing) {
                try {
                    console.log(this.propertyIdByRouteParams)
                    await this.editProperty({ property: formData, id: this.propertyIdByRouteParams});
                    this.toast.success("Edição realizada com sucesso!");
                } catch (error) {
                    console.error(error);
                    this.toast.error("Falha ao editar Imóvel!");
                }
            } else {
                try {
                    const response = await this.addProperty(formData);
                    this.toast.success("Novo Imóvel Adicionado!");
                    window.location.replace(`/properties/${response.id}`);
                } catch (error) {
                    console.error(error);
                    this.toast.error("Falha ao adicionar novo Imóvel!");
                }
            }
        }
    }
}
</script>
<style scoped>
.card-header .btn-link {
    width: 100%;
    text-align: left;
}
</style>
