import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../assets/redux/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   

  const addToCartItem = (game) => {
    if (!currentUser) {
    toast.error("Please login first");
        return;
      }
    const cartObj = {
      id: game.id,
      title: game.title,
      price: game.price,
      image: game.image,
      rating: game.rating,
      description: game.description,
      category: game.category,
      qty: 1,
      userEmail:currentUser.email
    };

    dispatch(addToCart({ cartObj ,selectedQty: game.selectedQty}));
    toast.success(`The Game ${game.title} added in cart`);
  };

  return {
    addToCartItem
  };
};

export default useCart;