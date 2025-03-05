
import React from 'react';
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface SpendingLimitsChartProps {
  chartData: ChartData[];
  title: string;
  subtitle: string;
  footer?: string;
}

const SpendingLimitsChart = ({ chartData, title, subtitle, footer }: SpendingLimitsChartProps) => {
  return (
    <div className="w-full rounded-md overflow-hidden border border-[#2a3942]/40 bg-white p-3 sm:p-4 relative">
      {/* Gradient overlay in the corner */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-black/10 to-transparent rounded-bl-md pointer-events-none"></div>
      
      <div className="mb-1">
        <h3 className="text-base sm:text-xl font-bold text-black">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>
      </div>
      
      <div className="h-40 sm:h-48 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            layout="vertical"
            margin={{ top: 0, right: 10, left: 60, bottom: 0 }}
          >
            <XAxis type="number" hide domain={[0, 100]} />
            <Bar 
              dataKey="value" 
              barSize={20}
              radius={[0, 4, 4, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                />
              ))}
              <LabelList 
                dataKey="value" 
                position="right" 
                formatter={(value: number) => `${value}%`}
                style={{ fill: "#333", fontWeight: "bold", fontSize: 12 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {footer && (
        <div className="border-t border-gray-200 pt-2 mt-1">
          <div className="text-black text-xs sm:text-sm font-medium">{footer}</div>
        </div>
      )}
    </div>
  );
};

export default SpendingLimitsChart;
