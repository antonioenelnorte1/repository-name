
import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, BookOpen, Mic, Headset, CheckCircle2, 
  ChevronRight, Lock, Play, Star, ArrowLeft, 
  Volume2, Info, Sparkles, Award, XCircle, Heart, RotateCcw, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI, Modality } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { decode, decodeAudioData } from '../services/audioUtils';

// Audio Synthesis Utilities for feedback instantáneo (sin API)
const playSound = (type: 'success' | 'error' | 'gameover') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'error') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(70, now + 0.3);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(40, now + 1);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.linearRampToValueAtTime(0, now + 1);
      osc.start(now);
      osc.stop(now + 1);
    }
  } catch (e) { console.error("Audio Synthesis Error", e); }
};

const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-3 h-3 rounded-full animate-confetti"
        style={{
          left: '50%',
          top: '50%',
          backgroundColor: ['#48a0dc', '#4ade80', '#fbbf24', '#f472b6', '#ffffff'][i % 5],
          '--x': `${(Math.random() - 0.5) * 600}px`,
          '--y': `${(Math.random() - 0.5) * 600}px`,
          '--rotate': `${Math.random() * 360}deg`,
          animationDelay: `${Math.random() * 0.2}s`
        } as React.CSSProperties}
      />
    ))}
  </div>
);

const A1_EXERCISES = [
  { id: 1, type: 'written', question: '¿Cómo se dice "Hola" en noruego?', options: ['Hei', 'Halla', 'Morn', 'Heisann'], answer: 'Hei', context: 'Es el saludo más común.' },
  { id: 2, type: 'listening', text: 'Jeg heter Elena', question: '¿Qué se ha dicho?', options: ['Soy de España', 'Me llamo Elena', 'Me gusta Noruega', 'Elena es enfermera'], answer: 'Me llamo Elena', context: 'Presentarse: "Jeg heter...".' },
  { id: 3, type: 'written', question: 'Traduce: "Takk"', options: ['Por favor', 'Lo siento', 'Gracias', 'Sí'], answer: 'Gracias', context: '¡Esencial en Noruega!' },
  { id: 4, type: 'listening', text: 'Hvordan går det?', question: '¿Cuál es el significado?', options: ['¿A dónde vas?', '¿Cómo va todo?', '¿Qué estás haciendo?', '¿Eres noruego?'], answer: '¿Cómo va todo?', context: 'Pregunta estándar de bienestar.' },
  { id: 5, type: 'written', question: '¿Qué significa "Gutt"?', options: ['Niña', 'Niño', 'Hombre', 'Abuelo'], answer: 'Niño', context: 'Gutt (niño), Jente (niña).' },
  { id: 6, type: 'written', question: '¿Cómo se dice "Agua"?', options: ['Melk', 'Vann', 'Brød', 'Kaffe'], answer: 'Vann', context: 'Básico para sobrevivir: Vann.' },
  { id: 7, type: 'listening', text: 'Jeg snakker spansk', question: 'Traducción correcta:', options: ['Hablo noruego', 'Soy español', 'Hablo español', 'Me gusta España'], answer: 'Hablo español', context: 'Verbo Å snakke (hablar).' },
  { id: 8, type: 'written', question: 'Traduce: "Brød"', options: ['Queso', 'Leche', 'Pan', 'Mantequilla'], answer: 'Pan', context: 'Brød es pan en noruego.' },
  { id: 9, type: 'listening', text: 'Hvor er du fra?', question: '¿Qué preguntan?', options: ['¿Cómo te llamas?', '¿De dónde eres?', '¿Dónde vives?', '¿Qué hora es?'], answer: '¿De dónde eres?', context: 'Preguntando el origen.' },
  { id: 10, type: 'written', question: '¿Cómo se dice "Sí" y "No"?', options: ['Ja / Nei', 'Hei / Hadet', 'Takk / Vær så snill', 'God / Dårlig'], answer: 'Ja / Nei', context: 'Las palabras más básicas.' }
];

const ProgressRing = ({ progress }: { progress: number }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
        <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.8s ease-in-out' }} className="text-[#48a0dc]" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-black text-[#002855]">{progress}%</span>
      </div>
    </div>
  );
};

