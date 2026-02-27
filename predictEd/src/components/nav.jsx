import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import the hook
const navLinks = [
  { label: "Home", href: "#" },
  { label: "Pricing", href: "pricing.html" },
  { label: "Dashboard", href: "dashboard.html" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [showPanel, setShowPanel] = useState(false);
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const handleGetStarted = () => {
    navigate('/survey'); // 3. Define the path to your survey page
  };
  return (
    <div className="bg-[#0d0d0f] text-[#e8e8ec] font-['DM_Sans']">
      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700&display=swap');
        
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>

      {/* Role Selection Modal */}
      {showPanel && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md p-5 animate-[fadeIn_0.2s_ease]"
          onClick={() => setShowPanel(false)}
        >
          <div 
            className="bg-[#141417] border border-white/10 rounded-2xl w-full max-w-[540px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)] animate-[slideUp_0.25s_ease]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <span className="font-['Syne'] text-[0.95rem]">I'm signing up as…</span>
              <button 
                className="text-[#888899] hover:text-white transition-colors" 
                onClick={() => setShowPanel(false)}
              >
                ✕
              </button>
            </div>

            {/* Role Options */}
            <div className="flex flex-col sm:flex-row">
              {/* Professor */}
              <button 
                className="flex-1 flex flex-col items-center p-10 gap-4 hover:bg-white/[0.03] transition-all group"
                onClick={() => alert("Professor selected")}
              >
                <div className="w-20 h-20 rounded-full bg-[#7c6dfa]/15 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  🎓
                </div>
                <span className="font-semibold">Professor</span>
                <p className="text-xs text-[#888899] text-center">Manage students and tracking.</p>
                <div className="mt-2 px-5 py-2 bg-[#7c6dfa] rounded-lg text-xs font-bold hover:brightness-110 transition-all">Get started</div>
              </button>

              <div className="w-full h-[1px] sm:w-[1px] sm:h-auto bg-white/10" />

              {/* Student */}
              <button 
                className="flex-1 flex flex-col items-center p-10 gap-4 hover:bg-white/[0.03] transition-all group"
                onClick={() => handleGetStarted('/survey')}
              >
                <div className="w-20 h-20 rounded-full bg-[#fab96d]/15 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  📖
                </div>
                <span className="font-semibold">Student</span>
                <p className="text-xs text-[#888899] text-center">Track your own progress.</p>
                <div className="mt-2 px-5 py-2 bg-[#c9913a] rounded-lg text-xs font-bold hover:brightness-110 transition-all">Get started</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-[#141417] border-b border-white/[0.08] sticky top-0 z-[100]">
        <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="font-['Syne'] text-[1.35rem] tracking-tight hover:opacity-80 transition-opacity">
            ark<span className="text-[#7c6dfa]">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => setActive(l.label)}
                className={`px-3.5 py-1.5 rounded-lg text-[0.9rem] font-medium transition-all ${
                  active === l.label 
                  ? "text-[#e8e8ec] bg-[#7c6dfa]/10" 
                  : "text-[#888899] hover:text-[#e8e8ec] hover:bg-white/5"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop Sign Up */}
          <button 
            className="hidden sm:block bg-[#7c6dfa] hover:bg-[#6a5be8] text-white font-semibold text-sm px-5 py-2 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_0_16px_4px_rgba(124,109,250,0.25)]"
            onClick={() => setShowPanel(true)}
          >
            Sign up
          </button>

          {/* Mobile Hamburger */}
          <div className="sm:hidden flex items-center">
            <button 
              className="p-2 border border-white/10 rounded-lg flex flex-col gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`w-5 h-[2px] bg-white/80 rounded-full transition-all ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`w-5 h-[2px] bg-white/80 rounded-full transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-[2px] bg-white/80 rounded-full transition-all ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-80 border-t border-white/5' : 'max-h-0'}`}>
          <div className="flex flex-col gap-1 p-6 pt-2 pb-4">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => { setActive(l.label); setMenuOpen(false); }}
                className={`w-full text-left px-3.5 py-2 rounded-lg text-[0.9rem] font-medium transition-all ${
                  active === l.label 
                  ? "text-[#e8e8ec] bg-[#7c6dfa]/10" 
                  : "text-[#888899] hover:text-[#e8e8ec] hover:bg-white/5"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button 
              className="mt-2 w-full bg-[#7c6dfa] text-white font-semibold text-sm py-2 rounded-lg"
              onClick={() => { setMenuOpen(false); setShowPanel(true); }}
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
