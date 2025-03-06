
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface FinancialGrowthChartProps {
  chartData: ChartData[];
  customYTicks: number[];
}

const FinancialGrowthChart: React.FC<FinancialGrowthChartProps> = ({ 
  chartData, 
  customYTicks 
}) => {
  return (
    <div className="relative h-80 w-full mb-4">
      {/* Starting value label - positioned at the bottom left */}
      <div className="absolute left-0 bottom-0 flex flex-col items-start">
        <span className="text-sales-green text-2xl font-medium mb-0">Você hoje</span>
        <span className="font-bold text-sales-green text-4xl">R$ 50</span>
      </div>
      
      {/* End value label - positioned at the top right */}
      <div className="absolute right-0 top-0 flex flex-col items-end">
        <span className="text-sales-green text-2xl font-medium mb-0">Daqui 6 meses</span>
        <span className="font-bold text-sales-green text-4xl">R$ 7492</span>
      </div>
      
      {/* Chart */}
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 50, right: 30, left: 10, bottom: 70 }}>
            <CartesianGrid 
              horizontal={true} 
              vertical={false}
              stroke="#8E9196"
              strokeOpacity={0.3}
              strokeWidth={1}
            />
            <XAxis 
              dataKey="name" 
              axisLine={true}
              tickLine={false}
              tick={{ fill: '#727272', fontSize: 16 }}
              dy={10}
            />
            <YAxis 
              hide={true} 
              domain={[0, 7500]}
              ticks={customYTicks}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#FFA35B" 
              strokeWidth={3} 
              dot={{ fill: '#FFA35B', strokeWidth: 0, r: 6 }}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialGrowthChart;
