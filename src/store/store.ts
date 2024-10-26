import { combineReducers } from "redux";
import Cart from '../reducer/Cart';
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";


const combineReduce = combineReducers({
    userCart: Cart
})

const persisStore = {
    key: "root",
    storage
}


const persistReduce = persistReducer(persisStore, combineReduce)

export const store = configureStore({
    reducer: persistReduce
})

export const persistor = persistStore(store)

export default store;
