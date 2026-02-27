import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Dashboard", href: "#" },
];

function RolePanel({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(6px)",
      animation: "fadeIn 0.2s ease",
    }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        .role-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          padding: 2.5rem 2rem;
          cursor: pointer;
          transition: background 0.25s;
          border: none;
          background: transparent;
          color: inherit;
          height: 100%;
        }
        .role-card:hover { background: rgba(255,255,255,0.04); }
        .role-card.prof:hover { background: rgba(124,109,250,0.08); }
        .role-card.stud:hover { background: rgba(250,185,109,0.07); }
        .role-card:first-child { border-radius: 16px 0 0 16px; }
        .role-card:last-child  { border-radius: 0 16px 16px 0; }
        .glyph {
          width: 88px; height: 88px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .role-card:hover .glyph { transform: scale(1.12); }
        .role-card.prof:hover .glyph { box-shadow: 0 0 28px 6px rgba(124,109,250,0.3); }
        .role-card.stud:hover .glyph { box-shadow: 0 0 28px 6px rgba(250,185,109,0.3); }
        .role-label {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          letter-spacing: -0.02em;
          color: #e8e8ec;
        }
        .role-desc {
          font-size: 0.83rem;
          color: #888899;
          text-align: center;
          max-width: 155px;
          line-height: 1.55;
        }
        .role-cta {
          border: none; border-radius: 8px;
          padding: 0.45rem 1.4rem;
          font-size: 0.85rem; font-weight: 600;
          cursor: pointer;
          transition: filter 0.2s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .role-cta:hover { filter: brightness(1.15); transform: translateY(-1px); }
        .divider { width: 1px; background: rgba(255,255,255,0.07); flex-shrink: 0; }
        .close-btn {
          background: transparent; border: none; cursor: pointer;
          color: #888899; font-size: 1.1rem; line-height: 1;
          transition: color 0.2s; padding: 2px 4px; border-radius: 4px;
        }
        .close-btn:hover { color: #e8e8ec; background: rgba(255,255,255,0.06); }
      `}</style>

      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#141417",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          width: "min(560px, 92vw)",
          overflow: "hidden",
          animation: "slideUp 0.25s ease",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "1.1rem 1.4rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "'Syne', sans-serif", fontSize: "0.95rem",
            color: "#e8e8ec", letterSpacing: "-0.01em",
          }}>
            I'm signing up as…
          </span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Two halves */}
        <div style={{ display: "flex", minHeight: "270px" }}>

          {/* Professor */}
          <button className="role-card prof" onClick={() => alert("→ Professor sign-up flow")}>
            <div className="glyph" style={{ background: "rgba(124,109,250,0.15)" }}>
              🎓
            </div>
            <span className="role-label">Professor</span>
            <span className="role-desc">Manage students and track progress.</span>
            <span className="role-cta" style={{ background: "#7c6dfa", color: "#fff" }}>
              Get started
            </span>
          </button>

          <div className="divider" />

          {/* Student */}
          <button className="role-card stud" onClick={() => alert("→ Student sign-up flow")}>
            <div className="glyph" style={{ background: "rgba(250,185,109,0.13)" }}>
              📖
            </div>
            <span className="role-label">Student</span>
            <span className="role-desc">Wellbeing, course management and progress tracker.</span>
            <span className="role-cta" style={{ background: "#c9913a", color: "#fff" }}>
              Get started
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0d0d0f", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-link {
          color: #888899; font-weight: 500; font-size: 0.9rem;
          padding: 0.4rem 0.9rem; border-radius: 8px;
          text-decoration: none; transition: color 0.2s, background 0.2s;
          cursor: pointer; background: transparent; border: none;
        }
        .nav-link:hover { color: #e8e8ec; background: rgba(255,255,255,0.05); }
        .nav-link.active { color: #e8e8ec; background: rgba(124,109,250,0.12); }

        .btn-signup {
          background: #7c6dfa; color: #fff; font-weight: 600;
          font-size: 0.875rem; padding: 0.45rem 1.25rem; border-radius: 8px;
          border: none; cursor: pointer;
          transition: box-shadow 0.25s, transform 0.15s, background 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-signup:hover {
          background: #6a5be8;
          box-shadow: 0 0 16px 4px rgba(124,109,250,0.25);
          transform: translateY(-1px);
        }

        .hamburger {
          background: transparent; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 6px 10px; cursor: pointer;
          display: flex; flex-direction: column; gap: 5px;
        }
        .hamburger span {
          display: block; width: 20px; height: 2px;
          background: rgba(200,200,220,0.85); border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s; transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-menu { overflow: hidden; max-height: 0; transition: max-height 0.3s ease; }
        .mobile-menu.open { max-height: 300px; }

        @media (max-width: 640px) {
          .desktop-only { display: none !important; }
          .mobile-only  { display: flex !important; }
        }
        .mobile-only { display: none; align-items: center; }

        .demo {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; height: calc(100vh - 65px);
          gap: 1rem; opacity: 0.2; user-select: none; pointer-events: none; color: #e8e8ec;
        }
        .demo h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 6vw, 4rem); letter-spacing: -0.03em;
        }
      `}</style>

      {showPanel && <RolePanel onClose={() => setShowPanel(false)} />}

      <nav style={{
        background: "#141417",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto", padding: "0.85rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Brand */}
          <a href="#" style={{
            fontFamily: "'Syne', sans-serif", fontSize: "1.35rem",
            color: "#e8e8ec", textDecoration: "none", letterSpacing: "-0.02em",
          }}>
            ark<span style={{ color: "#7c6dfa" }}>.</span>
          </a>

          {/* Desktop center links */}
          <div className="desktop-only" style={{ display: "flex", gap: "4px" }}>
            {navLinks.map(l => (
              <button key={l.label}
                className={`nav-link${active === l.label ? " active" : ""}`}
                onClick={() => setActive(l.label)}
              >{l.label}</button>
            ))}
          </div>

          {/* Desktop sign up */}
          <button className="btn-signup desktop-only" onClick={() => setShowPanel(true)}>
            Sign up
          </button>

          {/* Mobile hamburger */}
          <div className="mobile-only">
            <button className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(o => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <div style={{
            display: "flex", flexDirection: "column", gap: "4px",
            padding: "0.5rem 1.5rem 1rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            {navLinks.map(l => (
              <button key={l.label}
                className={`nav-link${active === l.label ? " active" : ""}`}
                style={{ textAlign: "left" }}
                onClick={() => { setActive(l.label); setMenuOpen(false); }}
              >{l.label}</button>
            ))}
            <button className="btn-signup" style={{ marginTop: "8px" }}
              onClick={() => { setMenuOpen(false); setShowPanel(true); }}>
              Sign up
            </button>
          </div>
        </div>
      </nav>

      <div className="demo">
        <h1>Your content here.</h1>
        <p style={{ fontSize: "1rem", color: "#888899" }}>Click "Sign up" to choose a role.</p>
      </div>
    </div>
  );
}
