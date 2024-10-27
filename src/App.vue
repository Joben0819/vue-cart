
<template>
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
