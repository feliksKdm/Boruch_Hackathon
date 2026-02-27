import { useState, useEffect, useCallback } from "react";

const SECTIONS = [
  { id: "personal", label: "About You", emoji: "👤", color: "#FF6B35" },
  { id: "education", label: "Education", emoji: "🎓", color: "#4ECDC4" },
  { id: "enrollment", label: "Enrollment", emoji: "📋", color: "#A855F7" },
  { id: "semester1", label: "1st Semester", emoji: "📘", color: "#F59E0B" },
  { id: "semester2", label: "2nd Semester", emoji: "📗", color: "#10B981" },
  { id: "family", label: "Family", emoji: "🏠", color: "#EC4899" },
  { id: "financial", label: "Financial", emoji: "💰", color: "#3B82F6" },
];

const QUESTIONS = [
  // About You
  {
    id: "age",
    section: "personal",
    type: "number",
    label: "How old are you?",
    hint: "Your age at the time of enrollment",
    min: 16,
    max: 70,
    unit: "years",
  },
  {
    id: "gender",
    section: "personal",
    type: "cards",
    label: "What's your gender?",
    options: [
      { value: "male", label: "Male", icon: "♂" },
      { value: "female", label: "Female", icon: "♀" },
    ],
  },
  {
    id: "nationality",
    section: "personal",
    type: "select",
    label: "What's your nationality?",
    hint: "Select your country of origin",
    options: [
      "Portuguese", "German", "Spanish", "Italian", "Dutch", "English",
      "Lithuanian", "Angolan", "Cape Verdean", "Guinean", "Mozambican",
      "Santomean", "Turkish", "Brazilian", "Romanian", "Moldovan",
      "Mexican", "Ukrainian", "Russian", "Cuban", "Colombian", "Other"
    ],
  },
  {
    id: "marital_status",
    section: "personal",
    type: "cards",
    label: "What is your marital status?",
    options: [
      { value: "single", label: "Single", icon: "🧍" },
      { value: "married", label: "Married", icon: "💍" },
      { value: "divorced", label: "Divorced", icon: "📝" },
      { value: "widower", label: "Widower", icon: "🕊" },
      { value: "facto_union", label: "Facto Union", icon: "🤝" },
      { value: "legally_separated", label: "Legally Separated", icon: "⚖️" },
    ],
  },
  {
    id: "international",
    section: "personal",
    type: "toggle",
    label: "Are you an international student?",
    hint: "Students who are not from the institution's home country",
  },
  {
    id: "displaced",
    section: "personal",
    type: "toggle",
    label: "Are you a displaced person?",
    hint: "Living away from your original hometown to attend school",
  },
  {
    id: "educational_special_needs",
    section: "personal",
    type: "toggle",
    label: "Do you have any educational special needs?",
    hint: "Any accommodations or special educational requirements",
  },

  // Education Background
  {
    id: "previous_qualification",
    section: "education",
    type: "select",
    label: "What is your previous qualification?",
    hint: "Highest level of education before enrollment",
    options: [
      "Secondary education", "Higher education - bachelor's degree",
      "Higher education - degree", "Higher education - master's",
      "Higher education - doctorate", "Frequency of higher education",
      "12th year of schooling - not completed", "11th year of schooling - not completed",
      "Other - 11th year of schooling", "10th year of schooling",
      "10th year of schooling - not completed", "Basic education 3rd cycle",
      "Basic education 2nd cycle", "Technological specialization course",
      "Higher education - degree (1st cycle)", "Professional higher technical course",
      "Higher education - master (2nd cycle)"
    ],
  },
  {
    id: "previous_qualification_grade",
    section: "education",
    type: "number",
    label: "What was your previous qualification grade?",
    hint: "Grade between 0 and 200",
    min: 0,
    max: 200,
    unit: "points",
  },
  {
    id: "admission_grade",
    section: "education",
    type: "number",
    label: "What was your admission grade?",
    hint: "Grade between 0 and 200",
    min: 0,
    max: 200,
    unit: "points",
  },

  // Enrollment Details
  {
    id: "course",
    section: "enrollment",
    type: "select",
    label: "Which course are you enrolled in?",
    options: [
      "Biofuel Production Technologies", "Animation and Multimedia Design",
      "Social Service (evening attendance)", "Agronomy", "Communication Design",
      "Veterinary Nursing", "Informatics Engineering", "Equiniculture",
      "Management", "Social Service", "Tourism", "Nursing",
      "Oral Hygiene", "Advertising and Marketing Management",
      "Journalism and Communication", "Basic Education", "Management (evening attendance)"
    ],
  },
  {
    id: "application_mode",
    section: "enrollment",
    type: "select",
    label: "How did you apply?",
    hint: "Your application method",
    options: [
      "1st phase - general contingent", "Ordinance No. 612/93",
      "1st phase - special contingent (Azores Island)", "Holders of other higher courses",
      "Ordinance No. 854-B/99", "International student (bachelor)",
      "1st phase - special contingent (Madeira Island)", "2nd phase - general contingent",
      "3rd phase - general contingent", "Ordinance No. 533-A/99, item b2)",
      "Ordinance No. 533-A/99, item b3)", "Over 23 years old",
      "Transfer", "Change of course", "Technological specialization diploma holders",
      "Change of institution/course", "Short cycle diploma holders",
      "Change of institution/course (International)"
    ],
  },
  {
    id: "application_order",
    section: "enrollment",
    type: "number",
    label: "What was your application order preference?",
    hint: "Between 0 (first choice) and 9 (last choice)",
    min: 0,
    max: 9,
    unit: "",
  },
  {
    id: "daytime_evening",
    section: "enrollment",
    type: "cards",
    label: "What's your attendance type?",
    options: [
      { value: "daytime", label: "Daytime", icon: "☀️" },
      { value: "evening", label: "Evening", icon: "🌙" },
    ],
  },

  // 1st Semester
  {
    id: "cu_1st_enrolled",
    section: "semester1",
    type: "number",
    label: "How many curricular units did you enroll in during 1st semester?",
    min: 0,
    max: 26,
    unit: "units",
  },
  {
    id: "cu_1st_evaluations",
    section: "semester1",
    type: "number",
    label: "How many evaluations did you complete in 1st semester?",
    min: 0,
    max: 45,
    unit: "evaluations",
  },
  {
    id: "cu_1st_approved",
    section: "semester1",
    type: "number",
    label: "How many curricular units did you pass in 1st semester?",
    min: 0,
    max: 26,
    unit: "units",
  },
  {
    id: "cu_1st_credited",
    section: "semester1",
    type: "number",
    label: "How many curricular units were credited in 1st semester?",
    min: 0,
    max: 20,
    unit: "units",
  },
  {
    id: "cu_1st_grade",
    section: "semester1",
    type: "number",
    label: "What was your average grade in 1st semester?",
    hint: "Grade between 0 and 20",
    min: 0,
    max: 20,
    unit: "/ 20",
  },
  {
    id: "cu_1st_no_evaluations",
    section: "semester1",
    type: "number",
    label: "How many units had no evaluations in 1st semester?",
    min: 0,
    max: 12,
    unit: "units",
  },

  // 2nd Semester
  {
    id: "cu_2nd_enrolled",
    section: "semester2",
    type: "number",
    label: "How many curricular units did you enroll in during 2nd semester?",
    min: 0,
    max: 23,
    unit: "units",
  },
  {
    id: "cu_2nd_evaluations",
    section: "semester2",
    type: "number",
    label: "How many evaluations did you complete in 2nd semester?",
    min: 0,
    max: 33,
    unit: "evaluations",
  },
  {
    id: "cu_2nd_approved",
    section: "semester2",
    type: "number",
    label: "How many curricular units did you pass in 2nd semester?",
    min: 0,
    max: 20,
    unit: "units",
  },
  {
    id: "cu_2nd_credited",
    section: "semester2",
    type: "number",
    label: "How many curricular units were credited in 2nd semester?",
    min: 0,
    max: 19,
    unit: "units",
  },
  {
    id: "cu_2nd_grade",
    section: "semester2",
    type: "number",
    label: "What was your average grade in 2nd semester?",
    hint: "Grade between 0 and 20",
    min: 0,
    max: 20,
    unit: "/ 20",
  },
  {
    id: "cu_2nd_no_evaluations",
    section: "semester2",
    type: "number",
    label: "How many units had no evaluations in 2nd semester?",
    min: 0,
    max: 12,
    unit: "units",
  },

  // Family
  {
    id: "mother_qualification",
    section: "family",
    type: "select",
    label: "What is your mother's highest qualification?",
    options: [
      "Secondary Education - 12th Year of Schooling", "Higher Education - Bachelor's Degree",
      "Higher Education - Degree", "Higher Education - Master's", "Higher Education - Doctorate",
      "Frequency of Higher Education", "12th Year of Schooling - Not Completed",
      "11th Year of Schooling - Not Completed", "7th Year (Old)", "Other - 11th Year of Schooling",
      "10th Year of Schooling", "General commerce course", "Basic Education 3rd Cycle",
      "Complementary High School Course", "Technical-professional course",
      "7th year of schooling", "2nd cycle of the general high school course",
      "9th Year of Schooling - Not Completed", "8th year of schooling",
      "General Course of Administration and Commerce", "Supplementary Accounting and Administration",
      "Unknown", "Cannot read or write", "Can read without having a 4th year of schooling",
      "Basic education 1st cycle (4th/5th year) or equiv.", "Basic Education 2nd Cycle",
      "Technological specialization course", "Higher education - degree (1st cycle)",
      "Specialized higher studies course", "Professional higher technical course",
      "Higher Education - Master (2nd cycle)", "Higher Education - Doctorate (3rd cycle)"
    ],
  },
  {
    id: "father_qualification",
    section: "family",
    type: "select",
    label: "What is your father's highest qualification?",
    options: [
      "Secondary Education - 12th Year of Schooling", "Higher Education - Bachelor's Degree",
      "Higher Education - Degree", "Higher Education - Master's", "Higher Education - Doctorate",
      "Frequency of Higher Education", "12th Year of Schooling - Not Completed",
      "11th Year of Schooling - Not Completed", "7th Year (Old)", "Other - 11th Year of Schooling",
      "10th Year of Schooling", "General commerce course", "Basic Education 3rd Cycle",
      "Complementary High School Course", "Technical-professional course",
      "7th year of schooling", "2nd cycle of the general high school course",
      "9th Year of Schooling - Not Completed", "8th year of schooling",
      "General Course of Administration and Commerce", "Supplementary Accounting and Administration",
      "Unknown", "Cannot read or write", "Can read without having a 4th year of schooling",
      "Basic education 1st cycle (4th/5th year) or equiv.", "Basic Education 2nd Cycle",
      "Technological specialization course", "Higher education - degree (1st cycle)",
      "Specialized higher studies course", "Professional higher technical course",
      "Higher Education - Master (2nd cycle)", "Higher Education - Doctorate (3rd cycle)"
    ],
  },
  {
    id: "mother_occupation",
    section: "family",
    type: "select",
    label: "What is your mother's occupation?",
    options: [
      "Student", "Representatives of the Legislative Power and Executive Bodies",
      "Specialists in Intellectual and Scientific Activities", "Intermediate Level Technicians",
      "Administrative staff", "Personal Services, Security and Safety Workers",
      "Farmers and Skilled Workers in Agriculture", "Skilled Workers in Industry and Construction",
      "Installation and Machine Operators", "Unskilled Workers",
      "Armed Forces Professions", "Other Situation", "Blank", "Health professionals",
      "teachers", "Specialists in information and communication technologies",
      "Intermediate level science and engineering technicians",
      "Technicians and professionals, of intermediate level of health",
      "Intermediate level technicians from legal, social, sports, cultural services",
      "Office workers, secretaries in general and data processing operators",
      "Data, accounting, statistical, financial services and registry-related operators",
      "Other administrative support staff", "Personal service workers",
      "sellers", "Personal care workers and the like", "Protection and security services personnel",
      "Market-oriented farmers and skilled agricultural and fishery workers",
      "Subsistence farmers, fishermen, hunters and gatherers",
      "Skilled construction workers and the like (except electricians)",
      "Skilled workers in metallurgy, metalworking and similar",
      "Skilled workers in electricity and electronics",
      "Workers in food processing, woodworking, clothing and other industries and crafts",
      "Fixed plant and machine operators", "Assembly workers",
      "Vehicle drivers and mobile equipment operators",
      "Defense Armed Forces Officers", "Armed Forces Sergeants", "Other Armed Forces personnel",
      "Cleaning workers", "Unskilled workers in agriculture, animal production and fisheries",
      "Unskilled workers in extractive industry, construction, manufacturing and transport",
      "Meal preparation assistants", "Street vendors"
    ],
  },
  {
    id: "father_occupation",
    section: "family",
    type: "select",
    label: "What is your father's occupation?",
    options: [
      "Student", "Representatives of the Legislative Power and Executive Bodies",
      "Specialists in Intellectual and Scientific Activities", "Intermediate Level Technicians",
      "Administrative staff", "Personal Services, Security and Safety Workers",
      "Farmers and Skilled Workers in Agriculture", "Skilled Workers in Industry and Construction",
      "Installation and Machine Operators", "Unskilled Workers",
      "Armed Forces Professions", "Other Situation", "Blank", "Health professionals",
      "teachers", "Specialists in information and communication technologies",
      "Intermediate level science and engineering technicians",
      "Technicians and professionals, of intermediate level of health",
      "Intermediate level technicians from legal, social, sports, cultural services",
      "Office workers, secretaries in general and data processing operators",
      "Data, accounting, statistical, financial services and registry-related operators",
      "Other administrative support staff", "Personal service workers",
      "sellers", "Personal care workers and the like", "Protection and security services personnel",
      "Market-oriented farmers and skilled agricultural and fishery workers",
      "Subsistence farmers, fishermen, hunters and gatherers",
      "Skilled construction workers and the like (except electricians)",
      "Skilled workers in metallurgy, metalworking and similar",
      "Skilled workers in electricity and electronics",
      "Workers in food processing, woodworking, clothing and other industries and crafts",
      "Fixed plant and machine operators", "Assembly workers",
      "Vehicle drivers and mobile equipment operators",
      "Defense Armed Forces Officers", "Armed Forces Sergeants", "Other Armed Forces personnel",
      "Cleaning workers", "Unskilled workers in agriculture, animal production and fisheries",
      "Unskilled workers in extractive industry, construction, manufacturing and transport",
      "Meal preparation assistants", "Street vendors"
    ],
  },

  // Financial
  {
    id: "scholarship_holder",
    section: "financial",
    type: "toggle",
    label: "Are you a scholarship holder?",
    hint: "Currently receiving any form of scholarship or financial aid",
  },
  {
    id: "debtor",
    section: "financial",
    type: "toggle",
    label: "Do you have any outstanding debt to the institution?",
    hint: "Unpaid tuition or other fees",
  },
  {
    id: "tuition_fees_up_to_date",
    section: "financial",
    type: "toggle",
    label: "Are your tuition fees up to date?",
    hint: "Have all current semester fees been paid",
  },
];

