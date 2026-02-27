import React from 'react';
import { StudentProfile, StudentOutcome, DashboardStats } from '../types';
import { motion } from 'motion/react';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  MoreHorizontal,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

interface TeacherDashboardProps {
  students: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ students, onSelectStudent }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const stats: DashboardStats = React.useMemo(() => {
    const total = students.length;
    const highRisk = students.filter(s => (s.prediction?.riskScore ?? 0) >= 70).length;
    const mediumRisk = students.filter(s => (s.prediction?.riskScore ?? 0) >= 40 && (s.prediction?.riskScore ?? 0) < 70).length;
    const lowRisk = students.filter(s => (s.prediction?.riskScore ?? 0) < 40).length;
    const avgRisk = students.reduce((acc, s) => acc + (s.prediction?.riskScore ?? 0), 0) / total;

    const distribution = {
      [StudentOutcome.DROPOUT]: students.filter(s => s.prediction?.outcome === StudentOutcome.DROPOUT).length,
      [StudentOutcome.ENROLLED]: students.filter(s => s.prediction?.outcome === StudentOutcome.ENROLLED).length,
      [StudentOutcome.GRADUATE]: students.filter(s => s.prediction?.outcome === StudentOutcome.GRADUATE).length,
    };

    return {
      totalStudents: total,
      highRiskCount: highRisk,
      mediumRiskCount: mediumRisk,
      lowRiskCount: lowRisk,
      averageRiskScore: Math.round(avgRisk),
      outcomeDistribution: distribution,
    };
  }, [students]);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskBadge = (score: number) => {
    if (score >= 70) return <span className="px-2 py-1 rounded-md bg-rose-100 text-rose-700 text-[10px] font-bold uppercase">High Risk</span>;
    if (score >= 40) return <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">Medium Risk</span>;
    return <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">Low Risk</span>;
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Students" 
          value={stats.totalStudents} 
          icon={<Users className="text-blue-600" />} 
          trend="+2 this week"
        />
        <StatCard 
          title="High Risk" 
          value={stats.highRiskCount} 
          icon={<AlertTriangle className="text-rose-600" />} 
          trend="Needs attention"
          isAlert={stats.highRiskCount > 0}
        />
        <StatCard 
          title="Avg Risk Score" 
          value={`${stats.averageRiskScore}%`} 
          icon={<TrendingDown className="text-amber-600" />} 
          trend="-3% from last term"
        />
        <StatCard 
          title="Graduation Prob." 
          value={`${Math.round((stats.outcomeDistribution[StudentOutcome.GRADUATE] / stats.totalStudents) * 100)}%`} 
          icon={<CheckCircle2 className="text-emerald-600" />} 
          trend="Stable"
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Student Risk Registry</h2>
            <p className="text-sm text-zinc-500">Monitoring academic progression and dropout vulnerability</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
              />
            </div>
            <button className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-100">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Predicted Outcome</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4">Last Assessment</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredStudents.map((student) => (
                <motion.tr 
                  key={student.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-zinc-50/50 transition-colors cursor-pointer group"
                  onClick={() => onSelectStudent(student)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-600">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-zinc-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500 font-mono">{student.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        student.prediction?.outcome === StudentOutcome.GRADUATE ? 'bg-emerald-500' :
                        student.prediction?.outcome === StudentOutcome.DROPOUT ? 'bg-rose-500' : 'bg-blue-500'
                      }`} />
                      <span className="text-sm font-medium text-zinc-700">{student.prediction?.outcome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRiskBadge(student.prediction?.riskScore ?? 0)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs">
                      <Clock size={14} />
                      {student.lastUpdated}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-zinc-50/50 border-t border-zinc-100 flex justify-between items-center">
          <span className="text-xs text-zinc-500">Showing {filteredStudents.length} of {students.length} students</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold text-zinc-600 bg-white border border-zinc-200 rounded hover:bg-zinc-50">Previous</button>
            <button className="px-3 py-1 text-xs font-bold text-zinc-600 bg-white border border-zinc-200 rounded hover:bg-zinc-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  isAlert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, isAlert }) => (
  <div className={`p-6 bg-white rounded-2xl border ${isAlert ? 'border-rose-200 bg-rose-50/30' : 'border-zinc-200'} shadow-sm`}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-zinc-50 rounded-lg">
        {icon}
      </div>
      <ArrowUpRight size={16} className="text-zinc-300" />
    </div>
    <div className="space-y-1">
      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{title}</h3>
      <div className="text-2xl font-black text-zinc-900">{value}</div>
      <p className={`text-[10px] font-bold ${isAlert ? 'text-rose-600' : 'text-zinc-400'}`}>{trend}</p>
    </div>
  </div>
);
