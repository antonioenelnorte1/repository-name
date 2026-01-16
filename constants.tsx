
import { JobOffer, Language, TalentProfile, CandidateSection } from './types';

export const IMAGE_ASSETS = {
  logoUrl: "", 
  homeBackground: "https://images.unsplash.com/photo-1520264184863-d9ae4e78fe36?auto=format&fit=crop&q=80&w=2000",
  jobDefaultBanner: "https://images.unsplash.com/photo-1541888941255-251268488e75?auto=format&fit=crop&q=80&w=1200",
  candidateSections: {
    guide: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200",
    connections: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200",
    coaching: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    language: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200",
    relocation: "https://images.unsplash.com/photo-1520264184863-d9ae4e78fe36?auto=format&fit=crop&q=80&w=2000",
    documents: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
    culture: "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?auto=format&fit=crop&q=80&w=1200"
  },
  employeeSections: { 
    living: "https://images.unsplash.com/photo-1520264184863-d9ae4e78fe36?auto=format&fit=crop&q=80&w=800",
    learning: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
    documents: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200"
  }
};

export const MOCK_TALENT: TalentProfile[] = [
  {
    id: 't1',
    name: 'Elena García',
    role: 'Senior Registered Nurse',
    category: 'healthcare',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=400',
    comment: 'Apasionada por el sistema de salud noruego. Especializada en cuidados intensivos con 6 años de experiencia en Madrid.',
    experience: 'Hospital La Paz (6 años) - Cuidados Críticos',
    yearsExperience: 6,
    education: 'Grado en Enfermería - Universidad Complutense',
    qualifications: ['Specialized in ICU', 'Emergency Care Certificate'],
    availability: 'immediate',
    languages: {
      norwegian: 4, 
      english: 5,
      others: [{ name: 'Alemán', level: 2 }]
    }
  },
  {
    id: 't2',
    name: 'Marc Soler',
    role: 'Full Stack Developer',
    category: 'it',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    comment: 'Expert in React and Node.js. Currently finishing a B2 Norsk course focused on technical environments.',
    experience: 'Glovo (4 years) - Product Engineering',
    yearsExperience: 4,
    education: 'CS Degree - UPC Barcelona',
    qualifications: ['Cloud Architecture', 'Agile Leadership'],
    availability: '1_month',
    languages: {
      norwegian: 3,
      english: 5,
      others: [{ name: 'Catalán', level: 5 }]
    }
  }
];

export const MOCK_JOBS: Record<Language, JobOffer[]> = {
  en: [
    {
      id: '1',
      title: 'Senior Software Engineer (Frontend)',
      company: 'FjordTech Solutions',
      shortDescription: 'Build next-generation maritime logistics software in the heart of Oslo.',
      fullDescription: 'We are looking for a passionate Senior Frontend Engineer to lead our interface design team...',
      requirements: ['5+ years of React experience', 'Relocation to Oslo'],
      location: 'Oslo, Norway',
      videoUrl: ' ScMzIvxBSi4',
      type: 'Full-time',
      salary: '800k - 1.1M NOK'
    }
  ],
  es: [
    {
      id: '1',
      title: 'Ingeniero de Software Senior (Frontend)',
      company: 'FjordTech Solutions',
      shortDescription: 'Desarrolla software de logística marítima en Oslo.',
      fullDescription: 'Buscamos un Ingeniero Frontend Senior apasionado...',
      requirements: ['+5 años de experiencia en React', 'Relocalización a Oslo'],
      location: 'Oslo, Noruega',
      videoUrl: 'ScMzIvxBSi4',
      type: 'Tiempo completo',
      salary: '800k - 1.1M NOK'
    }
  ],
  no: [
    {
      id: '1',
      title: 'Senior Programvareingeniør (Frontend)',
      company: 'FjordTech Solutions',
      shortDescription: 'Bygg neste generasjons maritim logistikkprogramvare i Oslo.',
      fullDescription: 'Vi ser etter en lidenskapelig Senior Frontend-ingeniør...',
      requirements: ['5+ års React-erfaring', 'Flytting til Oslo'],
      location: 'Oslo, Norge',
      videoUrl: 'ScMzIvxBSi4',
      type: 'Heltid',
      salary: '800k - 1.1M NOK'
    }
  ]
};

