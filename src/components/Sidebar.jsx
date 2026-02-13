import { Ticket, Lightbulb, User, BarChart3, Settings, ScrollText, Calculator, Grid2x2X, Layers, Workflow, Bot, Database, RotateCw } from "lucide-react";

function Sidebar({ filter, setFilter, stats, isOpen }) {
  const views = [
    { id: 'my-tickets', label: 'My Tickets', count: stats?.myTickets || 9 },
    { id: 'past-due', label: 'Past Due', count: stats?.pastDue || 4 },
    { id: 'high-priority', label: 'High Priority', count: stats?.highPriority || 11 },
    { id: 'unassigned', label: 'Unassigned', count: stats?.unassigned || 98 },
    { id: 'all-tickets', label: 'All Tickets', count: stats?.allTickets || 2192 }
  ];

  const sidebarIcons = [
    { icon: Ticket, label: "Tickets", active: true },
    { icon: Lightbulb, label: "Ideas" },
    { icon: User, label: "Profile" },
    { icon: ScrollText, label: "Notes" },
    { icon: Calculator, label: "calculator" },
    { icon: Grid2x2X, label: "Grid" },
    { icon: Layers, label: "Layers" },
    { icon: Workflow, label: "Workflow" },
    { icon: Bot, label: "Bot" },
    { icon: Database, label: "Database" },
    { icon: RotateCw, label: "play" },
    { icon: BarChart3, label: "Reports" },
    { icon: Settings, label: "Settings" }
  ];


  return (
    <div className={`${isOpen ? 'w-64' : 'w-14'} bg-[#111184] text-white flex transition-all duration-300 ease-in-out`}>
      {/* Icon sidebar */}
      <div className="w-14 bg-[#111184] flex flex-col items-center py-4">
        {sidebarIcons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              className={`w-10 h-10 rounded flex items-center justify-center ${item.active ? 'bg-[#0052CC]' : 'hover:bg-[#0052CC]'
                } transition`}
              title={item.label}
            >
              <span className="text-xl"><Icon /></span>
            </button>
          );
        })}
      </div>

      {/* Views panel */}
      {isOpen && (
        <div className="flex-1 p-4 min-w-[200px] bg-white/96 text-black">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase text-gray-500">Ticket Views</h3>
              <button className="text-gray-400 hover:text-black">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="space-y-1">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setFilter(view.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded transition ${filter === view.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-white/50'
                    }`}
                >
                  <span className="text-sm font-medium">{view.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${filter === view.id ? 'bg-white text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    {view.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 px-3 hover:text-black cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>LIVE CHATS</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 px-3 hover:text-black cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <span>BOARDS</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;