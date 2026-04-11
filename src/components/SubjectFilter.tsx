import { Subject } from '../types';
import { Filter, ChevronRight, Calculator, Zap, FlaskConical, Dna, PenTool, Languages, History, Globe, Book } from 'lucide-react';

interface SubjectFilterProps {
  subjects: Subject[];
  selected: string | null;
  onSelect: (subject: string | null) => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'Toán học': return <Calculator className="w-6 h-6" />;
    case 'Vật lý': return <Zap className="w-6 h-6" />;
    case 'Hóa học': return <FlaskConical className="w-6 h-6" />;
    case 'Sinh học': return <Dna className="w-6 h-6" />;
    case 'Ngữ văn': return <PenTool className="w-6 h-6" />;
    case 'Tiếng Anh': return <Languages className="w-6 h-6" />;
    case 'Lịch sử': return <History className="w-6 h-6" />;
    case 'Địa lý': return <Globe className="w-6 h-6" />;
    default: return <Book className="w-6 h-6" />;
  }
};

export default function SubjectFilter({ subjects, selected, onSelect }: SubjectFilterProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <Filter className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-slate-800 text-lg">Khám phá theo môn học</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4">
        <button
          onClick={() => onSelect(null)}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all group ${
            selected === null 
              ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 scale-105 z-10' 
              : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:shadow-lg'
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
            selected === null ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-blue-50'
          }`}>
            <Book className={`w-6 h-6 ${selected === null ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
          </div>
          <span className="text-xs font-bold text-center">Tất cả</span>
        </button>

        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelect(subject.name)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all group ${
              selected === subject.name 
                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 scale-105 z-10' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:shadow-lg'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
              selected === subject.name ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-blue-50'
            }`}>
              <div className={`${selected === subject.name ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`}>
                {getIcon(subject.name)}
              </div>
            </div>
            <span className="text-xs font-bold text-center">{subject.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
