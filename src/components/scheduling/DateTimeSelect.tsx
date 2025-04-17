//C:\projetos\App Barbearia\navalha-digital-pro\src\components\scheduling\DateTimeSelect.tsx
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Horários disponíveis (exemplo)
const availableTimeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

type DateTimeSelectProps = {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  onSelectDate: (date: Date | undefined) => void;
  onSelectTime: (time: string | null) => void;
};

export function DateTimeSelect({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: DateTimeSelectProps) {
  const today = new Date();
  const oneMonthFromNow = new Date(today);
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-white mb-4">Selecione a Data e Horário</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seletor de Data */}
        <Card className="bg-barber-dark-alt border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-white/20 hover:bg-white/5 hover:text-white",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  {selectedDate ? (
                    format(selectedDate, "PPP", { locale: pt })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-white/20 bg-barber-dark-alt">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={onSelectDate}
                  disabled={(date) => 
                    date < today || date > oneMonthFromNow || date.getDay() === 0 // Domingo fechado
                  }
                  initialFocus
                  className="bg-barber-dark-alt text-white pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>
        
        {/* Seletor de Horário */}
        <Card className="bg-barber-dark-alt border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Horário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {availableTimeSlots.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className={cn(
                    "border-white/20 hover:bg-primary/20 hover:text-white",
                    selectedTime === time
                      ? "bg-primary/20 text-white border-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => onSelectTime(time)}
                  disabled={!selectedDate}
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
