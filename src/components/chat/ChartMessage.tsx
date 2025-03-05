
import React from 'react';
import ExpenseChart from '../chart/ExpenseChart';
import ExpensePieChart from '../chart/ExpensePieChart';

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
      
      if (isPieChart) {
        return (
          <ExpensePieChart 
            chartData={chartData}
            title={title}
            subtitle={subtitle}
            footer={footer}
            time={time}
          />
        );
      } else {
        return (
          <ExpenseChart 
            chartData={chartData}
            title={title}
            subtitle={subtitle}
            footer={footer}
            time={time}
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
      <div className="relative py-1.5 px-3 rounded-lg message-animation bg-[#202C33] text-white max-w-[80%] md:max-w-[70%] lg:max-w-[60%]">
        <div className="flex flex-col">
          <div className="text-sm self-center w-full text-left">{renderChart(messageText)}</div>
          {/* Removed time display here as it's now passed to the chart components */}
        </div>
      </div>
    </div>
  );
};

export default ChartMessage;
