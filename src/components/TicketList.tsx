import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Home, MessageCircle, TicketCheck } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high';
  date: string;
}

const tickets: Ticket[] = [
  { id: '#10098', title: 'Account Verification Delay', status: 'open', priority: 'high', date: 'Jan 15' },
  { id: '#10045', title: 'Payment Not Processing', status: 'open', priority: 'medium', date: 'Jan 14' },
  { id: '#10235', title: 'Refund Request', status: 'closed', priority: 'low', date: 'Feb 1' },
  { id: '#10012', title: 'Login Issue', status: 'pending', priority: 'high', date: 'Feb 2' },
  { id: '#19012', title: 'Refund', status: 'open', priority: 'medium', date: 'Feb 3' },
];

export function TicketList() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-indigo-600 font-semibold">U</span>
        </div>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-indigo-600 font-semibold">U</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-indigo-900">My Tickets</h1>
          <p className="text-gray-500 text-sm">Track and manage your support requests in one place.</p>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full whitespace-nowrap">
            OPEN (3)
          </button>
          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-full whitespace-nowrap">
            CLOSED (3)
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full whitespace-nowrap">
            PENDING (3)
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Ticket Overview</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Apply Filters</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-full text-sm">
                Open (2)
              </button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                Newest
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Tickets"
              className="w-full p-3 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${
                ticket.priority === 'high' ? 'bg-red-500' :
                ticket.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <div className="flex-1">
                <div className="text-gray-600 text-sm">{ticket.id}</div>
                <div className="font-medium">{ticket.title}</div>
              </div>
              <div className="text-gray-500 text-sm">{ticket.date}</div>
            </div>
          ))}
        </div>

        <button className="w-full text-center text-gray-500 py-4 hover:text-indigo-600">
          Load more...
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t p-4">
        <div className="flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/chat" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Chats</span>
          </Link>
          <Link to="/tickets" className="flex flex-col items-center text-indigo-600">
            <TicketCheck className="w-6 h-6" />
            <span className="text-xs mt-1">Tickets</span>
          </Link>
        </div>
      </div>
    </div>
  );
}