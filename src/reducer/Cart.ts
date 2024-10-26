import { createSlice } from "@reduxjs/toolkit"



export const initialState = {
    cart: []
}

const reducerData = createSlice({
    name: "userCart",
    initialState,
    reducers:{
        onCart:(state, action) =>{
            state.cart = action.payload.cart
        }
    }
})

export const {
    onCart
} = reducerData.actions

export default reducerData.reducer