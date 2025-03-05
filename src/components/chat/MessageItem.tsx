
import React from 'react';
import { CheckCheck, TrendingUp, PieChart } from 'lucide-react';
import { Message } from '@/types/chat';
import { BarChart, Bar, XAxis, Cell, PieChart as RechartsPieChart, Pie, ResponsiveContainer, Legend } from 'recharts';

interface MessageItemProps {
  message: Message;
  onAnimationEnd: () => void;
}

const MessageItem = ({
  message,
  onAnimationEnd
}: MessageItemProps) => {
  // Bar chart data
  const barData = [
    { name: 'qui', value: 155 },
    { name: 'sex', value: 105 },
    { name: 'sab', value: 53 },
    { name: 'dom', value: 64 },
    { name: 'seg', value: 131 },
    { name: 'ter', value: 52 },
    { name: 'qua', value: 72 },
  ];

  // Pie chart data
  const pieData = [
    { name: 'Alimentação', value: 25, color: '#20E0DE' },
    { name: 'Transporte', value: 15, color: '#2084E0' },
    { name: 'Lazer', value: 10, color: '#6F2AF7' },
    { name: 'Contas Fixas', value: 30, color: '#FF914D' },
    { name: 'Jantar fora', value: 20, color: '#FFDE59' },
  ];

  // Format message text with HTML
  const formatMessageText = (text: string) => {
    // Check if it's an expense message with specific formatting
    if (message.isGroupMessage) {
      // Parse the expense message with specific layout
      const parts = text.split('\n\n');
      return <>
          {/* Title - "Gasto adicionado" */}
          <div className="font-bold">{parts[0].replace(/<strong>|<\/strong>/g, '')}</div>
          
          {/* Item name - no line space */}
          <div>{parts[1]}</div>
          
          {/* Price - no line space */}
          <div className="font-bold">{parts[2].replace(/<strong>|<\/strong>/g, '')}</div>
          
          {/* Date - with line space above */}
          <div className="mt-4 py-px my-0">{parts[3]}</div>
        </>;
    }

    // For bar chart message
    if (message.isBarChart) {
      const [title, subtitle, ...rest] = text.split('\n\n');
      return (
        <div className="w-full">
          <div className="font-bold text-center mb-1">{title}</div>
          <div className="text-center mb-3">{subtitle}</div>
          
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="name" fontSize={10} />
                <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={`url(#colorGradient-${index})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center mt-2 gap-2">
            <TrendingUp size={16} className="text-sales-orange" />
            <div className="text-sm">
              {rest.join(' ')}
            </div>
          </div>
        </div>
      );
    }

    // For pie chart message
    if (message.isPieChart) {
      const [title, subtitle] = text.split('\n\n');
      return (
        <div className="w-full">
          <div className="font-bold text-center mb-1">{title}</div>
          <div className="text-center mb-3">{subtitle}</div>
          
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <defs>
                  {pieData.map((entry, index) => (
                    <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D3FBF9" />
                      <stop offset="100%" stopColor={entry.color} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={70}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-2 grid grid-cols-3 gap-1">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1">
                <div style={{ backgroundColor: entry.color }} className="w-3 h-3"></div>
                <div className="text-xs">{entry.name}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Check if it's an action button
    if (message.isAction) {
      return (
        <div className="font-medium text-white text-sm">
          {text}
          <span className="ml-1">👈</span>
        </div>
      );
    }

    // For regular messages, split by new lines first
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
      // Check if line contains HTML
      const hasHTML = line.includes('<strong>');
      if (hasHTML) {
        // Parse simple HTML tags in the line
        const parts = line.split(/<strong>|<\/strong>/);
        return <React.Fragment key={lineIndex}>
            {parts.map((part, partIndex) => partIndex % 2 === 1 ?
          // Odd indexes are between <strong> tags
          <strong key={partIndex}>{part}</strong> :
          // Even indexes are outside <strong> tags
          <span key={partIndex}>{part}</span>)}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>;
      } else {
        // Regular line without HTML
        return <React.Fragment key={lineIndex}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>;
      }
    });
  };

  return <div className={`mb-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`} onAnimationEnd={onAnimationEnd}>
      <div className={`relative py-2 px-3 rounded-lg message-animation ${
        message.sender === 'user' 
          ? 'bg-[#005C4B] text-white max-w-[95%]' 
          : message.isAction 
            ? 'bg-[#194032] text-white px-4 py-3' 
            : 'bg-[#202C33] text-white w-4/5'
      }`}>
        <div className="flex items-end justify-between gap-2">
          <div className="text-sm self-center">{formatMessageText(message.text)}</div>
          <div className="text-[10px] text-gray-300 flex items-center whitespace-nowrap self-end">
            <span>{message.time}</span>
            {message.sender === 'user' && <CheckCheck size={12} className="ml-1 text-gray-300" />}
          </div>
        </div>
      </div>
    </div>;
};

export default MessageItem;
