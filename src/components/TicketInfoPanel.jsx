import { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, Plus, Check } from 'lucide-react';

function TicketInfoPanel({ ticket, onUpdate }) {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [expandedSections, setExpandedSections] = useState({
        tasks: true,
        collectedFields: false,
        linkedTickets: true,
        history: false
    });

    const toggleDropdown = (field) => {
        setActiveDropdown(activeDropdown === field ? null : field);
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleFieldUpdate = (field, value) => {
        onUpdate(ticket.id, { [field]: value });
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'High':
            case 'Critical':
                return <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                </div>;
            case 'Medium':
                return <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <div className="w-2.5 h-0.5 bg-current rounded-full" />
                </div>;
            case 'Low':
                return <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                </div>;
            default:
                return <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <div className="w-2.5 h-0.5 bg-current rounded-full" />
                </div>;
        }
    };

    return (
        <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 space-y-6">

                    {/* Fields Group */}
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Status</label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <button
                                        onClick={() => toggleDropdown('status')}
                                        className="w-full flex items-center justify-between px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium shadow-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>{ticket.status || 'To Do'}</span>
                                        </div>
                                        <ChevronDown size={14} className="text-white" />
                                    </button>

                                    {activeDropdown === 'status' && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                            {['To Do', 'In Progress', 'In Review', 'Done'].map(opt => (
                                                <button
                                                    key={opt}
                                                    onClick={() => { handleFieldUpdate('status', opt); setActiveDropdown(null); }}
                                                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                                                >
                                                    <span>{opt}</span>
                                                    {ticket.status === opt && <Check size={14} className="text-blue-600" />}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Priority */}
                        <div className="group">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Priority</label>
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('priority')}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        {getPriorityIcon(ticket.priority || 'Medium')}
                                        <span className="text-sm text-gray-700 font-medium">{ticket.priority || 'Medium'}</span>
                                    </div>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>

                                {activeDropdown === 'priority' && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                        {['Low', 'Medium', 'High', 'Critical'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => { handleFieldUpdate('priority', opt); setActiveDropdown(null); }}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                {getPriorityIcon(opt)}
                                                <span>{opt}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Assigned To */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">Assigned To</label>
                                <span className="text-xs text-blue-600 hover:underline cursor-pointer font-medium">Assign to me</span>
                            </div>
                            <button className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm">
                                <div className="flex items-center gap-2">
                                    {ticket.assignee ? (
                                        <>
                                            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                                                {ticket.assignee.avatarUrl ? (
                                                    <img src={ticket.assignee.avatarUrl} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-600 text-xs font-bold">
                                                        {ticket.assignee.avatar || 'A'}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">{ticket.assignee.name}</span>
                                        </>
                                    ) : <span className="text-sm text-gray-400">Unassigned</span>}
                                </div>
                                <ChevronDown size={14} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Project */}
                        <div className="group">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Project</label>
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('project')}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
                                >
                                    <span className="text-sm text-gray-700 font-medium">{ticket.project || 'Administrative'}</span>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>
                                {activeDropdown === 'project' && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                        {['Administrative', 'Development', 'Support'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => { handleFieldUpdate('project', opt); setActiveDropdown(null); }}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Ticket Type */}
                        <div className="group">
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Ticket Type</label>
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('ticketType')}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Check size={10} strokeWidth={3} />
                                        </div>
                                        <span className="text-sm text-gray-700 font-medium">{ticket.ticketType || 'Task'}</span>
                                    </div>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </button>
                                {activeDropdown === 'ticketType' && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                        {['Task', 'Bug', 'Story', 'Epic'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => { handleFieldUpdate('ticketType', opt); setActiveDropdown(null); }}
                                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <div className={`w-4 h-4 rounded flex items-center justify-center ${opt === 'Bug' ? 'bg-red-100 text-red-600' :
                                                    opt === 'Story' ? 'bg-green-100 text-green-600' :
                                                        'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    {opt === 'Bug' ? '🐛' : opt === 'Story' ? '📖' : <Check size={10} strokeWidth={3} />}
                                                </div>
                                                <span>{opt}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Due Date</label>
                            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors cursor-pointer group-hover:border-blue-400">
                                <Calendar size={16} className="text-gray-400" />
                                <input
                                    type="date"
                                    value={ticket.dueDate ? new Date(ticket.dueDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleFieldUpdate('dueDate', e.target.value)}
                                    className="w-full text-sm text-gray-700 font-medium bg-transparent focus:outline-none placeholder-gray-400"
                                    placeholder="mm/dd/yyyy"
                                />
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                        </div>

                        {/* Reporter */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Reporter</label>
                            <button className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm">
                                <div className="flex items-center gap-2">
                                    {ticket.reporter ? (
                                        <>
                                            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                                                {ticket.reporter.avatarUrl ? (
                                                    <img src={ticket.reporter.avatarUrl} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs font-bold">
                                                        {ticket.reporter.avatar || 'R'}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">{ticket.reporter.name}</span>
                                        </>
                                    ) : <span className="text-sm text-gray-400">Select</span>}
                                </div>
                                <ChevronDown size={14} className="text-gray-400" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Tags</label>
                            <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-600 transition-colors">
                                <Plus size={12} />
                                Add Tag
                                <Plus size={12} className="ml-1 opacity-50" />
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-2 space-y-0 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <div className="border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('tasks')}
                                className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 -mx-2 rounded"
                            >
                                <span>TASKS</span>
                                {expandedSections.tasks ? <ChevronRight size={16} className="rotate-90 transition-transform" /> : <ChevronRight size={16} className="transition-transform" />}
                            </button>
                            {expandedSections.tasks && (
                                <div className="pb-3 px-2">
                                    <span className="text-gray-400 font-normal normal-case">No tasks linked.</span>
                                </div>
                            )}
                        </div>

                        <div className="border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('collectedFields')}
                                className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 -mx-2 rounded"
                            >
                                <span>COLLECTED FIELDS</span>
                                {expandedSections.collectedFields ? <ChevronRight size={16} className="rotate-90 transition-transform" /> : <ChevronRight size={16} className="transition-transform" />}
                            </button>
                        </div>

                        <div className="border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('linkedTickets')}
                                className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 -mx-2 rounded"
                            >
                                <div className="flex items-center gap-2">
                                    <span>LINKED TICKETS</span>
                                    <span className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">2</span>
                                </div>
                                {expandedSections.linkedTickets ? <ChevronRight size={16} className="rotate-90 transition-transform" /> : <ChevronRight size={16} className="transition-transform" />}
                            </button>
                            {expandedSections.linkedTickets && (
                                <div className="pb-3 px-2 space-y-2">
                                    
                                    <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded hover:shadow-sm cursor-pointer group">
                                        <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                            <Check size={10} strokeWidth={3} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold text-gray-800">DEV-102 Backend API</span>
                                            </div>
                                            <div className="text-[10px] text-gray-500 truncate">Implement backend endpoints</div>
                                        </div>
                                        <div className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Done</div>
                                    </div>

                                   
                                    <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded hover:shadow-sm cursor-pointer group">
                                        <span className="text-red-500 text-xs flex-shrink-0">🐛</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold text-gray-800">QA-55 Regression</span>
                                            </div>
                                            <div className="text-[10px] text-gray-500 truncate">Fix regression in login flow</div>
                                        </div>
                                        <div className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">In Review</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* History */}
                        <div className="border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('history')}
                                className="w-full flex items-center justify-between py-3 hover:bg-gray-50 px-2 -mx-2 rounded"
                            >
                                <span>HISTORY</span>
                                {expandedSections.history ? <ChevronRight size={16} className="rotate-90 transition-transform" /> : <ChevronRight size={16} className="transition-transform" />}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TicketInfoPanel;
