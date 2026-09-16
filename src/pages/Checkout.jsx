import { useEffect, useState } from "react";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
   const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  }); 

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userEmail = currentUser.email;
 useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  

  if (!currentUser) return;

  const userEmail = currentUser.email;

  const checkoutData =
    JSON.parse(localStorage.getItem("checkoutData")) || {};

  const savedCheckout = checkoutData[userEmail]?.billingDetails;

  if (savedCheckout) {
    setFormData({
      firstName: savedCheckout.firstName || "",
      secondName: savedCheckout.secondName || "",
      companyName: savedCheckout.companyName || "",
      country: savedCheckout.country || "",
      streetAddress: savedCheckout.streetAddress || "",
      city: savedCheckout.city || "",
      state: savedCheckout.state || "",
      zipCode: savedCheckout.zipCode || "",
      phone: savedCheckout.phone || "",
    });

    return;
  }

  const profiles =
    JSON.parse(localStorage.getItem("Profile")) || [];

  const userProfile = profiles.find(
    (profile) => profile.email === userEmail
  );


  if (userProfile) {
    const nameParts = userProfile.name?.trim().split(" ") || [];

    setFormData({
      firstName: nameParts[0] || "",
      secondName: nameParts.slice(1).join(" ") || "",
      companyName: "",
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phone: userProfile.phone || "",
    });
  }
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleSubmit = (e) => {
  e?.preventDefault();

  if (
    !formData.firstName ||
    !formData.secondName ||
    !formData.phone ||
    !formData.zipCode ||
    !formData.country ||
    !formData.city ||
    !formData.streetAddress ||
    !formData.state
  ) {
    toast.error("Please fill all required fields");
    return false;
  }

  if (formData.phone.length !== 11) {
    toast.error("Phone no. must be 11 characters");
    return false;
  }

  const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || {};

  checkoutData[userEmail] = {
    billingDetails: {
      ...formData,
      userEmail,
    },
    selectedCard:
      checkoutData[userEmail]?.selectedCard || null,
  };

  localStorage.setItem("checkoutData",  JSON.stringify(checkoutData));

  return true;
};

  return (
    <section className="px-4 md:px-20">
       <h1 className="font-semibold text-md md:text-xl">
                Billing Details
              </h1>

      <div className="flex flex-col md:flex-row gap-5 mt-5">
        

      <form onSubmit={handleSubmit} className="w-full md:w-2/3 grid grid-cols-1 gap-4">

             
              {/* First + Second Name */}
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-11 px-4 bg-input text-white w-full rounded-md outline-none text-sm md:text-md"
                />

                <input
                  type="text"
                  name="secondName"
                  required
                  placeholder="Second Name *"
                  value={formData.secondName}
                  onChange={handleChange}
                  className="h-11 px-4 bg-input text-white w-full rounded-md outline-none text-sm md:text-md"
                />
              </div>

              {/* Company */}
              <input
                type="text"
                name="companyName"
                placeholder="Company Name (optional)"
                value={formData.companyName}
                onChange={handleChange}
                className="h-11 px-4 bg-input text-white w-full rounded-md outline-none text-sm md:text-md"
              />

              {/* Country */}
              <input
                type="text"
                name="country"
                required
                placeholder="Country/Region *"
                value={formData.country}
                onChange={handleChange}
                className="h-11 px-4 bg-input text-white w-full rounded-md outline-none text-sm md:text-md"
              />

              {/* Street Address */}
              <input
                type="text"
                name="streetAddress"
                required
                placeholder="Street Address *"
                value={formData.streetAddress}
                onChange={handleChange}
                className="h-11 px-4 bg-input text-white w-full rounded-md outline-none text-sm md:text-md"
              />

              {/* City */}
              <input
                type="text"
                name="city"
                required
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
                className="h-11 px-4 bg-input text-white w-full rounded-md outline-none text-sm md:text-md"
              />

              {/* State */}
              <input
                type="text"
                name="state"
                required
                placeholder="State/Country *"
                value={formData.state}
                onChange={handleChange}
                className="h-11 px-4 bg-input text-white w-full rounded-md outline-none text-sm md:text-md"
              />

              {/* Zip Code */}
              <input
                type="text"
                name="zipCode"
                required
                placeholder="Zip Code *"
                value={formData.zipCode}
                onChange={handleChange}
                className="h-11 px-4 bg-input text-white w-full rounded-md outline-none text-sm md:text-md"
              />

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                className="h-11 px-4 bg-input text-white w-full rounded-md outline-none text-sm md:text-md"
              />

            </form>

        <div className="w-full md:w-1/3">
          <PaymentMethod 
          formData={formData}
           handleSubmit={handleSubmit}
           userEmail={userEmail}
           />
        </div>

      </div>
    </section>
  );
};

