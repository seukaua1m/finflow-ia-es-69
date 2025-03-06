
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface UserInput {
  id: string;
  input_value: string;
  component_name: string;
  timestamp: string;
  user_session_id: string | null;
}

const UserInputs = () => {
  const [loading, setLoading] = useState(true);
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);

  useEffect(() => {
    const fetchUserInputs = async () => {
      try {
        const { data, error } = await supabase
          .from('user_inputs')
          .select('*')
          .order('timestamp', { ascending: false });

        if (error) throw error;
        setUserInputs(data || []);
      } catch (error) {
        console.error('Error fetching user inputs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInputs();
  }, []);

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
      <h1 className="text-2xl font-bold">Inputs dos Usuários</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Componente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor do Input
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID da Sessão
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userInputs.length > 0 ? (
                userInputs.map((input) => (
                  <tr key={input.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(input.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {input.component_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {input.input_value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {input.user_session_id || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum input de usuário encontrado
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

export default UserInputs;
