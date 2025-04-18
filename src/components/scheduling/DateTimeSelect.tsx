// src/components/scheduling/DateTimeSelect.tsx
import { useEffect, useState } from "react";
import { format, addMinutes, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

interface DateTimeSelectProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  selectedBarber: any;
  selectedService: any;
}

export function DateTimeSelect({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedBarber,
  selectedService,
}: DateTimeSelectProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!selectedDate || !selectedBarber || !selectedService) return;

      const weekdayMap = [
        "domingo",
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado",
      ];
      const dayKey = weekdayMap[selectedDate.getDay()];  // 0 = domingo ... 6 = sabado
      
      const barberSnap = await getDoc(doc(db, "barbeiros", selectedBarber.id));
      const barberData = barberSnap.data();
      
      // se não existir horários configurados para esse dia
      if (!barberData?.horarios?.[dayKey]) {
        setAvailableTimes([]);
        return;
      }
      
      const { inicio, fim } = barberData.horarios[dayKey];

      if (!inicio || !fim) {
        setAvailableTimes([]);
        return;
      }

      const [startHour, startMinute] = inicio.split(":").map(Number);
      const [endHour, endMinute] = fim.split(":").map(Number);
      const duration = selectedService.duracao || 30;

      const startDate = new Date(selectedDate);
      startDate.setHours(startHour, startMinute, 0, 0);

      const endDate = new Date(selectedDate);
      endDate.setHours(endHour, endMinute, 0, 0);

      // Pega os agendamentos existentes
      const q = query(
        collection(db, "agendamentos"),
        where("id_barbeiro", "==", selectedBarber.id),
        where("data_hora", ">=", startDate),
        where("data_hora", "<=", endDate)
      );
      const snapshot = await getDocs(q);

      const agendamentos = snapshot.docs.map((doc) => doc.data().data_hora.toDate());

      const times: string[] = [];
      let currentTime = new Date(startDate);

      while (isBefore(currentTime, endDate)) {
        const endSlot = addMinutes(currentTime, duration);

        const overlapping = agendamentos.some((agendamento) => {
          const agendamentoEnd = addMinutes(agendamento, duration);
          return (
            currentTime < agendamentoEnd &&
            endSlot > agendamento // Sobreposição
          );
        });

        if (!overlapping && isBefore(endSlot, endDate)) {
          times.push(format(currentTime, "HH:mm"));
        }

        currentTime = addMinutes(currentTime, duration);
      }

      setAvailableTimes(times);
    };

    fetchAvailableTimes();
  }, [selectedDate, selectedBarber, selectedService]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-white block mb-2">Data</label>
        <input
          type="date"
          className="p-2 rounded bg-white text-black"
          value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
          onChange={(e) => {
            const [year, month, day] = e.target.value.split("-").map(Number);
            const localDate = new Date(year, month - 1, day, 12); // força 12h para evitar problemas de fuso
            setSelectedDate(localDate);
          }}
        />
      </div>

      {availableTimes.length > 0 && (
        <div>
          <label className="text-white block mb-2">Horário</label>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded ${
                  selectedTime === time
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableTimes.length === 0 && selectedDate && (
        <p className="text-red-500">Nenhum horário disponível para esta data.</p>
      )}
    </div>
  );
}
