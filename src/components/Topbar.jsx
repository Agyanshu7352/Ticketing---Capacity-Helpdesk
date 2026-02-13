import { Gift } from "lucide-react";

function TopBar({ user, onLogout, searchQuery, setSearchQuery }) {
    return (
        <div className="bg-[#111184] text-white px-6 py-3 flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xl">C</span>
                </div>
                <h1 className="text-xl font-semibold">Helpdesk</h1>
            </div>

            {/* Center: Search Bar */}
            <div className="relative flex-1 max-w-xl mx-4">
                <input
                    type="text"
                    placeholder="Search Capacity..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded bg-[#070738] text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <svg className="w-5 h-5 absolute left-3 top-2.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded font-medium transition">
                    Create
                </button>

                <div className="flex items-center gap-3">

                    <button className="w-8 h-8 rounded-full hover:bg-blue-700 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    <button className="w-8 h-8 rounded-full hover:bg-blue-700 flex items-center justify-center text-blue-200">
                        <Gift size={20} />
                    </button>

                    <button
                        onClick={onLogout}
                        className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold hover:bg-orange-600 transition"
                    >
                        {user.avatar || user.name.charAt(0).toUpperCase()}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TopBar;