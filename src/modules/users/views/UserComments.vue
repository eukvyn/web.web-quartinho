<template>
    <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link class="link-underline link-underline-opacity-0" to="#"
                    >Usuário</router-link
                >
            </li>
            <li class="breadcrumb-item active" aria-current="page">Meus Comentários</li>
        </ol>
    </nav>
    <div class="container">
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="career-search mb-60">
                    <div class="filter-result">
                        <div
                            v-for="comment in commentsList"
                            :key="comment.id"
                            class="job-box d-md-flex align-items-center justify-content-between mb-30"
                        >
                            <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                <div
                                    v-if="comment.property.images.length > 0"
                                    class="avatar-preview mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex"
                                >
                                    <div
                                        :style="{
                                            backgroundImage:
                                                'url(' +
                                                `${storageUrl}/${comment.property.images[0].image_path}` +
                                                ')',
                                        }"
                                        id="imagePreview"
                                    ></div>
                                </div>
                                <div
                                    v-else
                                    class="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex"
                                >
                                    <i class="bi bi-building"></i>
                                </div>
                                <div class="job-content ps-4">
                                    <h5 class="text-left">{{ comment.property.title }}</h5>
                                    <ul class="d-md-flex flex-wrap p-0 text-capitalize">
                                        <li class="me-md-4">
                                            <i class="bi bi-chat-fill me-2"></i>
                                            <span style="
                                                    text-overflow: ellipsis;
                                                    white-space: nowrap;
                                                    overflow: hidden;
                                                "
                                            >
                                                {{ truncateText(comment.text, 6) }}
                                            </span>
                                        </li>
                                        <li class="me-md-4">
                                            <i class="bi bi-star-fill text-warning me-1"></i>
                                            <span>{{ comment.rating }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center my-4">
                                <router-link
                                    class="d-flex align-items-center gap-2 btn btn-primary"
                                    :to="`/property/${comment.property.id}`"
                                >
                                    <i class="bi bi-eye-fill"></i>
                                    <span class="d-none d-lg-inline-block">Ver online</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useToast } from 'vue-toastification'
import { mapActions, mapGetters } from 'vuex'

export default {
    setup() {
        const toast = useToast()

        return { toast }
    },
    components: {},
    data() {
        return {}
    },
    computed: {
        storageUrl() {
            return import.meta.env.VITE_APP_API_STORAGE_URL
        },
        commentsList() {
            return this.userComments()
        },
    },
    created() {
        this.loadCommentsData()
    },
    methods: {
        ...mapActions(['getUserComments']),
        ...mapGetters(['userComments']),
        truncateText(text, limit) {
            const words = text.split(' ')

            if (words.length > limit) {
                return words.slice(0, limit).join(' ') + '...'
            }

            return text
        },
        async loadCommentsData() {
            try {
                await this.getUserComments()
            } catch (error) {
                console.error(error)
            }
        },
    },
}
</script>
<style scoped>
body {
    background: #f5f5f5;
    margin-top: 20px;
}

.filter-result .job-box {
    background: #fff;
    -webkit-box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
    box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
    border-radius: 10px;
    padding: 10px 35px;
}

ul {
    list-style: none;
}

.job-box .img-holder {
    height: 65px;
    width: 65px;
    background-color: #4e63d7;
    background-image: -webkit-gradient(
        linear,
        left top,
        right top,
        from(rgba(78, 99, 215, 0.9)),
        to(#5a85dd)
    );
    background-image: linear-gradient(to right, rgba(78, 99, 215, 0.9) 0%, #5a85dd 100%);
    font-family: 'Open Sans', sans-serif;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 65px;
}

.job-content ul li {
    font-weight: 600;
    opacity: 0.75;
    border-bottom: 1px solid #ccc;
    padding: 10px 5px;
}

@media (min-width: 768px) {
    .job-content ul li {
        border-bottom: 0;
        padding: 0;
    }
}

.job-content ul li i {
    font-size: 20px;
    position: relative;
    top: 1px;
}

.mb-30 {
    margin-bottom: 30px;
}

.avatar-preview {
    width: 65px;
    height: 65px;
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
</style>
