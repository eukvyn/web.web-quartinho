<template>
    <div class="my-4 text-center">
       <!-- <img src="/static/dist/img/404.png" alt="404"> -->
       <router-link :to="{ name: 'properties' }" style="text-decoration: none; color: #0c0b0b">
          <h2 class="fs-4 fw-normal text-bold font-italic mt-5"><i class="bi bi-house"></i> Voltar para a página Inicial</h2>
       </router-link>
    </div>
 </template>
 
 <script>
 export default {
    name: "NotFound"
 }
 </script>