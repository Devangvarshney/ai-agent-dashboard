import React, { useState } from "react";
import { LogIn, ShieldCheck, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
 
  const [loginData, setLoginData] = useState({
    username: "", // Django default auth username hi leta hai (ya email agar customize kiya ho)
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
 
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        
        localStorage.setItem("access", data.access || data.token); 
        alert("Login Successful! Access Granted.");
        navigate("/posts"); 
      } else {
       
        alert(data.detail || "Unauthorized: Invalid Credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("System Offline: Backend se connection nahi ho pa raha.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -top-20 -left-20"></div>

      <div className="relative w-full max-w-md bg-[#0f1115]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-indigo-500/10 rounded-2xl mb-4 border border-indigo-500/20">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Portal Access</h2>
          <p className="text-[10px] text-gray-500 mt-2 font-mono uppercase tracking-[0.2em]">Verify Identity to Continue</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Username / Email" 
              className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-11 pr-4 outline-none focus:border-indigo-500/50 transition-all text-sm placeholder:text-gray-600" 
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="password" 
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password" 
              className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-11 pr-4 outline-none focus:border-indigo-500/50 transition-all text-sm placeholder:text-gray-600" 
              required
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-6 transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-[0.98]">
            <LogIn className="w-5 h-5" />
            Authorize Login
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Unauthorized user? 
            <button onClick={() => navigate('/register')} className="ml-2 text-indigo-400 font-bold hover:underline underline-offset-4">Register Access</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;