import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, Code2, GraduationCap, Briefcase, Trophy, Award, Send, MapPin, Phone } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, SKILLS, PROJECTS, CERTIFICATES, ACHIEVEMENTS } from './constants';
import axios from 'axios';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter text-white">AG.</a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="min-h-screen flex items-center pt-20 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold mb-6 uppercase tracking-widest">
          Available for Hire
        </span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6 text-white">
          {PERSONAL_INFO.name.split(' ')[0]} <br />
          <span className="text-slate-500">{PERSONAL_INFO.name.split(' ')[1]}</span>
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-md leading-relaxed">
          {PERSONAL_INFO.tagline}
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#contact" className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all flex items-center gap-2">
            Let's Talk <Send size={18} />
          </a>
          <a href={PERSONAL_INFO.resume} target="_blank" rel="noreferrer" className="px-8 py-4 border border-slate-800 rounded-full font-medium text-white hover:bg-slate-900 transition-all flex items-center gap-2">
            Resume <Download size={18} />
          </a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
          <img 
            src={PERSONAL_INFO.profilePhoto} 
            alt={PERSONAL_INFO.name} 
            className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 hidden md:block">
          <div className="flex gap-4">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 text-white rounded-xl hover:bg-white hover:text-black transition-all">
              <Github size={20} />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 text-white rounded-xl hover:bg-blue-600 transition-all">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-16">
    <h2 className="text-4xl font-bold tracking-tighter mb-4 text-white">{title}</h2>
    {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
    <div className="h-1 w-20 bg-blue-600 mt-6"></div>
  </div>
);

const About = () => (
  <section id="about" className="py-24 px-6 bg-slate-900/50">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <SectionHeading 
          title="About Me" 
          subtitle="A brief introduction to my professional background and aspirations."
        />
        <div className="space-y-6">
          <p className="text-xl text-slate-300 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Location</h4>
              <p className="font-medium text-white">{PERSONAL_INFO.location}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email</h4>
              <p className="font-medium text-white">{PERSONAL_INFO.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Education = () => (
  <section id="education" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeading title="Education" subtitle="My academic journey and qualifications." />
      <div className="space-y-12">
        {EDUCATION.map((edu, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-3xl border border-slate-800 hover:border-blue-600 transition-all group"
          >
            <div className="flex gap-6 items-start">
              <div className="p-4 bg-slate-800 text-white rounded-2xl group-hover:bg-blue-600 transition-all">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-white">{edu.degree}</h3>
                <p className="text-slate-400 font-medium">{edu.institution}</p>
                <p className="text-sm text-slate-500 mt-2">{edu.location}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">{edu.duration}</p>
              <p className="text-lg font-bold text-blue-500">{edu.score}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-24 px-6 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tighter mb-4">Skills & Expertise</h2>
        <div className="h-1 w-20 bg-blue-600 mt-6"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          { title: 'Languages', items: SKILLS.languages, icon: <Code2 /> },
          { title: 'Frameworks', items: SKILLS.frameworks, icon: <Briefcase /> },
          { title: 'Tools', items: SKILLS.tools, icon: <Award /> },
          { title: 'Soft Skills', items: SKILLS.softSkills, icon: <Trophy /> },
        ].map((category, idx) => (
          <div key={idx} className="space-y-6">
            <div className="flex items-center gap-3 text-slate-500">
              {category.icon}
              <h3 className="text-xs font-bold uppercase tracking-widest">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-slate-800 rounded-full text-sm font-medium hover:bg-blue-600 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeading title="Selected Projects" subtitle="A showcase of my recent work in web development and AI." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className="group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-sm hover:shadow-blue-900/20 transition-all"
          >
            <div className="aspect-video overflow-hidden bg-slate-800">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {project.description}
              </p>
              <div className="flex gap-4">
                <a href={project.github} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 text-white rounded-lg hover:bg-blue-600 transition-all">
                  <Github size={18} />
                </a>
                <a href={project.demo} className="p-2 bg-slate-800 text-white rounded-lg hover:bg-blue-600 transition-all">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/contact', formState);
      if (res.data.success) {
        setStatus({ type: 'success', message: res.data.message });
        setFormState({ name: '', email: '', message: '' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeading title="Get In Touch" subtitle="Have a project in mind? Let's build something amazing together." />
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-900 rounded-2xl shadow-sm border border-slate-800 text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Email Me</h4>
                  <p className="font-medium text-white">{PERSONAL_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-900 rounded-2xl shadow-sm border border-slate-800 text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Location</h4>
                  <p className="font-medium text-white">{PERSONAL_INFO.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-900 rounded-2xl shadow-sm border border-slate-800 text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Call Me</h4>
                  <p className="font-medium text-white">{PERSONAL_INFO.phone}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
                  <input 
                    required
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-800 text-white rounded-2xl border-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-800 text-white rounded-2xl border-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-800 text-white rounded-2xl border-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button 
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {status.type && (
                <p className={`text-sm font-medium ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-6 border-t border-slate-800">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter mb-2 text-white">Abhishek Giri</h2>
        <p className="text-slate-500 text-sm">© 2026 All Rights Reserved.</p>
      </div>
      <div className="flex gap-6">
        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
          <Github size={20} />
        </a>
        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
          <Linkedin size={20} />
        </a>
        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-500 hover:text-white transition-colors">
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
