import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

function TicketConversation({ ticket, onAddComment, onUpdate }) {
    const [activeTab, setActiveTab] = useState('public');
    const [comment, setComment] = useState('');
    const [activeDropdown, setActiveDropdown] = useState(null);

    const formatDateTime = (date) => {
        return new Date(date).toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });
    };

    const handleAddComment = () => {
        if (comment.trim()) {
            onAddComment(ticket.id, {
                author: { name: 'Current User', email: 'user@example.com' },
                text: comment,
                attachments: []
            });
            setComment('');
        }
    };

    const toggleDropdown = (field) => {
        setActiveDropdown(activeDropdown === field ? null : field);
    };

    return (
        <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h1 className="text-xl font-semibold text-gray-900">{ticket.title}</h1>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="font-medium text-blue-600">{ticket.ticketId} ({ticket.id})</span>
                            <span>Created {formatDateTime(ticket.createdAt)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 rounded text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{ticket.watchers}</span>
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-1 ml-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                                {ticket.assignee?.avatar}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                                A
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
                <div className="flex gap-6">
                    <button
                        onClick={() => setActiveTab('public')}
                        className={`py-3 border-b-2 font-medium text-sm ${activeTab === 'public' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                    >
                        Public Reply
                    </button>
                    <button
                        onClick={() => setActiveTab('private')}
                        className={`py-3 border-b-2 font-medium text-sm ${activeTab === 'private' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                    >
                        Private Comment
                    </button>
                </div>
            </div>

            {/* Comment Input */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="mb-2">
                    <span className="text-sm text-gray-600">To:</span>
                    <span className="ml-2 text-sm">
                        <span className="inline-flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                            <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">A</span>
                            <span>Allison Westervelt &lt;awestervelt@email.com&gt;</span>
                            <button className="text-gray-400 hover:text-gray-600">×</button>
                        </span>
                    </span>
                    <button className="ml-4 text-sm text-gray-600">Cc</button>
                </div>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a reply..."
                    className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                />

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded" title="Bold"><span className="font-bold">B</span></button>
                        <button className="p-2 hover:bg-gray-100 rounded" title="Italic"><span className="italic">I</span></button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="text-sm text-gray-600 hover:text-gray-900">Add to KB</button>
                        <button
                            onClick={handleAddComment}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Thread */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {ticket.comments && ticket.comments.map((c) => (
                    <div key={c.id} className="border-l-2 border-gray-200 pl-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                {c.author.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm">{c.author.name}</span>
                                    <span className="text-xs text-gray-500">{formatDateTime(c.timestamp)}</span>
                                </div>
                                <div className="text-sm text-gray-600 mb-1">To {c.author.email}</div>
                                <p className="text-sm text-gray-900 mb-3">{c.text}</p>
                                {c.attachments && c.attachments.length > 0 && (
                                    <div className="flex gap-2">
                                        {c.attachments.map((att, idx) => (
                                            <div key={idx} className="px-3 py-2 bg-gray-100 rounded text-xs text-gray-700">{att}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TicketConversation;
