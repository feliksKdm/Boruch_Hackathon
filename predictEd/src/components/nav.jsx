import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Dashboard", href: "#" },
];

// 1. Move static styles outside the component to prevent re-parsing
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .nav-link {
      color: #888899; font-weight: 500; font-size: 0.9rem; padding: 0.4rem 0.9rem;
      border-radius: 8px; text-decoration: none; transition: 0.2s; cursor: pointer;
      background: transparent; border: none; display: block; width: 100%; text-align: left;
    }
    .nav-link:hover { color: #e8e8ec; background: rgba(255,255,255,0.05); }
    .nav-link.active { color: #e8e8ec; background: rgba(124,109,250,0.12); }
    
    @media (min-width: 641px) {
      .mobile-only { display: none !important; }
      .nav-link { width: auto; }
    }
    @media (max-width: 640px) {
      .desktop-only { display: none !important; }
    }
  `}</style>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  // 2. Centralized Link Renderer
  const renderLinks = (isMobile = false) => 
    navLinks.map((link) => (
      <button
        key={link.label}
        className={`nav-link ${active === link.label ? "active" : ""}`}
        onClick={() => {
          setActive(link.label);
          if (isMobile) setOpen(false);
        }}
      >
        {link.label}
      </button>
    ));

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0d0d0f", minHeight: "100vh" }}>
      <GlobalStyles />
      
      <nav style={{ background: "#141417", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0.85rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          <a href="#" style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.35rem", color: "#e8e8ec", textDecoration: "none" }}>
            ark<span style={{ color: "#7c6dfa" }}>.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {renderLinks()}
            <a href="#" className="btn-signup" style={{ marginLeft: '12px' }}>Sign up</a>
          </div>

          {/* Mobile Toggle */}
          <div className="mobile-only">
            <button className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${open ? "open" : ""} mobile-only`} style={{ padding: open ? "0.5rem 1.5rem 1rem" : "0" }}>
           {renderLinks(true)}
           <a href="#" className="btn-signup" style={{ marginTop: "8px", display: "block", textAlign: "center" }}>Sign up</a>
        </div>
      </nav>

      <main className="demo">
        <h1>Your content here.</h1>
      </main>
    </div>
  );
}
