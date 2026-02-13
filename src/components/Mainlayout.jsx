import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TicketList from './TicketList';
import TicketConversation from './TicketConversation';
import TicketInfoPanel from './TicketInfoPanel';
import TopBar from './TopBar';

function MainLayout({ user, onLogout }) {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [filter, setFilter] = useState('my-tickets');
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };



    const MOCK_TICKETS = [
        {
            id: 1,
            ticketId: 'OPS-102',
            title: 'Laudantium neque veritatis',
            status: 'To Do',
            priority: 'Medium',
            project: 'Administrative',
            ticketType: 'Task',
            dueDate: '2023-11-14',
            watchers: 2,
            createdAt: '2022-11-14T12:32:00',
            assignee: {
                name: 'Allie Harmon',
                avatar: 'A',
                avatarUrl: null
            },
            reporter: {
                name: 'Allie Harmon',
                avatar: 'A',
                avatarUrl: null
            },
            description: 'Ex beatae aliquid mollitia...',
            comments: [
                {
                    id: 1,
                    author: { name: 'Allie Harmon', email: 'ally@example.com' },
                    text: 'Ex beatae aliquid mollitia. Enim doloremque molestiae voluptatem recusandae.',
                    timestamp: '2022-02-09T10:31:00',
                    attachments: ['Screen_shot.png', 'Screen_shot.png']
                },
                {
                    id: 2,
                    author: { name: 'Allie Harmon', email: 'ally@example.com' },
                    text: 'Dolorem similique et aliquid illum dolor. Vel quo magnam.',
                    timestamp: '2022-02-09T10:31:00'
                }
            ]
        },
        {
            id: 2,
            ticketId: 'APPS-216',
            title: 'Soluta quam velit',
            status: 'In Progress',
            priority: 'Critical',
            project: 'Development',
            ticketType: 'Bug',
            dueDate: '2023-06-02',
            watchers: 5,
            createdAt: '2023-06-02T09:00:00',
            assignee: { name: 'John Doe', avatar: 'J' },
            reporter: { name: 'Jane Smith', avatar: 'S' },
            comments: []
        }
    ];

    // Mock Stats
    const MOCK_STATS = {
        total: 2192,
        open: 98,
        closed: 2094
    };

    useEffect(() => {
        setTickets(MOCK_TICKETS);
        setStats(MOCK_STATS);
        if (MOCK_TICKETS.length > 0) {
            setSelectedTicket(MOCK_TICKETS[0]);
        }
        setLoading(false);
    }, []);

    const handleTicketSelect = (ticket) => {
        setSelectedTicket(ticket);
    };

    const handleTicketUpdate = (ticketId, updates) => {

        setTickets(prevTickets => {
            const updatedTickets = prevTickets.map(t =>
                t.id === ticketId ? { ...t, ...updates } : t
            );
            return updatedTickets;
        });

        setSelectedTicket(prev =>
            prev && prev.id === ticketId ? { ...prev, ...updates } : prev
        );
    };

    const handleAddComment = (ticketId, comment) => {
        const newComment = {
            id: Date.now(),
            ...comment,
            timestamp: new Date().toISOString()
        };

        setTickets(prevTickets => {
            const updatedTickets = prevTickets.map(t => {
                if (t.id === ticketId) {
                    return {
                        ...t,
                        comments: [...(t.comments || []), newComment]
                    };
                }
                return t;
            });
            return updatedTickets;
        });

        setSelectedTicket(prev => {
            if (prev && prev.id === ticketId) {
                return {
                    ...prev,
                    comments: [...(prev.comments || []), newComment]
                };
            }
            return prev;
        });
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <TopBar user={user} onLogout={onLogout} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <Sidebar
                    filter={filter}
                    setFilter={setFilter}
                    stats={stats}
                    isOpen={isSidebarOpen}
                />

                {/* Middle - Ticket List */}
                <TicketList
                    tickets={tickets}
                    selectedTicket={selectedTicket}
                    onTicketSelect={handleTicketSelect}
                    filter={filter}
                    searchQuery={searchQuery}
                    toggleSidebar={toggleSidebar}
                />

                {/* Right Area - Converstation + Info Panel */}
                {selectedTicket && (
                    <>
                        <TicketConversation
                            ticket={selectedTicket}
                            onAddComment={handleAddComment}
                            onUpdate={handleTicketUpdate}
                        />
                        <TicketInfoPanel
                            ticket={selectedTicket}
                            onUpdate={handleTicketUpdate}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default MainLayout;