import { User } from 'firebase/auth';
import { UserProfile } from '../types';
import { BookOpen, LogIn, LogOut, LayoutDashboard, Bookmark, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  user: User | null;
  profile: UserProfile | null;
  onLogin: () => void;
  onLogout: () => void;
  setView: (view: 'home' | 'admin' | 'bookmarks') => void;
  currentView: string;
}

export default function Navbar({ user, profile, onLogin, onLogout, setView, currentView }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
            EduQuest 12
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setView('home')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'home' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Trang chủ
          </button>

          {user && (
            <button 
              onClick={() => setView('bookmarks')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                currentView === 'bookmarks' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Bộ sưu tập</span>
            </button>
          )}

          {profile?.role === 'admin' && (
            <button 
              onClick={() => setView('admin')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                currentView === 'admin' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Quản trị</span>
            </button>
          )}

          <div className="h-6 w-px bg-slate-200 mx-2" />

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border border-slate-200" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-slate-500" />
                  </div>
                )}
                <span className="text-sm font-medium text-slate-700 hidden lg:block">
                  {profile?.displayName || user.displayName}
                </span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Đăng xuất"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
