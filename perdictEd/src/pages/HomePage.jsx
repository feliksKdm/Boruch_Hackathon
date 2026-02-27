function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 text-white px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Welcome to <span className="text-indigo-400">perdictEd</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Your smart platform for educational predictions. Discover insights,
          track progress, and make data-driven decisions to improve learning outcomes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button aria-label="Get started with perdictEd" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold text-base transition-colors duration-200">
            Get Started
          </button>
          <button aria-label="Learn more about perdictEd" className="px-8 py-3 border border-slate-500 hover:border-indigo-400 hover:text-indigo-300 rounded-xl text-slate-300 font-semibold text-base transition-colors duration-200">
            Learn More
          </button>
        </div>
        <p className="text-sm text-slate-500">
          Powered by data · Built for educators
        </p>
      </div>
    </div>
  )
}

export default HomePage
