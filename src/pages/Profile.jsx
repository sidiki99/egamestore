import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom";


function Profile() {
 const currentUser = JSON.parse(localStorage.getItem("currentUser"));
 const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    profileImg: "",
    bio: "",
    phone: "",
    email: currentUser?.email || "",
  });

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const profiles = JSON.parse(localStorage.getItem("Profile")) || [];

    const currentProfile = profiles.find(
      (item) => item.email === currentUser.email
    );

    if (currentProfile) {
      setProfile(currentProfile);

      setFormData({
        name: currentProfile.name || "",
        username: currentProfile.username || "",
        profileImg: currentProfile.profileImg || "",
        bio: currentProfile.bio || "",
        phone: currentProfile.phone || "",
        email: currentProfile.email || currentUser.email,
      });
    }
  }, [currentUser?.email]);


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  };


  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    // Profile Image
    if (name === "profileImg") {
      const file = files?.[0];

      if (!file) return;

    
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image");
        return;
      }

      const base64 = await convertToBase64(file);

      setFormData((prev) => ({
        ...prev,
        profileImg: base64,
      }));

      return;
    }

  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please login first");
      return;
    }
    if(formData.phone.length !== 11){
      toast.error("Phone no must be 11 characters")
      return
    }

    const profiles = JSON.parse(localStorage.getItem("Profile")) || [];

    const profileData = {
      ...formData,
      email: currentUser.email,
    };

  
    const existingIndex = profiles.findIndex(
      (item) => item.email === currentUser.email
    );

    if (existingIndex !== -1) {
    
      profiles[existingIndex] = {
        ...profiles[existingIndex],
        ...profileData,
      };

      toast.success("Profile is Updated");
    } else {
    
      profiles.push(profileData);
      toast.success("Profile is Created");
    }

   
    localStorage.setItem("Profile", JSON.stringify(profiles));  
    setProfile(profileData);
     window.dispatchEvent(new Event("profileUpdated"));
  };
 
  return (
    <section className="px-2 md:px-25 mt-3 ">
    <div className="w-full bg-[#181c20] rounded-lg px-5 py-5 sm:px-6 sm:py-5">
      <div className="flex items-center gap-4 sm:gap-5">        
        {/* Profile Image */}
        <div className="shrink-0">
          <img
            src={profile?.profileImg}  alt="Alex Rodriguez"
            className="w-16 h-16 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white"
          />
        </div>
        {/* Profile Info */}
        <div className="min-w-0">
          <h2 className="text-white text-lg sm:text-xl font-bold leading-tight">
        {profile?.name || "ABC" }  
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
          {profile?.username}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] sm:text-xs text-gray-300">            
            <span className="flex items-center gap-1">
              <span className="text-yellow-400 text-sm">★</span>
              Level 47 Gamer
            </span>
            <span className="text-gray-500">•</span>
            <span>Member since 2020</span>
          </div>
        </div>

      </div>
    </div>

    {/* Profile Form */}
    <div className="w-full  text-white border-b-[3px] border-[#18a8ff] mt-2">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#ff6b00] text-lg"><FaUser/></span>
        <h2 className="text-sm font-semibold">Personal Information</h2>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3"
      onSubmit={handleSubmit}>
       
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">
            Full Name
          </label>
          <input
            type="text" value={formData.name} name="name" onChange={handleChange}
            className="w-full h-8 px-2 bg-[#191d22] rounded-md outline-none text-[11px] text-gray-200"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">
            Username
          </label>
          <input  type="text" value={formData.username} name="username" onChange={handleChange}
            className="w-full h-8 px-2 bg-[#191d22] rounded-md outline-none text-[11px] text-gray-200"
          />
        </div>

              {/* Profile Image */}
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">
            Profile Image
          </label>

          <input
            type="file" name="profileImg"
            accept="image/*" onChange={handleChange}
            className="w-full h-8 px-2 bg-[#191d22] rounded-md outline-none text-[11px] text-gray-200 file:mr-2 file:border-0 file:bg-transparent file:text-gray-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">
            Phone
          </label>
          <input
            type="text" value={formData.phone} name="phone" onChange={handleChange} 
            className="w-full h-8 px-2 bg-[#191d22] rounded-md outline-none text-[11px] text-gray-200"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">
            Bio
          </label>

          <textarea
            value={formData.bio} name="bio" onChange={handleChange}           
            rows="2"
            className="w-full px-2 py-2 bg-[#191d22] rounded-md outline-none resize-none text-[11px] leading-4 text-gray-200"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-2">

          {/* Password */}
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type="password" value="AlexPassword123"               
                className="w-full h-8 px-2 pr-14 bg-[#191d22] rounded-md outline-none text-[11px] text-gray-300"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-orange-500 hover:text-orange-400 underline cursor-pointer"
              onClick={()=>navigate("/change-password")}>
              
                change
              </button>
            </div>
          </div>
           <button type="submit" className="bg-heading w-full px-2 py-3 rounded-md mt-5 mb-5">Update Profile</button> 

        

        </div>
       
      </form>
    </div>
      
    </section>
  )
}

export default Profile
