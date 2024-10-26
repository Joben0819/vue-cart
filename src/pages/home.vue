<script setup lang="ts">
  import Header from '../components/Header.vue';
  import Body from '../components/Body/Body.vue';
  import items from '../assets/json/ecommerce.json';
  import { inject, onMounted, ref } from 'vue';
  import { onCart } from '../reducer/Cart.ts';
  import { watch } from 'vue';
  const store: any = inject('store')
  const product: any = ref(items)
  const cartData: any = ref(store.getState().userCart.cart)
  const add_cart = (data: any) => {
    var total = []
    if(cartData.value.length !== 0){
      const filter = cartData.value.find((i: any)=>{
      return  i.id === data.id
      })
      const map = cartData.value.map((id: any) =>{
          if(id.id === data.id){
            if(data.quantity === id.quantity){
              alert('already on the maximum')
              return {...id , quantity: id.quantity }
            }else{
              return {...id , quantity: id.quantity + 1}
            }
          }else{
            return {...id}
          }
      })
      if(!filter){
      total = [...cartData.value, data]
      }else{
        total = [...map]
      }
    }else{
      total = [data]
    }
    store.dispatch(onCart({cart: total}))
  } 
  const search: any = ref('')
  onMounted(()=>{
  const subscribe = store.subscribe(() => {
    cartData.value = store.getState().userCart.cart;
  });
  return () => subscribe();
})
const searchValue = (data: string) => {
  search.value = data
}
watch(search, (newValue: any) => {
  const filter = items.filter((i:any) =>{
    const isMatch = i.id.toLowerCase().startsWith(newValue.toLowerCase());
    if(isMatch){
      return  i
    }
  })
  product.value = filter
});
</script>

<template>
  <div>
    <Header :data={cartData} @modal="searchValue" />
    <div class="container mt-5 "  >
      <div class="row gap" >
        <Body :data={product} @click="add_cart" :buy="{cartData}" />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.gap{
  column-gap: 1rem;
  row-gap: 1rem;
}
</style>