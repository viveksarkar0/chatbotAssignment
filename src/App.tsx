import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home, MessageCircle, TicketCheck } from 'lucide-react';
import { ChatBot } from './components/ChatBot';
import { TicketList } from './components/TicketList';
import { Auth } from './components/Auth';
import { useAuthStore } from './lib/store';
import { supabase } from './lib/supabase';

function HomePage() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <div className="flex flex-col h-screen bg-indigo-600">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-white/30 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">LOGO</span>
          </div>
          <p className="text-white/60 mt-4">{user?.email}</p>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="bg-white border-t p-4">
        <div className="flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center text-indigo-600">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/chat" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Chats</span>
          </Link>
          <Link to="/tickets" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
            <TicketCheck className="w-6 h-6" />
            <span className="text-xs mt-1">Tickets</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
}

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
        });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;