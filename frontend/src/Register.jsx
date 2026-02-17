import React from "react";
import { useNavigate } from "react-router-dom";
import  { useState } from "react";
import { UserPlus, ShieldCheck, Mail, Lock, User, CheckCircle2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
   
      if (data.token) {
        localStorage.setItem("token", data.token); 
        navigate("/"); 
      } else {
        
        alert("Account Created! Please Login.");
        navigate("/create"); 
      }
    } else {
     
      alert(data.error || "Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("Backend server is not responding. Check CORS or Server Status.");
  }
};
  return (
    
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans flex items-center justify-center p-6">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -bottom-20 -right-20"></div>

      <div className="relative w-full max-w-md bg-[#0f1115]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
        
       
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-purple-500/10 rounded-2xl mb-4 border border-purple-500/20">
            <UserPlus className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Agent Enrollment</h2>
          <p className="text-[10px] text-gray-500 mt-2 font-mono uppercase tracking-[0.2em]">Initialize System Profile</p>
        </div>

       
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
              
            placeholder="Full Name" 
              className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-11 pr-4 outline-none focus:border-purple-500/50 transition-all text-sm placeholder:text-gray-600" 
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="email" 
              
            name="email"
            value={formData.email}
            onChange={handleChange}
              placeholder="Email Address" 
              className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-11 pr-4 outline-none focus:border-purple-500/50 transition-all text-sm placeholder:text-gray-600" 
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="password" 
              
             name="password"
             value={formData.password}
            onChange={handleChange}
              placeholder="Create Password" 
              className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-11 pr-4 outline-none focus:border-purple-500/50 transition-all text-sm placeholder:text-gray-600" 
            />
          </div>

          <div className="flex items-center gap-2 py-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-[11px] text-gray-500 font-mono">I AGREE TO AUDITABLE TERMS & GDPR</span>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4 transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-[0.98]">
            Complete Initialization
          </button>
        </form>

      
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already verified? 
            <button  onClick={() => navigate('/login')} className="ml-2 text-indigo-400 font-bold hover:underline underline-offset-4">Login here!!</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;