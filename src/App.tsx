/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MoreHorizontal, 
  Plus, 
  Filter, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Edit2,
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  Bell,
  Download,
  ChevronRight
} from 'lucide-react';

// Types
type Status = 'active' | 'pending' | 'urgent' | 'completed';

interface Item {
  id: string;
  shortName: string;
  name: string;
  category: string;
  status: Status;
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  updatedAt: string;
  assignee: {
    name: string;
    avatar: string;
  };
  value: string;
}

// Sample Data
const INITIAL_ITEMS: Item[] = [
  {
    id: '1',
    shortName: 'PR',
    name: 'Q3 Product Roadmap',
    category: 'Planning',
    status: 'active',
    priority: 'High',
    updatedAt: '2h ago',
    assignee: { name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    value: '$12,400'
  },
  {
    id: '2',
    shortName: 'IM',
    name: 'API Infrastructure Migration',
    category: 'Engineering',
    status: 'urgent',
    priority: 'Critical',
    updatedAt: '4h ago',
    assignee: { name: 'Alex Rivera', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    value: '$45,000'
  },
  {
    id: '3',
    shortName: 'RR',
    name: 'Brand Identity Refresh',
    category: 'Design',
    status: 'pending',
    priority: 'Medium',
    updatedAt: '1d ago',
    assignee: { name: 'Mika Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mika' },
    value: '$8,500'
  },
  {
    id: '4',
    shortName: 'SP',
    name: 'Customer Success Portal',
    category: 'Service',
    status: 'completed',
    priority: 'Low',
    updatedAt: '2d ago',
    assignee: { name: 'James Bond', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    value: '$22,000'
  },
  {
    id: '5',
    shortName: 'BL',
    name: 'Mobile App Beta Launch',
    category: 'Product',
    status: 'active',
    priority: 'High',
    updatedAt: '5h ago',
    assignee: { name: 'Emma Watson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
    value: '$31,200'
  }
];

const StatusBadge = ({ status }: { status: Status }) => {
  const config = {
    active: { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', label: 'In Progress' },
    pending: { color: 'text-amber-600 bg-amber-50 border-amber-100', label: 'On Hold' },
    urgent: { color: 'text-rose-600 bg-rose-50 border-rose-100', label: 'Urgent' },
    completed: { color: 'text-indigo-600 bg-indigo-50 border-indigo-100', label: 'Reviewing' },
  };

  const { color, label } = config[status];

  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${color}`}>
      {label}
    </span>
  );
};

const PriorityDot = ({ priority }: { priority: Item['priority'] }) => {
  const colors = {
    High: 'bg-orange-400',
    Medium: 'bg-blue-400',
    Low: 'bg-slate-300',
    Critical: 'bg-red-400',
  };
  return (
    <div className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${colors[priority]}`} />
      <span className="text-sm text-slate-600 capitalize">{priority}</span>
    </div>
  );
};

export default function App() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'archived'>('all');

  const filteredItems = useMemo(() => {
    return INITIAL_ITEMS.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase()) || 
             item.category.toLowerCase().includes(search.toLowerCase());
    });
  }, [search]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Stratosphere UI</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600/10 text-indigo-400 rounded-lg border border-indigo-500/20 text-left">
            <LayoutDashboard className="w-5 h-5 opacity-80" />
            <span className="font-medium">Analytics</span>
          </button>
          {[
            { icon: FolderKanban, label: 'Projects' },
            { icon: Users, label: 'Customers' },
            { icon: Settings, label: 'Settings' }
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 transition-colors text-left group">
              <item.icon className="w-5 h-5 opacity-50 group-hover:opacity-100" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
              <span className="text-xs font-bold text-slate-300">JD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">James Dalton</span>
              <span className="text-xs text-slate-500">Admin Account</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header / Toolbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects, tasks, or users..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></div>
            </button>
            <div className="h-4 w-px bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-all active:scale-95">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-all active:scale-95">
              <Plus className="w-4 h-4" />
              Create New
            </button>
          </div>
        </header>

        {/* Page Body */}
        <div className="p-8 flex-1 overflow-hidden flex flex-col">
          <div className="mb-8 flex justify-between items-end shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Project Portfolio</h1>
              <p className="text-slate-500 text-sm mt-1">Track and manage your enterprise project pipelines across regions.</p>
            </div>
            <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'all' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
              >
                All Projects
              </button>
              <button 
                onClick={() => setActiveTab('archived')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'archived' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Archived
              </button>
            </div>
          </div>

          {/* List Container */}
          <div className="bg-white border border-slate-200 rounded-xl flex-1 flex flex-col overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="col-span-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Name</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Owner</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Budget</div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-50 items-center hover:bg-slate-50/80 transition-all cursor-pointer group"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded border flex items-center justify-center font-bold text-[10px] transition-transform group-hover:scale-110 ${idx % 2 === 0 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>
                        {item.shortName}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.category} • Updated {item.updatedAt}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="col-span-2">
                      <PriorityDot priority={item.priority} />
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <img src={item.assignee.avatar} alt={item.assignee.name} className="w-6 h-6 rounded-full border border-white ring-1 ring-slate-100" />
                      <span className="text-sm text-slate-600 truncate">{item.assignee.name}</span>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-sm font-mono font-medium text-slate-700">{item.value}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredItems.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                  <Search className="w-12 h-12 mx-auto opacity-10 mb-4" />
                  <p className="font-medium">No projects found matching your search.</p>
                </div>
              )}
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30 shrink-0">
              <p className="text-xs text-slate-500 font-medium">
                Showing <span className="text-slate-800">{filteredItems.length}</span> of <span className="text-slate-800">{INITIAL_ITEMS.length}</span> projects
              </p>
              <div className="flex items-center gap-2">
                <button className="p-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-all active:scale-90" disabled>
                  <ChevronRight className="w-4 h-4 text-slate-400 rotate-180" />
                </button>
                <div className="flex items-center gap-1">
                  <button className="px-3 py-1 text-xs font-bold bg-white border border-indigo-500 text-indigo-600 rounded-lg shadow-sm">1</button>
                  <button className="px-3 py-1 text-xs font-bold bg-white border border-slate-200 text-slate-500 rounded-lg hover:border-slate-300 transition-all">2</button>
                </div>
                <button className="p-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-all active:scale-90">
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

