import React from 'react'
import { useNavigate } from "react-router-dom";

import { ShieldCheck, Eye, Cpu, ArrowRight, Activity, Zap } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-yellow text-white font-sans selection:bg-purple-500/30">
      
     <div className="absolute inset-0 grid-bg"></div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-blue-400 to-green-400 rounded-sm"> </div>
            <span className="font-bold">Anything.ai</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Product</a>
            <a href="#" className="hover:text-white">Solutions</a>
            <a href="#" className="hover:text-white">Why Us</a>
            <a href="#" className="hover:text-white">Company</a>
            
          </div>
        <button 
      onClick={() => navigate('/register')}
      className="bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-full text-sm font-medium transition"
    >
      Login
    </button>
      
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-5xl lg:text-7xl font-semibold leading-[1.1] mb-8 tracking-tight">
            Autonomous AI agents for banks, governments & enterprises
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            Make critical decisions faster with full transparency. 
            Auditable AI agents that execute workflows, not just 
            predictions — built for regulated industries.
          </p>

          {/* Features Mini-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-500 mt-1" />
              <p className="text-xs text-gray-400">SOC 2 & GDPR ready</p>
            </div>
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-blue-500 mt-1" />
              <p className="text-xs text-gray-400">Full audit trail for every decision</p>
            </div>
            <div className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-purple-500 mt-1" />
              <p className="text-xs text-gray-400">Runs in your VPC or ours</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition">
              <Zap className="w-5 h-5 fill-current" /> Get a Free Demo
            </button>
            <button
  onClick={() => navigate("/create")}
  className="bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition"
>
  See It in Action <ArrowRight className="w-4 h-4" />
</button>
          </div>
        </div>

        {/* Right Content - Dashboard UI Mockup */}
        <div className="relative">
          <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
            {/* Window Controls */}
            <div className="flex gap-1.5 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-4 text-[10px] text-gray-500 font-mono">orchestrator.sys</span>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Network Status</p>
                  <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded text-xs border border-green-500/20">
                    <Activity className="w-3 h-3" /> OPERATIONAL
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Active Nodes</p>
                  <p className="text-3xl font-mono">8,492</p>
                </div>
              </div>

              {/* Agent Progress Bars */}
              <div className="space-y-4">
                <AgentRow name="market_maker_v2" progress="98%" color="bg-green-500" />
                <AgentRow name="sentiment_analyzer" progress="84%" color="bg-blue-500" />
                <AgentRow name="contract_auditor" progress="100%" color="bg-purple-500" />
              </div>

              {/* Chart Mockup */}
              <div className="h-32 flex items-end gap-1 pt-4">
                {[40, 70, 45, 90, 65, 80, 30, 95, 100, 60].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500/20 border-t border-blue-500/40" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
          
       
          <div className="absolute -bottom-6 -left-6 bg-[#16181d] border border-white/10 p-4 rounded-xl shadow-xl max-w-[200px]">
            <div className="flex items-center gap-2 text-[10px] text-green-400 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> Verification — Secure
            </div>
            <p className="text-[10px] text-gray-500 mb-1 font-mono">Last block verified</p>
            <p className="text-xs font-mono truncate text-gray-300">0x/f2...9a1b</p>
          </div>
          
        </div>
      
      </main>
      {/* Footer */}
<footer className="relative z-10 border-t border-white/10 mt-20 bg-[#0f1115] text-gray-400 py-12">
  <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

    {/* Logo + About */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-gradient-to-tr from-blue-400 to-green-400 rounded-sm"></div>
        <span className="font-bold text-lg">Anything.ai</span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">
        Autonomous AI agents designed for enterprises, governments and
        regulated industries. Transparent, auditable and scalable AI workflows.
      </p>
    </div>

    {/* Product */}
    <div>
      <h3 className="text-sm font-semibold mb-4">Product</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <li className="hover:text-white cursor-pointer">Features</li>
        <li className="hover:text-white cursor-pointer">Integrations</li>
        <li className="hover:text-white cursor-pointer">Pricing</li>
        <li className="hover:text-white cursor-pointer">API</li>
      </ul>
    </div>

    {/* Company */}
    <div>
      <h3 className="text-sm font-semibold mb-4">Company</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        <li className="hover:text-white cursor-pointer">About</li>
        <li className="hover:text-white cursor-pointer">Careers</li>
        <li className="hover:text-white cursor-pointer">Blog</li>
        <li className="hover:text-white cursor-pointer">Contact</li>
      </ul>
    </div>

    {/* Newsletter */}
    <div>
      <h3 className="text-sm font-semibold mb-4">Stay Updated</h3>
      <p className="text-sm text-gray-400 mb-4">
        Get product updates and AI insights directly to your inbox.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Email address"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
        <button className="bg-indigo-600 hover:bg-indigo-500 px-4 rounded-lg text-sm font-medium">
          Subscribe
        </button>
      </div>
    </div>

  </div>

  {/* Bottom Bar */}
  <div className="border-t border-white/10 py-4 text-center text-sm text-gray-500">
    © 2026 Anything.ai. All rights reserved.
  </div>
</footer>
    </div>
  );
  
};

const AgentRow = ({ name, progress, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[10px] font-mono text-gray-400">
      <span>{`>_ ${name}`}</span>
      <span>{progress}</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: progress }}></div>
    </div>
  </div>
);

export default LandingPage;