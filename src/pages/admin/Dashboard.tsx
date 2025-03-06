
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [totalUserInputs, setTotalUserInputs] = useState(0);
  const [totalInteractions, setTotalInteractions] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [pageViewsData, setPageViewsData] = useState<any[]>([]);
  const [stepsData, setStepsData] = useState<any[]>([]);
  const [interactionsData, setInteractionsData] = useState<any[]>([]);

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

        // Count unique visitors
        const { data: sessions } = await supabase
          .from('page_views')
          .select('user_session_id')
          .not('user_session_id', 'is', null);
          
        if (sessions) {
          const uniqueIds = new Set(sessions.map(view => view.user_session_id));
          setUniqueVisitors(uniqueIds.size);
        }

        // Fetch page views by path
        const { data: pageViews } = await supabase
          .from('page_views')
          .select('page_path')
          
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

        // Fetch step data from interactions
        const { data: stepInteractions } = await supabase
          .from('component_interactions')
          .select('*')
          .like('interaction_type', 'MovedToStep%');
          
        const stepCounts: Record<string, number> = {};
        
        if (stepInteractions) {
          stepInteractions.forEach(interaction => {
            const step = interaction.interaction_type;
            stepCounts[step] = (stepCounts[step] || 0) + 1;
          });
        }

        const stepsChartData = Object.entries(stepCounts).map(([step, count]) => ({
          name: step.replace('MovedToStep', 'Step '),
          value: count
        }));

        setStepsData(stepsChartData);

        // Fetch component interactions
        const { data: interactions } = await supabase
          .from('component_interactions')
          .select('component_name, interaction_type')
          .not('interaction_type', 'like', 'MovedToStep%');
          
        const interactionCounts: Record<string, number> = {};
        
        if (interactions) {
          interactions.forEach(interaction => {
            const key = `${interaction.component_name} - ${interaction.interaction_type}`;
            interactionCounts[key] = (interactionCounts[key] || 0) + 1;
          });
        }

        const interactionsChartData = Object.entries(interactionCounts)
          .map(([key, count]) => ({
            name: key,
            value: count
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5); // Top 5 interactions

        setInteractionsData(interactionsChartData);

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

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Visão Geral</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500">Total de Visualizações</h2>
          <p className="text-3xl font-bold mt-2">{totalPageViews}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-500">Visitantes Únicos</h2>
          <p className="text-3xl font-bold mt-2">{uniqueVisitors}</p>
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
      
      {/* Two charts in one row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        {/* User flow/steps chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Etapas Visualizadas</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stepsData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stepsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} usuários`, 'Quantidade']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Component interactions chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Top Interações dos Usuários</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={interactionsData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={140} />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
