
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import DateRangeFilter from '@/components/admin/DateRangeFilter';

interface PageView {
  id: string;
  page_path: string;
  component_name: string | null;
  timestamp: string;
  user_session_id: string | null;
  view_duration: number | null;
}

const PageViews = () => {
  const [loading, setLoading] = useState(true);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [dateRange, setDateRange] = useState<{from?: Date, to?: Date}>({});

  const fetchPageViews = async () => {
    try {
      setLoading(true);
      
      const query = supabase
        .from('page_views')
        .select('*')
        .order('timestamp', { ascending: false });
      
      // Apply date filters if set
      if (dateRange.from) {
        query.gte('timestamp', dateRange.from.toISOString());
        if (dateRange.to) {
          query.lte('timestamp', dateRange.to.toISOString());
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setPageViews(data || []);
    } catch (error) {
      console.error('Error fetching page views:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageViews();
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Visualizações de Página</h1>
        <DateRangeFilter onFilterChange={handleDateRangeChange} />
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Página
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Componente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duração (s)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID da Sessão
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pageViews.length > 0 ? (
                pageViews.map((view) => (
                  <tr key={view.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(view.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {view.page_path}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {view.component_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {view.view_duration || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {view.user_session_id || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhuma visualização de página encontrada
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

export default PageViews;
