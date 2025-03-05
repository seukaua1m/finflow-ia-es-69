
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

interface ExpensePieChartProps {
  chartData: ChartData[];
  title: string;
  subtitle: string;
  footer: string;
  time?: string;
}

const ExpensePieChart = ({ chartData, title, subtitle, footer, time }: ExpensePieChartProps) => {
  // Custom renderer for the legend
  const renderLegend = () => {
    return (
      <div className="flex flex-wrap justify-center gap-2 text-xs mt-2">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 mr-1 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-black">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  // Custom renderer for labels
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index 
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill={chartData[index].color}
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="11"
        fontWeight="bold"
      >
        {`${chartData[index].value} (${chartData[index].percentage})`}
      </text>
    );
  };

  return (
    <div className="w-full rounded-md overflow-hidden border border-[#2a3942]/60 bg-white p-3 sm:p-4 relative">
      {/* Smaller, more natural gradient overlay in the bottom right corner */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-black/10 to-transparent rounded-bl-md pointer-events-none"></div>
      
      <div className="mb-1">
        <h3 className="text-base sm:text-xl font-bold text-black text-center">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 text-center">{subtitle}</p>
      </div>
      
      <div className="h-40 sm:h-48 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              animationDuration={1500} /* Increase animation duration */
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {renderLegend()}
      
      <div className="flex items-center gap-2 border-t border-gray-200 pt-2 mt-1 sm:mt-2">
        <div className="text-black text-xs sm:text-sm font-medium">{footer}</div>
      </div>

      {/* Time indicator without background in the bottom right corner */}
      {time && (
        <div className="absolute bottom-1 right-1 text-[10px] text-white z-10">
          {time}
        </div>
      )}
    </div>
  );
};

export default ExpensePieChart;