const sectionColors = Object.fromEntries(SECTIONS.map(s => [s.id, s.color]));

function ProgressBar({ current, total, sectionId }) {
  const pct = Math.round(((current + 1) / total) * 100);
  const color = sectionColors[sectionId] || "#FF6B35";
  return (
    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

function SectionPill({ section, active, done }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
        active
          ? "text-white scale-105"
          : done
          ? "text-white/50"
          : "text-white/20"
      }`}
      style={active ? { background: section.color + "33", border: `1px solid ${section.color}66` } : {}}
    >
      <span>{section.emoji}</span>
      <span>{section.label}</span>
      {done && <span className="text-emerald-400">✓</span>}
    </div>
  );
}

function CardQuestion({ question, value, onChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
      {question.options.map((opt) => {
        const selected = value === opt.value;
        const color = sectionColors[question.section];
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="group relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 cursor-pointer"
            style={{
              background: selected ? color + "22" : "rgba(255,255,255,0.03)",
              borderColor: selected ? color : "rgba(255,255,255,0.1)",
              transform: selected ? "scale(1.03)" : "scale(1)",
            }}
          >
            <span className="text-2xl">{opt.icon}</span>
            <span className={`text-sm font-medium ${selected ? "text-white" : "text-white/60"}`}>
              {opt.label}
            </span>
            {selected && (
              <div
                className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: color }}
              >
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ToggleQuestion({ question, value, onChange }) {
  const color = sectionColors[question.section];
  return (
    <div className="flex gap-4 mt-6">
      {[{ v: true, label: "Yes", icon: "✓" }, { v: false, label: "No", icon: "✗" }].map(({ v, label, icon }) => {
        const sel = value === v;
        return (
          <button
            key={label}
            onClick={() => onChange(v)}
            className="flex-1 flex flex-col items-center gap-2 p-6 rounded-2xl border transition-all duration-200"
            style={{
              background: sel ? color + "22" : "rgba(255,255,255,0.03)",
              borderColor: sel ? color : "rgba(255,255,255,0.1)",
              transform: sel ? "scale(1.03)" : "scale(1)",
            }}
          >
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all"
              style={{ background: sel ? color : "rgba(255,255,255,0.08)", color: sel ? "#000" : "#fff" }}
            >
              {icon}
            </span>
            <span className={`font-semibold ${sel ? "text-white" : "text-white/50"}`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function NumberQuestion({ question, value, onChange }) {
  const color = sectionColors[question.section];
  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(question.min, (value ?? question.min) - 1))}
          className="w-12 h-12 rounded-full border border-white/20 text-white/60 text-xl hover:border-white/40 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          −
        </button>
        <div className="relative">
          <input
            type="number"
            min={question.min}
            max={question.max}
            value={value ?? ""}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (!isNaN(v)) onChange(Math.min(question.max, Math.max(question.min, v)));
              else onChange("");
            }}
            className="w-36 text-center text-4xl font-bold bg-transparent text-white border-b-2 outline-none pb-2 transition-all"
            style={{ borderColor: color }}
            placeholder={String(question.min)}
          />
          {question.unit && (
            <span className="block text-center text-sm mt-2" style={{ color: color + "cc" }}>
              {question.unit}
            </span>
          )}
        </div>
        <button
          onClick={() => onChange(Math.min(question.max, (value ?? question.min) + 1))}
          className="w-12 h-12 rounded-full border border-white/20 text-white/60 text-xl hover:border-white/40 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          +
        </button>
      </div>
      <span className="text-white/30 text-xs">Range: {question.min} – {question.max}</span>
    </div>
  );
}

function SelectQuestion({ question, value, onChange }) {
  const color = sectionColors[question.section];
  const [search, setSearch] = useState("");
  const filtered = question.options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="mt-6 flex flex-col gap-3">
      <input
        type="text"
        placeholder="Type to search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none text-sm focus:border-white/30 transition-all"
      />
      <div className="max-h-60 overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
        {filtered.map((opt) => {
          const sel = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className="text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-150"
              style={{
                background: sel ? color + "22" : "rgba(255,255,255,0.03)",
                borderLeft: sel ? `3px solid ${color}` : "3px solid transparent",
                color: sel ? "#fff" : "rgba(255,255,255,0.6)",
              }}
            >
              {opt}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-white/30 text-sm text-center py-4">No results found</p>
        )}
      </div>
    </div>
  );
}

function QuestionCard({ question, value, onChange, onNext, onPrev, index, total, animDir }) {
  const section = SECTIONS.find((s) => s.id === question.section);
  const color = sectionColors[question.section];
  const hasValue = value !== undefined && value !== null && value !== "";

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter" && hasValue) onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hasValue, onNext, onPrev]);

  return (
    <div
      className="transition-all duration-400"
      style={{
        animation: `slideIn 0.4s ease-out`,
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(${animDir === "forward" ? "32px" : "-32px"}); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Section badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
        style={{ background: color + "22", color: color, border: `1px solid ${color}44` }}
      >
        <span>{section?.emoji}</span>
        <span>{section?.label}</span>
      </div>

      {/* Question number */}
      <div className="text-white/20 text-sm font-mono mb-2">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Question */}
      <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-1">
        {question.label}
      </h2>
      {question.hint && (
        <p className="text-white/40 text-sm mt-1">{question.hint}</p>
      )}

      {/* Input */}
      {question.type === "cards" && (
        <CardQuestion question={question} value={value} onChange={onChange} />
      )}
      {question.type === "toggle" && (
        <ToggleQuestion question={question} value={value} onChange={onChange} />
      )}
      {question.type === "number" && (
        <NumberQuestion question={question} value={value} onChange={onChange} />
      )}
      {question.type === "select" && (
        <SelectQuestion question={question} value={value} onChange={onChange} />
      )}

      {/* Nav buttons */}
      <div className="flex items-center gap-3 mt-8">
        {index > 0 && (
          <button
            onClick={onPrev}
            className="px-5 py-3 rounded-xl border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all text-sm"
          >
            ← Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!hasValue}
          className="px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: hasValue ? color : "rgba(255,255,255,0.1)",
            color: hasValue ? "#000" : "#fff",
          }}
        >
          {index === total - 1 ? "Submit →" : "Continue →"}
        </button>
        <span className="text-white/20 text-xs ml-1 hidden sm:block">
          or press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40">Enter</kbd>
        </span>
      </div>
    </div>
  );
}

function SuccessScreen({ answers }) {
  const filled = Object.keys(answers).length;
  return (
    <div className="text-center" style={{ animation: "fadeUp 0.6s ease-out" }}>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }`}</style>
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-3xl font-bold text-white mb-3">All done!</h2>
      <p className="text-white/50 mb-8">
        You've answered <span className="text-white font-semibold">{filled}</span> questions across{" "}
        <span className="text-white font-semibold">{SECTIONS.length}</span> sections.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {SECTIONS.map((s) => {
          const sQs = QUESTIONS.filter((q) => q.section === s.id);
          const done = sQs.filter((q) => answers[q.id] !== undefined && answers[q.id] !== "").length;
          return (
            <div
              key={s.id}
              className="p-4 rounded-2xl border border-white/10"
              style={{ background: s.color + "11" }}
            >
              <div className="text-2xl mb-1">{s.emoji}</div>
              <div className="text-white font-semibold text-sm">{s.label}</div>
              <div className="text-white/40 text-xs mt-1">
                {done}/{sQs.length} answered
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-left max-h-48 overflow-y-auto">
        <p className="text-white/30 text-xs font-mono uppercase tracking-wider mb-3">Response Summary</p>
        {Object.entries(answers).map(([k, v]) => (
          <div key={k} className="flex gap-2 text-xs py-1 border-b border-white/5">
            <span className="text-white/30 w-40 shrink-0">{k}</span>
            <span className="text-white/70">{String(v)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Survey() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [animDir, setAnimDir] = useState("forward");

  const question = QUESTIONS[current];
  const value = answers[question?.id];

  const goNext = useCallback(() => {
    if (current === QUESTIONS.length - 1) {
      setDone(true);
    } else {
      setAnimDir("forward");
      setCurrent((c) => c + 1);
    }
  }, [current]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      setAnimDir("back");
      setCurrent((c) => c - 1);
    }
  }, [current]);

  const setAnswer = (val) => {
    setAnswers((prev) => ({ ...prev, [question.id]: val }));
  };

  // Auto-advance cards/toggles after short delay
  useEffect(() => {
    const q = QUESTIONS[current];
    if ((q?.type === "cards" || q?.type === "toggle") && answers[q?.id] !== undefined) {
      const t = setTimeout(() => goNext(), 350);
      return () => clearTimeout(t);
    }
  }, [answers, current, goNext]);

  const currentSection = question?.section;
  const sectionIdx = SECTIONS.findIndex((s) => s.id === currentSection);
  const completedSections = SECTIONS.filter((s) => {
    const qs = QUESTIONS.filter((q) => q.section === s.id);
    return qs.every((q) => answers[q.id] !== undefined && answers[q.id] !== "");
  }).map((s) => s.id);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "radial-gradient(ellipse 120% 80% at 50% -10%, #1a1a2e 0%, #0d0d0d 60%)",
        fontFamily: "'Sora', 'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0; }
      `}</style>

      {/* Top bar */}
      <div className="sticky top-0 z-10 px-6 py-4 flex flex-col gap-3" style={{ background: "rgba(13,13,13,0.85)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs" style={{ background: sectionColors[currentSection] }}>
              <span className="text-black font-bold">S</span>
            </div>
            <span className="text-white/50 text-xs">Student Survey</span>
          </div>
          <span className="text-white/30 text-xs font-mono">{Math.round(((current + 1) / QUESTIONS.length) * 100)}% complete</span>
        </div>
        {!done && <ProgressBar current={current} total={QUESTIONS.length} sectionId={currentSection} />}

        {/* Section pills */}
        {!done && (
          <div className="flex flex-wrap gap-1.5">
            {SECTIONS.map((s, i) => (
              <SectionPill
                key={s.id}
                section={s}
                active={s.id === currentSection}
                done={completedSections.includes(s.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 flex items-start justify-center px-6 py-10">
        <div className="w-full max-w-xl">
          {done ? (
            <SuccessScreen answers={answers} />
          ) : (
            <QuestionCard
              key={current}
              question={question}
              value={value}
              onChange={setAnswer}
              onNext={goNext}
              onPrev={goPrev}
              index={current}
              total={QUESTIONS.length}
              animDir={animDir}
            />
          )}
        </div>
      </div>
    </div>
  );
}
