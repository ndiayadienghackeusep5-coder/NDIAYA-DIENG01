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

// ─── LIGHTBOX FULLSCREEN VIEWER ───────────────────────────────────────────────
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center text-xl font-bold transition-all shadow-lg"
      >
        ✕
      </button>

      <div
        className="relative max-w-6xl max-h-[92vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.title}
          className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
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

// ─── TOP EDITORIAL NAVBAR ──────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  const navLinks = [
    { id: "accueil", label: "00 · Profil" },
    { id: "savana", label: "01 · SAVANA" },
    { id: "lolli", label: "02 · LOLLI" },
    { id: "jokko", label: "03 · JOKKO 360°" },
    { id: "methodologie", label: "04 · Méthode" },
    { id: "competences", label: "05 · Compétences" },
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
          ? "bg-[#1E111B]/95 text-white backdrop-blur-md shadow-2xl py-3 border-b border-white/10"
          : "bg-white/95 backdrop-blur-md text-[#2D1524] py-4 border-b border-[#E8B3C9]/40"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
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
              Portfolio Direction Artistique & UI/UX
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
            <span>Me Contacter</span>
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

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[500px] opacity-100 bg-[#1E111B] text-white shadow-2xl mt-3 border-b border-white/10" : "max-h-0 opacity-0"
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
        </div>
      </div>
    </header>
  );
}

// ─── CADRE 00 : COUVERTURE & PRÉSENTATION BEHANCE ──────────────────────────────
function CadreCouverture() {
  return (
    <section id="accueil" className="pt-28 pb-16 bg-[#180D16] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Presentation Board Wrapper */}
        <div className="rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-8 sm:p-14 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Top Board Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/15 text-xs font-extrabold uppercase tracking-widest text-[#E8B3C9]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dakar, Sénégal · Portfolio Officiel</span>
            </div>
            <span>Behance Presentation Board · 2026</span>
            <span>Identité Visuelle · Packaging · UI/UX</span>
          </div>

          {/* Main Hero Grid */}
          <div className="grid lg:grid-cols-12 gap-10 items-center py-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black tracking-widest text-[#E8B3C9] uppercase">
                ✦ Direction Artistique & Design Graphique
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08]">
                Ndiaya Dieng
              </h1>

              <p className="text-xl sm:text-2xl font-bold text-[#E8B3C9] leading-snug">
                Créatrice d'identités de marque, logotypes officiels et interfaces digitales.
              </p>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                Diplômée et formée au sein du programme d'excellence <strong>Hackeuses (Orange Digital Center / Sonatel Academy)</strong>. Je conçois des projets visuels complets et professionnels : de la recherche sémantique du logo au packaging et prototypes Figma.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => scrollTo("savana")}
                  className="bg-[#6C1E50] hover:bg-[#8B2366] text-white font-extrabold px-8 py-3.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Voir les Projets Réalisés ↓
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="bg-transparent hover:bg-white/10 border-2 border-white/30 text-white font-extrabold px-7 py-3.5 rounded-full transition-all"
                >
                  Me Contacter
                </button>
              </div>
            </div>

            {/* Portrait Image Board */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-[2rem] overflow-hidden border-2 border-white/20 shadow-2xl bg-black/50">
                <img
                  src={profileImg}
                  alt="Ndiaya Dieng"
                  className="w-full h-[400px] object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 text-white">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E8B3C9] bg-white/10 px-2.5 py-1 rounded">
                      Sonatel Academy / Orange
                    </span>
                    <h3 className="text-xl font-extrabold mt-1">Ndiaya Dieng</h3>
                    <p className="text-xs text-white/70">Assistante Digitale · Designer UI/UX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Jump Bar */}
          <div className="grid sm:grid-cols-3 gap-4 pt-8 border-t border-white/15">
            <button
              onClick={() => scrollTo("savana")}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group"
            >
              <span className="text-[10px] font-black tracking-widest text-[#D85600] uppercase block">PROJET 01</span>
              <h4 className="text-base font-extrabold text-white group-hover:text-[#E8B3C9] transition-colors mt-0.5">SAVANA · Agro & Épices</h4>
              <p className="text-xs text-white/60">Logo, Moodboard & Packaging</p>
            </button>

            <button
              onClick={() => scrollTo("lolli")}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group"
            >
              <span className="text-[10px] font-black tracking-widest text-[#EF4444] uppercase block">PROJET 02</span>
              <h4 className="text-base font-extrabold text-white group-hover:text-[#E8B3C9] transition-colors mt-0.5">LOLLI · Industrie & IoT</h4>
              <p className="text-xs text-white/60">Logo Officiel, Charte & Mockups</p>
            </button>

            <button
              onClick={() => scrollTo("jokko")}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group"
            >
              <span className="text-[10px] font-black tracking-widest text-[#E8B3C9] uppercase block">PROJET 03</span>
              <h4 className="text-base font-extrabold text-white group-hover:text-[#E8B3C9] transition-colors mt-0.5">JOKKO 360° · Smart QR UI</h4>
              <p className="text-xs text-white/60">Multi-Devices & Mobile App</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CADRE 01 : PROJET SAVANA (AGROALIMENTAIRE & ÉPICES) ──────────────────────
