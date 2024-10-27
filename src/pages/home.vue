<script setup lang="ts">
  import Body from '../components/Body/Body.vue';
  import items from '../assets/json/ecommerce.json';
  import { inject, onMounted, ref } from 'vue';
  import { onCart } from '../reducer/Cart.ts';
  import { watch } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute()
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
            return {...id, quantity: 1}
          }
      })
      if(!filter){
      const value: any = [data]
      const add = value.map((id: any) =>{return {...id , quantity:  1}})
      total = [...cartData.value, ...add]
      }else{
        total = [...map]
      }
    }else{
      const value: any = [data]
      const map = value.map((id: any) =>{return {...id , quantity:  1}})
      total = map
    }
    console.log(total)
    store.dispatch(onCart({cart: total}))
  } 
  const search: any = ref('')
  onMounted(()=>{
  const subscribe = store.subscribe(() => {
    cartData.value = store.getState().userCart.cart;
  });
  search.value = ''
  console.log(route.query.search,"here unmount")
  return () => subscribe();
})
watch(route , ()=>{
  search.value = route.query.search
  console.log(route.query.search,"here")
})
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
    <div class="container mt-5 "  >
      <div class="row gap justify" >
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

@media screen and (max-width: 600px) and (min-width: 200px) {
  .justify{
    justify-content: center;
  }
  
}
</style>