const PaymentMethod = ({ formData, handleSubmit,userEmail}) => {
  const cart = useSelector((store) => store.cartStore.cart);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const tax = 4;
  const shipping = 9.5;
  const orderTotal = subtotal + shipping +tax;
  const [showCardForm, setShowCardForm] = useState(false);

  const [cards, setCards] = useState(() => {
    
    const storedCards = JSON.parse(localStorage.getItem("cards"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const savedCards = storedCards.filter(
  (item) => item.userEmail === currentUser?.email
);
   
    return savedCards || [];
  });

  const [selectedCard, setSelectedCard] = useState(() => {
    const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

    return checkoutData?.billingDetails?.selectedCard || null;
  });

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    userEmail
  });

  const handleChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

  const selectCard = (cardId) => {
      if (
    !formData.firstName ||
    !formData.secondName ||
  
    !formData.phone ||
    !formData.zipCode ||
    !formData.country ||
    !formData.city ||
    !formData.streetAddress
  ) {
    toast.error("Please fill all required fields first");
    return;
  }
    setSelectedCard(cardId);

    const data = JSON.parse(localStorage.getItem("checkoutData")) || {};

const existingData =data?.billingDetails?.userEmail === userEmail ? data : {};



    const checkoutData = {
      ...existingData,
      billingDetails: {
        ...existingData.billingDetails,
        ...formData,
        userEmail,
        selectedCard: cardId,
      },
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  };

  const addCard = (e) => {
    e.preventDefault();
     

    if (!card.name || !card.number || !card.expiry || !card.cvv) {
      toast.error("Please fill all required fields");
      return;
    }

    const newCard = {
      id: Date.now(),
      type: "Visa",
      bank: card.name,
      last4: card.number.slice(-4),
      userEmail: userEmail,
    };

    const updatedCards = [...cards, newCard];

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    setSelectedCard(newCard.id);

     const data = JSON.parse(localStorage.getItem("checkoutData")) || {};
    
    const existingData = data?.billingDetails?.userEmail === userEmail ? data : {};

    // Check billing form first
  if (
    !formData.firstName ||
    !formData.secondName ||
 
    !formData.phone ||
    !formData.zipCode ||
    !formData.country ||
    !formData.city ||
    !formData.streetAddress
  ) {
    toast.error("Please fill all billing fields first");
    return;
  }

    const checkoutData = {
      ...existingData,
      billingDetails: {
        ...existingData.billingDetails,
        ...formData,
        userEmail,
        selectedCard: newCard.id,
      },
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    setCard({
      name: "",
      number: "",
      expiry: "",
      cvv: "",
      userEmail
    });

    setShowCardForm(false);
    toast.success("Card added successfully!");
  };
  
// const handlePlaceOrder = (selectedCard) => {
//  const isValid = handleSubmit();

//   if (!isValid) {
//     return;
//   }

//   if (!selectedCard) {
//     toast.error("Please select a payment card");
//     return;
//   }

//   const cardsData = JSON.parse(localStorage.getItem("cards")) || [];

// const card = cardsData.find(
//   (item) => item.id === selectedCard && item.userEmail === userEmail
// );
//   const newOrder = {
//     orderId: `ORD-${Date.now()}`,
//     orderDate: new Date().toISOString(),
//     status: "Pending",
//     userEmail,

//     personalDetails: {
//       ...formData,
//     },

//     paymentDetails: {
//       method: "Card",
//       cardType: card?.type || "Card",
//       cardLastFour: card?.last4 || "",
//       cardId: selectedCard,
//       userEmail
//     },

//     orderItems: [...cart],

//     billing: {
//       subtotal: subtotal,
//       tax: tax,
//       shipping: shipping,
//       total: orderTotal,
//     },
//   };

//   const oldOrders =
//     JSON.parse(localStorage.getItem("orders")) || [];

//   const updatedOrders = [
//     ...oldOrders,
//     newOrder,
//   ];

//   localStorage.setItem(
//     "orders",
//     JSON.stringify(updatedOrders)
//   );
// window.dispatchEvent(new Event("ordersUpdated"));
//   console.log("NEW ORDER:", newOrder);
//   console.log("ALL ORDERS:", updatedOrders);

//   toast.success("Your order is placed!");
// };


const handlePlaceOrder = () => {
  const isValid = handleSubmit();

  if (!isValid) {
    return;
  }


  if (selectedCard === null || selectedCard === undefined) {
    toast.error("Please select a payment card");
    return;
  }

  // 3. Get saved cards
  const cardsData = JSON.parse(localStorage.getItem("cards")) || [];

  const card = cardsData.find( (item) => item.id === selectedCard &&
      item.userEmail === userEmail
  );

  if (!card) {
    toast.error("Selected payment card is invalid");
    return;
  }

  const newOrder = {
    orderId: `ORD-${Date.now()}`,
    orderDate: new Date().toISOString(),
    status: "Pending",
    userEmail,

    personalDetails: {
      ...formData,
    },

    paymentDetails: {
      method: "Card",
      cardType: card.type,
      cardLastFour: card.last4,
      cardId: selectedCard,
      userEmail,
    },

    orderItems: [...cart],

    billing: {
      subtotal,
      tax,
      shipping,
      total: orderTotal,
    },
  };

  const oldOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const updatedOrders = [
    ...oldOrders,
    newOrder,
  ];

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );

  window.dispatchEvent(new Event("ordersUpdated"));

  console.log("NEW ORDER:", newOrder);

  toast.success("Your order is placed!");
};

//   const placeOrder = () => {
//   if (!selectedCard) {
//     toast.error("Please select a payment card");
//     return;
//   }

//  handlePlaceOrder(selectedCard);
 
// };

const placeOrder = () => {
  handlePlaceOrder();
};

  return (
    <div className="w-full text-white">

      <h2 className="font-semibold text-lg mb-4">
        Payment Method
      </h2>

      <div className="border border-gray-400 rounded-lg">

        <div className="px-4 py-4 flex items-center justify-between">
          <span className="text-gray-400">
            Debit Card
          </span>

          <FaChevronDown className="text-gray-500" />
        </div>

        <div className="px-3 pb-3">

          {cards.length === 0 && (
            <p className="text-gray-500 text-sm mb-3">
              No saved cards. Add a new card.
            </p>
          )}

          {cards.map((item) => (
            <div key={item.id} onClick={() => selectCard(item.id)} className="border border-gray-400 rounded-lg px-3 py-3 mb-3 flex items-center gap-3 cursor-pointer">

              <span className={`font-bold text-xs ${item.type === "Visa" ? "text-blue-500" : "text-red-500"}`}>
                {item.type}
              </span>

              <span className="text-gray-400 text-sm">
                {item.bank}
              </span>

              <span className="text-gray-500 text-sm ml-auto">
                **** **** **** {item.last4}
              </span>

              <div className={`w-4 h-4 rounded-full border ${selectedCard === item.id ? "border-orange-500 bg-orange-500" : "border-gray-500"}`} />

            </div>
          ))}

          <button type="button" onClick={() => setShowCardForm(!showCardForm)} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <FaPlus className="text-orange-500" />
            Add New Card
          </button>

        </div>
      </div>

      {showCardForm && (
        <form onSubmit={addCard} className="mt-5 border border-gray-400 rounded-lg p-4">

          <h3 className="font-semibold mb-4">
            Add New Card
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm mb-2">
                Cardholder Name <span className="text-red-500">*</span>
              </label>

              <input type="text" name="name" required value={card.name} onChange={handleChange} placeholder="Cardholder Name" className="w-full bg-[#202329] border border-gray-600 rounded-md px-4 py-3 outline-none focus:border-orange-500" />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Card Number <span className="text-red-500">*</span>
              </label>

              <input type="text" name="number" required value={card.number} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength="19" className="w-full bg-[#202329] border border-gray-600 rounded-md px-4 py-3 outline-none focus:border-orange-500" />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Expiry Date <span className="text-red-500">*</span>
              </label>

              <input type="text" name="expiry" required value={card.expiry} onChange={handleChange} placeholder="MM / YY" maxLength="5" className="w-full bg-[#202329] border border-gray-600 rounded-md px-4 py-3 outline-none focus:border-orange-500" />
            </div>

            <div>
              <label className="block text-sm mb-2">
                CVV <span className="text-red-500">*</span>
              </label>

              <input type="password" name="cvv" required value={card.cvv} onChange={handleChange} placeholder="CVV" maxLength="3" className="w-full bg-[#202329] border border-gray-600 rounded-md px-4 py-3 outline-none focus:border-orange-500" />
            </div>

          </div>

          <div className="flex gap-3 mt-5">

            <button type="submit" className="bg-orange-500 px-5 py-2 rounded-md font-medium hover:bg-orange-600">
              Add Card
            </button>

            <button type="button" onClick={() => setShowCardForm(false)} className="border border-gray-500 px-5 py-2 rounded-md">
              Cancel
            </button>

          </div>

        </form>
      )}

      

      {/* // order summary */}
        <div className="w-full bg-[#22252b] border border-[#ff641c] rounded-2xl p-6 md:p-8 mt-2 text-white">
      
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-8">Your Order</h2>

      {/* Product / Subtotal Header */}
      <div className="flex justify-between items-center border-b border-gray-400 pb-4 text-sm md:text-base">
        <span>PRODUCT</span>
        <span>SUB TOTAL</span>
      </div>

      {/* Cart Products */}
      <div className="py-5 space-y-5">
        {cart.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-sm shrink-0"
            />

            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-medium leading-tight">
                {item.title}
              </h3>

              <p className="text-base mt-2">
                x {item.qty}
              </p>
            </div>

            <span className="text-lg">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center border-b border-gray-400 pb-4">
        <span className="text-base md:text-lg">
          Worldwide Standard Shipping Free
        </span>

        <span className="text-[#ff641c] text-base md:text-lg whitespace-nowrap">
          + $9.50
        </span>
      </div>
      {/* taxes */}
       <div className="flex justify-between items-center border-b border-gray-400 pb-4 mt-2">
        <span className="text-base md:text-lg">
         Total Taxes
        </span>

        <span className="text-[#ff641c] text-base md:text-lg whitespace-nowrap">
          + $4.00
        </span>
      </div>



      {/* Order Total */}
      <div className="flex justify-between items-center py-5">
        <h3 className="text-xl md:text-2xl font-bold">
          Order Total
        </h3>

        <span className="text-xl md:text-2xl font-bold text-green-500">
          ${orderTotal.toFixed(2)}
        </span>
      </div>

      {/* Coupon */}
      <div className="mt-3 text-base md:text-lg">
        Have a coupon?{" "}
        <button className="text-[#ff641c] underline hover:text-orange-400 transition">
          Click here to enter your code
        </button>
      </div>

      {/* Place Order */}
      <div className="flex justify-center mt-16">
        <button className="bg-[#ff641c] hover:bg-orange-600 transition-all duration-300 rounded-full px-16 py-4 text-lg md:text-xl font-medium min-w-[250px]"
        onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>

    </div>
  );
};

export default Checkout;