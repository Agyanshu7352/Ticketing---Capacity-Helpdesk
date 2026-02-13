import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, ticketsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/tickets')
      ]);

      const statsData = await statsRes.json();
      const ticketsData = await ticketsRes.json();

      setStats(statsData);
      setRecentTickets(ticketsData.slice(0, 5));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  };

  const priorityColors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800',
  };

  if (loading) {
    return <div className="flex justify-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <Link
          to="/create-ticket"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Ticket
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tickets</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.open}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.resolved}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-red-900">{stats.critical}</p>
            <p className="text-sm text-red-700 mt-1 uppercase font-medium">Critical</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-orange-900">{stats.high}</p>
            <p className="text-sm text-orange-700 mt-1 uppercase font-medium">High</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-yellow-900">{stats.medium}</p>
            <p className="text-sm text-yellow-700 mt-1 uppercase font-medium">Medium</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-900">{stats.low}</p>
            <p className="text-sm text-blue-700 mt-1 uppercase font-medium">Low</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
          <Link to="/tickets" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            View All →
          </Link>
        </div>
        <div className="space-y-3">
          {recentTickets.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/tickets/${ticket.id}`}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{ticket.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[ticket.status]}`}>
                  {ticket.status}
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColors[ticket.priority]}`}>
                  {ticket.priority}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;