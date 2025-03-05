
import React from 'react';
import ExpenseChart from '../chart/ExpenseChart';
import ExpensePieChart from '../chart/ExpensePieChart';
import SpendingLimitsChart from '../chart/SpendingLimitsChart';

interface ChartMessageProps {
  messageText: string;
  time: string;
  onAnimationEnd: () => void;
  isPieChart?: boolean;
}

const ChartMessage = ({ messageText, time, onAnimationEnd, isPieChart }: ChartMessageProps) => {
  // Extract chart data from message text
  const renderChart = (messageText: string) => {
    try {
      // Extract chart data from message text
      const titleMatch = messageText.match(/<title>(.*?)<\/title>/);
      const subtitleMatch = messageText.match(/<subtitle>(.*?)<\/subtitle>/);
      const dataMatch = messageText.match(/<data>(.*?)<\/data>/);
      const footerMatch = messageText.match(/<footer>(.*?)<\/footer>/);
      
      const title = titleMatch ? titleMatch[1] : '';
      const subtitle = subtitleMatch ? subtitleMatch[1] : '';
      const chartData = dataMatch ? JSON.parse(dataMatch[1]) : [];
      const footer = footerMatch ? footerMatch[1] : '';
      
      // Check if this is a "Limites definidos" chart
      const isLimitsChart = title === 'Limites definidos';
      
      if (isLimitsChart) {
        return (
          <SpendingLimitsChart 
            chartData={chartData}
            title={title}
            subtitle={subtitle}
            footer={footer}
          />
        );
      } else if (isPieChart) {
        return (
          <ExpensePieChart 
            chartData={chartData}
            title={title}
            subtitle={subtitle}
            footer={footer}
          />
        );
      } else {
        return (
          <ExpenseChart 
            chartData={chartData}
            title={title}
            subtitle={subtitle}
            footer={footer}
          />
        );
      }
    } catch (error) {
      console.error("Error rendering chart:", error);
      return <div>Error rendering chart</div>;
    }
  };

  return (
    <div className="mb-2 flex justify-start" onAnimationEnd={onAnimationEnd}>
      <div className="relative py-1.5 px-1 rounded-lg message-animation bg-[#202C33] text-white max-w-[85%] md:max-w-[75%] lg:max-w-[65%]">
        <div className="flex flex-col">
          <div className="text-sm self-center w-full text-left">{renderChart(messageText)}</div>
          <div className="text-[10px] text-gray-300 mt-1 flex justify-end items-center mr-2">
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartMessage;
