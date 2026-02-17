import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, FileText, Zap, Search, Edit3 } from "lucide-react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const Post = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

 
  const getAuthHeader = () => {
    const token = localStorage.getItem("access");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };


  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
  
      const res = await axios.get(`${API_URL}posts/`, getAuthHeader());
      setNotes(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async () => {
    if (!currentNote.title) return;

    try {
      if (isEditing) {
        const res = await axios.put(`${API_URL}posts/update/${editId}/`, currentNote, getAuthHeader());
        setNotes(notes.map(n => (n.id === editId ? res.data : n)));
      } else {
        const res = await axios.post(`${API_URL}posts/create/`, currentNote, getAuthHeader());
        setNotes([...notes, res.data]);
      }
      closeModal();
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Unauthorized: Please Login first.");
    }
  };


  const deleteNote = async (id) => {
    if (window.confirm("Authorize deletion?")) {
      try {
        await axios.delete(`${API_URL}posts/delete/${id}/`, getAuthHeader());
        setNotes(notes.filter(note => note.id !== id));
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  const openEditModal = (note) => {
    setCurrentNote({ title: note.title, description: note.description });
    setEditId(note.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentNote({ title: "", description: "" });
    setEditId(null);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-yellow-50 text-white overflow-hidden font-sans"
      style={{
    backgroundImage:
      "url('https://img.freepik.com/free-vector/blue-velvety-abstract-wavy-background-dark-background_134830-2226.jpg?semt=ais_user_personalization&w=740&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4 tracking-tighter">Command Center</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text"
                placeholder="Search nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500/50 transition-all backdrop-blur-sm"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" /> Deploy Agent
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse text-gray-600 font-mono tracking-widest uppercase text-xs">Syncing with Nodes...</div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div key={note.id} className="bg-[#0f1115]/60 border border-white/10 p-6 rounded-3xl hover:border-indigo-500/50 transition-all group backdrop-blur-sm relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <FileText className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(note)} className="p-2 hover:bg-indigo-500/20 rounded-lg text-indigo-400">
                      <Edit3 size={16}/>
                    </button>
                    <button onClick={() => deleteNote(note.id)} className="text-gray-600 hover:text-red-400 transition-colors p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{note.description}</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-green-400 font-mono">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div> STATUS: VERIFIED
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">No matching agents found</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative w-full max-w-md bg-[#0f1115] border border-white/10 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">{isEditing ? "Update Agent" : "New Agent"}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                value={currentNote.title}
                onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                placeholder="Agent Designation"
              />
              <textarea 
                rows="4"
                value={currentNote.description}
                onChange={(e) => setCurrentNote({...currentNote, description: e.target.value})}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all resize-none text-sm"
                placeholder="Workflow Logic"
              />
              <button 
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
              >
                <Zap className="w-5 h-5 fill-current" /> {isEditing ? "Update Logic" : "Initialize Agent"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;