import { KnowledgeItem } from '../types';
import { motion } from 'motion/react';
import { Tag, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface KnowledgeCardProps {
  item: KnowledgeItem;
  onClick: () => void;
}

export default function KnowledgeCard({ item, onClick }: KnowledgeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
          {item.subject}
        </span>
        <span className="text-xs text-slate-400">
          {new Date(item.createdAt).toLocaleDateString('vi-VN')}
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
        {item.title}
      </h3>

      <div className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {item.summary}
        </ReactMarkdown>
      </div>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {item.keywords.slice(0, 3).map((keyword, i) => (
            <span key={i} className="flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
              <Tag className="w-2 h-2" />
              {keyword}
            </span>
          ))}
          {item.keywords.length > 3 && (
            <span className="text-[10px] font-medium text-slate-400 px-2 py-1">
              +{item.keywords.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center text-blue-600 text-sm font-bold group-hover:gap-2 transition-all">
          Xem chi tiết
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </motion.div>
  );
}
