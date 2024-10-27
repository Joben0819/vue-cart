
<template>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/checkout">Checkout</router-link>
    </nav>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() =>{
  console.log("Vue app has loaded");
})
</script>


<style scoped>

</style>
