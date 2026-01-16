
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Building2, CheckCircle2, Globe } from 'lucide-react';
import { MOCK_JOBS, IMAGE_ASSETS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_STRINGS } from '../translations';

const JobDetail: React.FC = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const job = MOCK_JOBS[language].find(j => j.id === id);
  const t = UI_STRINGS[language].jobs;

  if (!job) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{t.notFound}</h2>
        <Link to="/company" className="text-indigo-600">{t.back}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/company" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-10 transition-colors font-bold group">
        <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-50 transition-colors">
          <ArrowLeft size={18} />
        </div>
        {t.back}
      </Link>

      <div className="glass-card rounded-[3rem] overflow-hidden shadow-2xl border-white/50 relative">
        {/* Banner de imagen dinámico */}
        <div className="h-64 md:h-80 w-full relative overflow-hidden">
          <img 
            src={IMAGE_ASSETS.jobDefaultBanner} 
            className="w-full h-full object-cover"
            alt="Relocation"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        </div>

        <div className="p-8 md:p-16 relative -mt-32 bg-white/60 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                 <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-black uppercase rounded-full shadow-lg shadow-blue-200">Featured Position</span>
                 <span className="flex items-center gap-2 text-slate-400 font-bold text-sm bg-white/50 px-3 py-1 rounded-full border border-slate-200/50"><Globe size={14}/> Relocation Support Included</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">{job.title}</h1>
              <div className="flex flex-wrap gap-8 text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <Building2 size={24} />
                  </div>
                  <span className="text-xl font-bold">{job.company}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-50 rounded-xl text-cyan-600">
                    <MapPin size={24} />
                  </div>
                  <span className="text-xl font-medium">{job.location}</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card px-10 py-8 rounded-[2rem] border-white shadow-xl shadow-blue-50 text-center md:min-w-[240px]">
              <div className="text-xs text-slate-400 font-black uppercase tracking-widest mb-2">Starting Salary</div>
              <div className="text-3xl font-black text-blue-600">{job.salary}</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 prose prose-lg prose-slate max-w-none">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-1 bg-blue-500 rounded-full"></div> Job Overview
              </h3>
              <p className="text-slate-600 leading-relaxed text-xl font-light mb-12">
                {job.fullDescription}
              </p>

              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-1 bg-cyan-500 rounded-full"></div> {t.requirements}
              </h3>
              <ul className="grid md:grid-cols-2 gap-4 not-prose">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-4 glass-card p-6 rounded-2xl border-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-1 bg-emerald-100 rounded-full shrink-0">
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    </div>
                    <span className="text-slate-700 font-bold">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
               {job.videoUrl && (
                <div className="group relative glass-card rounded-[2.5rem] overflow-hidden shadow-2xl active-squish cursor-pointer">
                   <iframe width="100%" height="240" src={job.videoUrl} frameBorder="0" allowFullScreen></iframe>
                </div>
              )}

              <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
                 <h4 className="text-2xl font-black mb-4 relative z-10">Ready to move?</h4>
                 <p className="text-slate-400 mb-8 relative z-10 font-medium">Apply now and let our AI agents guide you through the relocation process step-by-step.</p>
                 <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20 relative z-10">
                   {t.apply}
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
