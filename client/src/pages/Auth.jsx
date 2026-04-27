import React, { useRef, useState, useCallback, useEffect } from "react";
import { TbRobot, TbShieldCheck } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { ServerURL } from "../App";

const THUMB = 56;

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fill, setFill] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const dragging = useRef(false);

  const getPercent = useCallback((clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const max = rect.width - THUMB;
    const x = Math.min(Math.max(clientX - rect.left - THUMB / 2, 0), max);
    return (x / max) * 100;
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName: name, email, photoURL: picture } = response.user;
      const res = await axios.post(`${ServerURL}/api/auth/google`, { name, email, picture }, { withCredentials: true });
      dispatch(setUser(res.data.user));
      navigate("/");
    } catch (error) {
      console.error("AUTH_ERROR:", error);
      setFill(0);
    }
  };

  const onStart = useCallback(() => {
    dragging.current = true;
    setIsDragging(true);
  }, []);

  const onMove = useCallback((clientX) => {
    if (!dragging.current) return;
    setFill(getPercent(clientX));
  }, [getPercent]);

  const onEnd = useCallback((clientX) => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    const percent = getPercent(clientX);
    if (percent >= 88) {
      setFill(100);
      handleGoogleLogin(); 
    } else {
      setFill(0);
    }
  }, [getPercent]);

  useEffect(() => {
    const move = (e) => onMove(e.clientX);
    const up = (e) => onEnd(e.clientX);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [onMove, onEnd]);

  const thumbLeft = `calc(${fill} * (100% - ${THUMB}px) / 100)`;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-sky-50 flex items-center justify-center px-6 selection:bg-indigo-600 selection:text-white relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-[120px] opacity-40 translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px] bg-white rounded-[3rem] p-16 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.1)] border border-indigo-50 relative z-10 text-center"
      >
        {/* Branding */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6">
            <TbRobot size={28} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Evalify.</h1>
        </div>

        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Security Portal</h2>
          <p className="text-slate-500 font-medium text-base tracking-tight leading-relaxed">Identity verification required for <br/> protocol initialization.</p>
        </div>

        {/* Premium Slider */}
        <div
          ref={sliderRef}
          className="relative w-full h-20 rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden select-none p-2"
        >
          {/* Fill Track */}
          <div
            className="absolute top-2 left-2 bottom-2 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200"
            style={{
              width: `calc(${fill} * (100% - ${THUMB}px) / 100 + ${THUMB}px)`,
              transition: isDragging ? "none" : "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Prompt */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${fill > 45 ? "text-white/40" : "text-slate-400"}`}>
              {fill >= 88 ? "Verifying..." : "Slide to Authenticate"}
            </span>
          </div>

          {/* Handle */}
          <div
            onMouseDown={onStart}
            className="absolute top-2 h-[64px] w-[64px] bg-white rounded-[1.25rem] shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-10 border border-indigo-50 group transition-shadow hover:shadow-indigo-100"
            style={{
              left: thumbLeft,
              transition: isDragging ? "none" : "left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <FcGoogle size={32} />
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100">
            <TbShieldCheck className="text-indigo-600" size={18} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">RSA-4096 Encrypted</span>
          </div>
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.4em]">© 2026 Evalify Systems Inc.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Auth;
