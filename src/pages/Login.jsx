import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../assets/redux/cartSlice";


function Login() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [formData,setFormData]=useState({
   email:"",
   password:"",
  
  })
  const handleChange=(e)=>{
   const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:value
    })

  }
  const handleSubmit=((e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password ){
      toast.error("Please fill all fields")
      return
    }
    const users = JSON.parse(localStorage.getItem("users")) || []
    const currentUser= users.find(user=>user.email === formData.email && user.password === formData.password);
    
    if(!currentUser){
    toast.error("Email or Password Incorrect")
    return
   }

  
    localStorage.setItem("currentUser",JSON.stringify(currentUser))
    toast.success("Logged In Successfully")
    const allCart = JSON.parse(localStorage.getItem("GameCart")) || [];

      const userCart = allCart.filter(
        item => item.userEmail === currentUser.email
      );

      dispatch(setCart(userCart));
   if(currentUser.role === "admin"){
     navigate("/admin")
   }else{
    navigate("/")
   }

  })
  return (
    <div className=" flex justify-center items-center mt-10">
      <form onSubmit={handleSubmit} className="w-full px-5 md:w-1/3 grid grid-cols-1 gap-4">

          <h1 className="font-semibold text-md md:text-xl text-center">
           Login Here
          </h1>
         

           <div className="w-full">
            <label htmlFor="email" className="block text-sm md:text-base text-white mb-1">
              Email <span className="text-red-500">*</span> 
           
            </label>
            <input type="email" name="email" required placeholder="Email " value={formData.email} onChange={handleChange} className="px-2 py-2 bg-input w-full rounded-xl outline-0 text-sm md:text-md" />
          </div> 

           <div className="w-full">
            <label htmlFor="password" className="block text-sm md:text-base text-white mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input type="text" name="password" required placeholder="Password " value={formData.password} onChange={handleChange} className="px-2 py-2 bg-input w-full rounded-xl outline-0 text-sm md:text-md" />
          </div> 
          <div  onClick={()=>navigate("/forget-password")} className="text-sm text-heading  cursor-pointer ">Forget Password ? 
          </div>

          
          <button type="submit" className="bg-heading text-white px-5 py-3 rounded-xl">
           Login
          </button>
          <div  className="text-sm text-center">Don't have an account ? <span className="text-heading cursor-pointer border-b border-background hover:border-heading"
          onClick={()=>navigate("/signup")}>Signup</span>
          </div>

        </form>
    </div>
  )
}

export default Login
