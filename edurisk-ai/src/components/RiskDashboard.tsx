import React from 'react';
import { PredictionResult, StudentOutcome } from '../types';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle, Info, ArrowRight, ShieldAlert } from 'lucide-react';

interface RiskDashboardProps {
  result: PredictionResult;
}

export const RiskDashboard: React.FC<RiskDashboardProps> = ({ result }) => {
  const getRiskColor = (score: number) => {
    if (score < 40) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score < 70) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getOutcomeIcon = (outcome: StudentOutcome) => {
    switch (outcome) {
      case StudentOutcome.GRADUATE: return <CheckCircle className="text-emerald-500" />;
      case StudentOutcome.DROPOUT: return <AlertCircle className="text-rose-500" />;
      case StudentOutcome.ENROLLED: return <Info className="text-blue-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main Prediction Card */}
      <div id="prediction-card" className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">Predicted Outcome</h2>
            <div className="flex items-center gap-3">
              {getOutcomeIcon(result.outcome)}
              <span className="text-4xl font-black text-zinc-900 tracking-tight">{result.outcome}</span>
            </div>
          </div>
          
          <div className={`px-6 py-4 rounded-2xl border ${getRiskColor(result.riskScore)} flex flex-col items-center`}>
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">Dropout Risk</span>
            <span className="text-3xl font-black">{result.riskScore}%</span>
          </div>
        </div>

        {/* Probability Bars */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Probability Distribution</h3>
          <div className="grid grid-cols-1 gap-4">
            {(Object.entries(result.probabilities) as [StudentOutcome, number][]).map(([outcome, prob]) => (
              <div key={outcome} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-zinc-600">{outcome}</span>
                  <span className="text-zinc-900">{(prob * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${prob * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      outcome === StudentOutcome.DROPOUT ? 'bg-rose-500' : 
                      outcome === StudentOutcome.GRADUATE ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reasoning */}
        <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100">
          <h3 className="text-sm font-bold text-zinc-900 mb-3 flex items-center gap-2">
            <ShieldAlert size={18} className="text-zinc-500" />
            AI Analysis Reasoning
          </h3>
          <p className="text-zinc-600 text-sm leading-relaxed italic">
            "{result.reasoning}"
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div id="recommendations-card" className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="text-sm font-bold text-zinc-900 mb-6 uppercase tracking-widest">Recommended Interventions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
            >
              <div className="mt-1 p-1 bg-emerald-100 text-emerald-600 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ArrowRight size={12} />
              </div>
              <span className="text-sm text-zinc-700 font-medium">{rec}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
