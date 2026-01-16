
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_STRINGS } from '../translations';
import { Language } from '../types';

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

const AuthGate: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const { login } = useAuth();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const t = UI_STRINGS[language].auth;

  const handleGuestEntry = () => {
    setStatus('loading');
    setTimeout(() => {
      login({
        id: 'guest-123',
        name: 'Guest Explorer',
        email: 'guest@northlink.no',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        lastLogin: new Date().toISOString(),
        isVerified: true
      });
      navigate('/');
      onLogin();
    }, 1200);
  };

  const LanguageSwitcher = () => (
    <div className="absolute top-10 right-10 z-50 flex items-center gap-4 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-100 shadow-sm">
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#f8fbfe] p-6">
      <LanguageSwitcher />
      
      <div className="absolute inset-0 -z-10">
        <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#48a0dc]/5 rounded-full blur-[140px] transition-all duration-1000 ${status === 'loading' ? 'scale-150 opacity-40' : 'animate-pulse'}`}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#002855]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md z-10 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="text-center">
          <h1 className="text-6xl font-black tracking-tighter mb-6 leading-none flex justify-center">
            <span className="text-[#002855]">North</span>
            <span className="text-[#48a0dc]">Link</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed px-10">
            {t.bridgeSubtitle} <br />
            <span className="text-[#002855]/60 font-black">{t.spain}</span> & <span className="text-[#48a0dc]/60 font-black">{t.norway}</span>
          </p>
        </div>

        <div className="glass-card p-12 rounded-[4.5rem] shadow-[0_40px_100px_-20px_rgba(0,40,85,0.08)] border-white backdrop-blur-3xl relative overflow-hidden">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#48a0dc]/5 rounded-[1.8rem] flex items-center justify-center text-[#48a0dc] mx-auto mb-8 border border-[#48a0dc]/10 shadow-sm">
              <ShieldCheck size={36} />
            </div>
            <h2 className="text-3xl font-black text-[#002855] mb-2 tracking-tight">{t.portalTitle}</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">{t.identityVetted}</p>
          </div>

          <button
            onClick={handleGuestEntry}
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-4 bg-[#002855] py-6 px-8 rounded-[2.2rem] font-black text-white hover:bg-[#003c80] hover:shadow-2xl hover:shadow-[#002855]/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 group disabled:opacity-50 disabled:translate-y-0 shadow-xl shadow-[#002855]/10"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={24} className="animate-spin text-white" />
                <span className="tracking-wide uppercase text-xs tracking-widest">{t.wakingConnection}</span>
              </>
            ) : (
              <>
                <span className="tracking-wide uppercase text-xs tracking-[0.3em]">{t.enterPortal}</span>
                <ArrowRight size={22} className="ml-auto opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-16 opacity-10 flex flex-col items-center gap-4">
        <div className="h-px w-24 bg-[#002855]"></div>
        <p className="text-[10px] text-[#002855] font-black uppercase tracking-[0.6em]">{t.footer}</p>
      </div>
    </div>
  );
};

export default AuthGate;
