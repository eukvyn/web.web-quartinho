<template>
    <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link class="link-underline link-underline-opacity-0" to="#"
                    >Usuário</router-link
                >
            </li>
            <li class="breadcrumb-item active" aria-current="page">Perfil de Usuário</li>
        </ol>
    </nav>
    <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-4 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <div class="avatar-upload">
                        <div class="avatar-edit">
                            <input
                                id="imageUpload"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                @change="handleFile"
                            />
                            <label for="imageUpload"><i class="bi bi-pencil-fill"></i></label>
                        </div>
                        <div class="avatar-preview">
                            <div
                                :style="{
                                    backgroundImage: 'url(' + profileImageDate + ')',
                                }"
                                id="imagePreview"
                            ></div>
                        </div>
                    </div>
                    <div class="small font-italic text-muted mb-4">JPG ou PNG menor que 5 MB</div>
                </div>
            </div>
            <div class="col-md-8 border-right">
                <FormVeeValidate @submit="submitProfile" class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Configurações de Perfil</h4>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <Field
                                name="Nome"
                                v-model="userData.Nome"
                                rules="required"
                                class="form-control rounded-3"
                                id="floatingInputNameEdit"
                            >
                                <template #default="{ field, errors }">
                                    <label
                                        for="property-title"
                                        class="form-label text-uppercase fw-medium"
                                        >Nome<span class="text-danger">*</span></label
                                    >
                                    <input
                                        type="text"
                                        v-bind="field"
                                        class="form-control"
                                        id="property-title"
                                        aria-describedby="titleHelp"
                                    />
                                    <span class="error-message" v-if="errors.length">{{
                                        errors[0]
                                    }}</span>
                                </template>
                            </Field>
                        </div>
                        <div class="col-md-12">
                            <Field
                                v-model="userData.Email"
                                name="Email"
                                rules="required|email"
                                class="form-control rounded-3"
                                id="floatingInputEmailEdit"
                            >
                                <template #default="{ field, errors }">
                                    <label
                                        for="property-title"
                                        class="form-label text-uppercase fw-medium"
                                        >Email<span class="text-danger">*</span></label
                                    >
                                    <input
                                        type="email"
                                        v-bind="field"
                                        class="form-control"
                                        id="property-title"
                                        aria-describedby="titleHelp"
                                    />
                                    <span class="error-message" v-if="errors.length">{{
                                        errors[0]
                                    }}</span>
                                </template>
                            </Field>
                        </div>
                    </div>
                    <div class="mt-5 text-center">
                        <button class="btn btn-primary profile-button" type="submit">Salvar</button>
                    </div>
                </FormVeeValidate>
            </div>
        </div>
    </div>
</template>

<script>
import { Form as FormVeeValidate, Field, useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

export default {
    setup() {
        const toast = useToast()
        const { resetForm } = useForm()

        return { toast, resetForm }
    },
    components: {
        FormVeeValidate,
        Field,
    },
    data() {
        return {
            imageDefaultUrl:
                'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
            userData: {
                Nome: '',
                Email: '',
            },
            profile_image: null,
            selectedFile: null,
            imagePreviewUrl: null,
        }
    },
    computed: {
        profileImageDate() {
            if (this.imagePreviewUrl !== null) return this.imagePreviewUrl
            if (this.user().profile_image !== null)
                return `${this.storageUrl}/${this.user().profile_image}`
            return this.imageDefaultUrl
        },
        storageUrl() {
            return import.meta.env.VITE_APP_API_STORAGE_URL
        },
    },
    created() {
        this.loadUserData()
    },
    methods: {
        ...mapActions(['userEdit']),
        ...mapGetters(['user']),
        previewImage(event) {
            if (event.target.files && event.target.files[0]) {
                const file = event.target.files[0]
                const reader = new FileReader()

                reader.onload = e => {
                    this.imagePreviewUrl = e.target.result
                }

                reader.readAsDataURL(file)
            }
        },
        handleFile(event) {
            this.selectedFile = event.target.files[0]
            this.previewImage(event)
        },
        loadUserData() {
            const user = this.user()
            this.userData = {
                Nome: user.name,
                Email: user.email,
            }
            this.profile_image = user.profile_image
            this.resetForm({ values: this.userData })
        },
        async submitProfile(values) {
            const formData = new FormData()
            formData.append('name', values.Nome)
            formData.append('email', values.Email)
            if (this.selectedFile) {
                formData.append('profile_image', this.selectedFile)
            }
            try {
                await this.userEdit(formData)
                this.toast.success('Perfil Atualizado com Sucesso!')
            } catch (error) {
                console.error(error)
                this.toast.error('Falha ao Atualizar Perfil!')
            }
        },
    },
}
</script>

<style scoped>
.error-message {
    color: red;
}

.form-control:focus {
    box-shadow: none;
    border-color: #ba68c8;
}

.profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none;
}

.profile-button:hover {
    background: #682773;
}

.profile-button:focus {
    background: #682773;
    box-shadow: none;
}

.profile-button:active {
    background: #682773;
    box-shadow: none;
}

.back:hover {
    color: #682773;
    cursor: pointer;
}

.labels {
    font-size: 11px;
}

.add-experience:hover {
    background: #ba68c8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #ba68c8;
}

.avatar-upload {
    position: relative;
    max-width: 205px;
    margin: 50px auto;

    .avatar-edit {
        position: absolute;
        right: 12px;
        z-index: 1;
        top: 10px;

        input {
            display: none;

            + label {
                display: inline-block;
                width: 34px;
                height: 34px;
                margin-bottom: 0;
                border-radius: 100%;
                background: #ffffff;
                border: 1px solid transparent;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
                cursor: pointer;
                font-weight: normal;
                transition: all 0.2s ease-in-out;

                &:hover {
                    background: #f1f1f1;
                    border-color: #d6d6d6;
                }
            }
        }
    }

    .avatar-preview {
        width: 192px;
        height: 192px;
        position: relative;
        border-radius: 100%;
        border: 6px solid #f8f8f8;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

        > div {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
}
</style>
