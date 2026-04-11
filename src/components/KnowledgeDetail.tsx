import { KnowledgeItem } from '../types';
import { motion } from 'motion/react';
import { X, Tag, BookOpen, Lightbulb, Share2, Bookmark, MessageSquare, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { User } from 'firebase/auth';

interface KnowledgeDetailProps {
  item: KnowledgeItem;
  onClose: () => void;
  allKnowledge: KnowledgeItem[];
  user: User | null;
}

export default function KnowledgeDetail({ item, onClose, allKnowledge, user }: KnowledgeDetailProps) {
  // Find related knowledge based on shared keywords
  const related = allKnowledge
    .filter(k => k.id !== item.id && k.keywords.some(kw => item.keywords.includes(kw)))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {item.subject}
            </span>
            <span className="text-sm text-slate-400 hidden sm:block">
              Cập nhật: {new Date(item.updatedAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
            {item.title}
          </h1>

          {item.image_url && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <div className="flex items-center gap-2 mb-4 text-blue-600">
                  <BookOpen className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Tóm tắt lý thuyết</h2>
                </div>
                <div className="prose prose-slate max-w-none bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {item.summary}
                  </ReactMarkdown>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4 text-amber-500">
                  <Lightbulb className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Ví dụ minh họa</h2>
                </div>
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-slate-800 italic">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {item.example}
                  </ReactMarkdown>
                </div>
              </section>

              <section className="pt-10 border-t border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Kiến thức liên quan</h3>
                </div>
                {related.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.map(rel => (
                      <div 
                        key={rel.id}
                        className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors truncate pr-4">
                          {rel.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-all" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm italic">Không có kiến thức liên quan nào được tìm thấy.</p>
                )}
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600" />
                  Từ khóa
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg">
                      {kw}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Phản hồi
                </h3>
                <p className="text-blue-700 text-sm mb-4">
                  Bạn thấy kiến thức này có ích không? Hãy gửi báo cáo nếu có sai sót.
                </p>
                <button className="w-full py-2 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors border border-blue-200 shadow-sm">
                  Gửi báo cáo
                </button>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