function CadreSavana({ onOpenLightbox }: { onOpenLightbox: (item: LightboxItem) => void }) {
  return (
    <section id="savana" className="py-20 bg-[#F6F2EA] text-[#2D1524]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Unified Project Frame Card */}
        <div className="rounded-[2.5rem] bg-white border-2 border-[#D85600]/30 p-8 sm:p-12 shadow-xl space-y-10">
          {/* Frame Header */}
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b-2 border-[#2D1524]/10">
            <div className="space-y-2">
              <span className="text-xs font-black px-3.5 py-1 rounded-full bg-[#D85600]/10 text-[#D85600] border border-[#D85600]/30 tracking-widest uppercase">
                PLANCHE 01 · IDENTITÉ VISUELLE & PACKAGING
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#26430D] tracking-tight">
                SAVANA
              </h2>
              <p className="text-lg sm:text-xl font-bold text-[#D85600]">
                Saveur • Valeur • Naturel
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right text-xs">
                <p className="font-extrabold text-[#26430D]">#26430D Vert Forêt</p>
                <p className="font-extrabold text-[#D85600]">#D85600 Orange Terre</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="w-5 h-5 rounded-full bg-[#26430D] border border-black/10 shadow" />
                <span className="w-5 h-5 rounded-full bg-[#D85600] border border-black/10 shadow" />
              </div>
            </div>
          </div>

          {/* Argumentation Stratégique */}
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-2xl bg-[#F6F2EA] border border-[#D85600]/20 space-y-2">
              <h4 className="font-extrabold text-[#26430D] text-base">🌱 Le Concept</h4>
              <p className="text-xs text-[#2D1524]/80 leading-relaxed">
                Valorisation des saveurs authentiques de la cuisine africaine (nokoss traditionnel, pâtes d'épices, ail, gingembre et piments) dans un univers 100% naturel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6F2EA] border border-[#D85600]/20 space-y-2">
              <h4 className="font-extrabold text-[#26430D] text-base">✦ La Symbolique</h4>
              <p className="text-xs text-[#2D1524]/80 leading-relaxed">
                La feuille végétale délicatement intégrée dans la lettre « S » symbolise la pureté botanique, la naturalité des ingrédients et la fraîcheur maraîchère.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F6F2EA] border border-[#D85600]/20 space-y-2">
              <h4 className="font-extrabold text-[#26430D] text-base">📦 Les Livrables</h4>
              <p className="text-xs text-[#2D1524]/80 leading-relaxed">
                Logotype officiel, moodboard des matières végétales, packaging de sachet découpé et rouleau d'étiquettes adhésives pour bocaux.
              </p>
            </div>
          </div>

          {/* Real Mockup Visual Board 1: Moodboard & Charte */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#26430D]">
                Planche de Moodboard & Direction Artistique Officielle :
              </h3>
              <span className="text-xs font-bold text-[#D85600]">Cliquez pour agrandir</span>
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/MOOD SAVANAPlan de travail 1.jpg",
                  title: "SAVANA · Moodboard & Plan de Travail Officiel",
                  subtitle: "Direction artistique officielle avec logo à feuille, textures d'épices et palette",
                  category: "Brand Guidelines",
                })
              }
              className="rounded-3xl overflow-hidden border-2 border-[#D85600]/30 shadow-lg cursor-pointer group bg-white"
            >
              <img
                src="/MOOD SAVANAPlan de travail 1.jpg"
                alt="SAVANA Moodboard Officiel"
                className="w-full h-auto max-h-[580px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Real Mockup Visual Board 2: Packaging Sachet & Stickers */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Packaging Sachet */}
            <div className="space-y-3">
              <h4 className="text-base font-extrabold text-[#26430D]">
                Packaging Sachet Découpé & Scellé :
              </h4>
              <div
                onClick={() =>
                  onOpenLightbox({
                    src: "/SACHET.jpg",
                    title: "SAVANA · Packaging Sachet Découpé",
                    subtitle: "Emballage d'épices hermétique avec habillage de marque",
                    category: "Packaging Design",
                  })
                }
                className="rounded-3xl overflow-hidden border-2 border-[#D85600]/30 shadow-lg cursor-pointer group h-[400px] bg-white"
              >
                <img
                  src="/SACHET.jpg"
                  alt="SAVANA Packaging Sachet"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Sticker Roll */}
            <div className="space-y-3">
              <h4 className="text-base font-extrabold text-[#26430D]">
                Rouleau d'Étiquettes pour Bocaux & Pots :
              </h4>
              <div
                onClick={() =>
                  onOpenLightbox({
                    src: "/Free_Round_Roll_Sticker_Mockup_1.jpg",
                    title: "SAVANA · Rouleau d'Étiquettes Adhésives",
                    subtitle: "Étiquettes circulaires pour bocaux de nokoss",
                    category: "Print & Stickers",
                  })
                }
                className="rounded-3xl overflow-hidden border-2 border-[#D85600]/30 shadow-lg cursor-pointer group h-[400px] bg-white"
              >
                <img
                  src="/Free_Round_Roll_Sticker_Mockup_1.jpg"
                  alt="SAVANA Stickers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CADRE 02 : PROJET LOLLI (TECH INDUSTRIE & IOT) ───────────────────────────
function CadreLolli({ onOpenLightbox }: { onOpenLightbox: (item: LightboxItem) => void }) {
  return (
    <section id="lolli" className="py-20 bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Unified Project Frame Card */}
        <div className="rounded-[2.5rem] bg-[#1E293B] border-2 border-white/20 p-8 sm:p-12 shadow-2xl space-y-10">
          {/* Frame Header */}
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b-2 border-white/15">
            <div className="space-y-2">
              <span className="text-xs font-black px-3.5 py-1 rounded-full bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 tracking-widest uppercase">
                PLANCHE 02 · LOGO OFFICIEL & BRANDING TECH 4.0
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                LOLLI
              </h2>
              <p className="text-lg sm:text-xl font-bold text-white/80">
                Connectivité · Données · Intelligence Artificielle
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right text-xs">
                <p className="font-extrabold text-[#EF4444]">#EF4444 Rouge Industrie</p>
                <p className="font-extrabold text-[#94A3B8]">#1E293B Bleu Marine</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="w-5 h-5 rounded-full bg-[#EF4444] border border-white/20 shadow" />
                <span className="w-5 h-5 rounded-full bg-[#1E293B] border border-white/20 shadow" />
              </div>
            </div>
          </div>

          {/* Décomposition Sémantique */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="font-extrabold text-white text-base">
              📐 Formule de Construction Sémantique du Logo LOLLI :
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-extrabold text-[#EF4444] block">L (Rouge)</span>
                <p className="text-white/80">Infrastructures physiques, usines & machines industrielles.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-extrabold text-[#94A3B8] block">L (Bleu Marine)</span>
                <p className="text-white/80">Connectivité réseau, capteurs & protocoles IoT.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-extrabold text-[#EF4444] block">Point (Data)</span>
                <p className="text-white/80">Données captées en temps réel pour l'IA prédictive.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-extrabold text-[#E8B3C9] block">Base (Socle)</span>
                <p className="text-white/80">Plateforme unifiée LOLLI centralisant les décisions.</p>
              </div>
            </div>
          </div>

          {/* Planche 1: Logo Vectoriel Officiel & Charte */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/LOGO LOLLILOGO 1.png",
                  title: "LOLLI · Logo Officiel Vectoriel",
                  subtitle: "Logotype officiel vectoriel haute définition",
                  category: "Official Logo",
                })
              }
              className="p-10 rounded-3xl bg-white flex flex-col items-center justify-center cursor-pointer group shadow-xl h-80"
            >
              <img
                src="/LOGO LOLLILOGO 1.png"
                alt="Logo Officiel LOLLI"
                className="max-h-36 object-contain group-hover:scale-105 transition-transform"
              />
              <span className="text-[11px] font-bold text-[#1E293B] mt-4 bg-slate-100 px-3 py-1 rounded-full">
                Logo Officiel Vectoriel (Agrandir ✕)
              </span>
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/LOGO LOLLIPlan de travail 6@312x-100.jpg",
                  title: "LOLLI · Plan de Travail & Charte Graphique",
                  subtitle: "Planche technique officielle de construction du logotype",
                  category: "Brand Guidelines",
                })
              }
              className="rounded-3xl overflow-hidden border border-white/20 shadow-xl cursor-pointer group h-80 bg-black"
            >
              <img
                src="/LOGO LOLLIPlan de travail 6@312x-100.jpg"
                alt="LOLLI Plan de Travail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Planche 2: Billboard Grand Panneau Urbain */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-white">
              Mockup Panneau Géant Urbain (Billboard) :
            </h4>
            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Billboard_Mockup_1.jpg",
                  title: "LOLLI · Billboard Urbain 4x3",
                  subtitle: "Affichage grand format institutionnel",
                  category: "Outdoor Mockup",
                })
              }
              className="rounded-3xl overflow-hidden border border-white/20 shadow-xl cursor-pointer group h-[420px] bg-black"
            >
              <img
                src="/Billboard_Mockup_1.jpg"
                alt="LOLLI Billboard"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Planche 3: Enseigne, T-Shirt, Mug & Porte-Clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free_Sign_Mockup.jpg",
                  title: "LOLLI · Enseigne Murale",
                  subtitle: "Signalétique extérieure de siège d'entreprise",
                  category: "Signage",
                })
              }
              className="rounded-2xl overflow-hidden border border-white/15 cursor-pointer group h-48 bg-black"
            >
              <img
                src="/Free_Sign_Mockup.jpg"
                alt="LOLLI Enseigne"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free_T-Shirt_Mannequin_Mockup_2.jpg",
                  title: "LOLLI · T-Shirt Mannequin Corporate",
                  subtitle: "Textile et tenues d'équipes professionnelles",
                  category: "Apparel",
                })
              }
              className="rounded-2xl overflow-hidden border border-white/15 cursor-pointer group h-48 bg-black"
            >
              <img
                src="/Free_T-Shirt_Mannequin_Mockup_2.jpg"
                alt="LOLLI T-Shirt"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free_Mug_Mockup_5.jpg",
                  title: "LOLLI · Mug de Bureau",
                  subtitle: "Goodies et accessoires de travail",
                  category: "Corporate Goodies",
                })
              }
              className="rounded-2xl overflow-hidden border border-white/15 cursor-pointer group h-48 bg-black"
            >
              <img
                src="/Free_Mug_Mockup_5.jpg"
                alt="LOLLI Mug"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Mockup_Metalic_Keychain.jpg",
                  title: "LOLLI · Porte-Clés Métallique",
                  subtitle: "Accessoire métallique gravé",
                  category: "Keyring Mockup",
                })
              }
              className="rounded-2xl overflow-hidden border border-white/15 cursor-pointer group h-48 bg-black"
            >
              <img
                src="/Mockup_Metalic_Keychain.jpg"
                alt="LOLLI Porte Clé"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CADRE 03 : PROJET JOKKO 360° (UI/UX SMART QR) ────────────────────────────
