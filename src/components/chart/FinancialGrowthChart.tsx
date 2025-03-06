
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
  // Define 5 grid lines with specific positions - evenly distributed
  const gridLines = [
    { y: 50 },     // Line 1 (bottom)
    { y: 1900 },   // Line 2 
    { y: 3750 },   // Line 3 
    { y: 5600 },   // Line 4 
    { y: 7450 },   // Line 5 (top)
  ];

  return (
    <div className="relative h-80 w-full mb-4">
      {/* Starting value label - positioned at the bottom left */}
      <div className="absolute left-0 bottom-16 flex flex-col items-start">
        <span className="text-sales-green text-base mb-1 font-medium">Você hoje</span>
        <span className="font-bold text-sales-green text-3xl">R$ 50</span>
      </div>
      
      {/* End value label - positioned at the top right */}
      <div className="absolute right-0 top-0 flex flex-col items-end">
        <span className="text-sales-green text-base mb-1 font-medium">Daqui 6 meses</span>
        <span className="font-bold text-sales-green text-3xl">R$ 7492</span>
      </div>
      
      {/* Chart */}
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 30, right: 10, left: 10, bottom: 30 }}>
            {/* Custom grid lines with increased opacity */}
            {gridLines.map((line, index) => (
              <CartesianGrid 
                key={index}
                horizontal={true} 
                vertical={false}
                horizontalPoints={[line.y]}
                stroke="#8E9196"
                strokeOpacity={0.3}
                strokeWidth={1}
              />
            ))}
            <XAxis 
              dataKey="name" 
              axisLine={true}
              tickLine={false}
              tick={{ fill: '#727272', fontSize: 14 }}
              dy={10}
            />
            <YAxis hide={true} />
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
