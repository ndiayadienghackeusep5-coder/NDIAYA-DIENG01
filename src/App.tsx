import { useState, useEffect } from "react";

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
}

function scrollTo(id: string) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// ─── TYPES & DATA ──────────────────────────────────────────────────────────────
export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: "identite" | "print" | "digital";
  categoryLabel: string;
  tagColor: string;
  summary: string;
  highlights: string[];
}

// ─── Helper for portable static asset paths ─────────────────────────────────────
export const asset = (path: string) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

// ─── 1. LOLLI ASSETS ──────────────────────────────────────────────────────────
export const LOLLI_ASSETS: GalleryItem[] = [
  {
    id: "lolli-construction",
    src: asset("LOGO LOLLIPlan de travail 3@312x-100.jpg"),
    title: "Concept & Grille de Construction Sémantique",
    subtitle: "Analyse des 4 éléments fondamentaux du logotype LOLLI",
    category: "identite",
    categoryLabel: "Identité & Concept",
    tagColor: "bg-red-500/20 text-red-300 border-red-500/30",
    summary: "Rigueur géométrique et symbolique du logo : chaque composant illustre le cœur de métier (industrie, connectivité IoT, données temps réel et plateforme logicielle).",
    highlights: [
      "L (Rouge) : Industrie & infrastructures solides",
      "I (Bleu) : Connectivité réseau & capteurs IoT",
      "Point Rouge : Flux de données captées en temps réel",
      "Base Bleue : Plateforme centralisée d'analyse",
    ],
  },
  {
    id: "lolli-declinaison",
    src: asset("LOGO LOLLI DECLI.jpg"),
    title: "Déclinaisons Chromatiques Officielles",
    subtitle: "Variations du logo sur fond blanc, rouge vibrant et bleu nuit",
    category: "identite",
    categoryLabel: "Système de Marque",
    tagColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    summary: "Étude des contrastes et adaptation du système visuel pour garantir une lisibilité et un impact visuel maximum sur tous les supports.",
    highlights: [
      "Version Positif sur fond blanc pur",
      "Version Négatif sur fond rouge signature",
      "Version Contraste sur fond bleu nuit profond",
    ],
  },
  {
    id: "lolli-typographie",
    src: asset("LOLLI MOCKUP.jpg"),
    title: "Système Typographique & Hiérarchie",
    subtitle: "Sélection des polices Poppins (Titres) et Open Sans (Corps)",
    category: "identite",
    categoryLabel: "Typographie",
    tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    summary: "Association entre la modernité géométrique de Poppins pour les titrages et la neutralité lisible d'Open Sans pour les interfaces et textes.",
    highlights: [
      "Poppins : Typographie géométrique moderne & affirmée",
      "Open Sans : Grande lisibilité multi-résolutions",
      "Palette intégrée : Blanc, Bleu Marine & Rouge",
    ],
  },
  {
    id: "lolli-business-cards",
    src: asset("Business_Card_Mockup_4.jpg"),
    title: "Cartes de Visite Professionnelles",
    subtitle: "Papeterie d'affaires haut de gamme avec pattern géométrique",
    category: "print",
    categoryLabel: "Papeterie & Print",
    tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    summary: "Création de la papeterie d'affaires officielle avec un motif géométrique texturé au verso renforçant l'empreinte de la marque.",
    highlights: [
      "Recto bicolore blanc & bleu nuit épuré",
      "Verso texturé avec micro-motif LOLLI",
      "Finitions soignées prêtes pour l'impression",
    ],
  },
  {
    id: "lolli-mugs",
    src: asset("Free_Mug_MockuLOLLI.jpg"),
    title: "Mugs & Goodies d'Entreprise",
    subtitle: "Art de la table corporate en céramique tricolore",
    category: "print",
    categoryLabel: "Goodies & Merch",
    tagColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    summary: "Déclinaison de l'identité sur des objets du quotidien valorisant les 3 couleurs signatures de la marque.",
    highlights: [
      "Trio de tasses coordonnées : Rouge, Bleu nuit et Blanc",
      "Sérigraphie haute définition résistante",
      "Idéal pour la vie d'équipe et les cadeaux partenaires",
    ],
  },
  {
    id: "lolli-tshirt",
    src: asset("Mockup_LOLLI.jpg"),
    title: "Textile & Uniforme d'Équipe",
    subtitle: "T-shirt technique avec frise géométrique identitaire",
    category: "print",
    categoryLabel: "Textile Corporate",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    summary: "Habillage vestimentaire pour les équipes terrain et les salons professionnels, avec logo poitrine et frise graphique issue du logo.",
    highlights: [
      "Rouge vif signature pour une forte visibilité",
      "Bandeau géométrique composé de modules du logo",
      "Design moderne pour équipes techniques et commerciales",
    ],
  },
  {
    id: "lolli-signage",
    src: asset("Free_Sign_MockupLOLLI.jpg"),
    title: "Enseigne Architecturale 3D sur Façade",
    subtitle: "Signalétique extérieure grand format en relief sur béton",
    category: "digital",
    categoryLabel: "Signalétique Bâtiment",
    tagColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    summary: "Mise en situation de l'enseigne de siège social ou d'usine avec des lettres 3D en relief fixées sur une façade en béton brut.",
    highlights: [
      "Lettrage 3D laqué bicolore rouge et bleu marine",
      "Contraste élégant avec le béton architectural",
      "Excellente visibilité de jour comme de nuit",
    ],
  },
  {
    id: "lolli-multi-devices",
    src: asset("MOCKUP LOLLI.jpg"),
    title: "Écosystème Digital & Interfaces Multi-Écrans",
    subtitle: "Rendu responsive sur Laptop, Tablettes tactiles et Smartphone",
    category: "digital",
    categoryLabel: "UI/UX & Digital",
    tagColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    summary: "Visualisation de l'écosystème numérique de la plateforme : supervision sur PC, application tablette et monitoring mobile.",
    highlights: [
      "Affichage cohérent sur ordinateur, tablettes et mobile",
      "Design épuré facilitant la lecture des données",
      "Hiérarchie visuelle claire et intuitive",
    ],
  },
  {
    id: "lolli-billboard",
    src: asset("LOLLI Mockup (2).jpg"),
    title: "Affichage Grand Format / Billboard Métro & Hall",
    subtitle: "Panneau d'impact urbain dans les espaces de transit",
    category: "digital",
    categoryLabel: "Communication Urbaine",
    tagColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    summary: "Campagne d'affichage institutionnel pour les espaces de transit et événements professionnels avec une composition claire et minimaliste.",
    highlights: [
      "Cadre métallique rétro-éclairé grand format",
      "Mémorisation immédiate de la marque",
      "Impact visuel fort auprès des professionnels",
    ],
  },
];

