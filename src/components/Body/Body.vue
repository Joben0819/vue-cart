<template>
  <div
    style="width: 12rem; position: relative;"
    v-for="item in props.data.product"
    :key="item.id" 
  >
    <div class="card col-6" style="width: 12rem;" :id="item.id.toString()">
      <img :src="imageMap[item.img]" class="card-img-top" height="100" width="100%" :alt="item.id" />
      <div class="content">
        <h5 class="card-title text-center">{{ item.id }}</h5>
        <p class="card-text" style="font-size: 0.8rem;">
          {{ item.text }}
        </p>
        <p style="font-size: 0.8rem; height: 1rem; margin: 0;">
          Quantity: {{ item.quantity }}
        </p>
        <a @click="addCart(item)" class="btn btn-primary">
          {{ item.price }}
        </a>
      </div>
      <div :id="item.id.toString() + '-data'" class="invisibles"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
const click = defineEmits(['click']);

const addCart = (data: any) => {
  click('click', data);
  animation(data.id);
};

interface Data {
  product: Array<{
    id: string;
    img: string;
    text: string;
    quantity: number;
    price: number;
  }>;
}

interface CartData {
  cartData: any[];
}

interface Props {
  data: Data;
  buy: CartData;
}

const props = defineProps<Props>();
const bought = ref(props.buy.cartData);
console.log(bought.value);

onMounted(() => {
  bought.value = props.buy.cartData;
});

const animation = (dataId: string) => {
  const element = document.getElementById(dataId);

  if (element) {
    const temp = document.getElementById(dataId + '-data') as HTMLElement;
    const cart = document.getElementById('cart') as HTMLElement;

    if (temp && cart) {
      const targetRect = cart.getBoundingClientRect();
      const triggerRect = element.getBoundingClientRect();
      temp.innerHTML = element.innerHTML; // Preserve the innerHTML for animation
      temp.classList.add('is-active');

      // Calculate the distance to move in both X and Y directions
      const deltaX = targetRect.left - triggerRect.left;
      const deltaY = targetRect.top - triggerRect.top;

      // Apply CSS animation with calculated values
      temp.style.transition = 'transform 2s ease';
      temp.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      setTimeout(() => {
        temp.style.transition = '';
        temp.style.transform = '';
        temp.innerHTML = '';
        temp.classList.remove('is-active');
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem;
}
.content {
  display: flex;
  flex-direction: column;
  height: 9rem;
  justify-content: space-evenly;
}
.card-text {
  font-size: 0.8rem;
  margin: 0;
  height: 2.5rem;
  overflow: hidden;
}
.dot {
  position: absolute;
  right: 1rem;
  background-color: red;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.invisibles {
  position: absolute;
  top: 0;
  left: 0;
}
.is-active {
  animation-name: example;
  animation-duration: 2s;
  overflow: hidden;
}
@keyframes example {
  from {
    opacity: 0.5;
    width: 12rem;
    height: 100%;
    font-size: 100% !important;
    display: block;
  }
  to {
    opacity: 0;
    width: 4rem;
    height: 0%;
    font-size: 30% !important;
    display: none;
  }
}
</style>
