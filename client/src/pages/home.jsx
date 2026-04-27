import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbRobot, TbArrowRight, TbChevronRight, TbCheck, TbFileText, TbVideo, TbLock, TbChartBar } from "react-icons/tb";
import { motion, AnimatePresence } from "motion/react";

// Assets
import resumeImg from "../assets/resume.png";
import aiImg from "../assets/ai-ans.png";
import confiImg from "../assets/confi.png";
import engImg from "../assets/engineering.jpeg";
import govtImg from "../assets/govt job.jpeg";
import medImg from "../assets/medical.jpeg";
import mbaImg from "../assets/mba.jpeg";
import teachImg from "../assets/teaching.png";
import startupImg from "../assets/stratup.jpeg";
import hrImg from "../assets/HR.png";
import mmImg from "../assets/MM.png";

const careerData = {
  "Engineering": { icon: "⚙️", color: "bg-blue-50 text-blue-600", image: engImg },
  "Government": { icon: "🏛️", color: "bg-amber-50 text-amber-600", image: govtImg },
  "Medical": { icon: "🏥", color: "bg-rose-50 text-rose-600", image: medImg },
  "Management": { icon: "📊", color: "bg-emerald-50 text-emerald-600", image: mbaImg },
  "Law": { icon: "⚖️", color: "bg-purple-50 text-purple-600", image: mmImg },
  "Teaching": { icon: "📚", color: "bg-sky-50 text-sky-600", image: teachImg },
  "Startup": { icon: "🚀", color: "bg-orange-50 text-orange-600", image: startupImg },
  "Corporate": { icon: "🏢", color: "bg-slate-100 text-slate-600", image: hrImg },
};

const features = [
  { icon: <TbFileText size={28} />, title: "Precision Parsing", desc: "Our AI extracts high-impact data points from your resume instantly.", color: "text-indigo-600 bg-indigo-50" },
  { icon: <TbVideo size={28} />, title: "Neural Interview", desc: "Experience a lifelike simulation with an AI that understands nuance.", color: "text-sky-600 bg-sky-50" },
  { icon: <TbLock size={28} />, title: "Secure Protocol", desc: "Advanced proctoring ensures a professional and focused session.", color: "text-violet-600 bg-violet-50" },
  { icon: <TbChartBar size={28} />, title: "Quantified Data", desc: "Get measurable feedback on confidence, pace, and accuracy.", color: "text-blue-600 bg-blue-50" },
];

function CareerSelector({ onStart }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="section-title">Professional Verticals</h2>
          <p className="section-desc">Select your domain for a targeted assessment simulation.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(careerData).map(([name, data]) => (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={`group p-10 rounded-[2.5rem] border transition-all duration-500 text-center ${selected === name ? "border-indigo-600 bg-indigo-50/30 ring-4 ring-indigo-50 shadow-xl" : "border-slate-100 bg-white hover:border-slate-300 shadow-sm"}`}
            >
              <div className={`w-16 h-16 ${data.color} rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                {data.icon}
              </div>
              <h3 className="text-lg font-black text-slate-900">{name}</h3>
              <div className={`mt-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${selected === name ? "text-indigo-600 opacity-100" : "text-slate-300 opacity-0 group-hover:opacity-100"}`}>
                Initialize
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mt-16 flex justify-center">
              <button onClick={() => onStart({ category: selected })} className="btn-primary flex items-center gap-3 text-lg px-16 py-5">
                Begin Assessment <TbArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleStart = (selected) => {
    if (!user) { navigate("/auth"); return; }
    navigate("/upload-resume", { state: { careerPath: selected } });
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      
      {/* Designer Header */}
      <nav className="glass-nav h-24 px-10 sm:px-20 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <TbRobot size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">Evalify.</span>
        </div>
        
        <div className="flex items-center gap-8">
          {user ? (
            <>
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Available Sessions</span>
                <span className="text-sm font-black text-slate-900">{user.credits}</span>
              </div>
              <div onClick={() => navigate("/profile")} className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center cursor-pointer overflow-hidden hover:border-indigo-600 transition-all shadow-sm">
                {user.picture ? <img src={user.picture} alt="" className="w-full h-full object-cover" /> : <span className="font-bold text-slate-400">{(user.name?.[0] || "U").toUpperCase()}</span>}
              </div>
              <button onClick={() => navigate("/upload-resume")} className="btn-primary">Get Started</button>
            </>
          ) : (
            <button onClick={() => navigate("/auth")} className="btn-primary">Authenticate</button>
          )}
        </div>
      </nav>

      {/* Modern Hero Section */}
      <section className="relative pt-40 pb-32 px-10 bg-gradient-to-b from-indigo-50/50 to-white overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-10 shadow-sm border border-indigo-50">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Next-Gen Simulation protocol
            </span>
            <h1 className="text-6xl sm:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-12">
              Master the art of the <br /> <span className="text-gradient">Professional Story.</span>
            </h1>
            <p className="text-slate-500 text-xl sm:text-2xl font-medium max-w-3xl mx-auto mb-16 leading-relaxed">
              Evalify uses high-fidelity AI to simulate pressurized interview environments. No guesswork. Just precision practice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => navigate(user ? "/upload-resume" : "/auth")} className="btn-primary text-lg px-12 py-5 w-full sm:w-auto">
                Launch Assessment
              </button>
              <button className="btn-secondary text-lg px-12 py-5 w-full sm:w-auto">Protocol Demo</button>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-100 rounded-full blur-[120px] opacity-30 -z-10" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[100px] opacity-40 -z-10" />
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="card-base group">
                <div className={`w-16 h-16 ${f.color} rounded-3xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform duration-500 shadow-sm`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Selector Section */}
      <CareerSelector onStart={handleStart} />

      {/* Workflow Section */}
      <section className="py-32 px-10 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="section-title">Operational Workflow</h2>
            <p className="section-desc">Follow the simulation protocol to quantify and improve your performance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-20 right-20 h-[2px] bg-indigo-100 -translate-y-1/2 z-0" />
            
            {[
              { step: "01", title: "Analyze", desc: "Upload your resume and let the AI extract relevant questions.", img: resumeImg },
              { step: "02", title: "Simulate", desc: "Attend a live AI-led interview with real-time feedback.", img: aiImg },
              { step: "03", title: "Improve", desc: "Receive detailed reports to sharpen your performance.", img: confiImg },
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="text-6xl font-black text-indigo-100/50 mb-6 leading-none tracking-tighter">{s.step}</div>
                <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-premium border border-indigo-50 transition-all hover:-rotate-3">
                  <img src={s.img} alt="" className="w-12 h-12 object-contain" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{s.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-20 px-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:row items-center justify-between gap-12">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center"><TbRobot size={20} /></div>
               <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">Evalify.</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">© 2026 Evalify Systems Inc. / All rights reserved.</p>
            <div className="flex gap-10 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-600 transition">Privacy</a>
              <a href="#" className="hover:text-indigo-600 transition">Terms</a>
              <a href="#" className="hover:text-indigo-600 transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
