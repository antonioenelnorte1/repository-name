
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, User, Settings, Sparkles, Globe } from 'lucide-react';
import ChatWidget from './ChatWidget';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { UI_STRINGS } from '../translations';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const ArcticBackground = () => {
  const blobs = useMemo(() => [
    { id: 1, color: 'bg-blue-100', size: 'w-[800px] h-[800px]', pos: 'top-[-20%] left-[-10%]', duration: '20s', delay: '0s' },
    { id: 2, color: 'bg-emerald-50', size: 'w-[600px] h-[600px]', pos: 'bottom-[-10%] right-[-10%]', duration: '25s', delay: '-5s' },
    { id: 3, color: 'bg-sky-50', size: 'w-[500px] h-[500px]', pos: 'top-[30%] right-[10%]', duration: '22s', delay: '-10s' },
    { id: 4, color: 'bg-cyan-50', size: 'w-[700px] h-[700px]', pos: 'bottom-[20%] left-[5%]', duration: '30s', delay: '-15s' },
  ], []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-[#f8fbfe]">
      {blobs.map(blob => (
        <div 
          key={blob.id}
          className={`absolute arctic-bokeh ${blob.size} ${blob.color} ${blob.pos} opacity-30 animate-fluid`}
          // Fix: Removed 'as any' from object key which caused the "Cannot find name 'as'" error and correctly cast the style object to React.CSSProperties
          style={{ 
            '--duration': blob.duration,
            animationDelay: blob.delay,
            filter: 'blur(100px)'
          } as React.CSSProperties}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20"></div>
    </div>
  );
};

const Flag: React.FC<{ lang: Language }> = ({ lang }) => {
  if (lang === 'no') {
    return (
      <svg viewBox="0 0 22 16" className="w-6 h-4 shadow-sm rounded-sm">
        <rect width="22" height="16" fill="#ba0c2f"/>
        <path d="M0 8h22M7 0v16" stroke="#fff" strokeWidth="4"/>
        <path d="M0 8h22M7 0v16" stroke="#00205b" strokeWidth="2"/>
      </svg>
    );
  }
  if (lang === 'es') {
    return (
      <svg viewBox="0 0 750 500" className="w-6 h-4 shadow-sm rounded-sm">
        <rect width="750" height="500" fill="#c60b1e"/>
        <rect y="125" width="750" height="250" fill="#ffc400"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" className="w-6 h-4 shadow-sm rounded-sm">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const t = UI_STRINGS[language];
  const [showProfile, setShowProfile] = useState(false);

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-4 bg-white/40 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/40 shadow-sm">
      {(['en', 'es', 'no'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`transition-all duration-300 active-squish flex flex-col items-center gap-1.5 ${
            language === lang ? 'scale-110 opacity-100' : 'opacity-40 hover:opacity-80'
          }`}
        >
          <Flag lang={lang} />
          <span className={`text-[9px] font-black uppercase tracking-widest ${language === lang ? 'text-[#48a0dc]' : 'text-slate-400'}`}>
            {lang}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      <ArcticBackground />

      <header 
        className={`fixed top-0 left-0 right-0 z-50 h-24 transition-all duration-700 ease-in-out ${
          isHome 
            ? 'bg-transparent' 
            : 'bg-white/40 backdrop-blur-2xl border-b border-white/40 shadow-[0_4px_30px_-15px_rgba(0,40,85,0.05)]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group shrink-0">
            <h1 className="text-3xl font-bold tracking-tighter flex">
              <span className="text-[#002855]">North</span>
              <span className="text-[#48a0dc]">Link</span>
            </h1>
          </Link>
          
          <div className="flex items-center gap-6 lg:gap-12">
            {!isHome && (
              <nav className="hidden md:flex gap-6 lg:gap-10">
                <Link to="/company" className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 hover:text-[#002855] transition-all relative group whitespace-nowrap">
                  {t.nav.findTalent}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#48a0dc] rounded-full transition-all duration-500 group-hover:w-full"></span>
                </Link>
                <Link to="/candidate" className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 hover:text-[#002855] transition-all relative group whitespace-nowrap">
                  {t.nav.workInNorway}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#48a0dc] rounded-full transition-all duration-500 group-hover:w-full"></span>
                </Link>
              </nav>
            )}
            
            <div className="flex items-center gap-4 lg:gap-8 shrink-0">
              <LanguageSwitcher />

              {user && (
                <div className="relative">
                  <button 
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-3 p-1.5 bg-white/60 backdrop-blur-xl rounded-full border border-white shadow-sm hover:shadow-xl transition-all active-squish"
                  >
                    <img src={user.avatar} className="w-9 h-9 rounded-full shadow-inner object-cover" alt={user.name} />
                    <div className="hidden lg:block text-left px-1">
                      <p className="text-[11px] font-black text-[#002855] leading-tight truncate max-w-[90px]">{user.name}</p>
                      <p className="text-[9px] font-black text-[#48a0dc] uppercase tracking-tighter">Identity Validated</p>
                    </div>
                  </button>

                  {showProfile && (
                    <div className="absolute top-full right-0 mt-4 w-72 glass-card rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,40,85,0.1)] border-white overflow-hidden animate-in slide-in-from-top-4 duration-500">
                      <div className="p-8 bg-[#002855] text-white relative">
                        <div className="absolute top-0 right-0 p-6 opacity-10"><Sparkles size={48} /></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#48a0dc] mb-6">User Identity</p>
                        <div className="flex items-center gap-5">
                          <img src={user.avatar} className="w-14 h-14 rounded-2xl border-2 border-[#48a0dc]/30 shadow-2xl object-cover" alt={user.name} />
                          <div>
                            <p className="font-black text-xl leading-tight tracking-tight">{user.name}</p>
                            <p className="text-xs text-slate-400 font-medium mt-1">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-white/50">
                        <button className="w-full flex items-center gap-4 p-4 text-slate-500 hover:text-[#48a0dc] hover:bg-white rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-widest">
                          <User size={18} className="text-[#48a0dc]" /> My Profile
                        </button>
                        <button className="w-full flex items-center gap-4 p-4 text-slate-500 hover:text-[#48a0dc] hover:bg-white rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-widest">
                          <Settings size={18} className="text-[#48a0dc]" /> Settings
                        </button>
                        <div className="my-3 border-t border-slate-100/50 mx-4"></div>
                        <button 
                          onClick={() => { logout(); setShowProfile(false); }}
                          className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-50/50 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-widest"
                        >
                          <LogOut size={18} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className={`flex-1 ${isHome ? '' : 'pt-32 pb-24'}`}>
        {children}
      </main>

      <footer className="bg-white/20 backdrop-blur-xl border-t border-white/40 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase font-black">© 2024 NorthLink • The Arctic Connection</p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest hover:text-[#48a0dc] cursor-pointer transition-colors">Privacy</span>
            <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest hover:text-[#48a0dc] cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default Layout;
