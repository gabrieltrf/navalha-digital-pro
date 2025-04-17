import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase"; // ajuste esse import conforme sua estrutura
import { addMinutes, format, isBefore, isAfter, parse } from "date-fns";



export const isTimeAvailable = async (
  barberId: string,
  date: Date,
  time: string, // hora inicial desejada (ex: "14:00")
  duration: number // em minutos
): Promise<boolean> => {
  const formattedDate = format(date, "yyyy-MM-dd");
  const horaInicial = parse(time, "HH:mm", date); // cria um objeto Date com a hora inicial
  const horaFinal = addMinutes(horaInicial, duration); // calcula a hora final com base na duração

  const q = query(
    collection(db, "agendamentos"),
    where("id_barbeiro", "==", barberId),
    where("data_hora", ">=", `${formattedDate}T00:00`),
    where("data_hora", "<=", `${formattedDate}T23:59`)
  );

  const snapshot = await getDocs(q);

  for (const doc of snapshot.docs) {
    const agendamento = doc.data();
    const agendamentoInicio = new Date(agendamento.data_hora);
    const agendamentoFim = addMinutes(agendamentoInicio, agendamento.duracao ?? 30); // fallback 30min

    const conflito =
      (isBefore(horaInicial, agendamentoFim) && isAfter(horaFinal, agendamentoInicio)) ||
      horaInicial.getTime() === agendamentoInicio.getTime();

    if (conflito) return false;
  }

  return true; // nenhum conflito = horário disponível
};