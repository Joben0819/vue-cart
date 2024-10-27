<script setup lang="ts">
    import { inject, onMounted, ref } from 'vue';
    import { onCart } from '../reducer/Cart';
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
    const store: any = inject('store')
    const number: any = []
    const cartData = ref(store.getState().userCart.cart)
    for(var i= 1; i < 11; i++){
        const value = {number: i}
        number.push(value)
    }
    const Delete = () => {
    const total: any = []
    store.dispatch(onCart({cart: total}))
    }
  
    const Remove = (data:any) =>{
        const filter = cartData.value.filter((i: any)=>{
            return i.id !== data.id
        })
        store.dispatch(onCart({cart: filter}))
    }
    const Quantity = (data: any, value: number) => {
        const map = cartData.value.map((id: any) =>{
          if(id.id === data.id){
            if(id.total < value){
                alert('on maximum');
                return {...id}
            }else{
                return {...id , quantity: value}
            }
          }else{
            return {...id}
          }
        })
        store.dispatch(onCart({cart: map}))
    }
    const totalPrice = cartData.value.reduce((sum: number, item: any) => {
    const price = parseFloat(item.price.replace('$', '')); // Remove the dollar sign and convert to a number
        return sum + price * item.quantity; // Multiply price by the quantity and add to the sum
    }, 0);
    const updatevalue = ref(totalPrice)
    const subtotal = ref(Number(totalPrice.toFixed(2)) + 200)
    onMounted(()=>{
        const updated = store.subscribe(()=>{
            cartData.value = store.getState().userCart.cart
            const totalPrice = cartData.value.reduce((sum: number, item: any) => {
            const price = parseFloat(item.price.replace('$', '')); // Remove the dollar sign and convert to a number
                return sum + price * item.quantity; // Multiply price by the quantity and add to the sum
            }, 0);
            updatevalue.value = totalPrice
            subtotal.value = Number(totalPrice.toFixed(2)) + 200
        })
        return() => updated()
    })
console.log(updatevalue.value, 'updatevalue')
</script>

<template>
    <div>
        <section className="title">
            <div className="left">
                <h1>SHOP BAG</h1>
            </div>
            </section>
            <section className="purchased d-flex justify-content-between" >
            <div className="item" id="inventory">
                <div className="header">
                    <span>ITEM</span>
                    <span>PRICE</span>
                </div>
                <div className="product" v-for="(item, index) in cartData" :key="index">
                    <div className="content">
                        <img :src="imageMap[item.img]" :alt="item.id" width="100" />
                        <div className="context">
                            <p>Description: {{item.text}}</p>
                            <div class="d-flex">
                                <span>Quantity:</span>
                                <span class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {{item.quantity}}
                                </span>
                                <ul class="dropdown-menu">
                                    <li class="d-flex" v-for="(numbers, index) in number" :key="index">
                                    <span class="dropdown-item" @click="Quantity(item, numbers.number)" >
                                        {{numbers.number}}
                                    </span>
                                    </li>
                                </ul>
                            </div>
                            <p  style="cursor: pointer; color:red " @click="Remove(item)">Remove</p>
                        </div>
                    </div>
                    <div className="price">
                        <span>{{item.price}}</span>
                    </div>
                </div>
            </div>
            <div className="buy">
                <div className="area_price">
                    <div class="d-flex justify-content-between">
                        <div className="total">
                            <p>Subtotal</p>
                            <p>Delivery</p>
                        </div>
                        <div className="total">
                            <p id="money"> ${{Number(updatevalue.toFixed(2))}}</p>
                            <p> ${{ updatevalue === 0 ? 0 : 200}}</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div className="total">
                            <p>Amount</p>
                        </div>
                        <div className="total">
                            <p id="amount"> ${{ updatevalue === 0 ? 0 : subtotal.toFixed(2) }}</p>
                        </div>
                    </div>
                </div>
                <div className="btns">
                    <button type="button" className="btn btn-dark" @click="Delete()">Buy Now</button>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.title{
    padding: 1rem 3rem;
    
}
.purchased{
    padding: 0rem 4rem;
    .item{
        width: 50%;
        .header{
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: solid 1px #000;
        }
        .product{
            
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
            .content{
                display: flex;
                column-gap: 1rem;
                img{
                    width: 15%;
                }
            }

        }
    }
    .buy{
        width: 40%;
        
        .area_price{
            width: 100%;
            height: 10rem;
            border: solid 2px #000;
            margin-bottom: 1rem;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            .total{}
        }
        .btns{
            display: flex;
            justify-content: flex-end;
            button{
                width: 100%;
            }
        }
    }
}
@media screen and (max-width: 600px) and (min-width: 200px) {
    .purchased{
        flex-direction: column;
        .item{
            width: 100%;
            margin-bottom: 4rem;
        }
        .buy{
            width: 100%;
        }
    }
    
}
</style>