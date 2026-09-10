import { createSlice } from "@reduxjs/toolkit";
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userEmail = currentUser?.email;
const allCart = JSON.parse(localStorage.getItem("GameCart")) || [];
const userCart = allCart.filter(
  item => item.userEmail === userEmail
);
 const cartSlice=createSlice({
  name:"cart",
  initialState:{
     cart: userCart
  },
  reducers:{
    setCart: (state, action) => {
  state.cart = action.payload;
},
    addToCart: (state, action) => {
  const { cartObj ,selectedQty} = action.payload;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   if (!currentUser) {
        return;
      }


  const existingProduct = state.cart.find(
    (item) => item.id === cartObj.id &&
         item.userEmail === currentUser.email
  );
  //   if (existingProduct) {
  //   existingProduct.qty += 1;
  // } else {
  //   state.cart.push(cartObj);
  // }
  if (existingProduct) {
    existingProduct.qty += selectedQty || 1;
  } else {
    cartObj.qty = selectedQty || 1;
    state.cart.push(cartObj);
  }

       const allCart = JSON.parse(localStorage.getItem("GameCart")) || [];
        const otherUsersCart = allCart.filter(
        item => item.userEmail !== currentUser.email
      );
       localStorage.setItem( "GameCart", JSON.stringify([
          ...otherUsersCart,
          ...state.cart
        ])


  
  );
},
     deleteCart: (state, action) => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) return;

      state.cart = state.cart.filter(item => item.id !== action.payload);

      const allCart = JSON.parse(localStorage.getItem("GameCart")) || [];

      const otherUsersCart = allCart.filter( item => item.userEmail !== currentUser.email );

      localStorage.setItem("GameCart",JSON.stringify([
          ...otherUsersCart,
          ...state.cart
        ])
      );
    },
     changeQty: (state, action) => {
      const { id, finalQty } = action.payload;

      const currentUser = JSON.parse( localStorage.getItem("currentUser")  );

      if (!currentUser) return;

      const product = state.cart.find(item => item.id === id );

      if (product) {
        product.qty = finalQty;
      }

      const allCart = JSON.parse(localStorage.getItem("GameCart")) || [];

      const otherUsersCart = allCart.filter(item => item.userEmail !== currentUser.email );

      localStorage.setItem("GameCart", JSON.stringify([
          ...otherUsersCart,
          ...state.cart
        ])
      );
    }
  }
})
export const { addToCart, setCart, deleteCart, changeQty } = cartSlice.actions;
export default cartSlice.reducer;