export const CANDIDATE_CONTENT: Record<Language, Record<CandidateSection, any>> = {
  en: {
    [CandidateSection.GUIDE]: { 
      title: 'Step by Step Guide', 
      content: 'We accompany you through every procedure with specialized departments and staff who bring years of Nordic experience.',
      links: [{label: 'View Full Roadmap', url: '#'}] 
    },
    [CandidateSection.CONNECTIONS]: { 
      title: 'Direct Connections', 
      content: 'We work closely with Nordic companies across various sectors.',
      links: [{label: 'View Partners', url: '#'}] 
    },
    [CandidateSection.COACHING]: { 
      title: 'Interview Coaching', 
      content: 'Learn how to present your skills in the Norwegian market.',
      links: [{label: 'Book Session', url: '#'}] 
    },
    [CandidateSection.LANGUAGE]: { 
      title: 'Language Training', 
      content: 'Train with our expert collaborators who have taught thousands of successful students.',
      links: [{label: 'Free Norwegian Courses', url: '/learning'}] 
    },
    [CandidateSection.RELOCATION]: { 
      title: 'Relocation Support', 
      content: 'We help you find housing and manage all associated paperwork.',
      links: [{label: 'Housing Board', url: '#'}] 
    },
    [CandidateSection.DOCUMENTS]: { 
      title: 'Legal Documents', 
      content: 'Complete support in obtaining work permits, bank accounts, and degree validations.',
      links: [{label: 'Document Checklist', url: '#'}] 
    },
    [CandidateSection.CULTURE]: { 
      title: 'Cultural Integration', 
      content: 'We help you integrate through various social activities.',
      links: [{label: 'Events Calendar', url: '#'}] 
    }
  },
  es: {
    [CandidateSection.GUIDE]: { 
      title: 'Guía Paso a Paso', 
      content: 'Te acompañamos en cada uno de los procedimientos a seguir a través de nuestros diferentes especialistas.',
      links: [{label: 'Ver Hoja de Ruta', url: '#'}] 
    },
    [CandidateSection.CONNECTIONS]: { 
      title: 'Conexión Directa', 
      content: 'Trabajamos junto a empresas noruegas de diferentes sectores.',
      links: [{label: 'Ver Empresas', url: '#'}] 
    },
    [CandidateSection.COACHING]: { 
      title: 'Preparación Entrevistas', 
      content: 'Te preparamos para pasar con éxito las entrevistas de trabajo.',
      links: [{label: 'Solicitar Preparación', url: '#'}] 
    },
    [CandidateSection.LANGUAGE]: { 
      title: 'Aprende Noruego', 
      content: 'Te formamos junto a nuestros colaboradores profesionales con resultados garantizados.',
      links: [{label: 'Cursos Noruegos Gratis', url: '/learning'}] 
    },
    [CandidateSection.RELOCATION]: { 
      title: 'Ayuda al Instalarte', 
      content: 'Te ayudamos a encontrar vivienda y a llevar todos los trámites relacionados.',
      links: [{label: 'Guía de Vivienda', url: '#'}] 
    },
    [CandidateSection.DOCUMENTS]: { 
      title: 'Documentos Legales', 
      content: 'Te ayudamos a conseguir toda la documentación necesaria y validación de títulos.',
      links: [{label: 'Lista Documentos', url: '#'}] 
    },
    [CandidateSection.CULTURE]: { 
      title: 'Integración Cultural', 
      content: 'Te ayudamos a integrarte a través de diferentes actividades sociales.',
      links: [{label: 'Próximos Eventos', url: '#'}] 
    }
  },
  no: {
    [CandidateSection.GUIDE]: { 
      title: 'Trinn-for-trinn guide', 
      content: 'Vi følger deg gjennom alle prosedyrene ved hjelp av våre spesialister.',
      links: [{label: 'Se veikart', url: '#'}] 
    },
    [CandidateSection.CONNECTIONS]: { 
      title: 'Direkte forbindelser', 
      content: 'Vi jobber tett med nordiske bedrifter i ulike sektorer.',
      links: [{label: 'Våre partnere', url: '#'}] 
    },
    [CandidateSection.COACHING]: { 
      title: 'Intervju-coaching', 
      content: 'Vi forbereder deg på å bestå intervjuer.',
      links: [{label: 'Bestill time', url: '#'}] 
    },
    [CandidateSection.LANGUAGE]: { 
      title: 'Språkopplæring', 
      content: 'Vi utdanner deg sammen med våre samarbeidspartnere.',
      links: [{label: 'Gratis norskkurs', url: '/learning'}] 
    },
    [CandidateSection.RELOCATION]: { 
      title: 'Relokaleringsstøtte', 
      content: 'Vi hjelper deg med å finne bolig og håndtere alle formaliteter.',
      links: [{label: 'Boligoversikt', url: '#'}] 
    },
    [CandidateSection.DOCUMENTS]: { 
      title: 'Juridiske dokumenter', 
      content: 'Vi hjelper deg med å skaffe all nødvendig dokumentasjon.',
      links: [{label: 'Sjekkliste', url: '#'}] 
    },
    [CandidateSection.CULTURE]: { 
      title: 'Kulturell integrering', 
      content: 'Vi hjelper deg med integrering gjennom ulike aktiviteter.',
      links: [{label: 'Aktivitetskalender', url: '#'}] 
    }
  }
};