const LearningHub: React.FC = () => {
  const [view, setView] = useState<'map' | 'exercise' | 'gameover'>('map');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const currentExercise = A1_EXERCISES[exerciseIndex];
  const progress = Math.round((exerciseIndex / A1_EXERCISES.length) * 100);

  const speakText = async (text: string) => {
    if (isAudioLoading) return;
    setIsAudioLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        if (audioCtxRef.current.state === 'suspended') await audioCtxRef.current.resume();
        const audioBuffer = await decodeAudioData(decode(base64Audio), audioCtxRef.current, 24000, 1);
        const source = audioCtxRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtxRef.current.destination);
        source.start(0);
      }
    } catch (e) { console.error("Gemini TTS Error", e); } finally { setIsAudioLoading(false); }
  };

  const handleOptionSelect = (opt: string) => {
    if (feedback) return;
    setSelectedOption(opt);
    if (opt === currentExercise.answer) {
      setFeedback('correct');
      setScore(s => s + 1);
      playSound('success');
    } else {
      setFeedback('wrong');
      const newLives = lives - 1;
      setLives(newLives);
      playSound('error');
      if (newLives <= 0) {
        setTimeout(() => { setView('gameover'); playSound('gameover'); }, 1200);
      }
    }
  };

  const restartGame = () => {
    setExerciseIndex(0); setLives(3); setScore(0); setSelectedOption(null); setFeedback(null); setView('exercise');
  };

  const nextExercise = () => {
    if (exerciseIndex < A1_EXERCISES.length - 1) {
      setExerciseIndex(i => i + 1); setSelectedOption(null); setFeedback(null);
    } else {
      setView('map'); setExerciseIndex(0); setSelectedOption(null); setFeedback(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 relative min-h-[80vh]">
      <style>{`
        @keyframes confetti { 0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; } 100% { transform: translate(var(--x), var(--y)) scale(0) rotate(var(--rotate)); opacity: 0; } }
        .animate-confetti { animation: confetti 0.8s ease-out forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        @keyframes heart-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        .animate-pulse-heart { animation: heart-pulse 1s infinite; }
        @keyframes subtle-pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(72, 160, 220, 0.4); } 70% { transform: scale(1.02); box-shadow: 0 0 0 20px rgba(72, 160, 220, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(72, 160, 220, 0); } }
        .animate-thinking { animation: subtle-pulse 2s infinite; }
      `}</style>

      <div className="flex items-center justify-between mb-8 md:mb-16">
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/candidate" className="p-3 md:p-4 bg-white rounded-2xl text-slate-400 hover:text-[#48a0dc] shadow-sm transition-all active-squish"><ArrowLeft size={20} className="md:w-6 md:h-6" /></Link>
          <div>
            <h1 className="text-xl md:text-4xl font-black text-[#002855] tracking-tight">Academia Ártica</h1>
            <p className="text-[10px] md:text-sm text-slate-400 font-medium tracking-wide flex items-center gap-2"><Award size={14} className="text-[#48a0dc]" /> Entrenamiento de Norsk</p>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="bg-white/40 backdrop-blur-xl px-4 py-2 md:px-6 md:py-3 rounded-2xl md:rounded-3xl border border-white shadow-sm flex items-center gap-2">
            {[...Array(3)].map((_, i) => <Heart key={i} size={20} fill={i < lives ? "#ef4444" : "transparent"} className={`transition-all duration-500 ${i < lives ? 'text-red-500 animate-pulse-heart' : 'text-slate-200'}`} />)}
          </div>
          <div className="bg-white/40 backdrop-blur-xl px-4 py-2 md:px-6 md:py-4 rounded-2xl md:rounded-3xl border border-white shadow-sm flex items-center gap-2 md:gap-4">
             <Trophy size={20} className="text-yellow-400 md:w-7 md:h-7" />
             <div className="flex flex-col">
                <span className="text-[8px] md:text-xs font-black text-slate-400 uppercase tracking-tighter leading-none">XP</span>
                <span className="text-sm md:text-lg font-black text-[#002855] leading-none">{score * 100}</span>
             </div>
          </div>
        </div>
      </div>

      {view === 'map' ? (
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="lg:col-span-2 glass-card rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 relative overflow-hidden">
            <h3 className="text-xl md:text-2xl font-black text-[#002855] mb-8 md:mb-12 flex items-center gap-3"><div className="w-8 md:w-12 h-1.5 bg-[#48a0dc] rounded-full"></div> Mi Ruta</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 relative z-10">
              {['A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => {
                const isLocked = lvl !== 'A1';
                return (
                  <button key={lvl} onClick={() => !isLocked && setView('exercise')} disabled={isLocked} className={`w-full aspect-square glass-card rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-4 transition-all duration-500 ${isLocked ? 'opacity-40 grayscale scale-95' : 'hover:scale-105 hover:shadow-2xl active-squish'}`}>
                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-1 md:mb-2 ${isLocked ? 'bg-slate-100 text-slate-300' : 'bg-[#48a0dc]/10 text-[#48a0dc] animate-pulse'}`}>{isLocked ? <Lock size={20} /> : <Play size={24} className="fill-current" />}</div>
                    <span className="text-xl md:text-3xl font-black text-[#002855] tracking-tighter">{lvl}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="glass-card rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 border-white text-center"><h4 className="text-[10px] font-black uppercase text-slate-300 tracking-[0.4em] mb-6 md:mb-8">Meta Diaria</h4><ProgressRing progress={progress} /></div>
            <div className="bg-[#002855] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 text-white relative overflow-hidden group"><h4 className="text-lg font-black mb-1 text-[#48a0dc]">Siguiente Hito</h4><p className="text-2xl font-black text-white mb-2 tracking-tighter">Vocabulario Básico</p><p className="text-slate-400 text-sm font-medium">Completa el nivel A1 para desbloquear.</p></div>
          </div>
        </div>
      ) : view === 'gameover' ? (
        <div className="max-w-xl mx-auto glass-card rounded-[3rem] p-12 text-center animate-in zoom-in-95 duration-500 border-red-100 shadow-2xl shadow-red-100/20">
          <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><XCircle size={60} className="animate-bounce" /></div>
          <h2 className="text-4xl font-black text-[#002855] mb-4 tracking-tighter uppercase">Spillet er slutt</h2>
          <p className="text-slate-400 font-medium text-lg mb-10 leading-relaxed">Te has quedado sin vidas.<br/>¡No te rindas, el Ártico es duro pero tú lo eres más!</p>
          <button onClick={restartGame} className="w-full bg-[#002855] text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#003c80] hover:shadow-2xl transition-all active-squish flex items-center justify-center gap-4"><RotateCcw size={20} /> Prøv på nytt</button>
        </div>
      ) : (
        <div className={`max-w-4xl mx-auto glass-card rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-20 border-white shadow-2xl relative transition-all duration-500 ${feedback === 'wrong' ? 'animate-shake' : ''}`}>
           {feedback === 'correct' && <Confetti />}
           <div className="mb-8 md:mb-16">
              <div className="flex justify-between items-end mb-2 md:mb-4"><span className="text-[9px] md:text-[11px] font-black uppercase text-[#48a0dc] tracking-[0.2em]">Entrenamiento</span><span className="text-lg md:text-2xl font-black text-[#002855]">{exerciseIndex + 1}/{A1_EXERCISES.length}</span></div>
              <div className="h-3 md:h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5"><div className="h-full bg-gradient-to-r from-[#48a0dc] to-cyan-400 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div></div>
           </div>
           <div className="text-center">
              {currentExercise.type === 'listening' ? (
                <div className="mb-8 md:mb-12 flex flex-col items-center">
                  <div className="p-2 bg-[#48a0dc]/5 rounded-full mb-4"><Headset size={24} className="text-[#48a0dc] md:w-8 md:h-8" /></div>
                  <h2 className="text-xl md:text-3xl font-black text-[#002855] mb-6 md:mb-8 tracking-tight">Escucha</h2>
                  <button onClick={() => speakText(currentExercise.text!)} disabled={isAudioLoading} className={`group relative w-32 h-32 md:w-48 md:h-48 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-500 ${isAudioLoading ? 'animate-thinking' : ''}`}>
                    <div className={`absolute inset-0 bg-[#48a0dc] rounded-full blur-2xl transition-opacity duration-500 ${isAudioLoading ? 'opacity-20' : 'opacity-10'}`}></div>
                    {isAudioLoading ? <Loader2 size={40} className="text-[#48a0dc] md:w-16 md:h-16 animate-spin" /> : <Volume2 size={40} className="text-[#48a0dc] md:w-16 md:h-16 group-hover:scale-110 transition-transform" />}
                  </button>
                  <p className="mt-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">{isAudioLoading ? 'Generando Voz...' : 'Haz clic para escuchar'}</p>
                </div>
              ) : (
                <div className="mb-8 md:mb-12"><div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-100"><BookOpen size={12} /> Comprensión Escrita</div><h2 className="text-2xl md:text-4xl font-black text-[#002855] mb-2 tracking-tight leading-tight">{currentExercise.question}</h2></div>
              )}
              <div className="grid grid-cols-2 gap-3 md:gap-6 mt-8 md:mt-16">
                {currentExercise.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = feedback === 'correct' && isSelected;
                  const isWrong = feedback === 'wrong' && isSelected;
                  return (
                    <button key={opt} onClick={() => handleOptionSelect(opt)} disabled={!!feedback} className={`p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] text-sm md:text-xl font-black transition-all duration-500 border-2 active-squish relative overflow-hidden ${isSelected ? isCorrect ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xl shadow-emerald-200' : 'bg-red-500 text-white border-red-500 shadow-2xl shadow-red-200 animate-shake' : 'bg-white text-slate-600 border-slate-100 hover:border-[#48a0dc] hover:text-[#48a0dc] hover:shadow-xl shadow-sm'}`}>{opt}</button>
                  );
                })}
              </div>
              {feedback && (
                <div className="mt-8 md:mt-16 animate-in slide-in-from-top-4 fade-in duration-500">
                  <div className={`p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] border flex items-start gap-4 md:gap-6 text-left ${feedback === 'correct' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    <div className="p-2 md:p-3 bg-white rounded-xl md:rounded-2xl shadow-sm shrink-0">{feedback === 'correct' ? <CheckCircle2 size={24} className="animate-bounce" /> : <XCircle size={24} />}</div>
                    <div className="flex-1"><h4 className="text-sm md:text-xl font-black mb-1">{feedback === 'correct' ? '¡Godt jobbet!' : '¡Prøv igjen!'}</h4><p className="text-[10px] md:text-base font-medium opacity-80">{currentExercise.context}</p></div>
                    {lives > 0 && <button onClick={nextExercise} className="bg-white/40 hover:bg-white p-3 md:p-4 rounded-xl md:rounded-2xl transition-all active-squish"><ChevronRight size={20} className="md:w-7 md:h-7" /></button>}
                  </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default LearningHub;
