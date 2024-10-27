<script setup lang="ts">
import { ref } from 'vue';
import festive from "/src/assets/img/Festive.svg"; 
import chevron from "/src/assets/img/Chevron.svg"; 
import manila from "/src/assets/img/Manila.svg"; 
import mazila from "/src/assets/img/Manila.svg"; 
import diamante from "/src/assets/img/Diamante.svg";
import bannete from "/src/assets/img/Bannete.svg"; 

const imageMap:any = {
  festive, 
  chevron,
  manila,
  mazila,
  diamante,
  bannete
};
const Search = defineEmits(['modal']);
const input: any = ref('');

interface Data {
  cartData: any[]; 
}
interface Props {
  data: Data; 
}

const props = defineProps<Props>()

const btn_Search = (data: string) => {
  Search('modal', data)
}
</script>


<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <router-link :to="{name: 'Home', query:{search: ''}}" class="navbar-brand">
      <font-awesome-icon :icon="['fas', 'house']" />
    </router-link>
    <ul class="navbar-nav me-auto mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle relative" id="cart" style="display: relative;" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" /><strong class="text-danger total">{{props.data.cartData.length}}</strong>
          </a>
          <ul class="dropdown-menu" style="position: absolute!important;">
            <div class="checklist">
              <li class="d-flex m-3" v-for="(cart, index) in props.data.cartData" :key="index">
                <img :src="imageMap[cart.img]" :alt="cart.id" width="50">
                <span class="dropdown-item " style="font-size: .7rem;" >
                  {{cart.id}}<br/>
                  Price: {{cart.price}}<br/>
                  Quantity: {{cart.quantity}}
                </span>
              </li>
            </div>
            <router-link :to="{name: 'Checkout', params:{}}" class="hover-blue text-center"><a class="dropdown-item" href="#">Checkout</a></router-link>
          </ul>
        </li>
      </ul>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse  justify-content-end" id="navbarSupportedContent">
      <div class="d-flex" role="search">
        <input class="form-control me-2"  v-model="input"  type="search" placeholder="keyword" aria-label="Search">
        <button class="btn btn-outline-success" @click="btn_Search(input)" type="submit">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </button>
      </div>
    </div>
  </div>
</nav>
</template>


<style lang="scss" scoped>

.total{
  position: absolute;
    top: 0px;
    font-size: .8rem;
}
.checklist{
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  overflow-y: scroll ;
  height: 12rem;
}
</style>