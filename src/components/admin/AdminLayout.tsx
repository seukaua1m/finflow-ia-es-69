
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, MessageSquare, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate('/admin/auth');
      } else {
        setAuthenticated(true);
      }
      
      setLoading(false);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate('/admin/auth');
        } else {
          setAuthenticated(true);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Finflow Admin</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center p-2 rounded-md hover:bg-gray-100">
            <BarChart3 className="mr-3 h-5 w-5 text-gray-500" />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/user-inputs" className="flex items-center p-2 rounded-md hover:bg-gray-100">
            <MessageSquare className="mr-3 h-5 w-5 text-gray-500" />
            <span>Inputs dos Usuários</span>
          </Link>
          <Link to="/admin/page-views" className="flex items-center p-2 rounded-md hover:bg-gray-100">
            <Users className="mr-3 h-5 w-5 text-gray-500" />
            <span>Visualizações de Página</span>
          </Link>
          <Button 
            variant="ghost" 
            className="flex items-center w-full p-2 rounded-md hover:bg-gray-100"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-500" />
            <span>Sair</span>
          </Button>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Painel Administrativo</h2>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
