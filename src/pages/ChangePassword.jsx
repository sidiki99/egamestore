import { useState } from "react";
import { Lock, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import lockImage from "../assets/images/lock1.png";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!currentUser) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const savedUsers =JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = savedUsers.findIndex(
      (user) =>
        user.email?.toLowerCase() ===
        currentUser.email?.toLowerCase()
    );

    if (userIndex === -1) {
      toast.error("User not found");
      return;
    }

    const user = savedUsers[userIndex];

  
    if (user.password !== currentPassword) {
      toast.error("Current password is incorrect");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }


    savedUsers[userIndex] = {
      ...user,
      password: newPassword,
    };


    localStorage.setItem( "users", JSON.stringify(savedUsers));

    localStorage.setItem( "currentUser",JSON.stringify({
        ...currentUser,
        password: newPassword,
      })
    );

    toast.success("Password changed successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#15161a] flex items-center justify-center p-4 sm:p-6">

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-[#1F2227] rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row">

       
        <div className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-[560px] overflow-hidden items-center ">

          <img
            src={lockImage}
            alt="Change password"
            className="w-full h-full object-cover"
          />       
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-white text-2xl font-semibold">
              Keep your account secure
            </h2>

            <p className="text-gray-300 text-sm mt-2">
              Create a strong password to protect your gaming
              account.
            </p>
          </div>
        </div>
  {/* form */}
     
        <div className="w-full md:w-1/2 flex items-center">
          <div className="w-full px-6 py-8 sm:px-10 sm:py-10 md:px-12">

       
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6">
              <KeyRound
                className="w-5 h-5 text-orange-500"
                strokeWidth={2.5}
              />
            </div>

            <h1 className="text-white text-2xl sm:text-3xl font-semibold mb-2">
              Change Password
            </h1>

            <p className="text-gray-400 text-sm mb-4">
              Enter your current password and choose a new password.
            </p>

            <form
              onSubmit={handleChangePassword}    className="space-y-3"
            >
              <div>
                <label
                  htmlFor="currentPassword" className="block text-sm text-gray-300 mb-2"
                >
                  Current Password
                </label>

                <div className="flex items-center gap-2 rounded-lg border border-orange-500/60 bg-[#111216] px-3 py-3">

                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />

                  <input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    placeholder="Enter current password"
                    className="w-full bg-transparent text-gray-200 text-sm placeholder-gray-600 outline-none"
                    required
                  />

                </div>
              </div>

      
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm text-gray-300 mb-2"
                >
                  New Password
                </label>

                <div className="flex items-center gap-2 rounded-lg border border-orange-500/60 bg-[#111216] px-3 py-3">

                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />

                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    className="w-full bg-transparent text-gray-200 text-sm placeholder-gray-600 outline-none"
                    required
                  />

                </div>

                <p className="text-gray-500 text-xs mt-2">
                  Password must contain at least 8 characters.
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Confirm New Password
                </label>

                <div className="flex items-center gap-2 rounded-lg border border-orange-500/60 bg-[#111216] px-3 py-3">

                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />

                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm new password"
                    className="w-full bg-transparent text-gray-200 text-sm placeholder-gray-600 outline-none"
                    required
                  />

                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-medium text-sm py-3 transition-colors"
              >
                Change Password
              </button>


              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cancel
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}