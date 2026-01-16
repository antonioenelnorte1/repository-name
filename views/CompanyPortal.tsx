
import React, { useState, useMemo } from 'react';
import { 
  Star, GraduationCap, Briefcase, MessageCircle, 
  CheckCircle, Quote, Globe, Search, Filter, Calendar, 
  ChevronRight, ExternalLink, ShieldCheck, Award, X, RotateCcw, Check
} from 'lucide-react';
import { MOCK_TALENT } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_STRINGS } from '../translations';
import { TalentProfile } from '../types';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star 
          key={s} 
          size={12} 
          className={s <= rating ? 'fill-[#48a0dc] text-[#48a0dc]' : 'text-slate-100'} 
        />
      ))}
    </div>
  );
};

const Flag: React.FC<{ lang: string }> = ({ lang }) => {
  const code = lang.toLowerCase();
  if (code.includes('nor') || code === 'no') {
    return (
      <svg viewBox="0 0 22 16" className="w-5 h-3.5 shadow-sm rounded-sm">
        <rect width="22" height="16" fill="#ba0c2f"/>
        <path d="M0 8h22M7 0v16" stroke="#fff" strokeWidth="4"/>
        <path d="M0 8h22M7 0v16" stroke="#00205b" strokeWidth="2"/>
      </svg>
    );
  }
  if (code.includes('esp') || code === 'es') {
    return (
      <svg viewBox="0 0 750 500" className="w-5 h-3.5 shadow-sm rounded-sm">
        <rect width="750" height="500" fill="#c60b1e"/>
        <rect y="125" width="750" height="250" fill="#ffc400"/>
      </svg>
    );
  }
  if (code.includes('ing') || code.includes('eng') || code === 'en') {
    return (
      <svg viewBox="0 0 60 30" className="w-5 h-3.5 shadow-sm rounded-sm">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </svg>
    );
  }
  return <Globe size={14} className="text-slate-300" />;
};