// ─── 2. SAVANA ASSETS ──────────────────────────────────────────────────────────
export const SAVANA_ASSETS: GalleryItem[] = [
  {
    id: "savana-logo-hero",
    src: asset("savana/SAVANA IMAGEPlan de travail 1.jpg"),
    title: "Logo Officiel SAVANA sur Panorama Végétal",
    subtitle: "Logotype aux formes végétales et solaires sur fond de nature et produits frais",
    category: "identite",
    categoryLabel: "Logo & Identité",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    summary: "Le logo SAVANA incarne la fraîcheur, la vitalité de la terre et l'authenticité des saveurs locales à travers des formes végétales harmonieuses et une typographie solaire.",
    highlights: [
      "S feuille : Nature, fraîcheur et ingrédients bruts",
      "A / V solaires : Chaleur, énergie et épices d'Afrique",
      "Vert Naturel (#26430D) : Terroir et authenticité",
      "Orange Ocre (#D85600) : Saveur et richesse aromatique",
    ],
  },
  {
    id: "savana-brochure",
    src: asset("savana/PSD 12.jpg"),
    title: "Brochure & Dépliant Commercial 3 Volets",
    subtitle: "Support de communication éditorial complet présentant la gamme Nokoss et les valeurs de marque",
    category: "print",
    categoryLabel: "Édition & Brochure",
    tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    summary: "Création d'un dépliant 3 volets valorisant le savoir-faire culinaire : Nokoss en poudre, Nokoss en pâte, histoire de la marque, vision et engagement qualité.",
    highlights: [
      "Présentation des gammes : Nokoss en poudre & Nokoss en pâte",
      "Encart Valeurs : Saveur · Qualité · Naturel",
      "Mise en page éditoriale équilibrée et chaleureuse",
      "Coordonnées de contact et de commande",
    ],
  },
  {
    id: "savana-moodboard",
    src: asset("savana/MOOD SAVANAPlan de travail 1.jpg"),
    title: "Moodboard Sémantique & Univers des Épices",
    subtitle: "Planche d'inspiration photographique : gingembre, piments, poivrons, ail et textures",
    category: "identite",
    categoryLabel: "Moodboard & Concept",
    tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    summary: "Exploration visuelle des textures brutes et des couleurs chaudes de la cuisine sénégalaise et africaine ayant guidé la création de la charte graphique.",
    highlights: [
      "Ingrédients nobles : Piments, poivrons, gingembre et ail",
      "Harmonie des couleurs de la terre et des récoltes",
      "Association directe avec le terroir local",
    ],
  },
  {
    id: "savana-typo",
    src: asset("savana/BRANDPlan de travail 6.jpg"),
    title: "Système Typographique Officiel",
    subtitle: "Duo de polices Fredeko (Titres & Logo) et Poppins (Corps de texte)",
    category: "identite",
    categoryLabel: "Typographie",
    tagColor: "bg-lime-500/20 text-lime-300 border-lime-500/30",
    summary: "Association de Fredeko pour son caractère chaleureux, convivial et moderne, avec Poppins pour sa lisibilité géométrique impeccable sur tous les supports.",
    highlights: [
      "Fredeko : Police conviviale renforçant l'identité",
      "Poppins : Typographie géométrique neutre et équilibrée",
      "Hiérarchie claire pour packaging et brochures",
    ],
  },
  {
    id: "savana-colors",
    src: asset("savana/BRANDPlan de travail 7.jpg"),
    title: "Palette Chromatique Signature",
    subtitle: "Vert Forêt (#26430D) et Orange Épices (#D85600)",
    category: "identite",
    categoryLabel: "Couleurs",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    summary: "Deux teintes maîtresses créant un contraste naturel et gourmand : le vert profond rappelant les feuilles et la fraîcheur, l'orange vibrant évoquant les épices et le soleil.",
    highlights: [
      "#26430D : Vert Naturel végétal profond",
      "#D85600 : Orange Épices chaud et appétissant",
      "Adaptation sur fonds clairs et sombres",
    ],
  },
  {
    id: "savana-cards",
    src: asset("savana/Free_Rounded_Business_Card_Mockup_2.jpg"),
    title: "Cartes de Visite aux Bords Arrondis",
    subtitle: "Papeterie professionnelle avec monogramme S feuille et coordonnées d'entreprise",
    category: "print",
    categoryLabel: "Papeterie & Print",
    tagColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    summary: "Design épuré et doux avec découpe à coins arrondis, reprenant les deux couleurs de la marque et les coordonnées officielles de Ndiaya Dieng à Dakar (Keur Massar).",
    highlights: [
      "Coins arrondis pour un aspect doux et premium",
      "Recto blanc / verso vert profond avec monogramme",
      "Informations de contact professionnelles complètes",
    ],
  },
  {
    id: "savana-aprons",
    src: asset("savana/04.jpg"),
    title: "Tabliers Professionnels de Cuisine",
    subtitle: "Textile de chef et uniforme de service en vert forêt et marquage bicolore",
    category: "print",
    categoryLabel: "Textile & Équipement",
    tagColor: "bg-green-500/20 text-green-300 border-green-500/30",
    summary: "Équipement pour les chefs, cuisiniers et démonstrations culinaires : tablier vert forêt avec grande poche blanche et sérigraphie haute définition du logo SAVANA.",
    highlights: [
      "Vert forêt résistant pour usage intensif en cuisine",
      "Empiècement contrasté blanc pour forte visibilité",
      "Slogan 'Saveur · Valeur · Naturel' mis en exergue",
    ],
  },
  {
    id: "savana-cups",
    src: asset("savana/BRANDPlan de travail 8.jpg"),
    title: "Gobelets & Packaging Boissons & Infusions",
    subtitle: "Gobelets take-away orange épices avec couvercle blanc",
    category: "print",
    categoryLabel: "Packaging & Merch",
    tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    summary: "Déclinaison du packaging sur gobelets pour boissons, jus locaux, soupes et dégustations avec le logo complet et la signature de marque.",
    highlights: [
      "Orange épices chaleureux et gourmand",
      "Finition satinée haute qualité",
      "Idéal pour événements culinaires et dégustations",
    ],
  },
  {
    id: "savana-caps",
    src: asset("savana/BRANDPlan de travail 11.jpg"),
    title: "Casquettes Corporate & Merchandising",
    subtitle: "Casquettes bicolores blanc/orange et monochrome vert olive avec filet mesh",
    category: "print",
    categoryLabel: "Goodies & Merch",
    tagColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    summary: "Accessoires pour événements promotionnels, foires agricoles et équipes terrain : casquettes trucker mesh avec broderie et impression fine du logo.",
    highlights: [
      "Modèle bicolore blanc & visière orange",
      "Modèle vert olive monochrome corporate",
      "Broderie fine haute durabilité",
    ],
  },
  {
    id: "savana-signage",
    src: asset("savana/BRANDPlan de travail 16.jpg"),
    title: "Enseigne Lumineuse Circulaire Extérieure",
    subtitle: "Caisson lumineux mural de boutique et restaurant avec logo SAVANA",
    category: "digital",
    categoryLabel: "Signalétique & Façade",
    tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    summary: "Mise en situation de l'enseigne en drapeau rétro-éclairée pour points de vente, boutiques d'épices et restaurants partenaires.",
    highlights: [
      "Caisson circulaire moderne avec cerclage noir mat",
      "Éclairage LED diffus valorisant le logo de jour comme de nuit",
      "Visibilité optimale dans la rue",
    ],
  },
];

