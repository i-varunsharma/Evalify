import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbRobot, TbArrowRight, TbFileText, TbVideo, TbShieldCheck, TbChartBar, TbSparkles } from "react-icons/tb";

const careerData = [
  { name: "Engineering", icon: "⚙️" },
  { name: "Government", icon: "🏛️" },
  { name: "Medical", icon: "🏥" },
  { name: "Management", icon: "📊" },
  { name: "Law", icon: "⚖️" },
  { name: "Teaching", icon: "📚" },
  { name: "Startup", icon: "🚀" },
  { name: "Corporate", icon: "🏢" },
];

const features = [
  { icon: <TbFileText size={28} />, title: "Resume Parsing", desc: "AI extracts key data points from your resume to craft targeted questions." },
  { icon: <TbVideo size={28} />, title: "Live Simulation", desc: "Face a lifelike AI interviewer that adapts to your responses in real time." },
  { icon: <TbShieldCheck size={28} />, title: "Smart Proctoring", desc: "Advanced monitoring ensures a focused, professional session every time." },
  { icon: <TbChartBar size={28} />, title: "Deep Analytics", desc: "Get scored on confidence, accuracy, communication, and more." },
];

const steps = [
  { num: "01", title: "Upload Resume", desc: "Drop your PDF and let AI analyze your profile instantly." },
  { num: "02", title: "Start Interview", desc: "Answer questions from a real-time AI interviewer." },
  { num: "03", title: "Get Results", desc: "Receive detailed feedback and a performance score." },
];

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.user);
  const [selected, setSelected] = useState("");

  const handleStart = () => {
    if (!user) { navigate("/auth"); return; }
    navigate("/upload-resume", { state: { careerPath: { category: selected } } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">

      {/* Navbar */}
      <nav className="glass-nav">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-11 h-11 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <TbRobot size={22} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">Evalify</span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-gray-500 font-medium">Credits</span>
                  <span className="text-sm font-bold">{user.credits}</span>
                </div>
                <div onClick={() => navigate("/profile")} className="w-10 h-10 rounded-full border-2 border-gray-200 overflow-hidden cursor-pointer hover:border-black transition-all hover:scale-110">
                  {user.picture
                    ? <img src={user.picture} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center bg-gray-100 text-sm font-bold">{(user.name?.[0] || "U").toUpperCase()}</div>
                  }
                </div>
                <button className="btn-primary" onClick={() => navigate("/upload-resume")}>
                  Start Interview
                </button>
              </>
            ) : (
              <button className="btn-primary" onClick={() => navigate("/auth")}>
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="section-badge flex items-center gap-2 justify-center">
            <TbSparkles size={14} />
            AI-Powered Interview Practice
          </div>
          <h1 className="text-6xl sm:text-7xl font-black text-black mb-7 leading-[1.1] tracking-tight">
            Practice Interviews.<br />
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Land Dream Jobs.</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Get real-time feedback from our AI interviewer and improve your skills before the big day. No pressure, just practice.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary text-base flex items-center gap-2 group" onClick={() => navigate(user ? "/upload-resume" : "/auth")}>
              Start Practicing Now
              <TbArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary text-base">
              Watch Demo
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 font-medium">1000+ interviews completed</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <span className="hidden sm:block text-gray-600 font-medium">⭐ 4.9/5 rating</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-badge">Features</span>
            <h2 className="text-4xl font-black text-black mb-4">Why Choose Evalify</h2>
            <p className="text-lg text-gray-600 font-medium">Everything you need to ace your interview</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card-base group">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg text-black mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Selector */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-badge">Career Paths</span>
            <h2 className="text-4xl font-black text-black mb-4">Choose Your Field</h2>
            <p className="text-lg text-gray-600 font-medium">Tailored questions for your specific career path</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {careerData.map((c) => (
              <button key={c.name} onClick={() => setSelected(c.name)}
                className={`p-8 rounded-2xl border-2 text-center transition-all ${
                  selected === c.name 
                    ? 'border-black bg-gray-50 shadow-xl scale-105' 
                    : 'border-gray-200 hover:border-gray-400 hover:shadow-lg hover:scale-105'
                }`}>
                <div className="text-5xl mb-4">{c.icon}</div>
                <div className={`font-bold text-sm ${selected === c.name ? 'text-black' : 'text-gray-700'}`}>
                  {c.name}
                </div>
              </button>
            ))}
          </div>

          {selected && (
            <div className="mt-12 flex justify-center animate-in fade-in duration-300">
              <button className="btn-primary text-base flex items-center gap-2 group shadow-xl" onClick={handleStart}>
                Start {selected} Interview
                <TbArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-badge">Process</span>
            <h2 className="text-4xl font-black text-black mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 font-medium">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                )}
                <div className="text-center relative z-10">
                  <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-5 shadow-lg">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6 leading-tight">Ready to Start<br/>Practicing?</h2>
          <p className="text-xl text-gray-300 mb-10 font-medium">Join thousands of candidates improving their interview skills every day</p>
          <button className="bg-white text-black px-10 py-4 rounded-xl font-bold text-base hover:scale-105 transition-all shadow-2xl" onClick={() => navigate(user ? "/upload-resume" : "/auth")}>
            Get Started Free →
          </button>
          <p className="text-sm text-gray-400 mt-6 font-medium">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
                  <TbRobot size={20} className="text-white" />
                </div>
                <span className="font-bold text-xl">Evalify</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium mb-4">
                AI-powered interview practice platform helping candidates land their dream jobs.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition">
                  <span className="text-sm font-bold">𝕏</span>
                </a>
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition">
                  <span className="text-sm font-bold">in</span>
                </a>
                <a href="#" className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition">
                  <span className="text-sm font-bold">IG</span>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-bold text-sm text-black mb-4 uppercase tracking-wider">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Features</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Pricing</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">How it Works</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Demo</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-sm text-black mb-4 uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">About Us</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-sm text-black mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Cookie Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-black transition font-medium">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 font-medium">© 2026 Evalify. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-500 font-medium">Made with ❤️ in India</span>
              <div className="flex gap-4 text-sm text-gray-600 font-medium">
                <a href="#" className="hover:text-black transition">Status</a>
                <a href="#" className="hover:text-black transition">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