function CadreJokko({ onOpenLightbox }: { onOpenLightbox: (item: LightboxItem) => void }) {
  return (
    <section id="jokko" className="py-20 bg-white text-[#2D1524]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Unified Project Frame Card */}
        <div className="rounded-[2.5rem] bg-[#FDF4F8] border-2 border-[#E8B3C9] p-8 sm:p-12 shadow-xl space-y-10">
          {/* Frame Header */}
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b-2 border-[#E8B3C9]/60">
            <div className="space-y-2">
              <span className="text-xs font-black px-3.5 py-1 rounded-full bg-[#6C1E50] text-white tracking-widest uppercase">
                PLANCHE 03 · APPLICATION DIGITALE & UI/UX DESIGN
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#6C1E50] tracking-tight">
                JOKKO 360°
              </h2>
              <p className="text-lg sm:text-xl font-bold text-[#6C1E50]/80">
                « Un scan. Tous vos services. »
              </p>
            </div>

            <div className="text-right text-xs">
              <p className="font-extrabold text-[#6C1E50]">Hôtellerie · Restauration</p>
              <p className="text-[#2D1524]/60">Web App QR Instantanée</p>
            </div>
          </div>

          {/* Argumentation UX */}
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-2xl bg-white border border-[#E8B3C9] space-y-2">
              <h4 className="font-extrabold text-[#6C1E50] text-base">📱 Le Problème Résolu</h4>
              <p className="text-xs text-[#2D1524]/80 leading-relaxed">
                Suppression des files d'attente à la réception et élimination du besoin d'installer une application lourde pour commander un service d'hôtel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8B3C9] space-y-2">
              <h4 className="font-extrabold text-[#6C1E50] text-base">⚡ L'Expérience Client</h4>
              <p className="text-xs text-[#2D1524]/80 leading-relaxed">
                Un simple scan du QR Code depuis la table ou le chevet donne accès immédiat au room service, ménage, taxi et conciergerie 24/7.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8B3C9] space-y-2">
              <h4 className="font-extrabold text-[#6C1E50] text-base">🖥️ Conception UI/UX</h4>
              <p className="text-xs text-[#2D1524]/80 leading-relaxed">
                Interfaces pensées mobile-first et responsive multi-écrans sur Figma avec hiérarchie claire et boutons de commande intuitifs.
              </p>
            </div>
          </div>

          {/* Multi-Devices Showcase */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-[#6C1E50]">
              Écrans Multi-Devices (Desktop, Tablette & Smartphone) :
            </h4>
            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Free Responsive Screen Devices-Récupéré.jpg",
                  title: "JOKKO 360° · Écrans Multi-Devices Responsive",
                  subtitle: "Maquette responsive desktop, tablette et mobile",
                  category: "Responsive UI",
                })
              }
              className="rounded-3xl overflow-hidden border-2 border-[#E8B3C9] shadow-lg cursor-pointer group h-[420px] bg-white"
            >
              <img
                src="/Free Responsive Screen Devices-Récupéré.jpg"
                alt="JOKKO Multi Devices"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* iPhone & Metro Station */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-base font-extrabold text-[#6C1E50]">
                Application Mobile iPhone 13 Pro :
              </h4>
              <div
                onClick={() =>
                  onOpenLightbox({
                    src: "/Free_Iphone_13_Pro_Mockup_5.jpg",
                    title: "JOKKO 360° · Interface Mobile iPhone",
                    subtitle: "Application tactile pour sélection de services",
                    category: "Mobile UI",
                  })
                }
                className="rounded-3xl overflow-hidden border border-[#E8B3C9] shadow-lg cursor-pointer group h-[380px] bg-white"
              >
                <img
                  src="/Free_Iphone_13_Pro_Mockup_5.jpg"
                  alt="JOKKO iPhone"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-extrabold text-[#6C1E50]">
                Affichage Station de Métro :
              </h4>
              <div
                onClick={() =>
                  onOpenLightbox({
                    src: "/Free Metro Station Billboard Mockup.jpg",
                    title: "JOKKO 360° · Affichage Station Métro",
                    subtitle: "Communication urbaine grand format",
                    category: "Billboard Mockup",
                  })
                }
                className="rounded-3xl overflow-hidden border border-[#E8B3C9] shadow-lg cursor-pointer group h-[380px] bg-white"
              >
                <img
                  src="/Free Metro Station Billboard Mockup.jpg"
                  alt="JOKKO Métro"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* Enseigne Nuit & Table Restaurant */}
          <div className="grid md:grid-cols-2 gap-6">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/Signbaord_at_Night_Mockup_2-Récupéré.jpg",
                  title: "JOKKO 360° · Enseigne Lumineuse Nocturne",
                  subtitle: "Signalétique extérieure pour hôtels",
                  category: "Night Signage",
                })
              }
              className="rounded-2xl overflow-hidden border border-[#E8B3C9] cursor-pointer group h-72 bg-white"
            >
              <img
                src="/Signbaord_at_Night_Mockup_2-Récupéré.jpg"
                alt="JOKKO Enseigne"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div
              onClick={() =>
                onOpenLightbox({
                  src: "/COFFEE.jpg",
                  title: "JOKKO 360° · Ambiance Table Restaurant / Café",
                  subtitle: "QR code appliqué sur les tables de restauration",
                  category: "Hospitality Table",
                })
              }
              className="rounded-2xl overflow-hidden border border-[#E8B3C9] cursor-pointer group h-72 bg-white"
            >
              <img
                src="/COFFEE.jpg"
                alt="JOKKO Café"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CADRE 04 : MÉTHODOLOGIE & EXPERTISE ───────────────────────────────────────
