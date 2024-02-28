<template>
    <Root>
        <!-- Tabs navs -->
        <div class="d-flex justify-content-between">
            <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link" :class="{ 'active': activeTab === 'login' }" id="ex1-tab-1" data-bs-toggle="tab"
                        href="#ex1-tabs-1" role="tab" aria-controls="ex1-tabs-1" @click="setActiveTab('login')">Login</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" :class="{ 'active': activeTab === 'register' }" id="ex1-tab-2" data-bs-toggle="tab"
                        href="#ex1-tabs-2" role="tab" aria-controls="ex1-tabs-2" @click="setActiveTab('register')">Criar
                        Conta</a>
                </li>
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>

        <!-- Tabs content -->
        <div class="tab-content" id="ex1-content">
            <div class="tab-pane fade" :class="{ 'show active': activeTab === 'login' }" id="ex1-tabs-1" role="tabpanel"
                aria-labelledby="ex1-tab-1">
                <LoginTab @changeTab="setActiveTab('register')" />
            </div>
            <div class="tab-pane fade" :class="{ 'show active': activeTab === 'register' }" id="ex1-tabs-2" role="tabpanel"
                aria-labelledby="ex1-tab-2">
                <RegisterTab @changeTab="setActiveTab('login')" />
            </div>
        </div>
    </Root>
</template>

<script>
import Root from './Root.vue';
import LoginTab from './Tabs/Login.vue';
import RegisterTab from './Tabs/Register.vue';

export default {
    name: 'AuthModal',
    components: {
        Root,
        LoginTab,
        RegisterTab
    },
    props: {
        initialActiveTab: {
            type: String,
            default: 'login',
        }
    },
    data() {
        return {
            activeTab: this.initialActiveTab,
        };
    },
    methods: {
        setActiveTab(tabName) {
            this.activeTab = tabName;
        },
    },
}
</script>

<style></style>