const CompanyPortal: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_STRINGS[language].talent;

  // Visibility state for advanced filters
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    norskLevel: 0,
    availability: 'all'
  });

  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      norskLevel: 0,
      availability: 'all'
    });
  };

  const filteredTalent = useMemo(() => {
    return MOCK_TALENT.filter(talent => {
      // Live search filters automatically on change
      const matchesSearch = talent.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           talent.role.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || talent.category === filters.category;
      const matchesLevel = filters.norskLevel === 0 || talent.languages.norwegian >= filters.norskLevel;
      const matchesAvail = filters.availability === 'all' || talent.availability === filters.availability;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesAvail;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* Explanation Hero Section */}
      <section className="mb-20 animate-in fade-in slide-in-from-top-12 duration-1000">
        <div className="glass-card rounded-[4rem] p-12 md:p-20 border-white shadow-[0_40px_100px_-20px_rgba(0,40,85,0.06)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#48a0dc]/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#002855]/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#002855] text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-xl shadow-[#002855]/20">
                <ShieldCheck size={18} /> {t.introTitle}
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-[#002855] mb-8 tracking-tighter leading-[0.9]">
                {t.heroTitle} <br/> 
                <span className="text-[#48a0dc]">{t.heroSubtitle}</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium mb-12">
                {t.introDesc}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Award, label: t.feature1, desc: t.feature1Desc },
                { icon: ShieldCheck, label: t.feature2, desc: t.feature2Desc },
                { icon: Globe, label: t.feature3, desc: t.feature3Desc },
                { icon: GraduationCap, label: t.feature4, desc: t.feature4Desc }
              ].map((feature, i) => (
                <div key={i} className="bg-white/40 p-8 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl transition-all duration-500">
                  <feature.icon className="text-[#48a0dc] mb-4" size={32} />
                  <h4 className="font-black text-[#002855] text-sm mb-1 uppercase tracking-tight">{feature.label}</h4>
                  <p className="text-slate-400 text-xs font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT Filter Section */}
      <section className="mb-16 flex flex-col items-center">
        <div className="flex gap-4 w-full max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="text" 
              placeholder={t.filters.search}
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full bg-white border border-slate-100 rounded-full py-5 pl-16 pr-6 text-slate-600 font-medium shadow-lg shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-[#48a0dc]/10 focus:border-[#48a0dc] transition-all"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-3 px-8 py-5 rounded-full border transition-all duration-500 active-squish shadow-lg ${
              showFilters 
              ? 'bg-[#002855] border-[#002855] text-white' 
              : 'bg-white border-slate-100 text-slate-500 hover:border-[#48a0dc]'
            }`}
          >
            {showFilters ? <X size={20} /> : <Filter size={20} />}
            <span className="font-black uppercase text-[11px] tracking-widest hidden sm:inline">Filtros</span>
          </button>
        </div>

        {showFilters && (
          <div className="w-full mt-8 animate-in slide-in-from-top-6 fade-in duration-500 max-w-5xl">
            <div className="glass-card rounded-[3rem] p-10 border-white/60 shadow-[0_30px_60px_-15px_rgba(0,40,85,0.05)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Categoría</label>
                  <select 
                    className="bg-white px-6 py-4 rounded-2xl border border-slate-100 text-slate-600 text-sm font-bold focus:outline-none cursor-pointer hover:border-[#48a0dc] transition-all"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    <option value="all">{t.categories.all}</option>
                    {Object.entries(t.categories).filter(([k]) => k !== 'all').map(([key, val]) => (
                      <option key={key} value={key}>{val as string}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nivel Noruego Mínimo</label>
                  <select 
                    className="bg-white px-6 py-4 rounded-2xl border border-slate-100 text-slate-600 text-sm font-bold focus:outline-none cursor-pointer hover:border-[#48a0dc] transition-all"
                    value={filters.norskLevel}
                    onChange={(e) => setFilters({...filters, norskLevel: Number(e.target.value)})}
                  >
                    <option value="0">{t.filters.level}</option>
                    <option value="1">A1</option>
                    <option value="2">A2</option>
                    <option value="3">B1</option>
                    <option value="4">B2</option>
                    <option value="5">C1</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Disponibilidad</label>
                  <select 
                    className="bg-white px-6 py-4 rounded-2xl border border-slate-100 text-slate-600 text-sm font-bold focus:outline-none cursor-pointer hover:border-[#48a0dc] transition-all"
                    value={filters.availability}
                    onChange={(e) => setFilters({...filters, availability: e.target.value})}
                  >
                    <option value="all">{t.filters.start}</option>
                    <option value="immediate">{t.availOptions.immediate}</option>
                    <option value="1_month">{t.availOptions["1_month"]}</option>
                    <option value="3_months">{t.availOptions["3_months"]}</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end pt-6 border-t border-slate-100">
                <button 
                  onClick={resetFilters}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-red-400 transition-colors"
                >
                  <RotateCcw size={14} /> {t.filters.reset}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Talent Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredTalent.length > 0 ? (
          filteredTalent.map((talent) => (
            <div 
              key={talent.id} 
              className="glass-card rounded-[3.5rem] shadow-[0_8px_40px_rgba(0,40,85,0.03)] hover-lift group flex flex-col overflow-hidden border border-white/60 animate-in fade-in zoom-in-95 duration-500"
            >
              <div className="p-10 pb-4">
                <div className="flex justify-between items-start mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#48a0dc] blur-2xl opacity-10 rounded-full group-hover:opacity-20 transition-opacity"></div>
                    <img 
                      src={talent.avatar} 
                      alt={talent.name} 
                      className="w-28 h-28 rounded-[2.5rem] object-cover relative z-10 border-4 border-white shadow-2xl" 
                    />
                    <div className="absolute -bottom-2 -right-2 bg-[#002855] text-white p-2 rounded-2xl z-20 border-4 border-white shadow-xl">
                      <CheckCircle size={16} />
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-3xl border border-[#48a0dc]/10 flex flex-col items-end gap-1.5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-[#002855] tracking-tight">Norsk {t.norskLevels[talent.languages.norwegian]}</span>
                      <Flag lang="no" />
                    </div>
                    <StarRating rating={talent.languages.norwegian} />
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-3xl font-black text-[#002855] mb-1.5 tracking-tight">{talent.name}</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-[#48a0dc] font-bold text-sm tracking-wide">{talent.role}</p>
                    <span className="text-slate-200">•</span>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.categories[talent.category]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/40 rounded-2xl border border-slate-100/50">
                    <div className="flex items-center gap-3">
                      <Flag lang="en" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t.english} ({t.norskLevels[talent.languages.english]})</span>
                    </div>
                    <StarRating rating={talent.languages.english} />
                  </div>
                </div>
              </div>

              <div className="px-10 py-8 relative mx-4">
                 <div className="absolute inset-0 bg-[#48a0dc]/5 rounded-[2.5rem] -z-10"></div>
                 <Quote size={24} className="text-[#48a0dc] absolute top-4 left-4 opacity-20" />
                 <p className="text-slate-500 italic text-[14px] leading-relaxed relative z-10 pl-6 font-medium">
                   {talent.comment}
                 </p>
              </div>

              <div className="p-10 pt-2 space-y-6 flex-1">
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="p-2.5 bg-white rounded-2xl shadow-sm text-[#002855] border border-slate-50 shrink-0">
                      <Briefcase size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">{t.experience}</h4>
                      <div className="flex justify-between items-center">
                        <p className="text-[13px] font-black text-slate-600 leading-tight">{talent.experience}</p>
                        <span className="text-[10px] font-black text-[#48a0dc] bg-[#48a0dc]/5 px-2 py-0.5 rounded-full whitespace-nowrap">{talent.yearsExperience}Y EXP</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="p-2.5 bg-white rounded-2xl shadow-sm text-[#002855] border border-slate-50 shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-0.5">{t.availability}</h4>
                      <p className="text-[13px] font-black text-emerald-500 leading-tight">
                        {t.availOptions[talent.availability]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <button className="w-full flex items-center justify-center gap-3 bg-[#002855] text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-[#003c80] hover:shadow-2xl hover:shadow-[#002855]/20 transition-all duration-300 active-squish group">
                    <MessageCircle size={18} /> {t.contact}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center animate-in fade-in zoom-in-95">
            <div className="w-24 h-24 bg-slate-50 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-slate-200">
              <Search size={48} />
            </div>
            <h3 className="text-2xl font-black text-[#002855] mb-2">{t.noResults}</h3>
            <button 
              onClick={resetFilters}
              className="text-[#48a0dc] font-black uppercase text-[10px] tracking-[0.3em] hover:opacity-70 transition-opacity"
            >
              {t.filters.reset}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPortal;