// ─── LIGHTBOX MODAL ────────────────────────────────────────────────────────────
function Lightbox({
  item,
  gallery,
  onClose,
  onSelect,
}: {
  item: GalleryItem;
  gallery: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}) {
  const currentIndex = gallery.findIndex((x) => x.id === item.id);
  const total = gallery.length;
  const handleNext = () => {
    if (currentIndex >= 0) onSelect(gallery[(currentIndex + 1) % total]);
  };
  const handlePrev = () => {
    if (currentIndex >= 0) onSelect(gallery[(currentIndex - 1 + total) % total]);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [currentIndex, gallery, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-fade-in" onClick={onClose}>
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none">
        <span className="pointer-events-auto text-xs font-black tracking-widest text-white/80 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
          {currentIndex + 1} / {total} · {item.categoryLabel}
        </span>
        <button onClick={onClose} className="pointer-events-auto w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-black flex items-center justify-center text-lg font-bold transition-all shadow-xl backdrop-blur-md">✕</button>
      </div>
      <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white items-center justify-center text-2xl font-bold transition-all backdrop-blur-md border border-white/20 shadow-2xl">‹</button>
      <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 text-white items-center justify-center text-2xl font-bold transition-all backdrop-blur-md border border-white/20 shadow-2xl">›</button>
      <div className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative group w-full flex justify-center">
          <img src={item.src} alt={item.title} className="max-h-[68vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/15 bg-black/40" />
        </div>
        <div className="mt-5 w-full max-w-4xl bg-[#1E111B]/95 border border-white/15 rounded-2xl p-5 sm:p-7 backdrop-blur-xl text-white space-y-3 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`text-[11px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${item.tagColor}`}>{item.categoryLabel}</span>
            <div className="flex items-center gap-2">
              <button onClick={handlePrev} className="md:hidden px-3 py-1 bg-white/10 rounded-lg text-xs font-bold">← Précédent</button>
              <button onClick={handleNext} className="md:hidden px-3 py-1 bg-white/10 rounded-lg text-xs font-bold">Suivant →</button>
            </div>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">{item.title}</h3>
            <p className="text-sm font-semibold text-[#E8B3C9]">{item.subtitle}</p>
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">{item.summary}</p>
          <div className="grid sm:grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
            {item.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-white/90">
                <span className="text-[#E8B3C9] font-bold shrink-0">✦</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DÉCOR GRAPHIQUE TITRE ─────────────────────────────────────────────────────
function TitleDecor({ color = "#6C1E50" }: { color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-3 relative">
      <div className="absolute -left-4 -top-3 opacity-30 pointer-events-none">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <path d="M16 4v6M28 16h-6M16 28v-6M4 16h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
          <circle cx="16" cy="16" r="4" fill={color} opacity="0.2" />
        </svg>
      </div>
      <span className="w-12 h-1.5 rounded-full relative z-10 transition-all duration-300 hover:w-16" style={{ backgroundColor: color }} />
      <span className="w-2.5 h-2.5 rounded-full relative z-10" style={{ backgroundColor: color, opacity: 0.7 }} />
      <span className="w-1.5 h-1.5 rounded-full relative z-10" style={{ backgroundColor: color, opacity: 0.4 }} />
    </div>
  );
}

function CenterTitleDecor({ color = "#6C1E50", dotColor = "#6C1E50" }: { color?: string, dotColor?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-3 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="30" stroke={color} strokeWidth="1" strokeDasharray="4 6" />
          <path d="M50 20 A30 30 0 0 1 80 50" stroke={dotColor} strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="50" r="3" fill={color} />
          <circle cx="80" cy="50" r="3" fill={color} />
        </svg>
      </div>
      <span className="w-16 h-px relative z-10" style={{ backgroundColor: color, opacity: 0.3 }} />
      <span className="w-2.5 h-2.5 rounded-full relative z-10" style={{ backgroundColor: dotColor }} />
      <span className="w-16 h-px relative z-10" style={{ backgroundColor: color, opacity: 0.3 }} />
    </div>
  );
}

// ─── TOP NAVBAR ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = [
    { id: "accueil", label: "Profil" },
    { id: "a-propos", label: "À Propos" },
    { id: "mes-realisations", label: "Mes réalisations" },
    { id: "uiux-prototypage", label: "UI/UX & Prototypage" },
    { id: "mes-competences", label: "Compétences" },
    { id: "contact", label: "Me contacter" },
  ];
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#140B13]/95 text-white backdrop-blur-md shadow-2xl py-3 border-b border-white/10" : "bg-white/95 backdrop-blur-md text-[#2D1524] py-4 border-b border-[#E8B3C9]/40"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <button onClick={() => scrollTo("accueil")} className="flex items-center gap-3 group text-left focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-[#6C1E50] text-white flex items-center justify-center font-black text-sm tracking-wider shadow-md group-hover:scale-105 transition-transform duration-300">ND</div>
          <div>
            <span className={`text-base font-extrabold tracking-tight block leading-tight ${scrolled ? "text-white" : "text-[#6C1E50]"}`}>NDIAYA DIENG</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest block ${scrolled ? "text-[#E8B3C9]" : "text-[#6C1E50]/70"}`}>Créative digitale polyvalente</span>
          </div>
        </button>
        <nav className="hidden lg:flex items-center gap-0.5 bg-black/5 border border-current/10 px-3 py-1.5 rounded-full">
          {navLinks.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)} className="px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 hover:bg-[#6C1E50] hover:text-white">{label}</button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => scrollTo("contact")} className="hidden sm:inline-flex items-center gap-2 bg-[#6C1E50] hover:bg-[#52163D] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <span>Me Contacter</span>
            <span className="text-[#E8B3C9]">✦</span>
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden w-10 h-10 rounded-xl bg-[#FDF4F8] border border-[#E8B3C9] text-[#6C1E50] flex flex-col items-center justify-center gap-1.5 focus:outline-none" aria-label="Menu">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "w-5 rotate-45 translate-y-2" : "w-5"}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : "w-3.5"}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"}`} />
          </button>
        </div>
      </div>
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-[500px] opacity-100 bg-[#1E111B] text-white shadow-2xl mt-3 border-b border-white/10" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-5 space-y-2">
          {navLinks.map(({ id, label }) => (
            <button key={id} onClick={() => { scrollTo(id); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm text-white/90 hover:bg-[#6C1E50] transition-colors">{label}</button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── CADRE 00 : HERO SECTION ───────────────────────────────────────────────────
function CadreHero() {
  const roles = [
    { icon: "🎨", label: "Design" },
    { icon: "💻", label: "UX/UI" },
    { icon: "🌐", label: "Web" },
    { icon: "📱", label: "Social Media" },
    { icon: "🎬", label: "Audiovisuel" },
  ];
  const heroButtons = [
    { id: "a-propos", label: "À propos", icon: "👤", style: "bg-white/10 hover:bg-white/20 border border-white/25 text-white" },
    { id: "mes-realisations", label: "Mes réalisations", icon: "🎨", style: "bg-[#6C1E50] hover:bg-[#8B2366] text-white shadow-xl" },
    { id: "uiux-prototypage", label: "UI/UX & Prototypage", icon: "💻", style: "bg-white/10 hover:bg-white/20 border border-white/25 text-white" },
    { id: "mes-competences", label: "Mes compétences", icon: "⚡", style: "bg-white/10 hover:bg-white/20 border border-white/25 text-white" },
    { id: "contact", label: "Me contacter", icon: "✉️", style: "bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-emerald-200" },
  ];
  return (
    <section id="accueil" className="pt-28 pb-16 bg-[#180D16] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-8 sm:p-14 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/15 text-xs font-extrabold uppercase tracking-widest text-[#E8B3C9]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dakar, Sénégal · Disponible immédiatement</span>
            </div>
            <span>Programme Hackeuses · Sonatel Academy / Orange Digital Center</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-center py-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black tracking-widest text-[#E8B3C9] uppercase">
                ✦ Portfolio Créatif & Professionnel
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08]">Ndiaya Dieng</h1>
                <p className="text-xl sm:text-2xl font-bold text-[#E8B3C9]">Créative digitale polyvalente</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {roles.map((r, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white shadow-sm hover:bg-[#6C1E50] transition-colors">
                    <span>{r.icon}</span><span>{r.label}</span>
                  </span>
                ))}
              </div>
              <p className="text-base sm:text-lg text-white/95 leading-relaxed font-medium pt-2 border-l-4 border-[#6C1E50] pl-4">
                « Je transforme les idées en <strong>expériences digitales modernes, utiles et accessibles</strong>. »
              </p>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Issue du programme d'excellence <strong>Hackeuses (Sonatel Academy / Orange Digital Center)</strong>, je combine sensibilité artistique, rigueur méthodologique et maîtrise des technologies pour concevoir des identités de marque remarquables et des solutions numériques performantes.
              </p>
              {/* 5 boutons de navigation + CV */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href={asset("cv ndiaya dieng/CV NDIAYA DIENG HACKEUSEP5.pdf")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#FDF4F8] text-[#6C1E50] font-black text-xs px-5 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <span>📄</span><span>Mon CV</span>
                </a>
                {heroButtons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => scrollTo(btn.id)}
                    className={`inline-flex items-center gap-2 font-extrabold text-xs px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 ${btn.style}`}
                  >
                    <span>{btn.icon}</span><span>{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-[2.8rem] bg-gradient-to-br from-[#6C1E50] via-[#E8B3C9] to-[#6C1E50] opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-700 animate-pulse-glow" />
                <div className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden border-2 border-white/25 shadow-2xl bg-black/60 p-2">
                  <div className="rounded-[2rem] overflow-hidden relative">
                    <img src={asset("ND/1  ODC.jpeg")} alt="Ndiaya Dieng — Orange Digital Center" className="w-full h-[480px] object-cover object-top group-hover:scale-105 transition-transform duration-700" style={{ objectPosition: "center top" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Disponible
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#E8B3C9] bg-white/15 backdrop-blur-md px-3 py-1 rounded-full mb-2">Sonatel Academy · Orange Digital Center</span>
                      <h3 className="text-2xl font-black tracking-tight">Ndiaya Dieng</h3>
                      <p className="text-xs text-white/80 font-semibold mt-0.5">Créative digitale polyvalente · Dakar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CADRE 01 : À PROPOS ───────────────────────────────────────────────────────
function CadreAPropos() {
  const competencesBadges = ["Design Graphique", "UX/UI Design", "Web & Digital", "Social Media & CM", "Audiovisuel & Montage"];
  const atoutsList = [
    { icon: "🎯", title: "Rigueur & Organisation", desc: "Méthodologie structurée, respect scrupuleux des délais et précision dans le suivi des livrables." },
    { icon: "💡", title: "Créativité & Sens du Détail", desc: "Conception graphique harmonieuse, recherche de concepts originaux et soin apporté à chaque élément." },
    { icon: "⚡", title: "Curiosité & Apprentissage Rapide", desc: "Veille constante sur les innovations numériques, appropriation éclair des nouveaux outils et de l'IA." },
    { icon: "🤝", title: "Polyvalence & Esprit d'Équipe", desc: "Capacité d'adaptation fluide, proactivité et excellente communication au sein des équipes projets." },
  ];
  return (
    <section id="a-propos" className="py-20 bg-[#FDF4F8] text-[#2D1524]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
        <div className="rounded-[2.5rem] bg-white border-2 border-[#E8B3C9] p-8 sm:p-14 shadow-xl space-y-12 relative overflow-hidden">
          {/* Décor graphique coin */}
          <div className="absolute top-0 right-0 pointer-events-none opacity-10">
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
              <circle cx="130" cy="30" r="60" stroke="#6C1E50" strokeWidth="1.5" />
              <circle cx="130" cy="30" r="38" stroke="#E8B3C9" strokeWidth="1" />
              <circle cx="20" cy="140" r="18" fill="#6C1E50" />
              <circle cx="90" cy="8" r="4" fill="#6C1E50" />
            </svg>
          </div>
          <span className="absolute top-6 right-6 sm:top-8 sm:right-10 text-xs font-black px-4 py-1.5 rounded-full bg-[#FDF4F8] text-[#6C1E50] border border-[#E8B3C9] uppercase tracking-widest shadow-sm z-10">
            01 · PRÉSENTATION & PARCOURS
          </span>
          <div className="max-w-3xl space-y-3 pt-6 relative z-10">
            <TitleDecor color="#6C1E50" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#6C1E50]">À Propos de Moi</h2>
            <p className="text-sm font-semibold text-[#6C1E50]/80">Ndiaya Dieng — Créative digitale polyvalente</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {competencesBadges.map((b, i) => (
                <span key={i} className="px-3.5 py-1 rounded-full bg-[#6C1E50]/10 border border-[#6C1E50]/20 text-[#6C1E50] text-xs font-bold">{b}</span>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4 text-sm sm:text-base text-[#2D1524]/90 leading-relaxed font-normal">
                <p>Passionnée par la <strong>création visuelle</strong> et l'<strong>univers du numérique</strong>, je suis une créative digitale polyvalente diplômée du programme d'excellence <strong>Hackeuses (Sonatel Academy / Orange Digital Center Dakar)</strong>.</p>
                <p>Mon parcours s'est forgé autour d'une <strong>curiosité constante</strong>, d'une grande rigueur organisationnelle et d'une soif d'apprendre inépuisable. J'aime explorer de nouveaux horizons graphiques, concevoir des interfaces centrées sur l'utilisateur et donner vie à des identités de marque fortes et mémorables.</p>
                <p>Polyvalente et agile, j'interviens avec enthousiasme et précision sur toute la chaîne de création : du <strong>branding</strong> et <strong>design graphique</strong> jusqu'au <strong>prototypage UI/UX</strong>, à la <strong>création de sites web</strong>, au <strong>community management</strong> et à la <strong>production audiovisuelle</strong>.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {atoutsList.map((atout, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FDF4F8] border border-[#E8B3C9] space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{atout.icon}</span>
                      <h4 className="font-extrabold text-[#6C1E50] text-xs sm:text-sm">{atout.title}</h4>
                    </div>
                    <p className="text-[11px] text-[#2D1524]/75 leading-relaxed">{atout.desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#6C1E50] to-[#2D1524] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#E8B3C9] block">Curriculum Vitae Officiel</span>
                  <p className="text-xs font-bold text-white">Disponible pour opportunités à Dakar, en hybride ou remote</p>
                </div>
                <a href={asset("cv ndiaya dieng/CV NDIAYA DIENG HACKEUSEP5.pdf")} target="_blank" rel="noopener noreferrer" className="shrink-0 bg-white hover:bg-[#FDF4F8] text-[#6C1E50] font-black text-xs px-5 py-2.5 rounded-full shadow transition-transform hover:scale-105 flex items-center gap-1.5">
                  <span>Télécharger le CV (PDF)</span><span>↓</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-3 rounded-[3rem] bg-gradient-to-br from-[#E8B3C9]/40 via-[#6C1E50]/20 to-[#E8B3C9]/40 blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-full max-w-md bg-white p-3 rounded-[2.5rem] border-2 border-[#E8B3C9] shadow-2xl">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-[#6C1E50] text-white text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap">✦ Ndiaya Dieng</div>
                  <div className="rounded-[2rem] overflow-hidden shadow-inner bg-[#FDF4F8]">
                    <img src={asset("ND/2.png")} alt="Ndiaya Dieng - Portrait Officiel" className="w-full h-[480px] object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="mt-3 pb-1 text-center space-y-0.5">
                    <span className="text-sm font-black text-[#6C1E50] uppercase tracking-wider block">Ndiaya Dieng</span>
                    <span className="text-[11px] text-[#2D1524]/60 font-semibold block">Hackeuses P5 · Sonatel Academy / Orange Digital Center</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CADRE 02 : MES RÉALISATIONS — LOLLI ──────────────────────────────────────
function CadreProjetLolli({ onOpenItem }: { onOpenItem: (item: GalleryItem) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const filteredItems = activeCategory === "all" ? LOLLI_ASSETS : LOLLI_ASSETS.filter((item) => item.category === activeCategory);
  return (
    <section id="mes-realisations" className="py-24 bg-[#0A101D] text-white relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16 relative z-10">

        {/* En-tête de section */}
        <div className="text-center space-y-4">
          <CenterTitleDecor color="#E8B3C9" dotColor="#E8B3C9" />
          <span className="inline-block text-[11px] font-black tracking-[0.25em] uppercase text-[#E8B3C9] bg-[#E8B3C9]/10 border border-[#E8B3C9]/20 px-4 py-1.5 rounded-full">
            Mes Réalisations · Design Graphique & Communication Visuelle
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Identités de marque & <span className="text-[#E8B3C9]">supports visuels</span>
          </h2>
          <p className="text-sm text-white/55 max-w-2xl mx-auto">Logos, chartes graphiques, papeterie, signalétique et écosystèmes digitaux — une sélection de mes projets créatifs.</p>
        </div>

        {/* Étude de cas LOLLI */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-2 border-white/15 p-8 sm:p-14 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-6 right-8 w-24 h-24 rounded-full border border-[#EF4444]/20 pointer-events-none" />
          <div className="absolute top-10 right-12 w-12 h-12 rounded-full border border-[#EF4444]/12 pointer-events-none" />
          <div className="absolute bottom-8 left-6 w-5 h-5 rounded-full bg-[#EF4444]/15 pointer-events-none" />
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <span className="text-[11px] font-black tracking-[0.25em] uppercase text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 px-4 py-1.5 rounded-full">ÉTUDE DE CAS · PROJET LOLLI</span>
            <span className="text-xs text-white/70 font-semibold">Industrie Connectée & IoT · Données Intelligentes</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-lg bg-red-500/20 text-[#EF4444] text-xs font-black uppercase">Identité de Marque & Écosystème</div>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white">LOLLI SMART INDUSTRY</h3>
                <p className="text-sm sm:text-base font-bold text-[#EF4444]">Supervision industrielle, connectivité IoT et flux de données</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <p className="text-sm text-white/90 leading-relaxed"><strong>LOLLI</strong> est une plateforme technologique dédiée à l'<strong>Industrie 4.0 et à l'IoT</strong>.</p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light"><strong>Travail réalisé :</strong> Création intégrale de l'identité visuelle de la marque, recherche sémantique et géométrique du logotype, conception du système typographique et chromatique, et déploiement complet sur papeterie d'affaires, signalétique bâtiment, textile d'équipe et interfaces numériques responsives.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[["Domaine", "Industrie & IoT", "white"], ["Couleurs", "Rouge & Bleu nuit", "#EF4444"], ["Typographies", "Poppins / Open Sans", "white"], ["Livrables", "9 Supports HD", "#34D399"]].map(([label, val, color]) => (
                  <div key={label} className="p-3 rounded-xl bg-black/30 border border-white/10">
                    <span className="text-white/50 block text-[10px] uppercase font-bold">{label}</span>
                    <span className="font-bold" style={{ color }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 flex flex-col items-center">
              <div onClick={() => onOpenItem(LOLLI_ASSETS[0])} className="w-full cursor-pointer group bg-white p-6 sm:p-10 rounded-3xl border-2 border-white/20 shadow-2xl hover:border-[#EF4444] transition-all duration-500 relative flex flex-col items-center justify-center min-h-[340px]">
                <div className="absolute top-4 right-4 bg-black/80 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full backdrop-blur-md border border-white/20">Agrandir 🔍</div>
                <img src={LOLLI_ASSETS[0].src} alt="Logo LOLLI" className="w-full h-auto max-h-[280px] object-contain group-hover:scale-105 transition-transform duration-500" />
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#EF4444] block">Logotype Officiel & Construction Sémantique</span>
                  <p className="text-xs font-bold text-[#0F172A]">LOLLI · Rigueur géométrique & symbolique</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs">
            {[["🔴 L (Rouge)", "text-[#EF4444]", "border-red-500/20", "Industrie, solidité & machines"], ["🔵 I (Bleu)", "text-blue-400", "border-blue-500/20", "Connectivité réseau & capteurs IoT"], ["📍 Point", "text-rose-300", "border-rose-500/20", "Flux de données collectées en temps réel"], ["⏹️ Base", "text-indigo-300", "border-indigo-500/20", "Plateforme logicielle de supervision"]].map(([label, tc, bc, desc]) => (
              <div key={label as string} className={`p-3.5 rounded-xl bg-white/5 border ${bc}`}>
                <span className={`font-black text-sm block ${tc}`}>{label}</span>
                <p className="text-white/70 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Galerie LOLLI */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/15 relative">
            <div className="absolute -top-4 left-0 w-8 h-8 rounded-full border-2 border-[#EF4444]/25 pointer-events-none" />
            <div>
              <TitleDecor color="#EF4444" />
              <span className="text-xs font-black uppercase tracking-widest text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 px-3.5 py-1 rounded-full">IDENTITÉ VISUELLE & SUPPORTS LOLLI</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mt-2">Les Applications du Projet LOLLI</h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1">Déclinaisons graphiques, typographies, papeterie, enseignes et écrans numériques.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[{ key: "all", label: "Tous (9)" }, { key: "identite", label: "Identité & Typo" }, { key: "print", label: "Papeterie & Goodies" }, { key: "digital", label: "Digital & Signalétique" }].map((tab) => (
                <button key={tab.key} onClick={() => setActiveCategory(tab.key)} className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 ${activeCategory === tab.key ? "bg-[#EF4444] text-white shadow-lg scale-105" : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"}`}>{tab.label}</button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} onClick={() => onOpenItem(item)} className="group cursor-pointer rounded-3xl bg-[#1E293B] border border-white/15 overflow-hidden hover:border-[#EF4444] transition-all duration-500 shadow-xl flex flex-col justify-between">
                <div className="relative overflow-hidden bg-white/5 h-[260px] flex items-center justify-center p-3">
                  <img src={item.src} alt={item.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                  <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md border ${item.tagColor}`}>{item.categoryLabel}</span>
                </div>
                <div className="p-5 space-y-1.5 bg-[#1E293B]">
                  <h4 className="text-base font-black text-white group-hover:text-[#EF4444] transition-colors line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-white/70 line-clamp-2">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── CADRE 03 : PROJET SAVANA ──────────────────────────────────────────────────
function CadreProjetSavana({ onOpenItem }: { onOpenItem: (item: GalleryItem) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const filteredItems = activeCategory === "all" ? SAVANA_ASSETS : SAVANA_ASSETS.filter((item) => item.category === activeCategory);
  return (
    <section id="projet-savana" className="py-24 bg-[#0E1A0F] text-white relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D85600]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#26430D]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16 relative z-10">

        {/* Étude de cas SAVANA */}
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#1C2E1A] to-[#0E1A0F] border-2 border-[#D85600]/30 p-8 sm:p-14 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-6 right-8 w-20 h-20 rounded-full border border-[#D85600]/20 pointer-events-none" />
          <div className="absolute bottom-8 left-10 w-6 h-6 rounded-full bg-[#26430D]/40 pointer-events-none" />
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <span className="text-[11px] font-black tracking-[0.25em] uppercase text-[#D85600] bg-[#D85600]/10 border border-[#D85600]/30 px-4 py-1.5 rounded-full">ÉTUDE DE CAS · PROJET SAVANA</span>
            <span className="text-xs text-emerald-300 font-semibold">Agroalimentaire & Épices Africaines · Saveur, Valeur, Naturel</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-lg bg-[#D85600]/20 text-[#D85600] text-xs font-black uppercase">Identité de Marque, Packaging & Édition</div>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white">SAVANA NOKOS</h3>
                <p className="text-sm sm:text-base font-bold text-[#D85600]">L'authenticité des saveurs africaines · Nokoss en poudre & en pâte</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <p className="text-sm text-white/90 leading-relaxed"><strong>SAVANA NOKOS</strong> est une marque agroalimentaire célébrant la richesse des épices et condiments traditionnels africains.</p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light"><strong>Travail réalisé :</strong> Création de l'identité de marque complète (logo solaire et végétal), définition de la charte graphique, conception de la brochure commerciale 3 volets, papeterie professionnelle, packaging et supports de signalétique extérieure.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[["Domaine", "Agroalimentaire", "white"], ["Couleurs", "Vert & Orange", "#D85600"], ["Typographies", "Fredeko & Poppins", "white"], ["Livrables", "10 Supports HD", "#34D399"]].map(([label, val, color]) => (
                  <div key={label} className="p-3 rounded-xl bg-black/30 border border-white/10">
                    <span className="text-white/50 block text-[10px] uppercase font-bold">{label}</span>
                    <span className="font-bold" style={{ color }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 flex flex-col items-center">
              <div onClick={() => onOpenItem(SAVANA_ASSETS[0])} className="w-full cursor-pointer group bg-gradient-to-b from-[#1C2E1A] to-[#0A140B] p-4 sm:p-6 rounded-3xl border-2 border-[#D85600]/40 shadow-2xl hover:border-[#D85600] transition-all duration-500 relative flex flex-col items-center justify-center min-h-[340px]">
                <div className="absolute top-4 right-4 bg-black/80 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full backdrop-blur-md border border-white/20">Agrandir 🔍</div>
                <img src={SAVANA_ASSETS[0].src} alt="Logo SAVANA" className="w-full h-auto max-h-[290px] object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-lg" />
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D85600] block">Logotype Officiel SAVANA</span>
                  <p className="text-xs font-bold text-white">Typographie solaire, feuille naturelle & fraîcheur</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs">
            {[["🌿 Vert Naturel", "text-emerald-400", "border-emerald-500/20", "#26430D · Terroir, fraîcheur & végétal"], ["🌶️ Orange Épices", "text-[#D85600]", "border-orange-500/20", "#D85600 · Saveur, chaleur & soleil"], ["🔤 Fredeko", "text-lime-300", "border-lime-500/20", "Police principale du logo et des titres"], ["📄 Poppins", "text-teal-300", "border-teal-500/20", "Typographie secondaire lisible & moderne"]].map(([label, tc, bc, desc]) => (
              <div key={label as string} className={`p-3.5 rounded-xl bg-white/5 border ${bc}`}>
                <span className={`font-black text-sm block ${tc}`}>{label}</span>
                <p className="text-white/70 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Galerie SAVANA */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/15">
            <div>
              <TitleDecor color="#D85600" />
              <span className="text-xs font-black uppercase tracking-widest text-[#D85600] bg-[#D85600]/10 border border-[#D85600]/30 px-3.5 py-1 rounded-full">IDENTITÉ VISUELLE, BROCHURE & PACKAGING</span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mt-2">Les Applications du Projet SAVANA</h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1">Brochure commerciale 3 volets, moodboard, papeterie, textile, gobelets et signalétique.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[{ key: "all", label: "Tous (10)" }, { key: "identite", label: "Identité & Typo" }, { key: "print", label: "Brochure & Print" }, { key: "digital", label: "Signalétique" }].map((tab) => (
                <button key={tab.key} onClick={() => setActiveCategory(tab.key)} className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 ${activeCategory === tab.key ? "bg-[#D85600] text-white shadow-lg scale-105" : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"}`}>{tab.label}</button>
              ))}
            </div>
          </div>
          <div onClick={() => onOpenItem(SAVANA_ASSETS[1])} className="group cursor-pointer rounded-3xl bg-gradient-to-r from-[#1C2E1A] to-[#122312] border-2 border-[#D85600]/40 p-6 sm:p-8 shadow-2xl hover:border-[#D85600] transition-all duration-500">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 overflow-hidden rounded-2xl bg-black/40 p-2 flex items-center justify-center">
                <img src={SAVANA_ASSETS[1].src} alt={SAVANA_ASSETS[1].title} className="w-full h-auto max-h-[360px] object-contain group-hover:scale-105 transition-transform duration-700 rounded-xl" />
              </div>
              <div className="lg:col-span-5 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D85600] bg-[#D85600]/20 px-3 py-1 rounded-full">SUPPORT ÉDITORIAL PHARE</span>
                <h3 className="text-2xl font-black text-white group-hover:text-[#D85600] transition-colors">{SAVANA_ASSETS[1].title}</h3>
                <p className="text-xs text-white/80 leading-relaxed">{SAVANA_ASSETS[1].summary}</p>
                <div className="space-y-1.5 pt-2 text-xs text-white/90">
                  {SAVANA_ASSETS[1].highlights.map((h, i) => (<div key={i} className="flex items-center gap-2"><span className="text-[#D85600]">✦</span><span>{h}</span></div>))}
                </div>
                <div className="pt-2"><span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D85600] underline">Agrandir en plein écran 🔍</span></div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} onClick={() => onOpenItem(item)} className="group cursor-pointer rounded-3xl bg-[#1C2E1A] border border-white/15 overflow-hidden hover:border-[#D85600] transition-all duration-500 shadow-xl flex flex-col justify-between">
                <div className="relative overflow-hidden bg-black/40 h-[260px] flex items-center justify-center p-3">
                  <img src={item.src} alt={item.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                  <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md border ${item.tagColor}`}>{item.categoryLabel}</span>
                </div>
                <div className="p-5 space-y-1.5 bg-[#1C2E1A]">
                  <h4 className="text-base font-black text-white group-hover:text-[#D85600] transition-colors line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-white/70 line-clamp-2">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── CADRE 04 : UI/UX & PROTOTYPAGE ───────────────────────────────────────────
function CadreUiUx() {
  const projects = [
    {
      id: "regions-senegal",
      title: "À la découverte des régions du Sénégal",
      category: "Conception graphique & communication visuelle",
      categoryColor: "text-violet-300 bg-violet-500/15 border-violet-400/30",
      accentColor: "#8B5CF6",
      description: "Réalisation d'une présentation visuelle mettant en valeur les régions du Sénégal, leur diversité culturelle et leurs richesses territoriales. Travail sur la structuration des contenus, la hiérarchie visuelle et la mise en page afin de faciliter la lecture, valoriser le patrimoine national et offrir une découverte visuelle claire et attractive du Sénégal.",
      video: asset("À la découverte des régions du Sénégal.mp4"),
      tags: ["Hiérarchie visuelle", "Mise en page", "Communication"],
      role: "Designeuse graphique",
    },
    {
      id: "joj-dakar",
      title: "JOJ Dakar 2026",
      category: "Exercice de préparation à l'imagerie",
      categoryColor: "text-amber-300 bg-amber-500/15 border-amber-400/30",
      accentColor: "#F59E0B",
      description: "Dans le cadre de ma formation en design graphique, cet exercice avait pour objectif d'explorer l'univers visuel des Jeux Olympiques de la Jeunesse Dakar 2026. Le travail consistait à réfléchir à la construction d'une identité graphique cohérente, capable de valoriser les valeurs olympiques tout en mettant en lumière l'identité culturelle sénégalaise, en préparation de la création des supports de communication visuelle de l'événement.",
      video: asset("JOJ Dakar 2026.mp4"),
      tags: ["Identité graphique", "Valeurs olympiques", "Culture sénégalaise"],
      role: "Designeuse graphique en formation",
    },
    {
      id: "hackeuses-p5",
      title: "Hackeuses P5 S1",
      category: "Prototypage UX/UI",
      categoryColor: "text-pink-300 bg-pink-500/15 border-pink-400/30",
      accentColor: "#EC4899",
      description: "Conception d'un prototype digital mettant en lumière les femmes hackeuses de Sonatel. Travail sur la structuration des contenus, la hiérarchie visuelle et la navigation pour valoriser leurs profils à travers une interface intuitive et esthétique.",
      video: asset("Hackeuses P5 S1.mp4"),
      tags: ["Prototypage", "UX/UI", "Navigation", "Interface"],
      role: "Conceptrice UX/UI en formation",
    },
  ];

  return (
    <section id="uiux-prototypage" className="py-24 bg-[#0D0A1A] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#6C1E50]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-20 relative z-10">

        {/* En-tête */}
        <div className="text-center space-y-5">
          <CenterTitleDecor color="#E8B3C9" dotColor="#6C1E50" />
          <span className="inline-block text-[11px] font-black tracking-[0.25em] uppercase text-[#E8B3C9] bg-[#6C1E50]/20 border border-[#6C1E50]/40 px-4 py-1.5 rounded-full">
            UI/UX & Prototypage · Ateliers Figma & Exercices
          </span>
          <h2 className="text-4xl sm:text-5xl font-black">
            Apprentissage & <span className="text-[#E8B3C9]">Prototypage</span>
          </h2>
          <p className="text-sm text-white/55 max-w-2xl mx-auto leading-relaxed">
            Exercices pratiques, ateliers Figma et travaux de design d'interface — exploration de la hiérarchie visuelle, de la structuration des contenus et de la navigation.
          </p>
        </div>

        {/* Projets vidéo — alternance gauche/droite */}
        <div className="space-y-24">
          {projects.map((project, idx) => (
            <div key={project.id} className={`grid lg:grid-cols-12 gap-10 items-center`}>
              {/* Vidéo */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <div
                  className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/60"
                  style={{ boxShadow: `0 0 60px ${project.accentColor}20` }}
                >
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: project.accentColor }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-md ${project.categoryColor}`}>
                      {project.category}
                    </span>
                  </div>
                  <video
                    src={project.video}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-auto max-h-[420px] object-cover block"
                  />
                  <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }} />
                </div>
              </div>

              {/* Texte */}
              <div className={`lg:col-span-5 space-y-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="text-6xl font-black leading-none opacity-10" style={{ color: project.accentColor }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 opacity-20" style={{ backgroundColor: project.accentColor }} />
                </div>
                <span className={`inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${project.categoryColor}`}>
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">{project.title}</h3>
                <div className="text-[11px] font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                  <span style={{ color: project.accentColor }}>✦</span>
                  <span>Rôle : {project.role}</span>
                </div>
                <p className="text-sm text-white/75 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-[11px] font-bold border border-white/10 text-white/60 bg-white/5">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="w-6 h-px" style={{ backgroundColor: project.accentColor }} />
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor, opacity: 0.4 }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── CADRE 05 : MES COMPÉTENCES ────────────────────────────────────────────────
function CadreMesCompetences() {
  const competences = [
    { domaine: "Design Graphique", icon: "🎨", color: "#6C1E50", items: ["Adobe Illustrator", "Adobe Photoshop", "Canva Pro", "Identité visuelle & Branding", "Charte graphique", "Maquettes & Mockups"] },
    { domaine: "UX/UI & Prototypage", icon: "💻", color: "#8B2366", items: ["Figma", "Wireframes & Zoning", "Prototypage interactif", "Design thinking", "Hiérarchie visuelle", "Maquettes responsive"] },
    { domaine: "Web & Digital", icon: "🌐", color: "#5E1A8A", items: ["HTML5 & CSS3", "Bases JavaScript", "React (notions)", "Vite & Tailwind CSS", "Sites responsive", "SEO de base"] },
    { domaine: "Social Media & CM", icon: "📱", color: "#9B2B6A", items: ["Stratégie éditoriale", "Création de contenus", "Facebook & Instagram", "LinkedIn", "Analyse d'engagement", "Planification"] },
    { domaine: "Audiovisuel & Montage", icon: "🎬", color: "#6C1E50", items: ["Adobe Premiere Pro", "CapCut", "Création de Reels", "Motion design de base", "Prise de vue", "Montage vidéo"] },
    { domaine: "Outils & Méthodes", icon: "⚙️", color: "#4A1A6B", items: ["Microsoft Office 365", "Google Workspace", "Notion & Trello", "Méthode agile (bases)", "Communication bilingue", "Veille créative"] },
  ];
  return (
    <section id="mes-competences" className="py-24 bg-[#FDF4F8] text-[#2D1524] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#E8B3C9]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#6C1E50]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14 relative z-10">
        <div className="text-center space-y-4 relative">
          {/* Décor SVG */}
          <div className="absolute -top-4 right-1/4 pointer-events-none opacity-20">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="28" stroke="#6C1E50" strokeWidth="1" />
              <circle cx="30" cy="30" r="18" stroke="#E8B3C9" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="30" cy="30" r="4" fill="#6C1E50" fillOpacity="0.4" />
            </svg>
          </div>
          <CenterTitleDecor color="#6C1E50" dotColor="#6C1E50" />
          <span className="inline-block text-[11px] font-black tracking-[0.25em] uppercase text-[#6C1E50] bg-[#6C1E50]/10 border border-[#6C1E50]/20 px-4 py-1.5 rounded-full">
            Mes Compétences · Outils & Expertises
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#6C1E50]">
            Savoir-faire & <span className="text-[#2D1524]">Maîtrises</span>
          </h2>
          <p className="text-sm text-[#2D1524]/55 max-w-xl mx-auto">Un socle polyvalent couvrant toute la chaîne créative — du concept graphique à l'interface numérique.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {competences.map((comp, idx) => (
            <div key={idx} className="group p-6 rounded-3xl bg-white border border-[#E8B3C9]/60 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: comp.color }} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm" style={{ backgroundColor: `${comp.color}15`, border: `1px solid ${comp.color}30` }}>
                  {comp.icon}
                </div>
                <h3 className="font-black text-sm" style={{ color: comp.color }}>{comp.domaine}</h3>
              </div>
              <div className="space-y-2">
                {comp.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#2D1524]/80">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: comp.color, opacity: 0.6 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CADRE 06 : CONTACT ────────────────────────────────────────────────────────
function CadreContact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }, 4000);
  };
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(null), 2500);
  };
  return (
    <section id="contact" className="py-20 bg-[#180D16] text-white relative overflow-hidden">
      <div className="absolute top-10 right-10 pointer-events-none opacity-10">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="58" stroke="#E8B3C9" strokeWidth="1" />
          <circle cx="60" cy="60" r="40" stroke="#6C1E50" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="60" cy="60" r="6" fill="#E8B3C9" fillOpacity="0.4" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <CenterTitleDecor color="#E8B3C9" dotColor="#E8B3C9" />
          <span className="inline-block text-[11px] font-black tracking-[0.25em] uppercase text-[#E8B3C9] bg-[#E8B3C9]/10 border border-[#E8B3C9]/20 px-4 py-1.5 rounded-full">Recrutement & Collaboration</span>
          <h2 className="text-4xl sm:text-5xl font-black">Me <span className="text-[#E8B3C9]">Contacter</span></h2>
        </div>
        <div className="rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-8 sm:p-14 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-sm text-white/75 leading-relaxed">Vous recherchez une créative digitale polyvalente, rigoureuse et déterminée ? Contactez-moi directement.</p>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[#E8B3C9] font-bold">TÉLÉPHONE</p>
                    <a href="tel:+221780139501" className="text-sm font-extrabold text-white hover:underline">+221 780 139 501</a>
                  </div>
                  <button onClick={() => handleCopy("780 139 501", "phone")} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white hover:text-black font-bold transition-colors">{copiedField === "phone" ? "Copié !" : "Copier"}</button>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[#E8B3C9] font-bold">EMAIL PROFESSIONNEL</p>
                    <a href="mailto:ndiaya.dieng.hackeusep5@gmail.com" className="text-xs font-extrabold text-white hover:underline break-all">ndiaya.dieng.hackeusep5@gmail.com</a>
                  </div>
                  <button onClick={() => handleCopy("ndiaya.dieng.hackeusep5@gmail.com", "email")} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white hover:text-black font-bold ml-2 shrink-0 transition-colors">{copiedField === "email" ? "Copié !" : "Copier"}</button>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[#E8B3C9] font-bold">CURRICULUM VITAE</p>
                    <p className="text-xs text-white/80">CV Complet Ndiaya Dieng (PDF)</p>
                  </div>
                  <a href={asset("cv ndiaya dieng/CV NDIAYA DIENG HACKEUSEP5.pdf")} target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-lg bg-[#6C1E50] hover:bg-[#8B2366] text-white font-bold text-xs transition-colors flex items-center gap-1.5"><span>Télécharger</span><span>↓</span></a>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[#E8B3C9] font-bold">LOCALISATION & MOBILITÉ</p>
                  <p className="text-sm font-bold text-white">Dakar, Sénégal · Disponible en présentiel, hybride et remote</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative p-7 sm:p-10 rounded-[2rem] bg-white text-[#2D1524] shadow-2xl border border-[#E8B3C9]/60 overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#E8B3C9]/30 to-transparent rounded-br-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#6C1E50]/10 to-transparent rounded-tl-full pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-[#6C1E50] flex items-center justify-center text-white text-base shadow-md">✉️</div>
                    <div>
                      <h3 className="text-xl font-black text-[#6C1E50] leading-tight">Envoyer un message</h3>
                      <p className="text-[11px] text-[#2D1524]/60 font-medium">Je vous répondrai dans les plus brefs délais.</p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-[#E8B3C9] via-[#6C1E50]/30 to-transparent mb-5" />
                  {submitted ? (
                    <div className="py-10 flex flex-col items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                      <span className="text-3xl">✨</span>
                      <p className="text-sm font-black text-emerald-700">Message envoyé avec succès !</p>
                      <p className="text-xs text-emerald-600">Merci de votre prise de contact. Je reviens vers vous très vite.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-black text-[#6C1E50] uppercase tracking-wider mb-1.5">Nom / Entreprise <span className="text-[#E8B3C9]">*</span></label>
                          <input type="text" required placeholder="Votre nom ou société" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FDF4F8] border-2 border-[#E8B3C9]/60 text-sm text-[#2D1524] placeholder:text-[#2D1524]/30 outline-none focus:border-[#6C1E50] focus:bg-white transition-all duration-200 font-medium" />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-[#6C1E50] uppercase tracking-wider mb-1.5">Email <span className="text-[#E8B3C9]">*</span></label>
                          <input type="email" required placeholder="votre@entreprise.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FDF4F8] border-2 border-[#E8B3C9]/60 text-sm text-[#2D1524] placeholder:text-[#2D1524]/30 outline-none focus:border-[#6C1E50] focus:bg-white transition-all duration-200 font-medium" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-[#6C1E50] uppercase tracking-wider mb-1.5">Objet / Poste visé</label>
                        <input type="text" placeholder="Opportunité de poste, mission freelance, collaboration..." value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FDF4F8] border-2 border-[#E8B3C9]/60 text-sm text-[#2D1524] placeholder:text-[#2D1524]/30 outline-none focus:border-[#6C1E50] focus:bg-white transition-all duration-200 font-medium" />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-[#6C1E50] uppercase tracking-wider mb-1.5">Message <span className="text-[#E8B3C9]">*</span></label>
                        <textarea required rows={5} placeholder="Décrivez votre besoin, votre projet ou votre proposition..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FDF4F8] border-2 border-[#E8B3C9]/60 text-sm text-[#2D1524] placeholder:text-[#2D1524]/30 outline-none focus:border-[#6C1E50] focus:bg-white transition-all duration-200 resize-none font-medium" />
                      </div>
                      <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#6C1E50] to-[#8B2366] hover:from-[#52163D] hover:to-[#6C1E50] text-white font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2">
                        <span>Envoyer le message</span>
                        <span className="text-[#E8B3C9]">✦</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-2">
            <p>© {new Date().getFullYear()} Ndiaya Dieng · Portfolio Professionnel.</p>
            <p className="text-[#E8B3C9] font-bold">Créative digitale polyvalente · Dakar, Sénégal</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeLightbox, setActiveLightbox] = useState<{ item: GalleryItem; gallery: GalleryItem[] } | null>(null);
  useReveal();
  return (
    <div className="min-h-screen bg-[#180D16] text-[#2D1524]">
      <Navbar />
      <CadreHero />
      <CadreAPropos />
      <CadreProjetLolli onOpenItem={(item) => setActiveLightbox({ item, gallery: LOLLI_ASSETS })} />
      <CadreProjetSavana onOpenItem={(item) => setActiveLightbox({ item, gallery: SAVANA_ASSETS })} />
      <CadreUiUx />
      <CadreMesCompetences />
      <CadreContact />
      {activeLightbox && (
        <Lightbox
          item={activeLightbox.item}
          gallery={activeLightbox.gallery}
          onClose={() => setActiveLightbox(null)}
          onSelect={(newItem) => setActiveLightbox((prev) => (prev ? { ...prev, item: newItem } : null))}
        />
      )}
    </div>
  );
}
