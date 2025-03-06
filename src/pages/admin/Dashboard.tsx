
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DateRangeFilter from '@/components/admin/DateRangeFilter';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [totalUserInputs, setTotalUserInputs] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [pageViewsData, setPageViewsData] = useState<any[]>([]);
  const [stepsData, setStepsData] = useState<any[]>([]);
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [userInputs, setUserInputs] = useState<any[]>([]);
  const [funnelCompletionRate, setFunnelCompletionRate] = useState(0);
  const [dateRange, setDateRange] = useState<{from?: Date, to?: Date}>({});

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Build date filter conditions
      const dateConditions = {};
      if (dateRange.from) {
        dateConditions['timestamp'] = dateRange.from ? 
          dateRange.to ? 
            { gte: dateRange.from.toISOString(), lte: dateRange.to.toISOString() } :
            { gte: dateRange.from.toISOString() } :
          undefined;
      }
      
      // Fetch total page views with date filter
      const pageViewsQuery = supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true });
        
      if (dateRange.from) {
        pageViewsQuery.gte('timestamp', dateRange.from.toISOString());
        if (dateRange.to) {
          pageViewsQuery.lte('timestamp', dateRange.to.toISOString());
        }
      }
      
      const { count: viewsCount } = await pageViewsQuery;
      setTotalPageViews(viewsCount || 0);

      // Fetch total user inputs with date filter
      const userInputsQuery = supabase
        .from('user_inputs')
        .select('*', { count: 'exact', head: true });
        
      if (dateRange.from) {
        userInputsQuery.gte('timestamp', dateRange.from.toISOString());
        if (dateRange.to) {
          userInputsQuery.lte('timestamp', dateRange.to.toISOString());
        }
      }
      
      const { count: inputsCount } = await userInputsQuery;
      setTotalUserInputs(inputsCount || 0);

      // Count unique visitors (using session IDs) with date filter
      const sessionsQuery = supabase
        .from('page_views')
        .select('user_session_id')
        .not('user_session_id', 'is', null);
        
      if (dateRange.from) {
        sessionsQuery.gte('timestamp', dateRange.from.toISOString());
        if (dateRange.to) {
          sessionsQuery.lte('timestamp', dateRange.to.toISOString());
        }
      }
      
      const { data: sessions } = await sessionsQuery;
          
      if (sessions) {
        const uniqueIds = new Set(sessions.map(view => view.user_session_id));
        setUniqueVisitors(uniqueIds.size);
      }

      // Fetch page views by path with date filter
      const pageViewsByPathQuery = supabase
        .from('page_views')
        .select('page_path');
        
      if (dateRange.from) {
        pageViewsByPathQuery.gte('timestamp', dateRange.from.toISOString());
        if (dateRange.to) {
          pageViewsByPathQuery.lte('timestamp', dateRange.to.toISOString());
        }
      }
      
      const { data: pageViews } = await pageViewsByPathQuery;
          
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

      // Fetch step data from interactions to see funnel progression with date filter
      const stepInteractionsQuery = supabase
        .from('component_interactions')
        .select('*')
        .like('interaction_type', 'MovedToStep%');
        
      if (dateRange.from) {
        stepInteractionsQuery.gte('timestamp', dateRange.from.toISOString());
        if (dateRange.to) {
          stepInteractionsQuery.lte('timestamp', dateRange.to.toISOString());
        }
      }
      
      const { data: stepInteractions } = await stepInteractionsQuery;
          
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
      
      // Calculate funnel completion rate
      if (stepsChartData.length > 0) {
        const step1Count = stepsChartData.find(s => s.name === 'Step 1')?.value || 0;
        const step4Count = stepsChartData.find(s => s.name === 'Step 4')?.value || 0;
        
        if (step1Count > 0) {
          const completionRate = Math.round((step4Count / step1Count) * 100);
          setFunnelCompletionRate(completionRate);
        }
      }

      // Fetch country data with date filter
      const countryDataQuery = supabase
        .from('page_views')
        .select('country')
        .not('country', 'is', null);
        
      if (dateRange.from) {
        countryDataQuery.gte('timestamp', dateRange.from.toISOString());
        if (dateRange.to) {
          countryDataQuery.lte('timestamp', dateRange.to.toISOString());
        }
      }
      
      const { data: countryData } = await countryDataQuery;
          
      const countryCounts: Record<string, number> = {};
      
      if (countryData) {
        countryData.forEach(view => {
          const country = view.country || 'Unknown';
          countryCounts[country] = (countryCounts[country] || 0) + 1;
        });
      }

      const countriesChartData = Object.entries(countryCounts)
        .map(([country, count]) => ({
          name: country,
          value: count
        }))
        .sort((a, b) => b.value - a.value);

      setCountriesData(countriesChartData);

      // Fetch user inputs (initial messages) with date filter
      const inputsQuery = supabase
        .from('user_inputs')
        .select('*')
        .eq('component_name', 'InitialUserMessage')
        .order('timestamp', { ascending: false })
        .limit(10);
        
      if (dateRange.from) {
        inputsQuery.gte('timestamp', dateRange.from.toISOString());
        if (dateRange.to) {
          inputsQuery.lte('timestamp', dateRange.to.toISOString());
        }
      }
      
      const { data: inputs } = await inputsQuery;
          
      setUserInputs(inputs || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data initially and when date range changes
  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const handleDateRangeChange = (range: {from: Date | undefined, to: Date | undefined}) => {
    setDateRange(range);
  };

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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Visão Geral do Funil</h1>
        <DateRangeFilter onFilterChange={handleDateRangeChange} />
      </div>
      
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
          <h2 className="text-lg font-medium text-gray-500">Taxa de Conclusão</h2>
          <p className="text-3xl font-bold mt-2">{funnelCompletionRate}%</p>
        </div>
      </div>
      
      {/* Two charts in one row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Funnel steps chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Progressão no Funil</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stepsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} visitantes`, 'Quantidade']} />
                <Bar dataKey="value" fill="#8884d8" label={{ position: 'top' }}>
                  {stepsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Countries chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Visitantes por País</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countriesData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {countriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} visitantes`, 'Quantidade']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* User input messages */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Mensagens dos Usuários</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mensagem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID da Sessão
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userInputs.length > 0 ? (
                userInputs.map((input, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(input.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {input.input_value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {input.user_session_id?.slice(0, 8) || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhuma mensagem de usuário encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
