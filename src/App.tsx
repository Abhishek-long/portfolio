import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Github, Linkedin, Mail, Download, ExternalLink, 
  Code2, GraduationCap, Briefcase, Trophy, Award, Send, 
  MapPin, Phone, BookOpen, User, Cpu, ArrowUpRight, ShieldCheck, Activity
} from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, SKILLS, PROJECTS, CERTIFICATES, ACHIEVEMENTS } from './constants';

// --- UTILS ---
const getDirectLink = (url) => {
  if (!url) return '';
  const id = url.includes('/d/') ? url.split('/d/')[1]?.split('/')[0] : url;
  return `https://lh3.googleusercontent.com/d/${id}`;
};

// --- COMPONENT: GAMING LOADING SCREEN ---
const GamingLoader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [log, setLog] = useState("INITIALIZING SYSTEM...");

  useEffect(() => {
    const logs = [
      "LOADING NEURAL NETWORKS...",
      "FETCHING ARCHITECTURAL ASSETS...",
      "ESTABLISHING SECURE PROTOCOLS...",
      "DECRYPTING PORTFOLIO DATA...",
      "SYNCING CORE MODULES...",
      "READY."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setPercent(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        if (p % 20 === 0) {
          setLog(logs[i]);
          i++;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center p-6 font-mono">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-end mb-2">
          <span className="text-blue-500 text-[10px] tracking-tighter animate-pulse">{log}</span>
          <span className="text-white text-2xl font-black italic">{percent}%</span>
        </div>
        {/* Segmented Loading Bar */}
        <div className="flex gap-1 h-3 w-full mb-6">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`flex-1 transition-colors duration-300 ${percent > (i * 5) ? 'bg-blue-600 shadow-[0_0_10px_blue]' : 'bg-white/5'}`} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 opacity-40">
           <div className="text-[8px] text-slate-500">CORE_LOAD: 0x82736<br/>BUFFER_STATE: STABLE</div>
           <div className="text-[8px] text-slate-500 text-right">VERSION: 0.2.6<br/>STATUS: AUTHORIZED</div>
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT: ANIMATED BORDER BUTTON ---
const AnimatedBorderButton = ({ children, href, className = "", ...props }) => (
  <a href={href} target="_blank" rel="noreferrer" className={`relative inline-block bg-transparent border border-white/10 text-white transition-all group px-10 py-5 text-xs font-black uppercase tracking-widest rounded-full overflow-visible ${className}`} {...props}>
    <svg className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
      <path d="M 30,1 A 29,29 0 0 0 1,30 L 1,30 A 29,29 0 0 0 30,59 L 170,59 A 29,29 0 0 0 199,30 L 199,30 A 29,29 0 0 0 170,1 Z"
        fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="400 550" strokeDashoffset="400" className="animated-border-path" />
    </svg>
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
  </a>
);

// --- COMPONENT: DATA LINE (SCRAMBLED REVEAL) ---
function DataLine({ item, show }) {
  const [val, setVal] = useState("");
  useEffect(() => {
    if (!show) return;
    let i = 0;
    const chars = "ABCDEF0123456789!@#$%";
    const int = setInterval(() => {
      setVal(item.value.split("").map((c, idx) => idx < i ? c : chars[Math.floor(Math.random()*chars.length)]).join(""));
      i += 1/2;
      if (i > item.value.length) clearInterval(int);
    }, 30);
    return () => clearInterval(int);
  }, [show]);

  const Icon = item.icon;
  return (
    <div className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-blue-600/5 transition-all group">
      <div className="w-10 h-10 flex items-center justify-center border border-white/10 text-blue-500 shrink-0 bg-black"><Icon size={16}/></div>
      <div className="flex-1 min-w-0">
        <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{item.key}</p>
        <p className="text-sm font-bold text-white truncate">{val || item.value}</p>
      </div>
      {item.href && <ArrowUpRight size={14} className="text-slate-700 group-hover:text-blue-500"/>}
    </div>
  );
}

const DevContactFlash = ({ open, onClose }) => {
  const data = [
    { key: "Email", value: PERSONAL_INFO.email, icon: Mail, href: `mailto:${PERSONAL_INFO.email}` },
    { key: "Phone", value: PERSONAL_INFO.phone, icon: Phone, href: `tel:${PERSONAL_INFO.phone}` },
    { key: "GitHub", value: "github.com/Abhishek-long", icon: Github, href: PERSONAL_INFO.github },
    { key: "Location", value: PERSONAL_INFO.location, icon: MapPin },
  ];
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-md p-6" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()} className="bg-slate-900 border border-white/10 w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-start">
          <div><h3 className="text-xl font-black text-white italic">CONTACT_PROTOCOL</h3><p className="text-[8px] font-mono text-blue-500 uppercase tracking-widest mt-1">Status: Encrypted Connection</p></div>
          <button onClick={onClose} className="p-2 border border-white/10 text-slate-500 hover:text-white"><X size={16}/></button>
        </div>
        <div>{data.map((it, i) => <DataLine key={i} item={it} show={open} />)}</div>
        <div className="p-4 bg-black/40 text-center font-mono text-[8px] text-slate-700 uppercase tracking-[0.3em]">Execution: System_Admin // ESC to Exit</div>
      </motion.div>
    </div>
  );
};

// --- MAIN SECTIONS ---

const Hero = ({ onContactClick }) => {
  const parts = PERSONAL_INFO.name.split(' ');

  return (
    <section className="relative min-h-screen flex items-center pt-24 px-10 overflow-hidden bg-slate-950">
      
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="max-w-screen-2xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-10">
            <ShieldCheck size={14} /> SYSTEM_PROTOCOL: 0.2.6
          </div>

          <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] font-black tracking-tighter leading-[1.1] mb-8 text-white uppercase italic flex flex-col pb-10">
            <span className="text-white">{parts[0]}</span>
            <span className="text-slate-800">{parts.slice(1).join(' ')}</span>
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-xl italic border-l-2 border-blue-600/30 pl-8 leading-relaxed font-light">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex flex-wrap gap-6">
            <button
              onClick={onContactClick}
              className="px-12 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-[0_0_20px_blue] hover:bg-blue-700 active:scale-95 transition-all"
            >
              Initiate Contact
            </button>

            <AnimatedBorderButton href={PERSONAL_INFO.resume}>
              Download_Resume
            </AnimatedBorderButton>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
     <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  className="relative lg:justify-self-end w-full max-w-[500px]"
>

  {/* IMAGE CARD */}
  <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border-2 border-white/5 bg-slate-900 shadow-2xl relative group">

    <img
      src={getDirectLink(PERSONAL_INFO.profilePhoto)}
      alt={PERSONAL_INFO.name}
      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
      referrerPolicy="no-referrer"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />

    <motion.div
      animate={{ y: ['0%', '100%', '0%'] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute inset-x-0 h-px bg-blue-500/50 shadow-[0_0_15px_blue] z-20"
    />
  </div>

  {/* 🔥 SOCIAL ICONS (OUTSIDE now) */}
  <div className="absolute bottom-[-20px] left-[-20px] bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/10 flex gap-4 z-30">

    <a
      href={PERSONAL_INFO.github}
      target="_blank"
      rel="noreferrer"
      className="p-3 bg-slate-800 text-white rounded-xl hover:bg-white hover:text-black hover:scale-110 transition-all"
    >
      <Github size={20} />
    </a>

    <a
      href={PERSONAL_INFO.linkedin}
      target="_blank"
      rel="noreferrer"
      className="p-3 bg-slate-800 text-white rounded-xl hover:bg-blue-600 hover:scale-110 transition-all"
    >
      <Linkedin size={20} />
    </a>

  </div>

</motion.div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, badge }) => (
  <div className="mb-16 space-y-3">
    <div className="flex items-center gap-2">
      <div className="h-1 w-1 bg-blue-600 rounded-full animate-pulse" />
      <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px]">{badge}</span>
    </div>
    <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">{title}</h2>
    <div className="h-1.5 w-16 bg-blue-600 rounded-full" />
  </div>
);

const About = () => (
  <section id="about" className="py-32 px-10 bg-slate-950">
    <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-10">
        <SectionHeader badge="Identity" title="About" />
        <p className="text-lg text-slate-400 font-light leading-relaxed italic border-l-2 border-blue-600/20 pl-8">{PERSONAL_INFO.bio}</p>
        <div className="grid grid-cols-2 gap-4">
           <div className="p-6 bg-white/5 border border-white/10 rounded-2xl"><Trophy className="text-blue-500 mb-3" size={24}/><h3 className="text-[10px] font-black uppercase text-white tracking-widest">High Performance</h3></div>
           <div className="p-6 bg-white/5 border border-white/10 rounded-2xl"><BookOpen className="text-blue-500 mb-3" size={24}/><h3 className="text-[10px] font-black uppercase text-white tracking-widest">Constant Intel</h3></div>
        </div>
      </div>
      <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/10 space-y-8">
         <h3 className="text-xl font-bold uppercase text-white italic">Capability Analysis</h3>
         <div className="space-y-6">
            {[{ l: "Frontend Architecture", v: 88 }, { l: "Backend Systems", v: 84 }, { l: "Data Logic", v: 80 }].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest"><span>{s.l}</span><span>{s.v}%</span></div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${s.v}%` }} transition={{ duration: 1.5 }} className="h-full bg-blue-600 shadow-[0_0_10px_blue]" /></div>
              </div>
            ))}
         </div>
      </div>
    </div>
  </section>
);

const Education = () => (
  <section id="education" className="py-32 px-10 bg-slate-950">
    <div className="max-w-screen-2xl mx-auto">
      <SectionHeader badge="Academic" title="Education" />
      <div className="space-y-4">
        {EDUCATION.map((edu, i) => (
          <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 hover:border-blue-500 transition-all group">
            <div className="flex gap-6 items-center"><div className="p-4 bg-slate-900 rounded-2xl text-blue-500"><GraduationCap size={32}/></div><div><h3 className="text-xl font-black text-white uppercase italic">{edu.degree}</h3><p className="text-xs text-slate-500 uppercase">{edu.institution}</p></div></div>
            <div className="text-right"><span className="px-4 py-1 bg-slate-900 text-[10px] font-mono text-slate-500 uppercase mb-2 block">{edu.duration}</span><p className="text-xl font-black text-blue-500">{edu.score}</p></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-32 px-10 bg-slate-950">
    <div className="max-w-screen-2xl mx-auto">
      <SectionHeader badge="Arsenal" title="Skills" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {['languages', 'frameworks', 'tools', 'softSkills'].map((cat, idx) => (
          <div key={idx} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] group hover:border-blue-500 transition-all">
             <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mb-10 italic">#_{cat}</h3>
             <div className="flex flex-wrap gap-2.5">
                {(SKILLS[cat] || []).map(s => <span key={s} className="px-4 py-2 bg-slate-950 border border-white/5 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white transition-all cursor-default">{s}</span>)}
             </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="py-32 px-10 bg-slate-950">
    <div className="max-w-screen-2xl mx-auto">
      <SectionHeader badge="History" title="Projects" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PROJECTS.map((p, i) => (
          <div key={i} className="group rounded-[3.5rem] overflow-hidden bg-white/5 border border-white/5 hover:border-blue-500 transition-all duration-500 shadow-2xl">
             <div className="aspect-video overflow-hidden relative">
                <img src={getDirectLink(p.image)} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
             </div>
             <div className="p-10 space-y-6">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 italic font-light">{p.description}</p>
                <div className="flex gap-4 pt-6 border-t border-white/5">
                   <a href={p.github} target="_blank" className="p-4 bg-slate-950 rounded-2xl text-white hover:bg-white hover:text-black transition-all"><Github size={18}/></a>
                   <a href={p.demo} target="_blank" className="flex-1 flex items-center justify-center bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all">Launch_Module</a>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Certificates = () => (
  <section id="certificates" className="py-32 px-10 bg-slate-950">
    <div className="max-w-screen-2xl mx-auto">
      <SectionHeader badge="Verified" title="Certificates" />
      <div className="grid md:grid-cols-2 gap-6">
        {CERTIFICATES.map((c, i) => (
          <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-blue-500 transition-all">
             <div className="flex items-center gap-6"><Award className="text-blue-500" size={28}/><div><h3 className="text-lg font-black text-white uppercase italic">{c.name}</h3><p className="text-[10px] text-slate-500 uppercase tracking-widest">{c.issuer} // {c.date}</p></div></div>
             {c.downloadUrl && <a href={c.downloadUrl} className="p-4 bg-slate-950 rounded-2xl text-slate-500 hover:text-white"><Download size={20}/></a>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Achievements = () => (
  <section id="achievements" className="py-32 px-10 bg-slate-950">
    <div className="max-w-screen-2xl mx-auto">
      <SectionHeader badge="Impact" title="Achievements" />
      <div className="space-y-4">
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} className="p-10 bg-white/5 border border-white/5 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-8 hover:border-blue-500 transition-all">
             <div className="flex gap-8 items-start"><div className="p-4 bg-yellow-500/10 text-yellow-500 rounded-2xl"><Trophy size={32}/></div><div><h3 className="text-2xl font-black text-white uppercase italic">{a.title}</h3><p className="text-sm text-slate-400 font-light max-w-2xl italic mt-2">{a.description}</p></div></div>
             <div className="text-right shrink-0"><p className="text-[10px] font-mono text-slate-600 uppercase mb-1">{a.date}</p><p className="text-xs font-bold text-blue-500 uppercase">{a.org}</p></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);


export default function App() {
  const [loading, setLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden">
      
      <AnimatePresence>
        {loading && (
          <GamingLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <nav className="fixed w-full z-[110] py-8 px-10 flex justify-between items-center pointer-events-none">
            <a
              href="#"
              className="text-2xl font-black tracking-tighter text-white italic pointer-events-auto"
            >
              AGIRI<span className="text-blue-600">.</span>
            </a>

            <div className="hidden lg:flex gap-10 text-[9px] font-black uppercase tracking-widest text-slate-500 pointer-events-auto">
              {[
                "About",
                "Education",
                "Skills",
                "Projects",
                "Certificates",
                "Achievements",
              ].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="hover:text-white transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>

            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 pointer-events-auto">
              <Cpu size={18} className="animate-pulse" />
            </div>
          </nav>

          <main>
            <Hero onContactClick={() => setContactOpen(true)} />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Certificates />
            <Achievements />

            <section id="contact" className="py-32 px-10 bg-slate-950">
  <div className="max-w-screen-2xl mx-auto">
    
    {/* KEEP YOUR HEADER */}
    <SectionHeader badge="Protocol" title="Contact" />
    
    <p className="text-2xl text-slate-500 font-light italic mb-16 text-center">
      Available for high-stakes enterprise collaborations.
    </p>

    {/* FORM CARD */}
    <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">

      <form className="flex flex-col gap-6">

        {/* Name + Email */}
        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-500 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="px-5 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-500 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="px-5 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-500 uppercase tracking-wider">
            Project Details
          </label>
          <textarea
            rows="5"
            placeholder="Tell me about your project..."
            className="px-5 py-3 bg-slate-900 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
          />
        </div>

        {/* Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-xl text-white font-semibold tracking-wide shadow-[0_0_25px_rgba(37,99,235,0.3)]"
          >
            Send Message
          </button>
        </div>

      </form>
    </div>

  </div>
</section>
          </main>

          <DevContactFlash
            open={contactOpen}
            onClose={() => setContactOpen(false)}
          />

          <footer className="py-20 px-10 border-t border-white/5 bg-slate-950 text-center md:text-left">
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h2 className="text-2xl font-black italic uppercase">
                  AGIRI<span className="text-blue-600">.</span>
                </h2>
                <p className="text-slate-600 text-[9px] font-black uppercase mt-4 italic">
                  © {new Date().getFullYear()} / System Architect Portfolio / V.026
                </p>
              </div>

              <div className="flex gap-8">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-all transform hover:scale-125"
                >
                  <Github size={24} />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-white transition-all transform hover:scale-125"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </footer>
        </>
      )}

      <style>{`
        .animated-border-path { animation: border-dash 6s linear infinite; }
        @keyframes border-dash {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: -550; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #2563eb; }
      `}</style>
    </div>
  );
}
