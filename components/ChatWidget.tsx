
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, Minus, Phone, PhoneOff, Mic, Volume2, X, ChevronUp } from 'lucide-react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { getGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { UI_STRINGS } from '../translations';
import { encode, decode, decodeAudioData } from '../services/audioUtils';

const ChatWidget: React.FC = () => {
  const { language } = useLanguage();
  const t = UI_STRINGS[language].chat;
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => { setMessages([{ role: 'model', text: t.welcome }]); }, [language, t.welcome]);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]); setInput(''); setIsTyping(true);
    const responseText = await getGeminiResponse(input, language);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]); setIsTyping(false);
  };

  const startVoiceMode = async () => {
    try {
      setIsVoiceMode(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(scriptProcessor); scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (m: LiveServerMessage) => {
            const b64 = m.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (b64 && outputContextRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputContextRef.current.currentTime);
              const buf = await decodeAudioData(decode(b64), outputContextRef.current, 24000, 1);
              const src = outputContextRef.current.createBufferSource();
              src.buffer = buf; src.connect(outputContextRef.current.destination);
              src.addEventListener('ended', () => sourcesRef.current.delete(src));
              src.start(nextStartTimeRef.current); nextStartTimeRef.current += buf.duration; sourcesRef.current.add(src);
            }
            if (m.serverContent?.interrupted) { sourcesRef.current.forEach(s => s.stop()); sourcesRef.current.clear(); nextStartTimeRef.current = 0; }
          },
          onclose: () => stopVoiceMode(),
          onerror: (e) => console.error("Voice Error", e),
        },
        config: { responseModalities: [Modality.AUDIO], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } }, systemInstruction: `NorthLink Assistant. Context: specialized Norsk exams, Spanish talent. Language: ${language}.` },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { console.error(err); setIsVoiceMode(false); }
  };

  const stopVoiceMode = () => {
    if (sessionRef.current) sessionRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    if (outputContextRef.current) outputContextRef.current.close();
    sourcesRef.current.forEach(s => s.stop()); sourcesRef.current.clear();
    setIsVoiceMode(false); sessionRef.current = null;
  };

  if (!isVisible) {
    return (
      <button onClick={() => setIsVisible(true)} className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-xl p-3 rounded-full border border-slate-200 shadow-xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-2 pr-4">
        <div className="bg-sky-500 text-white p-2 rounded-full shadow-lg"><Bot size={16} /></div>
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest group-hover:text-sky-500 transition-colors">AI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
      {!isOpen ? (
        <div className="relative group/container">
          <button onClick={() => setIsVisible(false)} className="absolute -top-2 -left-2 bg-white text-slate-400 hover:text-red-500 p-1.5 rounded-full border border-slate-100 shadow-lg z-10 opacity-0 group-hover/container:opacity-100 transition-all duration-300 transform scale-75 group-hover/container:scale-100"><X size={14} /></button>
          <button onClick={() => setIsOpen(true)} className="bg-sky-500 text-white p-6 rounded-[2.5rem] shadow-2xl hover:bg-sky-600 hover:scale-110 active:scale-90 transition-all duration-500 flex items-center justify-center group border-4 border-white"><MessageSquare size={32} className="group-hover:rotate-12 transition-transform" /><span className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full border-4 border-white"></span></button>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-3xl w-[calc(100vw-3rem)] md:w-[450px] h-[650px] max-h-[85vh] rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col border border-white overflow-hidden animate-in zoom-in-95 duration-700">
          <div className="bg-sky-50/50 p-6 flex justify-between items-center border-b border-sky-100/50">
            <div className="flex items-center gap-4"><div className="bg-sky-500 p-3 rounded-2xl text-white shadow-xl shadow-sky-100"><Bot size={24} /></div><div><h3 className="font-black text-slate-900 text-base tracking-tight">Arctic AI</h3><div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${isVoiceMode ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}`}></span><span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{isVoiceMode ? 'Streaming' : 'Ready'}</span></div></div></div>
            <div className="flex gap-3"><button onClick={() => isVoiceMode ? stopVoiceMode() : startVoiceMode()} className={`p-3 rounded-2xl transition-all ${isVoiceMode ? 'bg-red-50 text-red-500' : 'bg-sky-50 text-sky-500'}`}>{isVoiceMode ? <PhoneOff size={20} /> : <Phone size={20} />}</button><button onClick={() => setIsOpen(false)} className="p-3 text-slate-300 hover:text-slate-900 rounded-2xl"><Minus size={20} /></button></div>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            {isVoiceMode ? (
              <div className="flex-1 flex flex-col items-center justify-center p-10 text-center"><div className="relative mb-12"><div className="absolute inset-0 bg-sky-400 rounded-full blur-3xl opacity-20 animate-ping"></div><div className="relative bg-white p-12 rounded-full shadow-2xl text-sky-500 border border-sky-50"><Mic size={56} className="animate-bounce" /></div></div><h4 className="text-2xl font-black text-slate-900 mb-3">{t.listening}</h4><p className="text-slate-400 font-medium mb-10 leading-relaxed px-6">{t.careerPrompt}</p><div className="flex items-center gap-3 px-8 py-4 bg-sky-50 text-sky-500 rounded-[2rem] font-black text-[10px] uppercase tracking-widest border border-sky-100">Live Audio Active</div></div>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8">{messages.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500`}><div className={`max-w-[85%] p-5 rounded-[2rem] text-[15px] font-medium ${msg.role === 'user' ? 'bg-sky-500 text-white rounded-tr-none shadow-xl' : 'bg-white text-slate-600 rounded-tl-none border shadow-sm'}`}>{msg.text}</div></div>))}{isTyping && <div className="flex gap-1.5 p-5 bg-slate-50 w-fit rounded-[1.5rem] animate-pulse"><div className="w-2 h-2 bg-sky-300 rounded-full"></div><div className="w-2 h-2 bg-sky-300 rounded-full"></div><div className="w-2 h-2 bg-sky-300 rounded-full"></div></div>}</div>
                <div className="p-8 shrink-0 border-t bg-white/50"><div className="flex gap-4 bg-slate-50 p-2 rounded-[2rem] border focus-within:ring-8 focus-within:ring-sky-50 transition-all"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t.placeholder} className="flex-1 text-[15px] bg-transparent px-5 py-3 focus:outline-none font-medium" /><button onClick={handleSend} disabled={isTyping || !input.trim()} className="bg-sky-500 text-white p-4 rounded-2xl disabled:bg-slate-100 transition-all shadow-xl shadow-sky-100"><Send size={20} /></button></div><p className="text-[10px] text-center text-slate-300 mt-6 uppercase font-black tracking-[0.3em]">The Arctic Intelligence</p></div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
