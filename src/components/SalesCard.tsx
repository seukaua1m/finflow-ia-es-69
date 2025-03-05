
import React from 'react';
import { cn } from '@/lib/utils';

interface SalesCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SalesCard = ({ title, children, className }: SalesCardProps) => {
  return (
    <div 
      className={cn(
        "card-glass rounded-2xl p-6 flex flex-col items-center text-center h-full animate-scale-in",
        className
      )}
    >
      <h3 className="text-sales-green font-semibold text-lg mb-3">{title}</h3>
      <div className="text-sm text-sales-green">{children}</div>
    </div>
  );
};

export default SalesCard;
