
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, UserCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_STRINGS } from '../translations';

const Home: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_STRINGS[language].home;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="text-center max-w-5xl z-10 w-full animate-in fade-in zoom-in duration-1000">
        <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-10 leading-[0.85] flex justify-center flex-wrap pt-20 drop-shadow-sm">
          <span className="text-[#002855]">North</span>
          <span className="text-[#48a0dc] relative">
            Link
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-[glint_10s_infinite] pointer-events-none"></span>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-20 leading-relaxed font-medium max-w-2xl mx-auto px-4">
          {t.tagline}
        </p>

        <div className="grid md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-4 pb-12">
          <Link 
            to="/company"
            className="group glass-card p-1 rounded-[4rem] shadow-[0_20px_60px_-15px_rgba(0,40,85,0.08)] hover-lift active-squish transition-all duration-700 relative overflow-hidden"
          >
            <div className="p-14 flex flex-col h-full relative z-10">
              <div className="bg-[#002855]/5 w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-[#002855] mb-12 group-hover:bg-[#002855] group-hover:text-white transition-all duration-500 shadow-sm border border-[#002855]/10">
                <Building2 size={44} />
              </div>
              
              <h2 className="text-4xl font-black text-[#002855] mb-6 tracking-tight text-left">{t.companyTitle}</h2>
              <p className="text-slate-400 mb-12 text-xl leading-relaxed text-left flex-1 font-medium">{t.companyDesc}</p>
              
              <div className="flex items-center gap-4 text-[#48a0dc] font-black group-hover:gap-8 transition-all duration-300 uppercase text-sm tracking-[0.2em]">
                {t.companyBtn} <ArrowRight size={24} />
              </div>
            </div>
            {/* Arctic hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#48a0dc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </Link>

          <Link 
            to="/candidate"
            className="group glass-card p-1 rounded-[4rem] shadow-[0_20px_60px_-15px_rgba(0,40,85,0.08)] hover-lift active-squish transition-all duration-700 relative overflow-hidden"
          >
            <div className="p-14 flex flex-col h-full relative z-10">
              <div className="bg-[#48a0dc]/5 w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-[#48a0dc] mb-12 group-hover:bg-[#48a0dc] group-hover:text-white transition-all duration-500 shadow-sm border border-[#48a0dc]/10">
                <UserCircle2 size={44} />
              </div>
              
              <h2 className="text-4xl font-black text-[#002855] mb-6 tracking-tight text-left">{t.candidateTitle}</h2>
              <p className="text-slate-400 mb-12 text-xl leading-relaxed text-left flex-1 font-medium">{t.candidateDesc}</p>
              
              <div className="flex items-center gap-4 text-slate-500 font-black group-hover:gap-8 transition-all duration-300 uppercase text-sm tracking-[0.2em]">
                {t.candidateBtn} <ArrowRight size={24} />
              </div>
            </div>
            {/* Arctic hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#002855]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes glint {
          0% { transform: translateX(-300%) skewX(-20deg); }
          20% { transform: translateX(300%) skewX(-20deg); }
          100% { transform: translateX(300%) skewX(-20deg); }
        }
      `}} />
    </div>
  );
};

export default Home;
