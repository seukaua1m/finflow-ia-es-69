
import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type DateRangeFilterProps = {
  onFilterChange: (range: DateRange) => void;
  className?: string;
};

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilterChange, className }) => {
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  
  const [preset, setPreset] = useState<string>('custom');

  const handleDateChange = (newDate: DateRange) => {
    setDate(newDate);
    if (newDate.from && newDate.to) {
      onFilterChange(newDate);
      setPreset('custom');
    }
  };

  const handlePresetChange = (value: string) => {
    setPreset(value);
    
    const today = new Date();
    let fromDate: Date | undefined;
    
    switch (value) {
      case '7days':
        fromDate = new Date();
        fromDate.setDate(today.getDate() - 7);
        break;
      case '30days':
        fromDate = new Date();
        fromDate.setDate(today.getDate() - 30);
        break;
      case '90days':
        fromDate = new Date();
        fromDate.setDate(today.getDate() - 90);
        break;
      case 'all':
        fromDate = undefined;
        setDate({ from: undefined, to: undefined });
        onFilterChange({ from: undefined, to: undefined });
        return;
      default:
        return;
    }
    
    const newRange = { from: fromDate, to: today };
    setDate(newRange);
    onFilterChange(newRange);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecionar período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7days">Últimos 7 dias</SelectItem>
          <SelectItem value="30days">Últimos 30 dias</SelectItem>
          <SelectItem value="90days">Últimos 90 dias</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
          <SelectItem value="all">Todos</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-[280px]",
              !date.from && !date.to && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
              )
            ) : (
              "Selecionar intervalo de datas"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
