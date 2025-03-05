
import React from 'react';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface ExpenseChartProps {
  chartData: ChartData[];
  title: string;
  subtitle: string;
  footer: string;
}

const ExpenseChart = ({ chartData, title, subtitle, footer }: ExpenseChartProps) => {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-[#202C33] bg-white p-4">
      <div className="mb-1">
        <h3 className="text-xl font-bold text-black">{title}</h3>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      
      <div className="h-40 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#2FA179' }}
            />
            <Bar 
              dataKey="value" 
              radius={[10, 10, 10, 10]} 
              barSize={30}
            >
              <LabelList 
                dataKey="value" 
                position="top" 
                fill="#2FA179"
                formatter={(value: number) => `${value}`}
              />
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill="url(#colorGradient)" 
                  stroke="#2FA179" 
                  strokeWidth={1}
                />
              ))}
            </Bar>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2FA179" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#D8E9E3" stopOpacity={0.9}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center gap-2 border-t border-gray-200 pt-2 mt-2">
        <div className="text-black font-medium">{footer}</div>
      </div>
    </div>
  );
};

export default ExpenseChart;
