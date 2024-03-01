<template>
    <div class="modal fade" id="modalConfirmation" tabindex="-1" role="document">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>{{ message }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-danger" @click="confirmAction" :disabled="loading">
                        <div class="d-flex align-items-center">
                            <span>Sim</span>
                            <div v-if="loading" class="spinner-border spinner-border-sm float-right ml-1" role="status"
                                aria-hidden="true"></div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ConfirmationModal',
    props: {
        modalId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: "Confirmar Ação",
        },
        message: {
            type: String,
            default: "Essa ação não poderá ser desfeita! Tem certeza que deseja continuar?",
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        confirmAction() {
            this.loading = true;
            this.$emit("actionConfirmed");
        },
    },
};
</script>
  
<style></style>