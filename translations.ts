
import { Language } from './types';

export const UI_STRINGS: Record<Language, any> = {
  en: {
    home: {
      tagline: "The professional bridge connecting Norwegian companies with Spanish talent.",
      companyTitle: "Company",
      companyDesc: "Find skilled Spanish professionals ready for relocation. Verified profiles and language rankings.",
      companyBtn: "Find Talent",
      candidateTitle: "Candidate",
      candidateDesc: "Your journey to Norway starts here. Learn about culture, language, and find job opportunities.",
      candidateBtn: "Start Your Move"
    },
    auth: {
      bridgeSubtitle: "Professional Relocation Bridge",
      spain: "Spain",
      norway: "Norway",
      portalTitle: "Access Portal",
      identityVetted: "Biometric ID Vetted",
      enterPortal: "Enter Portal",
      wakingConnection: "Waking connection...",
      footer: "The Arctic Connection"
    },
    talent: {
      title: "Spanish Talent Pool",
      subtitle: "Verified professionals from Spain with certified language skills and relocation readiness.",
      introTitle: "Excellence Guaranteed",
      introDesc: "Our platform provides exclusive access to Spanish professionals who have passed a specialized Norwegian language exam tailored to their specific roles. We collaborate with top language agencies to provide resources and linguistic expertise. Every candidate has undergone a rigorous interview with our recruitment department, meeting strict criteria.",
      viewRequirements: "View Full Requirements",
      heroTitle: "Verified Talent",
      heroSubtitle: "Vetted for Norway",
      feature1: "Specialized Exams",
      feature1Desc: "Custom Norsk testing",
      feature2: "Identity Vetted",
      feature2Desc: "Biometric verification",
      feature3: "Ready to Move",
      feature3Desc: "Pre-screened relocation",
      feature4: "Degree Verified",
      feature4Desc: "Legalized credentials",
      advancedFilters: "Advanced Filters",
      norwegian: "Norwegian",
      english: "English",
      experience: "Experience",
      education: "Education",
      contact: "Request Interview",
      verified: "Verified Candidate",
      availability: "Available",
      categories: {
        all: "All Categories",
        healthcare: "Healthcare",
        it: "IT & Software",
        engineering: "Engineering",
        construction: "Construction",
        education: "Education"
      },
      filters: {
        search: "Search by name or role...",
        prof: "Profession",
        level: "Norsk Level",
        exp: "Experience",
        start: "Availability",
        reset: "Reset Filters"
      },
      norskLevels: {
        1: "A1",
        2: "A2",
        3: "B1",
        4: "B2",
        5: "C1"
      },
      availOptions: {
        immediate: "Immediate",
        "1_month": "1 Month",
        "3_months": "3 Months"
      },
      noResults: "No candidates found matching your criteria.",
      listening: "Listening to you",
      careerPrompt: "Ask me anything about your Norwegian career."
    },
    nav: {
      findTalent: "Find Talent",
      workInNorway: "Work in Norway"
    },
    jobs: {
      title: "Current Opportunities",
      subtitle: "Discover premium career paths in Norway with comprehensive relocation support.",
      viewOffer: "View offer",
      back: "Back to Listings",
      requirements: "Requirements",
      apply: "Apply Now",
      notFound: "Job not found"
    },
    candidate: {
      title: "Success in Norway",
      subtitle: "Everything you need to know about starting your new chapter in the Land of the Midnight Sun.",
      living: "Living",
      language: "Language",
      documents: "Documents",
      links: "Useful External Links",
      whatWeDoTitle: "What we do for you",
      whatWeDoSubtitle: "Our Nordic team accompanies you in every step of your professional relocation.",
      whatWeDo: {
        companies: { title: "Direct Connections", desc: "We work hand-in-hand with leading Norwegian companies seeking international talent." },
        interviews: { title: "Interview Coaching", desc: "Prepare with our Nordic staff, experts in successfully guiding candidates through local processes." },
        norsk: { title: "Language Training", desc: "Learn Norwegian with our professional partners who have years of linguistic expertise." },
        relocation: { title: "Relocation Support", desc: "We help you settle in Norway, from finding a home to understanding local systems." },
        guidance: { title: "Step-by-Step Guide", desc: "Clear path forward: we guide you through every milestone of your journey." },
        docs: { title: "Legal & Documents", desc: "Full support with documentation, visa requirements, and degree validation." },
        culture: { title: "Cultural Integration", desc: "We help you adapt to the Norwegian lifestyle and workplace culture seamlessly." }
      }
    },
    chat: {
      welcome: "Hello! I'm your NorthLink Assistant. How can I help you today?",
      placeholder: "Ask about living in Norway...",
      thinking: "Thinking...",
      humanContact: "\n\nTalk to a human: [Contact Support](https://northlink.no/contact)"
    }
  },
  es: {
    home: {
      tagline: "El puente profesional que conecta empresas noruegas con talento español.",
      companyTitle: "Empresa",
      companyDesc: "Encuentra profesionales españoles cualificados. Perfiles verificados y niveles de idioma.",
      companyBtn: "Buscar Talento",
      candidateTitle: "Candidato",
      candidateDesc: "Tu viaje a Noruega comienza aquí. Aprende sobre cultura, idioma y encuentra empleo.",
      candidateBtn: "Comienza tu mudanza"
    },
    auth: {
      bridgeSubtitle: "Puente de Relocalización Profesional",
      spain: "España",
      norway: "Noruega",
      portalTitle: "Portal de Acceso",
      identityVetted: "Identidad Biométrica Verificada",
      enterPortal: "Entrar al Portal",
      wakingConnection: "Estableciendo conexión...",
      footer: "La Conexión Ártica"
    },
    talent: {
      title: "Cantera de Talento Español",
      subtitle: "Profesionales españoles verificados con niveles de idioma certificados y listos para mudarse.",
      introTitle: "Excelencia Garantizada",
      introDesc: "Nuestra plataforma ofrece acceso exclusivo a profesionales que han superado un examen de noruego especializado para su puesto. Colaboramos con agencias líderes que proporcionan los recursos y el conocimiento lingüístico necesario. Cada candidato ha superado una entrevista con nuestro departamento de selección, cumpliendo una serie de requisitos estrictos.",
      viewRequirements: "Ver Requisitos Completos",
      heroTitle: "Talento Verificado",
      heroSubtitle: "Evaluado para Noruega",
      feature1: "Exámenes Especializados",
      feature1Desc: "Pruebas de Norsk a medida",
      feature2: "Identidad Verificada",
      feature2Desc: "Verificación biométrica",
      feature3: "Listos para Mudarse",
      feature3Desc: "Relocalización pre-evaluada",
      feature4: "Títulos Verificados",
      feature4Desc: "Credenciales legalizadas",
      advancedFilters: "Filtros Avanzados",
      norwegian: "Noruego",
      english: "Inglés",
      experience: "Experiencia",
      education: "Formación",
      contact: "Solicitar Entrevista",
      verified: "Candidato Verificado",
      availability: "Disponibilidad",
      categories: {
        all: "Todas las Categorías",
        healthcare: "Sanidad",
        it: "IT y Software",
        engineering: "Ingeniería",
        construction: "Construcción",
        education: "Educación"
      },
      filters: {
        search: "Buscar por nombre o puesto...",
        prof: "Profesión",
        level: "Nivel Noruego",
        exp: "Experiencia",
        start: "Disponibilidad",
        reset: "Restablecer Filtros"
      },
      norskLevels: {
        1: "A1",
        2: "A2",
        3: "B1",
        4: "B2",
        5: "C1"
      },
      availOptions: {
        immediate: "Inmediata",
        "1_month": "1 Mes",
        "3_months": "3 Meses"
      },
      noResults: "No se encontraron candidatos con estos criterios.",
      listening: "Escuchándote",
      careerPrompt: "Pregúntame cualquier cosa sobre tu carrera en Noruega."
    },
    nav: {
      findTalent: "Buscar Talento",
      workInNorway: "Trabajar en Noruega"
    },
    jobs: {
      title: "Oportunidades Actuales",
      subtitle: "Descubre trayectorias profesionales en Noruega con apoyo integral para la relocalización.",
      viewOffer: "Ver oferta",
      back: "Volver al listado",
      requirements: "Requisitos",
      apply: "Solicitar Ahora",
      notFound: "Oferta no encontrada"
    },
    candidate: {
      title: "Éxito en Noruega",
      subtitle: "Todo lo que necesitas saber para empezar tu nuevo capítulo en la tierra del sol de medianoche.",
      living: "Vida",
      language: "Idioma",
      documents: "Documentos",
      links: "Enlaces Externos Útiles",
      whatWeDoTitle: "Qué hacemos por ti",
      whatWeDoSubtitle: "Nuestro equipo nórdico te acompaña en cada paso de tu relocalización profesional.",
      whatWeDo: {
        companies: { title: "Conexión Directa", desc: "Trabajamos codo con codo con empresas noruegas líderes que buscan talento internacional." },
        interviews: { title: "Preparación de Entrevistas", desc: "Prepárate con nuestro personal nórdico, experto en guiar a candidatos con éxito en procesos locales." },
        norsk: { title: "Aprende Noruego", desc: "Te enseñamos el idioma junto a asociados profesionales con años de experiencia lingüística." },
        relocation: { title: "Ayuda al Instalarte", desc: "Te ayudamos a establecerte en Noruega, desde la vivienda hasta los sistemas locales." },
        guidance: { title: "Guía Paso a Paso", desc: "Camino claro: te guiamos en cada hito necesario para que tu mudanza sea un éxito." },
        docs: { title: "Documentación y Títulos", desc: "Apoyo total con la documentación necesaria y la validación de tus títulos oficiales." },
        culture: { title: "Adaptación Cultural", desc: "Te ayudamos a adaptarte a la cultura y al estilo de vida noruego sin fricciones." }
      }
    },
    chat: {
      welcome: "¡Hola! Soy tu asistente de NorthLink. ¿Cómo puedo ayudarte hoy?",
      placeholder: "Pregunta sobre la vida en Noruega...",
      thinking: "Pensando...",
      humanContact: "\n\nHablar con un humano: [Contactar Soporte](https://northlink.no/contacto)"
    }
  },
  no: {
    home: {
      tagline: "Den profesjonelle broen som forbinder norske bedrifter med spansk talent.",
      companyTitle: "Bedrift",
      companyDesc: "Finn dyktige spanske fagfolk klar for flytting. Verifiserte profiler og språknivåer.",
      companyBtn: "Finn Talent",
      candidateTitle: "Kandidat",
      candidateDesc: "Din reise til Norge starter her. Lær om kultur, språk og finn jobbmuligheter.",
      candidateBtn: "Start flyttingen"
    },
    auth: {
      bridgeSubtitle: "Profesjonell Relokasjonsbro",
      spain: "Spania",
      norway: "Norge",
      portalTitle: "Tilgangsportal",
      identityVetted: "Biometrisk ID Verifisert",
      enterPortal: "Gå inn i Portalen",
      wakingConnection: "Våkner tilkobling...",
      footer: "Den Arktiske Forbindelsen"
    },
    talent: {
      title: "Spansk Talentbase",
      subtitle: "Verifiserte spanske fagfolk med sertifiserte språkkunnskaper og klar for flytting.",
      introTitle: "Garantert Ekspertise",
      introDesc: "Vår plattform gir eksklusiv tilgang til spanske fagfolk som har bestått en spesialisert norsk språkeksamen tilpasset deres spesifikke roller. Vi samarbeider med ledende språksentre for å sikre språklig kompetanse. Hver kandidat har gjennomgått et grundig intervju med vår rekrutteringsavdeling.",
      viewRequirements: "Se alle krav",
      heroTitle: "Verifisert Talent",
      heroSubtitle: "Vurdert for Norge",
      feature1: "Spesialiserte Eksamener",
      feature1Desc: "Tilpasset Norsk-testing",
      feature2: "Identitet Verifisert",
      feature2Desc: "Biometrisk verifisering",
      feature3: "Klar til å Flytte",
      feature3Desc: "Forhåndsvurdert relokalisering",
      feature4: "Grad Verifisert",
      feature4Desc: "Legaliserte dokumenter",
      advancedFilters: "Avanserte Filtre",
      norwegian: "Norsk",
      english: "Engelsk",
      experience: "Erfaring",
      education: "Utdanning",
      contact: "Be om intervju",
      verified: "Verifisert Kandidat",
      availability: "Tilgjengelighet",
      categories: {
        all: "Alle kategorier",
        healthcare: "Helse",
        it: "IT & Programvare",
        engineering: "Ingeniørvitenskap",
        construction: "Bygg og anlegg",
        education: "Utdanning"
      },
      filters: {
        search: "Søk etter navn eller rolle...",
        prof: "Yrke",
        level: "Norsknivå",
        exp: "Erfaring",
        start: "Tilgjengelighet",
        reset: "Nullstill Filtre"
      },
      norskLevels: {
        1: "A1",
        2: "A2",
        3: "B1",
        4: "B2",
        5: "C1"
      },
      availOptions: {
        immediate: "Umiddelbar",
        "1_month": "1 måned",
        "3_months": "3 måneder"
      },
      noResults: "Ingen kandidater funnet som samsvarer med dine kriterier.",
      listening: "Lytter til deg",
      careerPrompt: "Spør meg om din karriere i Norge."
    },
    nav: {
      findTalent: "Finn Talent",
      workInNorway: "Jobb i Norge"
    },
    jobs: {
      title: "Ledige Stillinger",
      subtitle: "Oppdag førsteklasses karriereveier i Norge med omfattende flyttehjelp.",
      viewOffer: "Se stilling",
      back: "Tilbake til oversikten",
      requirements: "Krav",
      apply: "Søk Nå",
      notFound: "Stilling ikke funnet"
    },
    candidate: {
      title: "Suksess i Norge",
      subtitle: "Alt du trenger å vite for å starte ditt nye kapittel i midnattssolens land.",
      living: "Livet",
      language: "Språk",
      documents: "Dokumenter",
      links: "Nyttige lenker",
      whatWeDoTitle: "Hva vi gjør for deg",
      whatWeDoSubtitle: "Vårt nordiske team følger deg i hvert trinn av din profesjonelle flytting.",
      whatWeDo: {
        companies: { title: "Direkte forbindelser", desc: "Vi jobber tett med ledende norske selskaper som søker internasjonalt talent." },
        interviews: { title: "Intervju-coaching", desc: "Forbered deg med våre nordiske ansatte, eksperter på å veilede kandidater gjennom lokale prosesser." },
        norsk: { title: "Språkopplæring", desc: "Lær norsk med våre profesjonelle partnere som har mange års språklig kompetanse." },
        relocation: { title: "Relokaleringsstøtte", desc: "Vi hjelper deg med å bosette deg i Norge, fra å finne et hjem til å forstå lokale systemer." },
        guidance: { title: "Trinn-for-trinn guide", desc: "Klar vei fremover: vi veileder deg gjennom hver milepæl på din reise." },
        docs: { title: "Dokumenter og godkjenning", desc: "Full støtte med dokumentasjon og godkjenning av utdanning." },
        culture: { title: "Kulturell integrering", desc: "Vi hjelper deg med å tilpasse deg den norske livsstilen og arbeidskulturen sømløst." }
      }
    },
    chat: {
      welcome: "Hei! Jeg er din NorthLink-assistent. Hvordan kan jeg hjelpe deg i dag?",
      placeholder: "Spør om livet i Norge...",
      thinking: "Tenker...",
      humanContact: "\n\nKontakt et menneske: [Kontakt Support](https://northlink.no/kontakt)"
    }
  }
};
