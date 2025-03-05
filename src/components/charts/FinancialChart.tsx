
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const FinancialChart = () => {
  // Sample data for the last 7 days
  const data = [
    { day: 'qui', value: 155 },
    { day: 'sex', value: 105 },
    { day: 'sáb', value: 53 },
    { day: 'dom', value: 64 },
    { day: 'seg', value: 131 },
    { day: 'ter', value: 52 },
    { day: 'qua', value: 72 },
  ];

  return (
    <div className="w-full h-[200px] mt-2 mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#a3a3a3', fontSize: 12 }}
          />
          <YAxis 
            hide={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#a3a3a3', fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
          />
          <Bar 
            dataKey="value" 
            fill="#D3E9DE" 
            radius={[10, 10, 0, 0]} 
            barSize={30}
            label={{ 
              position: 'top', 
              fill: '#D3E9DE', 
              fontSize: 12 
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinancialChart;
