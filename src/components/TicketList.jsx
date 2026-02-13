import { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronsLeft, ChevronsRight, ListFilter, RotateCcw, Plus } from 'lucide-react';

function TicketList({ tickets, selectedTicket, onTicketSelect, filter, searchQuery, toggleSidebar }) {
  const [activePriorityFilter, setActivePriorityFilter] = useState('All');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(null);

  const filteredTickets = tickets.filter(ticket => {
    // Apply search filter
    if (searchQuery && !ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply priority filter
    if (activePriorityFilter !== 'All' && ticket.priority.toLowerCase() !== activePriorityFilter.toLowerCase()) {
      return false;
    }

    return true;
  });

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString('en', { month: 'short' });
    const day = d.getDate();
    return `${month} ${day}`;
  };

  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return <span className="text-red-500">🔴</span>;
      case 'high':
        return <span className="text-orange-500">🟠</span>;
      case 'medium':
        return <span className="text-yellow-500">🟡</span>;
      case 'low':
        return <span className="text-green-500">🟢</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          <button onClick={toggleSidebar} className="p-1 hover:bg-gray-100 rounded cursor-pointer">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="font-semibold text-gray-900">My Tickets</h2>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`p-1 rounded hover:bg-gray-100 ${isFilterPanelOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-400'}`}
            title="Toggle Filter Panel"
          >
            <SlidersHorizontal size={20} />
          </button>

          {/* Rich Filter Dropdown */}
          {isFilterPanelOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col max-h-[80vh]">
              {/* Dropdown Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-lg">
                <div className="flex items-center gap-2 text-blue-900 font-semibold">
                  <ListFilter size={18} className="text-blue-600" />
                  <span>Ticket Filters</span>
                </div>
                <button
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Reset Button */}
              <div className="px-4 py-2 border-b border-gray-50 flex justify-end">
                <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
                  <RotateCcw size={12} />
                  Reset all
                </button>
              </div>

              {/* Filters Body */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {['Project', 'Type', 'Status', 'Assignee'].map((label) => (
                  <div key={label} className="border border-gray-200 rounded bg-white">
                    <button
                      onClick={() => setExpandedFilter(expandedFilter === label ? null : label)}
                      className="w-full px-3 py-2 text-sm flex items-center justify-between text-gray-700 hover:bg-gray-50 transition"
                    >
                      <span>{label}: All</span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedFilter === label ? 'text-blue-600 rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedFilter === label && (
                      <div className="border-t border-gray-100 p-2 bg-gray-50">
                        {['All', 'Option 1', 'Option 2', 'Option 3'].map((option) => (
                          <div key={option} className="flex items-center gap-2 px-2 py-1.5 hover:bg-white rounded cursor-pointer text-sm text-gray-600">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${option === 'All' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                              {option === 'All' && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <button className="flex items-center gap-1 text-blue-600 text-sm font-medium mt-4 px-1">
                  <Plus size={16} />
                  <span>More</span>
                </button>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                <button className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search within list */}
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tickets"
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => onTicketSelect(ticket)}
            className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition ticket-item ${selectedTicket?.id === ticket.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'
              }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">{ticket.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <input type="checkbox" className="rounded" />
                  <span className="font-medium text-blue-600">{ticket.ticketId}</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                    {ticket.status}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              {getPriorityIcon(ticket.priority)}

              {/* Status indicators */}
              <div className="flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-xs">
                  ⏰
                </span>
                <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
              </div>

              <div className="flex-1"></div>

              {/* Assignee avatar */}
              {ticket.assignee && (
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-semibold">
                  {ticket.assignee.avatar}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketList;