
import { useState } from "react";
import { Lock, Mail, ShieldCheck, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();

  // step 1 = email
  // step 2 = OTP
  // step 3 = new password
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [status, setStatus] = useState("idle");


  const [currentUser, setCurrentUser] = useState(null);

  // STEP 1 - CHECK EMAIL
 
  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by email
    const user = savedUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

   
    if (!user) {
      toast.error("No account found with this email");
      return;
    }


    setCurrentUser(user);
    setStatus("loading");

    setTimeout(() => {
      setStatus("idle");

      setStep(2);
      alert(" Your  OTP Is:", user.otp)
      toast.success();

     console.log ("User OTP:", user.otp);
    }, 900);
  };

//  OTP Verification

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("Please enter OTP");
      return;
    }
  
    if (otp !== currentUser.otp) {
      toast.error("Invalid OTP");
      return;
    }
  
    toast.success("OTP verified successfully");   
    setStep(3);
  };

//  Change Password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill both password fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Update password
    const updatedUsers = savedUsers.map((user) => {
      if (user.email.toLowerCase() === currentUser.email.toLowerCase()) {
        return {
          ...user,
          password: newPassword,
        };
      }

      return user;
    });

   
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Password changed successfully!");

 
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Go Back
  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setOtp("");
    } else if (step === 3) {
      setStep(2);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#15161a] flex items-center justify-center p-6">

      <div className="w-full max-w-4xl bg-[#262930] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/5">

       
        <div className="relative w-full md:w-1/2 min-h-[320px] md:min-h-[520px] overflow-hidden">
          {/* <SentinelArt /> */}
           <img src="/images/games/lock1.png"></img>
        </div>

       
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:px-12">         
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-6">
            {step === 1 && (
              <Lock className="w-5 h-5 text-orange-500" strokeWidth={2.5} />
            )}

            {step === 2 && (
              <ShieldCheck
                className="w-5 h-5 text-orange-500"
                strokeWidth={2.5}
              />
            )}

            {step === 3 && (
              <KeyRound
                className="w-5 h-5 text-orange-500"
                strokeWidth={2.5}
              />
            )}
          </div>

       
          {step === 1 && (
            <>
              <h1 className="text-white text-2xl font-semibold mb-1">
                Forgot password?
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Enter your email and we'll send you an OTP.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-5">

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Email
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-orange-500/60 bg-[#111216] px-3 py-2.5">
                    <Mail className="w-4 h-4 text-gray-500 shrink-0" />

                    <input
                      id="email"
                      type="email"  required value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-gray-200 text-sm placeholder-gray-600 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-orange-500 hover:bg-orange-400 active:bg-orange-600 disabled:opacity-60 text-white font-medium text-sm py-2.5 transition-colors"
                >
                  {status === "loading" ? "Checking..." : "Send OTP"}
                </button>

              </form>
            </>
          )}

     {/* Step 2 */}
          {step === 2 && (
            <>
              <h1 className="text-white text-2xl font-semibold mb-1">
                Verify OTP
              </h1>

              <p className="text-gray-400 text-sm mb-6">
                Enter the OTP sent to{" "}
                <span className="text-orange-400">
                  {currentUser?.email}
                </span>
              </p>

              {/* FRONTEND DEMO OTP */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-5">
                <p className="text-orange-300 text-sm">
                  Demo OTP:{" "}
                  <span className="font-bold tracking-widest">
                    {currentUser?.otp}
                  </span>
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-5">

                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Enter OTP
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-orange-500/60 bg-[#111216] px-3 py-2.5">

                    <ShieldCheck className="w-4 h-4 text-gray-500" />

                    <input
                      id="otp"
                      type="text"
                      maxLength="6" value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter OTP"
                      className="w-full bg-transparent text-gray-200 text-sm placeholder-gray-600 outline-none tracking-widest"
                    />

                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-medium text-sm py-2.5 transition-colors"
                >
                  Verify OTP
                </button>

                <button
                  type="button"  onClick={goBack}
                  className="w-full text-gray-400 hover:text-white text-sm"
                >
                  ← Back
                </button>

              </form>
            </>
          )}

         {/* Step 3 */}
          {step === 3 && (
            <>
              <h1 className="text-white text-2xl font-semibold mb-1">
                Create new password
              </h1>

              <p className="text-gray-400 text-sm mb-8">
                Enter your new password below.
              </p>

              <form
                onSubmit={handlePasswordSubmit}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    New Password
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-orange-500/60 bg-[#111216] px-3 py-2.5">

                    <Lock className="w-4 h-4 text-gray-500" />

                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(e.target.value)
                      }
                      placeholder="Enter new password"
                      className="w-full bg-transparent text-gray-200 text-sm placeholder-gray-600 outline-none"
                    />

                  </div>
                </div>

               
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Confirm Password
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-orange-500/60 bg-[#111216] px-3 py-2.5">

                    <Lock className="w-4 h-4 text-gray-500" />

                    <input
                      id="confirmPassword"
                      type="password"  value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm new password"
                      className="w-full bg-transparent text-gray-200 text-sm placeholder-gray-600 outline-none"
                    />

                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-medium text-sm py-2.5 transition-colors"
                >
                  Change Password
                </button>

                <button
                  type="button"
                  onClick={goBack}
                  className="w-full text-gray-400 hover:text-white text-sm"
                >
                  ← Back
                </button>

              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}




