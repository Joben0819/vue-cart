
<template>
  <div>
    <Header :data={cartData} @modal="searchValue" />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const store: any = inject('store')
const cartData = ref(store.getState().userCart.cart)
onMounted(()=>{
  const subscribe = store.subscribe(() => {
    cartData.value = store.getState().userCart.cart;
  });
  return () => subscribe();
})
const searchValue = (data: string) => {
  router.push({ path: '/', query: { search: data } });
}
onMounted(() =>{
  console.log("Vue app has loaded");
})
</script>


<style scoped>

</style>
