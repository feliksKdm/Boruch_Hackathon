/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudentData, PredictionResult, StudentProfile } from './types';
import { StudentForm } from './components/StudentForm';
import { RiskDashboard } from './components/RiskDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { predictStudentOutcome } from './services/predictionService';
import { MOCK_STUDENTS } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, BrainCircuit, BarChart3, History, LayoutDashboard, UserPlus, ArrowLeft } from 'lucide-react';

type ViewMode = 'predict' | 'teacher' | 'student-detail';

export default function App() {
  const [viewMode, setViewMode] = React.useState<ViewMode>('predict');
  const [prediction, setPrediction] = React.useState<PredictionResult | null>(null);
  const [selectedStudent, setSelectedStudent] = React.useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePredict = async (data: StudentData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await predictStudentOutcome(data);
      setPrediction(result);
      // Scroll to result
      setTimeout(() => {
        document.getElementById('prediction-card')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('Failed to generate prediction. Please check your connection and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectStudent = (student: StudentProfile) => {
    setSelectedStudent(student);
    setViewMode('student-detail');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('predict')}>
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-zinc-900">EduRisk AI</h1>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Early Warning System</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setViewMode('predict')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                viewMode === 'predict' ? 'bg-emerald-50 text-emerald-700' : 'text-zinc-500 hover:bg-zinc-50'
              }`}
            >
              <UserPlus size={18} />
              New Prediction
            </button>
            <button 
              onClick={() => setViewMode('teacher')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                viewMode === 'teacher' ? 'bg-emerald-50 text-emerald-700' : 'text-zinc-500 hover:bg-zinc-50'
              }`}
            >
              <LayoutDashboard size={18} />
              Teacher Dashboard
            </button>
            <div className="w-px h-6 bg-zinc-200 mx-2" />
            <button className="px-4 py-2 bg-zinc-900 text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-all">
              Institutional Login
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {viewMode === 'predict' && (
            <motion.div 
              key="predict"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Left Column: Info & Form */}
              <div className="lg:col-span-5 space-y-12">
                <section>
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100">
                      <BrainCircuit size={14} />
                      XGBoost Powered Analysis
                    </div>
                    <h2 className="text-4xl font-black tracking-tight text-zinc-900 leading-tight">
                      Identify At-Risk Students <span className="text-emerald-600">Before</span> They Dropout.
                    </h2>
                    <p className="text-zinc-500 text-lg leading-relaxed">
                      EduRisk AI uses advanced machine learning to predict student outcomes after the first semester, 
                      allowing universities to trigger timely interventions and support.
                    </p>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="text-zinc-400" size={20} />
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Student Profile Input</h3>
                  </div>
                  <StudentForm onSubmit={handlePredict} isLoading={isLoading} />
                </section>
              </div>

              {/* Right Column: Results & Insights */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  {prediction ? (
                    <RiskDashboard result={prediction} />
                  ) : (
                    <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-zinc-200 rounded-3xl bg-white/50">
                      <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                        <History className="text-zinc-300" size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-2">No Prediction Yet</h3>
                      <p className="text-zinc-500 max-w-xs mx-auto">
                        Fill out the student profile on the left to generate an AI-driven outcome prediction and risk assessment.
                      </p>
                    </div>
                  )}
                </AnimatePresence>

                {error && (
                  <div className="mt-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {viewMode === 'teacher' && (
            <motion.div
              key="teacher"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TeacherDashboard 
                students={MOCK_STUDENTS} 
                onSelectStudent={handleSelectStudent} 
              />
            </motion.div>
          )}

          {viewMode === 'student-detail' && selectedStudent && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setViewMode('teacher')}
                className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Registry
              </button>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-emerald-100">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-zinc-900 tracking-tight">{selectedStudent.name}</h2>
                    <p className="text-sm font-mono text-zinc-500">Student ID: {selectedStudent.id}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-bold hover:bg-zinc-50 transition-all">
                    Download Report
                  </button>
                  <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                    Schedule Intervention
                  </button>
                </div>
              </div>

              {selectedStudent.prediction && (
                <RiskDashboard result={selectedStudent.prediction} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 opacity-50 grayscale">
              <GraduationCap size={24} />
              <span className="font-bold tracking-tight">EduRisk AI</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-zinc-400">
              <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Methodology</a>
            </div>
            <p className="text-xs text-zinc-400">
              © 2026 EduRisk AI. Built for Academic Success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
