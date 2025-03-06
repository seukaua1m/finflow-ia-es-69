
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [totalUserInputs, setTotalUserInputs] = useState(0);
  const [totalInteractions, setTotalInteractions] = useState(0);
  const [pageViewsData, setPageViewsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total page views
        const { count: viewsCount } = await supabase
          .from('page_views')
          .select('*', { count: 'exact', head: true });
        
        setTotalPageViews(viewsCount || 0);

        // Fetch total user inputs
        const { count: inputsCount } = await supabase
          .from('user_inputs')
          .select('*', { count: 'exact', head: true });
        
        setTotalUserInputs(inputsCount || 0);

        // Fetch total interactions
        const { count: interactionsCount } = await supabase
          .from('component_interactions')
          .select('*', { count: 'exact', head: true });
        
        setTotalInteractions(interactionsCount || 0);

        // Fetch page views by path
        const { data: pageViews } = await supabase
          .from('page_views')
          .select('page_path, count')
          .select('page_path')
          .select();

        // Count occurrences of each page path
        const pageCounts: Record<string, number> = {};
        
        if (pageViews) {
          pageViews.forEach(view => {
            const path = view.page_path || 'unknown';
            pageCounts[path] = (pageCounts[path] || 0) + 1;
          });
        }

        // Convert to chart data format
        const chartData = Object.entries(pageCounts).map(([path, count]) => ({
          path: path === '/' ? 'Home' : path.replace('/', ''),
          views: count
        }));

        setPageViewsData(chartData);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Visão Geral</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500">Total de Visualizações</h2>
          <p className="text-3xl font-bold mt-2">{totalPageViews}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500">Total de Inputs</h2>
          <p className="text-3xl font-bold mt-2">{totalUserInputs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500">Total de Interações</h2>
          <p className="text-3xl font-bold mt-2">{totalInteractions}</p>
        </div>
      </div>
      
      {/* Page views chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Visualizações por Página</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={pageViewsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="path" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
