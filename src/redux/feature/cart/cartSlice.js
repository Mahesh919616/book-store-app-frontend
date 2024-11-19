import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState = {
  cartItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem){
                state.cartItems.push(action.payload)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product added to the Cart",
                    showConfirmButton: false,
                    timer: 2000
                  });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Product already exists in Cart",
                    showConfirmButton: false,
                    timer: 2000
                  });
            }
        },
        removeFromCart: (state, action) => {
             state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
             Swal.fire({
                position: "center",
                icon: "success",
                title: "Product removed from the Cart",
                showConfirmButton: false,
                timer: 2000
              });
        },
        clearCart: (state) => {
            state.cartItems = []
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cart is cleared",
                showConfirmButton: false,
                timer: 2000
              });
        }
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
