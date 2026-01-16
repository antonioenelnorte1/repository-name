
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, ChevronRight, Sparkles, 
  Building2, MessageSquare, GraduationCap, MapPin, Compass, FileCheck, Users,
  Play, Award, ArrowRight
} from 'lucide-react';
import { CANDIDATE_CONTENT, IMAGE_ASSETS } from '../constants';
import { CandidateSection } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_STRINGS } from '../translations';

const CandidatePortal: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<CandidateSection>(CandidateSection.GUIDE);
  const data = CANDIDATE_CONTENT[language][activeTab];
  const t = UI_STRINGS[language].candidate;

  const tabs = [
    { id: CandidateSection.GUIDE, icon: Compass, label: t.whatWeDo.guidance.title, img: IMAGE_ASSETS.candidateSections.guide },
    { id: CandidateSection.CONNECTIONS, icon: Building2, label: t.whatWeDo.companies.title, img: IMAGE_ASSETS.candidateSections.connections },
    { id: CandidateSection.COACHING, icon: MessageSquare, label: t.whatWeDo.interviews.title, img: IMAGE_ASSETS.candidateSections.coaching },
    { id: CandidateSection.LANGUAGE, icon: GraduationCap, label: t.whatWeDo.norsk.title, img: IMAGE_ASSETS.candidateSections.language },
    { id: CandidateSection.RELOCATION, icon: MapPin, label: t.whatWeDo.relocation.title, img: IMAGE_ASSETS.candidateSections.relocation },
    { id: CandidateSection.DOCUMENTS, icon: FileCheck, label: t.whatWeDo.docs.title, img: IMAGE_ASSETS.candidateSections.documents },
    { id: CandidateSection.CULTURE, icon: Users, label: t.whatWeDo.culture.title, img: IMAGE_ASSETS.candidateSections.culture }
  ];

  const currentTabInfo = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      {/* Hero Section */}
      <div className="text-center mb-20 max-w-3xl mx-auto animate-in fade-in duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-cyan-100 shadow-sm">
          <Sparkles size={14} /> Nordic Life Guide
        </div>
        <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">{t.title}</h1>
        <p className="text-slate-500 text-xl leading-relaxed font-light">{t.subtitle}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* SIDEBAR */}
        <div className="w-full lg:w-96 shrink-0">
          <nav className="p-4 bg-white rounded-[3.5rem] shadow-[0_20px_50px_-10px_rgba(0,40,85,0.05)] border border-slate-50 sticky top-28 space-y-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as CandidateSection)}
                  className={`w-full flex items-center gap-5 px-6 py-5 rounded-[2.5rem] transition-all duration-500 active-squish group ${
                    isActive 
                    ? 'bg-[#2563eb] text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)] translate-x-1' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-[#2563eb]'
                  }`}
                >
                  <div className={`p-4 rounded-3xl transition-colors duration-500 flex items-center justify-center ${
                    isActive ? 'bg-white/20 shadow-inner' : 'bg-[#eff6ff] text-[#2563eb]'
                  }`}>
                     <tab.icon size={28} className={isActive ? 'text-white' : ''} />
                  </div>
                  <span className={`text-[15px] font-bold tracking-tight text-left ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 space-y-12">
          <div className="glass-card rounded-[3.5rem] overflow-hidden shadow-sm border-white animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="h-80 md:h-[450px] w-full overflow-hidden relative">
              <img 
                key={activeTab}
                src={currentTabInfo?.img} 
                alt={data.title}
                className="w-full h-full object-cover animate-in zoom-in-110 duration-2000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            </div>

            <div className="p-10 md:p-16 pt-10">
              <div className="flex items-center gap-6 mb-10">
                 <div className="w-16 h-2 bg-[#2563eb] rounded-full shadow-sm shadow-blue-200"></div>
                 <h2 className="text-5xl font-black text-slate-900 tracking-tight">{data.title}</h2>
              </div>
              
              <div className="prose prose-xl prose-slate max-w-none mb-16">
                <p className="text-slate-600 leading-[1.8] text-xl font-medium whitespace-pre-line">
                  {data.content}
                </p>
              </div>

              {/* SPECIAL PROMO FOR LANGUAGE HUB */}
              {activeTab === CandidateSection.LANGUAGE && (
                <Link 
                  to="/learning" 
                  className="block mb-16 p-8 bg-gradient-to-r from-[#2563eb] to-[#48a0dc] rounded-[3rem] text-white shadow-2xl hover:scale-[1.02] transition-all active-squish group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-12 transition-transform">
                    <Award size={100} />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                      <Play size={40} className="fill-current ml-1" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-black mb-2">¡Cursos Noruegos Gratis!</h4>
                      <p className="text-white/80 font-bold tracking-wide">Comienza hoy tu entrenamiento de nivel A1 con nuestra IA interactiva.</p>
                    </div>
                    <div className="ml-auto bg-white text-[#2563eb] px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                      Empezar Ahora <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              )}

              {/* RESOURCE LINKS BOX */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3.5rem] p-12 text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] transition-all duration-1000 group-hover:bg-blue-500/50"></div>
                
                <h4 className="font-black text-blue-400 mb-10 flex items-center gap-4 text-2xl relative z-10 tracking-tight">
                  <ExternalLink size={28} /> {UI_STRINGS[language].candidate.links}
                </h4>
                <ul className="grid sm:grid-cols-2 gap-6 relative z-10">
                  {data.links.map((link: any, idx: number) => {
                    const isInternal = link.url.startsWith('/');
                    const Component = isInternal ? Link : 'a';
                    const props = isInternal ? { to: link.url } : { href: link.url, target: "_blank", rel: "noopener noreferrer" };

                    return (
                      <li key={idx}>
                        <Component 
                          {...props}
                          className="flex items-center justify-between bg-white/5 backdrop-blur-md px-8 py-7 rounded-[2.5rem] border border-white/10 hover:border-blue-500 hover:bg-white/10 text-white font-black hover:shadow-2xl hover:-translate-y-2 transition-all active-squish group/link"
                        >
                          <span className="text-lg">{link.label}</span>
                          <ChevronRight size={24} className="text-blue-400 group-hover/link:translate-x-2 transition-transform" />
                        </Component>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePortal;
