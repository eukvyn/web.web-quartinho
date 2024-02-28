<template>
    <!-- Page -->
    <div class="login-box" style="width: 400px">
        <div class="card card-outline card-gray">

            <div class="card-header text-center">
                <!-- <img class="img-size-50 img-circle mb-3 mr-2" src="/static/dist/img/longavida.png" alt="message user image"> -->
                <span class="h1 text-gray-dark"><b>Vida Longa</b></span>
            </div>

            <!-- Page content -->
            <router-view />
            <!-- /.page content -->
        </div>
    </div>
</template>
  
<script>
export default {
    name: "AuthTemplate",
    created() {
        document.querySelector('body').className = "hold-transition login-page"
    }
}
</script>
  
<style scoped></style>