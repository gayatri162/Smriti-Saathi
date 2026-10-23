import React from 'react';
import {
  LayoutDashboard,
  Brain,
  Timer,
  Bell,
  Heart,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { PageId } from '../../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  pendingRemindersCount: number;
  dueAdaptiveCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  badgeColor?: string;
  accentColor: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  pendingRemindersCount,
  dueAdaptiveCount,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: '1. Dashboard',
      sublabel: 'Overview & daily focus',
      icon: LayoutDashboard,
      accentColor: 'text-purple-600',
    },
    {
      id: 'games',
      label: '2. Memory Games',
      sublabel: 'Matching & sequence recall',
      icon: Brain,
      accentColor: 'text-indigo-600',
    },
    {
      id: 'adaptive',
      label: '3. Adaptive Recall',
      sublabel: '5m to 30m spaced intervals',
      icon: Timer,
      badge: dueAdaptiveCount,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      accentColor: 'text-amber-600',
    },
    {
      id: 'reminders',
      label: '4. Daily Reminders',
      sublabel: 'Pills, meals & voice audio',
      icon: Bell,
      badge: pendingRemindersCount,
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      accentColor: 'text-rose-600',
    },
    {
      id: 'memories',
      label: '5. Personal Memories',
      sublabel: 'Family photos & recall',
      icon: Heart,
      accentColor: 'text-pink-600',
    },
    {
      id: 'progress',
      label: '6. Progress',
      sublabel: 'Cognitive charts & stats',
      icon: TrendingUp,
      accentColor: 'text-teal-600',
    },
    {
      id: 'caregiver',
      label: '7. Caregiver Dashboard',
      sublabel: 'Insights, logs & reports',
      icon: ShieldCheck,
      accentColor: 'text-emerald-600',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[65px] left-0 h-full lg:h-[calc(100vh-65px)] w-72 bg-white/95 backdrop-blur-md border-r border-purple-100 p-4 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-1.5 overflow-y-auto pr-1">
          {/* Mobile header inside sidebar */}
          <div className="lg:hidden flex items-center justify-between pb-3 mb-2 border-b border-purple-100">
            <span className="font-bold text-slate-800 text-sm">Navigation Menu</span>
            <button
              type="button"
              onClick={onCloseMobile}
              className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
            >
              Close ✕
            </button>
          </div>

          <div className="px-3 py-2 mb-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Elder & Caregiver Portals
            </p>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-100/90 to-pink-50/90 text-purple-950 font-bold shadow-xs border border-purple-200/80 scale-[1.01]'
                    : 'text-slate-600 hover:bg-purple-50/60 hover:text-purple-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p
                      className={`text-sm tracking-tight truncate ${
                        isActive ? 'text-purple-950 font-bold' : 'text-slate-700 font-semibold'
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-400 truncate group-hover:text-purple-600/80">
                      {item.sublabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full border ${
                        item.badgeColor || 'bg-purple-100 text-purple-800 border-purple-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-purple-600 translate-x-0.5' : 'text-slate-300 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Senior Warmth Widget */}
        <div className="pt-4 border-t border-purple-100">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-100 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-800 font-bold">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Namaste & Welcome</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Smriti-Saathi keeps routines gentle, memories vivid, and caregivers seamlessly connected.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
