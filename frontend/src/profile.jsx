import React, { useState, useEffect } from "react";
import { User, Mail, ShieldCheck, FileText, Trash2, LogOut, LayoutGrid, Cpu, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const [userRes, postsRes] = await Promise.all([
          axios.get(`${API_URL}user/`, getAuthHeader()),
          axios.get(`${API_URL}posts/`, getAuthHeader())
        ]);
        
        setUserData(userRes.data);
        setUserNotes(postsRes.data);
      } catch (err) {
        console.error("Profile Load Error:", err);
       
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const deleteNote = async (id) => {
    if (window.confirm("Authorize permanent deletion of this node?")) {
      try {
        await axios.delete(`${API_URL}posts/delete/${id}/`, getAuthHeader());
        setUserNotes(userNotes.filter(note => note.id !== id));
      } catch (err) {
        alert("Action restricted.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-indigo-500">
        <div className="animate-pulse">AUTHENTICATING_USER_SESSION...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Background UI Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-16 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
          <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white flex items-center gap-2 transition-all font-mono text-xs tracking-widest uppercase">
            <LayoutGrid className="w-4 h-4" /> System / Dashboard
          </button>
          <button onClick={handleLogout} className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </div>

        {/* Profile Identity Card */}
        <div className="bg-[#0f1115]/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-16 shadow-2xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-xl shadow-2xl">
              <User className="w-16 h-16 text-indigo-400" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-full border-4 border-[#0a0a0a]">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-5xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
               {userData?.username || "Authorized_Agent"}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="flex items-center gap-2 text-gray-400 text-[11px] font-mono bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <Mail className="w-3 h-3 text-indigo-400" /> {userData?.email}
              </div>
              <div className="flex items-center gap-2 text-indigo-300 text-[11px] font-mono bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                <Cpu className="w-3 h-3" /> UID: {userData?.id?.toString().padStart(4, '0')}
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-12">
            <div className="flex flex-col items-center md:items-end">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono mb-2">Registered On</p>
                <div className="flex items-center gap-2 text-xl font-bold font-mono text-indigo-400">
                    <Calendar className="w-5 h-5" /> 2026_SESSION
                </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="mb-10 flex items-end justify-between px-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">Authenticated Agents</h2>
            <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Your encrypted system workflows</p>
          </div>
          <span className="text-4xl font-bold text-white/10 font-mono">0{userNotes.length}</span>
        </div>

        {/* Notes/Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userNotes.map((note) => (
            <div key={note.id} className="bg-[#0f1115]/60 backdrop-blur-xl border border-white/10 p-7 rounded-[2.5rem] hover:border-indigo-500/50 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-indigo-400/30 transition-colors">
                  <FileText className="w-6 h-6 text-gray-400 group-hover:text-indigo-400" />
                </div>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-indigo-300 transition-colors">{note.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 h-12 overflow-hidden line-clamp-2">
                {note.content}
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] text-green-500 font-mono font-bold tracking-tighter">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  ACTIVE_INSTANCE
                </div>
                <button className="text-[10px] font-mono text-gray-600 uppercase tracking-widest hover:text-white transition-colors">
                  Analyze →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;