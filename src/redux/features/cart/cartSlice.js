import { createSlice } from '@reduxjs/toolkit';
import Swal from "sweetalert2";

const initialState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id) //is items slected added on the cart or not//
            if (!existingItem) {
                state.cartItems.push(action.payload)

                Swal.fire({
                    title: (`${action.payload.title} Item added to cart`),
                    icon: "success",

                });
            } else {
                Swal.fire({
                    title: "Alraedy in the cart",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK!"
                });
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)//filter the item which is not equal to the payload id//


        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    }

})

//export the action

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;