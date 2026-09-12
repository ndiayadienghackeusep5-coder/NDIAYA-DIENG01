import { useState, useEffect } from "react";
import profileImg from "./assets/profile.png";

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

// ─── LIGHTBOX MODAL COMPONENT (POUR ZOOMER TOUS LES MOCKUPS ET AFFICHES) ───────
interface LightboxItem {
  src: string;
  title: string;
  subtitle?: string;
  category?: string;
}

function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center text-xl font-bold transition-all shadow-lg"
      >
        ✕
      </button>

      <div
        className="relative max-w-6xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.title}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
        />
        <div className="mt-4 text-center text-white space-y-1">
          {item.category && (
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E8B3C9] bg-white/10 px-3 py-1 rounded-full">
              {item.category}
            </span>
          )}
          <h3 className="text-xl font-extrabold">{item.title}</h3>
          {item.subtitle && <p className="text-xs text-white/70">{item.subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR EDITORIALE BEHANCE ─────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  const navLinks = [
    { id: "accueil", label: "00 · Couverture" },
    { id: "savana", label: "01 · SAVANA®" },
    { id: "lolli", label: "02 · LOLLI™" },
    { id: "jokko", label: "03 · JOKKO 360°" },
    { id: "methodologie", label: "04 · Méthode" },
    { id: "competences", label: "05 · Expertise" },
    { id: "contact", label: "06 · Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#2D1524]/95 text-white backdrop-blur-md shadow-2xl py-3 border-b border-white/10"
          : "bg-white/90 backdrop-blur-md text-[#2D1524] py-4 border-b border-[#E8B3C9]/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <button
          onClick={() => scrollTo("accueil")}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#6C1E50] text-white flex items-center justify-center font-black text-sm tracking-wider shadow-md group-hover:scale-105 transition-transform duration-300">
            ND
          </div>
          <div>
            <span className={`text-base font-extrabold tracking-tight block leading-tight ${scrolled ? "text-white" : "text-[#6C1E50]"}`}>
              NDIAYA DIENG
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest block ${scrolled ? "text-[#E8B3C9]" : "text-[#6C1E50]/70"}`}>
              Portfolio de Direction Artistique & UI/UX
            </span>
          </div>
        </button>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-1 bg-black/5 dark:bg-white/5 border border-current/10 px-4 py-1.5 rounded-full">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeSection === id
                  ? "bg-[#6C1E50] text-white shadow-sm"
                  : "hover:bg-[#6C1E50]/15"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("contact")}
            className="hidden sm:inline-flex items-center gap-2 bg-[#6C1E50] hover:bg-[#52163D] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span>Démarrer un projet</span>
            <span className="text-[#E8B3C9]">✦</span>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-[#FDF4F8] border border-[#E8B3C9] text-[#6C1E50] flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Menu"
          >
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "w-5 rotate-45 translate-y-2" : "w-5"}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : "w-3.5"}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[500px] opacity-100 bg-[#2D1524] text-white shadow-2xl mt-3 border-b border-white/10" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-5 space-y-2">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                scrollTo(id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm text-white/90 hover:bg-[#6C1E50] transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                scrollTo("contact");
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#6C1E50] text-white font-extrabold py-3 rounded-xl shadow-md hover:bg-[#52163D]"
            >
              Me contacter directement
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── HERO SECTION : COUVERTURE EDITORIALE BEHANCE ──────────────────────────────
function Hero({ onOpenLightbox }: { onOpenLightbox: (item: LightboxItem) => void }) {
  return (
    <section id="accueil" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#2D1524] text-white overflow-hidden">
      {/* Editorial Watermark & Halos */}
      <div className="absolute top-10 right-10 text-[18vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none">
        PORTFOLIO
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#6C1E50]/40 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E8B3C9]/15 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Top Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 border-b border-white/10 text-xs font-bold uppercase tracking-widest text-[#E8B3C9]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-white">Dakar, Sénégal · Direction Artistique & UI/UX</span>
          </div>
          <div>Édition Officielle 2026 · Behance Presentation</div>
          <div>Branding · Packaging · Digital Products</div>
        </div>

        {/* Main Editorial Statement */}
        <div className="grid lg:grid-cols-12 gap-12 items-center py-16">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-extrabold tracking-widest text-[#E8B3C9] uppercase">
              ✦ Selected Works & Visual Identity Design
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06]">
              Architecture de marque & interfaces à fort impact visuel.
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-2xl font-normal leading-relaxed">
              Je conçois des <span className="text-[#E8B3C9] font-bold">logotypes puissants</span>, des chartes graphiques complètes, des packagings mémorables et des expériences UI/UX fluides alliant rigueur esthétique et efficacité stratégique.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => scrollTo("savana")}
                className="bg-[#6C1E50] hover:bg-[#852563] text-white font-extrabold px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <span>Explorer les projets</span>
                <span>↓</span>
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="bg-transparent hover:bg-white/10 border-2 border-white/30 hover:border-white text-white font-extrabold px-8 py-4 rounded-full transition-all duration-300"
              >
                Me contacter
              </button>
            </div>
          </div>

          {/* Portrait Showcase Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-sm rounded-[2.5rem] bg-gradient-to-b from-white/15 to-white/5 p-4 border border-white/20 backdrop-blur-xl shadow-2xl">
              <div className="h-[380px] rounded-[2rem] overflow-hidden bg-black/40 relative group">
                <img
                  src={profileImg}
                  alt="Ndiaya Dieng - Assistante digitale & Designer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1524] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#E8B3C9] bg-white/10 px-2.5 py-1 rounded-md">
                    Orange Digital Center / Sonatel
                  </span>
                  <h3 className="text-2xl font-extrabold mt-2">Ndiaya Dieng</h3>
                  <p className="text-xs text-white/70">Designer Graphique · UI/UX · Branding</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Quick Selector Bar */}
        <div className="grid sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
          <button
            onClick={() => scrollTo("savana")}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#D85600] uppercase block">01 · BRANDING & PACKAGING</span>
              <h4 className="text-lg font-extrabold text-white group-hover:text-[#E8B3C9] transition-colors mt-0.5">SAVANA® 🍃</h4>
              <p className="text-xs text-white/60">Épices africaines, nokoss & univers naturel</p>
            </div>
            <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-xl">→</span>
          </button>

          <button
            onClick={() => scrollTo("lolli")}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#EF4444] uppercase block">02 · LOGO OFFICIEL & TECH</span>
              <h4 className="text-lg font-extrabold text-white group-hover:text-[#E8B3C9] transition-colors mt-0.5">LOLLI™</h4>
              <p className="text-xs text-white/60">Industrie 4.0, capteurs IoT & Intelligence Artificielle</p>
            </div>
            <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-xl">→</span>
          </button>

          <button
            onClick={() => scrollTo("jokko")}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#E8B3C9] uppercase block">03 · UI/UX & SMART QR</span>
              <h4 className="text-lg font-extrabold text-white group-hover:text-[#E8B3C9] transition-colors mt-0.5">JOKKO 360°</h4>
              <p className="text-xs text-white/60">Écosystème digital pour hôtellerie & restauration</p>
            </div>
            <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── MASTER CASE STUDY 01 : SAVANA® ───────────────────────────────────────────
function SavanaCaseStudy({ onOpenLightbox }: { onOpenLightbox: (item: LightboxItem) => void }) {
  return (
    <section id="savana" className="py-24 lg:py-32 bg-[#FAF7F2] text-[#2D1524] relative border-b border-[#E8B3C9]/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Project Header Slide */}
        <div className="grid lg:grid-cols-12 gap-8 items-end pb-12 border-b-2 border-[#2D1524]/10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D85600]/10 border border-[#D85600]/30 text-[#D85600] text-xs font-black tracking-widest uppercase">
              01 · IDENTITÉ VISUELLE & PACKAGING AGROALIMENTAIRE
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#26430D] tracking-tight">
              SAVANA<span className="text-[#D85600]">®</span> 🍃
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-[#D85600]">
              Saveur • Valeur • Naturel
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4 text-xs font-bold border-l-2 border-[#2D1524]/10 pl-6">
            <div>
              <p className="text-[#2D1524]/50 uppercase text-[10px] tracking-widest">Secteur</p>
              <p className="text-[#26430D] text-sm mt-0.5">Agroalimentaire & Épices</p>
            </div>
            <div>
              <p className="text-[#2D1524]/50 uppercase text-[10px] tracking-widest">Livrables</p>
              <p className="text-[#26430D] text-sm mt-0.5">Logo, Packaging, Moodboard</p>
            </div>
            <div>
              <p className="text-[#2D1524]/50 uppercase text-[10px] tracking-widest">Couleurs Clés</p>
              <p className="text-[#D85600] text-sm mt-0.5">#D85600 & #26430D</p>
            </div>
            <div>
              <p className="text-[#2D1524]/50 uppercase text-[10px] tracking-widest">Outils Mobilisés</p>
              <p className="text-[#26430D] text-sm mt-0.5">Figma, Vectoriel, Print</p>
            </div>
          </div>
        </div>

        {/* Narrative & Strategic Presentation */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-[#E8B3C9] shadow-sm space-y-3">
            <span className="text-xs font-black text-[#D85600] tracking-widest uppercase block">01 · Le Défi Stratégique</span>
            <h3 className="text-xl font-extrabold text-[#26430D]">Valoriser les terroirs culinaires</h3>
            <p className="text-sm text-[#2D1524]/80 leading-relaxed">
              Transformer la perception des épices traditionnelles africaines (nokoss, pâtes pimentées, ail et gingembre) en une marque noble, rassurante et prête pour les rayons modernes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-[#E8B3C9] shadow-sm space-y-3">
            <span className="text-xs font-black text-[#D85600] tracking-widest uppercase block">02 · Symbolique du Logo</span>
            <h3 className="text-xl font-extrabold text-[#26430D]">La feuille végétale dans le « S »</h3>
            <p className="text-sm text-[#2D1524]/80 leading-relaxed">
              La feuille délicatement fondue dans le premier « S » symbolise la naturalité 100% pure, la fraîcheur des récoltes maraîchères et l'absence totale de conservateurs chimiques.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-[#E8B3C9] shadow-sm space-y-3">
            <span className="text-xs font-black text-[#D85600] tracking-widest uppercase block">03 · Système Chromatique</span>
            <h3 className="text-xl font-extrabold text-[#26430D]">Harmonie Terre & Forêt</h3>
            <p className="text-sm text-[#2D1524]/80 leading-relaxed">
              L'<strong>Orange Terre (#D85600)</strong> évoque la chaleur solaire et l'intensité gustative, tandis que le <strong>Vert Forêt (#26430D)</strong> ancre la marque dans l'authenticité botanique.
            </p>
          </div>
        </div>

        {/* Giant Behance-Style Visual Boards */}
        <div className="space-y-8">
          {/* Module 1: Sachet Packaging Giant Showcase */}
          <div
            onClick={() =>
              onOpenLightbox({
                src: "/SACHET.jpg",
                title: "SAVANA® · Packaging Sachet Découpé & Scellé",
                subtitle: "Design d'emballage alimentaire haute barrière avec mise en avant du nokoss et des épices",
                category: "Packaging Design",
              })
            }
            className="group relative rounded-[2.5rem] overflow-hidden border-2 border-[#E8B3C9] bg-white shadow-xl cursor-pointer"
          >
            <div className="h-[450px] sm:h-[600px] w-full overflow-hidden">
              <img
                src="/SACHET.jpg"
                alt="SAVANA Packaging Sachet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 sm:p-12 text-white">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#D85600] text-white">
                  Packaging Officiel
                </span>
                <h4 className="text-2xl sm:text-4xl font-extrabold">SAVANA · Sachet Haute Résistance & Ergonomie</h4>
                <p className="text-sm text-white/80 max-w-2xl">
                  Conception du packaging pour gamme d'épices déshydratées avec hiérarchie typographique claire et lisibilité en rayon. Cliquez pour agrandir.
                </p>
              </div>
            </div>
          </div>

          {/* Module 2: 2-Column Board (Moodboard & Sticker Roll) */}
          <div className="grid md:grid-cols-2 gap-8">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/MOOD SAVANAPlan de travail 1.jpg",
                  title: "SAVANA® · Moodboard & Univers Visuel",
                  subtitle: "Direction artistique, textures d'épices pures et palette de couleurs officielles",
                  category: "Brand Guidelines",
                })
              }
              className="group relative rounded-[2rem] overflow-hidden border border-[#E8B3C9] bg-white shadow-lg cursor-pointer h-[420px]"
            >
              <img
                src="/MOOD SAVANAPlan de travail 1.jpg"
                alt="SAVANA Moodboard"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8B3C9]">Planche d'Inspiration</span>
                  <h4 className="text-xl font-extrabold">Moodboard & Matières Végétales</h4>
                </div>
              </div>
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free_Round_Roll_Sticker_Mockup_1.jpg",
                  title: "SAVANA® · Rouleau d'Étiquettes Adhésives",
                  subtitle: "Étiquettes circulaires pour bocaux de pâte de nokoss et sauces cuisinées",
                  category: "Packaging Print",
                })
              }
              className="group relative rounded-[2rem] overflow-hidden border border-[#E8B3C9] bg-white shadow-lg cursor-pointer h-[420px]"
            >
              <img
                src="/Free_Round_Roll_Sticker_Mockup_1.jpg"
                alt="SAVANA Stickers Roll"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8B3C9]">Application Print</span>
                  <h4 className="text-xl font-extrabold">Rouleau d'Étiquettes Circulaires</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MASTER CASE STUDY 02 : LOLLI™ ─────────────────────────────────────────────
function LolliCaseStudy({ onOpenLightbox }: { onOpenLightbox: (item: LightboxItem) => void }) {
  return (
    <section id="lolli" className="py-24 lg:py-32 bg-[#0F172A] text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Project Header Slide */}
        <div className="grid lg:grid-cols-12 gap-8 items-end pb-12 border-b-2 border-white/10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs font-black tracking-widest uppercase">
              02 · BRANDING INDUSTRIEL, IOT & INTELLIGENCE ARTIFICIELLE
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              LOLLI<span className="text-[#EF4444]">™</span>
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-white/90">
              Connectivité · Données · Décisions Intelligentes
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4 text-xs font-bold border-l-2 border-white/10 pl-6">
            <div>
              <p className="text-white/40 uppercase text-[10px] tracking-widest">Secteur</p>
              <p className="text-white text-sm mt-0.5">Industrie 4.0 & IoT</p>
            </div>
            <div>
              <p className="text-white/40 uppercase text-[10px] tracking-widest">Livrables</p>
              <p className="text-white text-sm mt-0.5">Logo, Billboard, Charte</p>
            </div>
            <div>
              <p className="text-white/40 uppercase text-[10px] tracking-widest">Palette Tech</p>
              <p className="text-[#EF4444] text-sm mt-0.5">#EF4444 & #1E293B</p>
            </div>
            <div>
              <p className="text-white/40 uppercase text-[10px] tracking-widest">Impact</p>
              <p className="text-white text-sm mt-0.5">Identité B2B Forte</p>
            </div>
          </div>
        </div>

        {/* Scientific / Semantic Breakdown of the Logo */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#EF4444]">Formule Conceptuelle</span>
            <h3 className="text-2xl sm:text-4xl font-extrabold mt-2">La décomposition sémantique du logo LOLLI</h3>
            <p className="text-sm text-white/70 mt-2">
              Chaque trait, chaque couleur et chaque point répond à une fonction technologique précise.
            </p>
          </div>

          {/* Real Vector Logo Presentation Stage */}
          <div
            onClick={() =>
              onOpenLightbox({
                src: "/LOGO LOLLILOGO 1.png",
                title: "LOLLI™ · Logo Officiel Vectoriel",
                subtitle: "Construction géométrique sémantique pour plateforme de données industrielles",
                category: "Logotype Design",
              })
            }
            className="p-10 bg-white rounded-2xl flex flex-col items-center justify-center cursor-pointer group shadow-2xl hover:scale-[1.01] transition-transform"
          >
            <img
              src="/LOGO LOLLILOGO 1.png"
              alt="Logo Officiel LOLLI"
              className="max-h-28 sm:max-h-36 object-contain"
            />
            <span className="text-[11px] font-bold text-[#1E293B] mt-4 bg-slate-100 px-3 py-1 rounded-full">
              ✦ Logo Officiel Haute Résolution (Cliquez pour agrandir)
            </span>
          </div>

          {/* 4 Semantic Pillars */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-[#EF4444] text-white">L (Rouge)</span>
              <h4 className="font-extrabold text-white text-base">Infrastructures & Usines</h4>
              <p className="text-xs text-white/70">Représente les machines physiques, les lignes de production et les équipements industriels.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-[#1E293B] border border-white/20 text-white">L (Bleu Marine)</span>
              <h4 className="font-extrabold text-white text-base">Connectivité & Capteurs IoT</h4>
              <p className="text-xs text-white/70">Incarne le maillage réseau, les protocoles de communication et la transmission de flux.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-[#EF4444] text-white">Point (Data)</span>
              <h4 className="font-extrabold text-white text-base">Données en Temps Réel</h4>
              <p className="text-xs text-white/70">Figure l'information brute captée à la seconde pour alimenter les modèles d'IA.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-[#6C1E50] text-white">Base (Socle)</span>
              <h4 className="font-extrabold text-white text-base">Plateforme LOLLI</h4>
              <p className="text-xs text-white/70">Le socle logiciel unifié qui centralise, analyse et automatise la prise de décision.</p>
            </div>
          </div>
        </div>

        {/* Giant Behance-Style Mockups Modules */}
        <div className="space-y-8">
          {/* Billboard Giant Mockup */}
          <div
            onClick={() =>
              onOpenLightbox({
                src: "/Billboard_Mockup_1.jpg",
                title: "LOLLI™ · Panneau Géant Urbain (Billboard 4x3)",
                subtitle: "Campagne d'affichage institutionnelle pour solutions de connectivité industrielle",
                category: "Outdoor Advertising",
              })
            }
            className="group relative rounded-[2.5rem] overflow-hidden border border-white/20 bg-black shadow-2xl cursor-pointer"
          >
            <div className="h-[450px] sm:h-[620px] w-full overflow-hidden">
              <img
                src="/Billboard_Mockup_1.jpg"
                alt="LOLLI Billboard Urbain"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-8 sm:p-12">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#EF4444] text-white">
                  Affichage Grand Format
                </span>
                <h4 className="text-2xl sm:text-4xl font-extrabold mt-2">LOLLI · Campagne Billboard Urbaine</h4>
                <p className="text-sm text-white/80 max-w-xl mt-1">
                  Mise en situation du branding à grande échelle garantissant un impact visuel immédiat pour les décideurs industriels.
                </p>
              </div>
            </div>
          </div>

          {/* 3-Column Mockup Mosaic */}
          <div className="grid md:grid-cols-3 gap-6">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free_Sign_Mockup.jpg",
                  title: "LOLLI™ · Enseigne Murale d'Entreprise",
                  subtitle: "Signalétique extérieure épurée pour siège social et bâtiments industriels",
                  category: "Signage & Architecture",
                })
              }
              className="group relative rounded-3xl overflow-hidden border border-white/15 bg-black cursor-pointer h-80"
            >
              <img
                src="/Free_Sign_Mockup.jpg"
                alt="LOLLI Enseigne"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-bold text-white">Enseigne Murale de Siège</span>
              </div>
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free_T-Shirt_Mannequin_Mockup_2.jpg",
                  title: "LOLLI™ · Merchandising & Textile Corporate",
                  subtitle: "Tenues professionnelles floquées pour techniciens et équipes événementielles",
                  category: "Textile & Apparel",
                })
              }
              className="group relative rounded-3xl overflow-hidden border border-white/15 bg-black cursor-pointer h-80"
            >
              <img
                src="/Free_T-Shirt_Mannequin_Mockup_2.jpg"
                alt="LOLLI T-Shirt"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-bold text-white">Merchandising & T-Shirt</span>
              </div>
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free_Mug_Mockup_5.jpg",
                  title: "LOLLI™ · Mug & Goodies de Bureau",
                  subtitle: "Objets publicitaires et accessoires de travail aux couleurs de la marque",
                  category: "Corporate Goodies",
                })
              }
              className="group relative rounded-3xl overflow-hidden border border-white/15 bg-black cursor-pointer h-80"
            >
              <img
                src="/Free_Mug_Mockup_5.jpg"
                alt="LOLLI Mug"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                <span className="text-xs font-bold text-white">Accessoires & Mug de Bureau</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MASTER CASE STUDY 03 : JOKKO 360° ─────────────────────────────────────────
function JokkoCaseStudy({ onOpenLightbox }: { onOpenLightbox: (item: LightboxItem) => void }) {
  return (
    <section id="jokko" className="py-24 lg:py-32 bg-white text-[#2D1524] relative border-b border-[#E8B3C9]/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Project Header Slide */}
        <div className="grid lg:grid-cols-12 gap-8 items-end pb-12 border-b-2 border-[#2D1524]/10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6C1E50]/10 border border-[#6C1E50]/30 text-[#6C1E50] text-xs font-black tracking-widest uppercase">
              03 · ARCHITECTURE UI/UX & APPLICATION SMART QR HOSPITALITY
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#6C1E50] tracking-tight">
              JOKKO 360°
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-[#6C1E50]/80">
              « Un scan. Tous vos services. »
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4 text-xs font-bold border-l-2 border-[#2D1524]/10 pl-6">
            <div>
              <p className="text-[#2D1524]/50 uppercase text-[10px] tracking-widest">Secteur</p>
              <p className="text-[#6C1E50] text-sm mt-0.5">Hôtellerie & Restauration</p>
            </div>
            <div>
              <p className="text-[#2D1524]/50 uppercase text-[10px] tracking-widest">Type de Produit</p>
              <p className="text-[#6C1E50] text-sm mt-0.5">Web App QR sans installation</p>
            </div>
            <div>
              <p className="text-[#2D1524]/50 uppercase text-[10px] tracking-widest">Rôle</p>
              <p className="text-[#6C1E50] text-sm mt-0.5">Conception UI/UX & Prototypage</p>
            </div>
            <div>
              <p className="text-[#2D1524]/50 uppercase text-[10px] tracking-widest">Outils</p>
              <p className="text-[#6C1E50] text-sm mt-0.5">Figma, Responsive Grid</p>
            </div>
          </div>
        </div>

        {/* Narrative & Services Matrix */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#FDF4F8] p-8 rounded-[2rem] border border-[#E8B3C9] space-y-3">
            <span className="text-xs font-black text-[#6C1E50] tracking-widest uppercase block">01 · Le Problème Client</span>
            <h3 className="text-xl font-extrabold text-[#6C1E50]">Friction d'accès aux services</h3>
            <p className="text-sm text-[#2D1524]/80 leading-relaxed">
              Les clients d'hôtels et restaurants abandonnent les demandes de room service ou de conciergerie face aux lignes occupées de la réception ou aux applications lourdes à télécharger.
            </p>
          </div>

          <div className="bg-[#FDF4F8] p-8 rounded-[2rem] border border-[#E8B3C9] space-y-3">
            <span className="text-xs font-black text-[#6C1E50] tracking-widest uppercase block">02 · La Solution UX</span>
            <h3 className="text-xl font-extrabold text-[#6C1E50]">Instantanéité par QR Code</h3>
            <p className="text-sm text-[#2D1524]/80 leading-relaxed">
              Un simple scan depuis le chevet de la chambre ou la table ouvre directement l'interface personnalisée de commande en moins de 2 secondes.
            </p>
          </div>

          <div className="bg-[#FDF4F8] p-8 rounded-[2rem] border border-[#E8B3C9] space-y-3">
            <span className="text-xs font-black text-[#6C1E50] tracking-widest uppercase block">03 · Les Modules Intégrés</span>
            <h3 className="text-xl font-extrabold text-[#6C1E50]">Centrale de Commandes</h3>
            <p className="text-sm text-[#2D1524]/80 leading-relaxed">
              Room service, commande de serviettes, ménage rapide, signalement d'incident, réservation de taxi et réception connectée 24/7.
            </p>
          </div>
        </div>

        {/* Giant Behance-Style Mockups Modules */}
        <div className="space-y-8">
          {/* Module 1: Multi-Device Responsive Screen Board */}
          <div
            onClick={() =>
              onOpenLightbox({
                src: "/Free Responsive Screen Devices-Récupéré.jpg",
                title: "JOKKO 360° · Interface Responsive Multi-Écrans",
                subtitle: "Expérience unifiée sur ordinateurs de bureau, tablettes et smartphones",
                category: "Responsive UI/UX",
              })
            }
            className="group relative rounded-[2.5rem] overflow-hidden border-2 border-[#E8B3C9] bg-white shadow-xl cursor-pointer"
          >
            <div className="h-[450px] sm:h-[600px] w-full overflow-hidden">
              <img
                src="/Free Responsive Screen Devices-Récupéré.jpg"
                alt="JOKKO Multi-devices"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 sm:p-12 text-white">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#6C1E50] text-white">
                  Écosystème Multi-Devices
                </span>
                <h4 className="text-2xl sm:text-4xl font-extrabold mt-2">JOKKO 360° · Adaptabilité Totale Desktop & Mobile</h4>
                <p className="text-sm text-white/80 max-w-xl mt-1">
                  Architecture responsive conçue pour un affichage parfait quel que soit l'appareil utilisé par le client.
                </p>
              </div>
            </div>
          </div>

          {/* Module 2: 2-Column Board (iPhone 13 Pro & Metro Station Billboard) */}
          <div className="grid md:grid-cols-2 gap-8">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free_Iphone_13_Pro_Mockup_5.jpg",
                  title: "JOKKO 360° · Interface Mobile iPhone 13 Pro",
                  subtitle: "Navigation tactile optimisée pour sélection rapide de plats et services",
                  category: "Mobile UI Design",
                })
              }
              className="group relative rounded-[2rem] overflow-hidden border border-[#E8B3C9] bg-white shadow-lg cursor-pointer h-[420px]"
            >
              <img
                src="/Free_Iphone_13_Pro_Mockup_5.jpg"
                alt="JOKKO iPhone"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8B3C9]">Interface Mobile</span>
                  <h4 className="text-xl font-extrabold">Application Tactile Client (iPhone)</h4>
                </div>
              </div>
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free Metro Station Billboard Mockup.jpg",
                  title: "JOKKO 360° · Affichage Urbain Station de Métro",
                  subtitle: "Campagne de communication grand public pour démocratiser l'usage du QR code hôtelier",
                  category: "Outdoor Advertising",
                })
              }
              className="group relative rounded-[2rem] overflow-hidden border border-[#E8B3C9] bg-white shadow-lg cursor-pointer h-[420px]"
            >
              <img
                src="/Free Metro Station Billboard Mockup.jpg"
                alt="JOKKO Station Métro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8B3C9]">Signalétique Urbaine</span>
                  <h4 className="text-xl font-extrabold">Panneau Station de Métro</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Module 3: Night Sign & Coffee Experience */}
          <div className="grid md:grid-cols-2 gap-8">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Signbaord_at_Night_Mockup_2-Récupéré.jpg",
                  title: "JOKKO 360° · Enseigne Lumineuse Nocturne",
                  subtitle: "Signalétique extérieure lumineuse pour hôtels et restaurants partenaires",
                  category: "Signage & Night View",
                })
              }
              className="group relative rounded-[2rem] overflow-hidden border border-[#E8B3C9] bg-white shadow-lg cursor-pointer h-[360px]"
            >
              <img
                src="/Signbaord_at_Night_Mockup_2-Récupéré.jpg"
                alt="JOKKO Enseigne Nocturne"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
                <span className="text-sm font-extrabold">Enseigne Lumineuse de Nuit</span>
              </div>
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/COFFEE.jpg",
                  title: "JOKKO 360° · Expérience Table & Restaurant Connecté",
                  subtitle: "Application du QR code directement sur les tables et cartes de cafés",
                  category: "Hospitality Mockup",
                })
              }
              className="group relative rounded-[2rem] overflow-hidden border border-[#E8B3C9] bg-white shadow-lg cursor-pointer h-[360px]"
            >
              <img
                src="/COFFEE.jpg"
                alt="JOKKO Table Café"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 text-white">
                <span className="text-sm font-extrabold">Ambiance Table Café & Restaurant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── METHODOLOGIE ET PROCESSUS SENIOR ──────────────────────────────────────────
function Methodology() {
  const steps = [
    {
      num: "01",
      phase: "IMMERSION & STRATÉGIE",
      desc: "Audit de la cible, analyse sémiotique du secteur et définition du positionnement unique de la marque.",
      deliverable: "Brief & Axe Stratégique",
    },
    {
      num: "02",
      phase: "EXPLORATION & IDÉATION",
      desc: "Recherches graphiques, exploration typographique, matrices de formes et moodboards d'ambiance.",
      deliverable: "Pistes Graphiques & Papiers",
    },
    {
      num: "03",
      phase: "ARCHITECTURE & VECTORIEL",
      desc: "Construction géométrique précise sur Figma/Illustrator, déclinaisons chromatiques et tests de contraste.",
      deliverable: "Logotype Vectoriel & Grilles",
    },
    {
      num: "04",
      phase: "MOCKUPS & LIVRAISON FINALE",
      desc: "Mise en situation 3D réaliste (billboards, packaging, interfaces), charte graphique complète et exports haute définition.",
      deliverable: "Brand Guidelines Clé en Main",
    },
  ];

  return (
    <section id="methodologie" className="py-24 bg-[#FDF4F8] text-[#2D1524] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#E8B3C9] text-xs font-black text-[#6C1E50] tracking-widest uppercase">
            04 · Méthodologie Professionnelle
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#6C1E50] tracking-tight">
            Processus de création rigoureux
          </h2>
          <p className="text-sm sm:text-base text-[#2D1524]/75">
            Une approche séquentielle qui allie créativité artistique et rationalité stratégique pour des livrables sans compromis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={s.num}
              className="bg-white rounded-[2rem] p-8 border-2 border-[#E8B3C9] hover:border-[#6C1E50] hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl font-black text-[#E8B3C9] block mb-4">{s.num}</span>
                <h3 className="text-lg font-extrabold text-[#6C1E50] mb-2">{s.phase}</h3>
                <p className="text-xs text-[#2D1524]/75 leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E8B3C9]/40">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1E50] bg-[#FDF4F8] px-3 py-1 rounded-full">
                  {s.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERTISE & COMPÉTENCES ───────────────────────────────────────────────────
function Expertise() {
  const domains = [
    {
      title: "DIRECTION ARTISTIQUE & BRANDING",
      icon: "✦",
      items: [
        "Création de Logotypes Vectoriels Épurés",
        "Conception de Chartes Graphiques Globales",
        "Design de Packaging & Habillage de Produits",
        "Sémiotique Visuelle & Psychologie des Couleurs",
        "Typographie Hiérarchisée & Grilles de Mise en Page",
      ],
    },
    {
      title: "ARCHITECTURE UI/UX & PROTOTYPAGE",
      icon: "📱",
      items: [
        "Conception d'Expériences Utilisateur (UX)",
        "Interfaces Web & Mobiles Modernes (UI)",
        "Prototypage Interactif Avancé sous Figma",
        "Design Systems Modulaires & Composants Réutilisables",
        "Responsive Web Design & Accessibilité",
      ],
    },
    {
      title: "ORGANISATION & SUPPORT STRATÉGIQUE",
      icon: "💼",
      items: [
        "Gestion Digitale & Assistance Opérationnelle",
        "Suite Microsoft Office (Word, Excel, PowerPoint)",
        "Intégration d'Outils IA pour Workflow Graphique",
        "Communication Digitale & Réseaux Sociaux",
        "Supports Marketing & Affiches Urbaines",
      ],
    },
  ];

  return (
    <section id="competences" className="py-24 bg-white text-[#2D1524] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FDF4F8] border border-[#E8B3C9] text-xs font-black text-[#6C1E50] tracking-widest uppercase">
            05 · Matrice de Compétences
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#6C1E50] tracking-tight">
            Une double expertise créative et opérationnelle
          </h2>
          <p className="text-sm sm:text-base text-[#2D1524]/75">
            Du concept visuel initial à la mise en œuvre technique et administrative de vos projets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {domains.map((d) => (
            <div
              key={d.title}
              className="rounded-[2.5rem] bg-[#FDF4F8] border-2 border-[#E8B3C9] p-8 sm:p-10 hover:border-[#6C1E50] transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="w-12 h-12 rounded-2xl bg-[#6C1E50] text-white flex items-center justify-center text-xl font-bold mb-6 shadow-md">
                  {d.icon}
                </span>
                <h3 className="text-lg font-extrabold text-[#6C1E50] mb-6">{d.title}</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[#2D1524]/85">
                  {d.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <span className="text-[#6C1E50] font-black">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION EDITORIALE ────────────────────────────────────────────────
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#2D1524] text-white relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#6C1E50]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#E8B3C9]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black text-[#E8B3C9] tracking-widest uppercase">
                06 · Contact & Collaboration
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
                Donnons vie à votre prochaine identité.
              </h2>
              <p className="text-base text-white/75 mt-3 leading-relaxed font-light">
                Que ce soit pour une création de logo, un système de packaging ou une interface digitale UI/UX, je suis à votre écoute pour concevoir des livrables sur-mesure.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#E8B3C9] tracking-widest">Téléphone Direct</p>
                  <a href="tel:+221780139501" className="text-lg font-extrabold text-white hover:underline">
                    +221 780 139 501
                  </a>
                </div>
                <button
                  onClick={() => handleCopy("780 139 501", "phone")}
                  className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white hover:text-black transition-colors"
                >
                  {copiedField === "phone" ? "Copié !" : "Copier"}
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#E8B3C9] tracking-widest">Email Professionnel</p>
                  <a href="mailto:ndiaya.dieng.hackeusep5@gmail.com" className="text-sm sm:text-base font-extrabold text-white hover:underline break-all">
                    ndiaya.dieng.hackeusep5@gmail.com
                  </a>
                </div>
                <button
                  onClick={() => handleCopy("ndiaya.dieng.hackeusep5@gmail.com", "email")}
                  className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white hover:text-black transition-colors shrink-0 ml-2"
                >
                  {copiedField === "email" ? "Copié !" : "Copier"}
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] uppercase font-bold text-[#E8B3C9] tracking-widest">Localisation</p>
                <p className="text-base font-extrabold text-white">Dakar, Sénégal · Disponible en présentiel & remote</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] bg-white text-[#2D1524] p-8 sm:p-12 shadow-2xl border-2 border-[#E8B3C9]">
              <h3 className="text-2xl font-extrabold text-[#6C1E50] mb-2">Initier une collaboration</h3>
              <p className="text-xs sm:text-sm text-[#2D1524]/70 mb-6">
                Remplissez ce formulaire détaillé et recevez un retour sous 24 à 48 heures.
              </p>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
                  <div className="text-4xl">✨</div>
                  <h4 className="text-xl font-extrabold text-emerald-800">Message transmis avec succès</h4>
                  <p className="text-xs text-emerald-700">
                    Merci pour votre sollicitation. Je reviendrai vers vous dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-[#6C1E50] mb-1.5 uppercase tracking-wider">
                        Votre Nom / Entreprise *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Babacar Sène"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FDF4F8] border border-[#E8B3C9] focus:border-[#6C1E50] focus:ring-2 focus:ring-[#6C1E50]/20 text-sm outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-[#6C1E50] mb-1.5 uppercase tracking-wider">
                        Votre Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: contact@startup.sn"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FDF4F8] border border-[#E8B3C9] focus:border-[#6C1E50] focus:ring-2 focus:ring-[#6C1E50]/20 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#6C1E50] mb-1.5 uppercase tracking-wider">
                      Nature du Projet
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Création de Logo, Charte Graphique, Packaging ou UI Figma"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FDF4F8] border border-[#E8B3C9] focus:border-[#6C1E50] focus:ring-2 focus:ring-[#6C1E50]/20 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#6C1E50] mb-1.5 uppercase tracking-wider">
                      Détails de votre besoin *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Présentez brièvement vos objectifs, votre calendrier ou vos spécifications..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FDF4F8] border border-[#E8B3C9] focus:border-[#6C1E50] focus:ring-2 focus:ring-[#6C1E50]/20 text-sm outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#6C1E50] hover:bg-[#52163D] text-white font-extrabold py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-95 text-sm uppercase tracking-wider"
                  >
                    Envoyer la demande ✦
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Editorial Footer Line */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} Ndiaya Dieng · Portfolio de Direction Artistique & UI/UX.</p>
          <p className="text-[#E8B3C9]/80 font-bold uppercase tracking-widest">SAVANA® · LOLLI™ · JOKKO 360°</p>
        </div>
      </div>
    </section>
  );
}

// ─── ROOT APPLICATION ─────────────────────────────────────────────────────────
export default function App() {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  useReveal();

  return (
    <div className="min-h-screen bg-white text-[#2D1524] selection:bg-[#E8B3C9] selection:text-[#6C1E50]">
      <Navbar />
      <Hero onOpenLightbox={(item) => setLightboxItem(item)} />
      <SavanaCaseStudy onOpenLightbox={(item) => setLightboxItem(item)} />
      <LolliCaseStudy onOpenLightbox={(item) => setLightboxItem(item)} />
      <JokkoCaseStudy onOpenLightbox={(item) => setLightboxItem(item)} />
      <Methodology />
      <Expertise />
      <Contact />

      {/* Lightbox Fullscreen Viewer */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </div>
  );
}