function CadreExpertise() {
  const steps = [
    { num: "01", title: "Comprendre", desc: "Analyse du secteur, de la cible et des valeurs fondamentales." },
    { num: "02", title: "Concevoir", desc: "Recherches graphiques, moodboards et construction vectorielle." },
    { num: "03", title: "Prototyper", desc: "Mise en situation sur mockups réalistes et prototypes interactifs." },
    { num: "04", title: "Finaliser", desc: "Livraison de la charte complète et des fichiers HD prêts à l'emploi." },
  ];

  const domains = [
    {
      title: "DIRECTION ARTISTIQUE & LOGOS",
      items: ["Création de Logotypes Vectoriels", "Chartes Graphiques Complètes", "Design de Packaging & Sachets", "Moodboards & Univers Visuels"],
    },
    {
      title: "UI/UX DESIGN & PROTOTYPAGE",
      items: ["Interfaces Web & Mobiles Figma", "Architecture d'Information & Wireframes", "Design Systems Réutilisables", "Expérience Utilisateur Responsive"],
    },
    {
      title: "GESTION DIGITALE & BUREAUTIQUE",
      items: ["Suite Microsoft Office (Word, Excel, PowerPoint)", "Organisation & Suivi Opérationnel", "Outils d'Intelligence Artificielle", "Communication & Marketing Digital"],
    },
  ];

  return (
    <section id="methodologie" className="py-20 bg-[#FDF4F8] text-[#2D1524]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Methodology Frame */}
        <div className="rounded-[2.5rem] bg-white border-2 border-[#E8B3C9] p-8 sm:p-12 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black px-3.5 py-1 rounded-full bg-[#FDF4F8] text-[#6C1E50] border border-[#E8B3C9] uppercase tracking-widest">
              PLANCHE 04 · MÉTHODOLOGIE & COMPÉTENCES
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#6C1E50]">
              Une démarche rigoureuse en 4 étapes
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.num} className="p-6 rounded-2xl bg-[#FDF4F8] border border-[#E8B3C9] space-y-2">
                <span className="text-2xl font-black text-[#6C1E50]">{s.num}</span>
                <h4 className="font-extrabold text-[#6C1E50] text-base">{s.title}</h4>
                <p className="text-xs text-[#2D1524]/75">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Skills Grid */}
          <div id="competences" className="pt-8 border-t border-[#E8B3C9]/50">
            <h4 className="text-center text-lg font-extrabold text-[#6C1E50] mb-6">
              Matrice de Compétences Professionnelles :
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              {domains.map((d) => (
                <div key={d.title} className="p-6 rounded-2xl bg-[#FDF4F8] border border-[#E8B3C9] space-y-3">
                  <h5 className="font-extrabold text-xs text-[#6C1E50] tracking-wider uppercase">{d.title}</h5>
                  <ul className="space-y-2 text-xs text-[#2D1524]/85">
                    {d.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="text-[#6C1E50] font-bold">✓</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CADRE 05 : CONTACT & COLLABORATION ───────────────────────────────────────
function CadreContact() {
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
    <section id="contact" className="py-20 bg-[#180D16] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12">
        {/* Contact Frame */}
        <div className="rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/15 p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black px-3.5 py-1 rounded-full bg-white/10 text-[#E8B3C9] border border-white/15 uppercase tracking-widest">
                PLANCHE 05 · CONTACT & COLLABORATION
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Discutons de votre prochain projet
              </h2>

              <p className="text-sm text-white/75 leading-relaxed">
                Création de logo, identité visuelle complète, packaging ou maquettes UI/UX Figma : je suis disponible pour échanger.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[#E8B3C9] font-bold">TÉLÉPHONE</p>
                    <a href="tel:+221780139501" className="text-sm font-extrabold text-white hover:underline">
                      +221 780 139 501
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy("780 139 501", "phone")}
                    className="px-3 py-1 rounded bg-white/10 hover:bg-white hover:text-black font-bold"
                  >
                    {copiedField === "phone" ? "Copié !" : "Copier"}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[#E8B3C9] font-bold">EMAIL</p>
                    <a href="mailto:ndiaya.dieng.hackeusep5@gmail.com" className="text-xs font-extrabold text-white hover:underline break-all">
                      ndiaya.dieng.hackeusep5@gmail.com
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy("ndiaya.dieng.hackeusep5@gmail.com", "email")}
                    className="px-3 py-1 rounded bg-white/10 hover:bg-white hover:text-black font-bold ml-2 shrink-0"
                  >
                    {copiedField === "email" ? "Copié !" : "Copier"}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[#E8B3C9] font-bold">LOCALISATION</p>
                  <p className="text-sm font-bold text-white">Dakar, Sénégal · Disponible en présentiel & remote</p>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-white text-[#2D1524] shadow-xl">
                <h3 className="text-xl font-extrabold text-[#6C1E50] mb-2">Envoyer un message</h3>
                <p className="text-xs text-[#2D1524]/70 mb-4">Je vous répondrai dans les plus brefs délais.</p>

                {submitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-xs text-emerald-800 font-bold">
                    ✨ Message envoyé avec succès ! Merci de votre prise de contact.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#6C1E50] mb-1">Nom *</label>
                        <input
                          type="text"
                          required
                          placeholder="Votre nom"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-[#FDF4F8] border border-[#E8B3C9] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#6C1E50] mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-[#FDF4F8] border border-[#E8B3C9] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-[#6C1E50] mb-1">Sujet</label>
                      <input
                        type="text"
                        placeholder="Création de Logo, Packaging, UI Design..."
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-[#FDF4F8] border border-[#E8B3C9] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#6C1E50] mb-1">Message *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Décrivez votre besoin..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-[#FDF4F8] border border-[#E8B3C9] outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-[#6C1E50] hover:bg-[#52163D] text-white font-extrabold uppercase tracking-wider transition-colors shadow"
                    >
                      Envoyer le message ✦
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-2">
            <p>© {new Date().getFullYear()} Ndiaya Dieng · Portfolio Direction Artistique.</p>
            <p className="text-[#E8B3C9] font-bold">SAVANA · LOLLI · JOKKO 360°</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────
export default function App() {
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  useReveal();

  return (
    <div className="min-h-screen bg-[#180D16] text-[#2D1524]">
      <Navbar />
      <CadreCouverture />
      <CadreSavana onOpenLightbox={(item) => setLightboxItem(item)} />
      <CadreLolli onOpenLightbox={(item) => setLightboxItem(item)} />
      <CadreJokko onOpenLightbox={(item) => setLightboxItem(item)} />
      <CadreExpertise />
      <CadreContact />

      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </div>
  );
}
