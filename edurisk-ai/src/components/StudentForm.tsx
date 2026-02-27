import React from 'react';
import { StudentData } from '../types';
import { User, GraduationCap, CreditCard, BookOpen, Globe, TrendingUp } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (data: StudentData) => void;
  isLoading: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<StudentData>({
    ageAtEnrollment: 20,
    gender: "Female",
    nationality: "International",
    displaced: false,
    educationalSpecialNeeds: false,
    debtor: false,
    tuitionFeesUpToDate: true,
    scholarshipHolder: false,
    parentalEducation: "Secondary",
    unitsEnrolled1st: 6,
    unitsApproved1st: 5,
    unitsEvaluated1st: 6,
    unitsWithoutEvaluations1st: 0,
    gradeAverage1st: 14,
    unemploymentRate: 10.5,
    inflationRate: 2.5,
    gdp: 1.5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value as string) : val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="student-form" onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Demographics */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-500 mb-4">
            <User size={18} />
            <h3 className="font-semibold uppercase tracking-wider text-xs">Demographics</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Age at Enrollment</label>
              <input
                type="number"
                name="ageAtEnrollment"
                value={formData.ageAtEnrollment}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial Status */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-500 mb-4">
            <CreditCard size={18} />
            <h3 className="font-semibold uppercase tracking-wider text-xs">Financial Status</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 hover:bg-zinc-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                name="debtor"
                checked={formData.debtor}
                onChange={handleChange}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="text-sm text-zinc-700">Debtor</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 hover:bg-zinc-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                name="tuitionFeesUpToDate"
                checked={formData.tuitionFeesUpToDate}
                onChange={handleChange}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="text-sm text-zinc-700">Tuition Fees Up to Date</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 hover:bg-zinc-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                name="scholarshipHolder"
                checked={formData.scholarshipHolder}
                onChange={handleChange}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="text-sm text-zinc-700">Scholarship Holder</span>
            </label>
          </div>
        </div>

        {/* Academic Performance */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-zinc-500 mb-4">
            <BookOpen size={18} />
            <h3 className="font-semibold uppercase tracking-wider text-xs">Academic Performance (1st Semester)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Units Enrolled</label>
              <input type="number" name="unitsEnrolled1st" value={formData.unitsEnrolled1st} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Units Approved</label>
              <input type="number" name="unitsApproved1st" value={formData.unitsApproved1st} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Units Evaluated</label>
              <input type="number" name="unitsEvaluated1st" value={formData.unitsEvaluated1st} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">No Evaluations</label>
              <input type="number" name="unitsWithoutEvaluations1st" value={formData.unitsWithoutEvaluations1st} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Grade Average</label>
              <input type="number" step="0.1" name="gradeAverage1st" value={formData.gradeAverage1st} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            </div>
          </div>
        </div>

        {/* Macroeconomic */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-zinc-500 mb-4">
            <TrendingUp size={18} />
            <h3 className="font-semibold uppercase tracking-wider text-xs">Macroeconomic Indicators</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Unemployment Rate (%)</label>
              <input type="number" step="0.1" name="unemploymentRate" value={formData.unemploymentRate} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Inflation Rate (%)</label>
              <input type="number" step="0.1" name="inflationRate" value={formData.inflationRate} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">GDP Growth (%)</label>
              <input type="number" step="0.1" name="gdp" value={formData.gdp} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            </div>
          </div>
        </div>
      </div>

      <button
        id="predict-button"
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing Student Data...
          </>
        ) : (
          <>
            <GraduationCap size={20} />
            Predict Student Outcome
          </>
        )}
      </button>
    </form>
  );
};
