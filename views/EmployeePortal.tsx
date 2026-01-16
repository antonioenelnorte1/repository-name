
import React, { useState } from 'react';
// Corrected import from 'lucide-center' to 'lucide-react'
import { ExternalLink, Home, BookOpen, FileText, ChevronRight, Sparkles } from 'lucide-react';
// Changed missing EMPLOYEE_CONTENT import to the correct CANDIDATE_CONTENT export from constants
import { CANDIDATE_CONTENT, IMAGE_ASSETS } from '../constants';
import { CandidateSection } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_STRINGS } from '../translations';

const EmployeePortal: React.FC = () => {
  const { language } = useLanguage();
  // Fix: changed CandidateSection.LIVING to CandidateSection.RELOCATION as LIVING is not defined in the enum
  const [activeTab, setActiveTab] = useState<CandidateSection>(CandidateSection.RELOCATION);
  // Corrected reference from EMPLOYEE_CONTENT to CANDIDATE_CONTENT
  const data = CANDIDATE_CONTENT[language][activeTab];
  // Corrected translation path from 'employee' to 'candidate' as defined in translations.ts
  const t = UI_STRINGS[language].candidate;

  const tabs = [
    // Fix: mapping LIVING to RELOCATION
    { id: CandidateSection.RELOCATION, icon: Home, label: t.living, img: IMAGE_ASSETS.employeeSections.living },
    // Fix: mapping LEARNING to LANGUAGE
    { id: CandidateSection.LANGUAGE, icon: BookOpen, label: t.language, img: IMAGE_ASSETS.employeeSections.learning },
    { id: CandidateSection.DOCUMENTS, icon: FileText, label: t.documents, img: IMAGE_ASSETS.employeeSections.documents }
  ];

  const currentTabInfo = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-cyan-100 shadow-sm">
          <Sparkles size={14} /> Nordic Life Guide
        </div>
        <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter">{t.title}</h1>
        <p className="text-slate-500 text-xl leading-relaxed font-light">{t.subtitle}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-80 shrink-0">
          <nav className="flex lg:flex-col gap-4 p-3 glass-card rounded-[3rem] shadow-sm sticky top-28">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CandidateSection)}
                className={`flex-1 lg:flex-none flex items-center gap-5 px-8 py-6 rounded-[2rem] text-sm font-black transition-all duration-500 active-squish ${
                  activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200 translate-x-2' 
                  : 'text-slate-500 hover:bg-white hover:text-blue-600'
                }`}
              >
                <div className={`p-3 rounded-2xl ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                   <tab.icon size={24} />
                </div>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 space-y-12">
          <div className="glass-card rounded-[3rem] overflow-hidden shadow-sm border-white animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="h-64 md:h-80 w-full overflow-hidden relative">
              <img 
                key={activeTab}
                src={currentTabInfo?.img} 
                alt={data?.title}
                className="w-full h-full object-cover animate-in zoom-in-110 duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>

            <div className="p-10 md:p-16 pt-6">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-1.5 bg-blue-500 rounded-full shadow-sm shadow-blue-200"></div>
                 <h2 className="text-5xl font-black text-slate-900 tracking-tight">{data?.title}</h2>
              </div>
              
              <div className="prose prose-xl prose-slate max-w-none mb-16">
                <p className="text-slate-600 leading-[1.8] text-xl font-light whitespace-pre-line">
                  {data?.content}
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] transition-all duration-1000 group-hover:bg-blue-500/50"></div>
                
                <h4 className="font-black text-blue-400 mb-10 flex items-center gap-4 text-2xl relative z-10 tracking-tight">
                  <ExternalLink size={28} /> {t.links}
                </h4>
                <ul className="grid sm:grid-cols-2 gap-6 relative z-10">
                  {data?.links?.map((link: any, idx: number) => (
                    <li key={idx}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-between bg-white/5 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/10 hover:border-blue-500 hover:bg-white/10 text-white font-black hover:shadow-2xl hover:-translate-y-2 transition-all active-squish group/link"
                      >
                        <span className="text-lg">{link.label}</span>
                        <ChevronRight size={24} className="text-blue-400 group-hover/link:translate-x-2 transition-transform" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePortal;
