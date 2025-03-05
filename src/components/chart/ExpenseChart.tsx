
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
  // Calculate responsive bar size based on data length
  const getBarSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) {
      return Math.min(20, 90 / chartData.length);
    }
    return Math.min(30, 140 / chartData.length);
  };

  return (
    <div className="w-full rounded-md overflow-hidden border border-[#2a3942]/40 bg-white p-3 sm:p-4 relative">
      {/* Smaller, more natural gradient overlay in the bottom right corner */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-black/10 to-transparent rounded-bl-md pointer-events-none"></div>
      
      <div className="mb-1">
        <h3 className="text-base sm:text-xl font-bold text-black">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>
      </div>
      
      <div className="h-32 sm:h-40 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
            barGap={2}
          >
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#2FA179', fontSize: '11px' }}
              interval={0}
            />
            <Bar 
              dataKey="value" 
              radius={[5, 5, 5, 5]} 
              barSize={getBarSize()}
            >
              <LabelList 
                dataKey="value" 
                position="top" 
                fill="#2FA179"
                fontSize={11}
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
      
      <div className="flex items-center gap-2 border-t border-gray-200 pt-2 mt-1 sm:mt-2">
        <div className="text-black text-xs sm:text-sm font-medium">{footer}</div>
      </div>
    </div>
  );
};

export default ExpenseChart;
