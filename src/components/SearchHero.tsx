import { Search } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchHeroProps {
  onSearch: (query: string) => void;
}

export default function SearchHero({ onSearch }: SearchHeroProps) {
  return (
    <section className="relative py-16 px-4 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
        >
          Tra cứu kiến thức <br />
          <span className="text-blue-200">Ôn thi tốt nghiệp 12</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-blue-100 text-lg mb-10 max-w-xl mx-auto"
        >
          Tìm kiếm nhanh lý thuyết, ví dụ minh họa của tất cả các môn học chỉ trong vài giây.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-4 py-5 bg-white border-none rounded-2xl text-lg text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-blue-400/30 transition-all shadow-2xl shadow-blue-900/20"
            placeholder="Nhập từ khóa kiến thức cần tìm..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <div className="absolute inset-y-2 right-2 flex items-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Tìm kiếm
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
