import {  useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Signup() {
  const navigate=useNavigate();
  
  const [formData,setFormData]=useState({
   email:"",
   password:"",
   confirmPassword:"",
   dob:"",
   role:"user",
   otp:'12345',
   
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
    if(!formData.email || !formData.password || !formData.confirmPassword || !formData.dob){
      toast.error("Please fill all fields")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || []
   if(users.some(user=>user.email === formData.email)){
    toast.error("Email already Exist")
    return
   }
   if(formData.password.length < 8){
    toast.error("Password should be at least 8 characters")
    return
   }
   const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters with uppercase, lowercase, number and special character."
      );
      return;
    }
    if(formData.password !==formData.confirmPassword){
    toast.error("Password and Confirm Password  do not match")
    return
   }
   const dob = new Date(formData.dob);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    if (age < 13) {
      toast.error("You must be at least 13 years old to create an account.");
      return;
    }
   if (formData.email === "admin@gmail.com") {
  return;
}

 
    users.push(formData);
    const adminExists = users.some(
  (user) => user.email === "admin@gmail.com");
  
    if (!adminExists) {
  users.push({
    email: "admin@gmail.com",
    password: "Admin@12345",
    confirmPassword: "Admin@12345",
    role: "admin",
    
  });
}
    localStorage.setItem("users",JSON.stringify(users))
    toast.success("Account Created Successfully")
    navigate("/login")

  })
  return (
    <div className=" flex justify-center items-center mt-10 px-5">
      <form onSubmit={handleSubmit} className="w-full md:w-1/3 grid grid-cols-1 gap-4">

          <h1 className="font-semibold text-md md:text-xl text-center">
           Get Started Registration
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

           <div className="w-full">
            <label htmlFor="confirmPassword" className="block text-sm md:text-base text-white mb-1">
              confirmPassword <span className="text-red-500">*</span>
            </label>
            <input type="text" name="confirmPassword" required placeholder="Confirm Password " value={formData.confirmPassword} onChange={handleChange} className="px-2 py-2 bg-input w-full rounded-xl outline-0 text-sm md:text-md" />
          </div> 

           <div className="w-full">
            <label htmlFor="dob" className="block text-sm md:text-base text-white mb-1">
              Date Of Birth (
               <span className="text-red-500 text-xs"> At least 13yr Old  </span>)
                <span className="text-red-500"> *</span>
            </label>
            <input type="date" name="dob" required placeholder="Date of Birth " value={formData.dob} onChange={handleChange} className="px-2 py-2 bg-input w-full rounded-xl outline-0 text-sm md:text-md" />
          </div> 
         

          <button type="submit" className="bg-heading text-white px-5 py-3 rounded-xl">
            Create Account
          </button>

          <div  className="text-sm text-center"> Have an account ? <span className="text-heading cursor-pointer border-b border-background hover:border-heading"
          onClick={()=>navigate("/login")}>Login</span>
          </div>

        </form>
    </div>
  )
}

export default Signup
