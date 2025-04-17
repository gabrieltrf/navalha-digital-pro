// src/lib/firebase/agendamentos.ts
import { db } from "@/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export async function agendarServico({
  id_cliente,
  id_barbeiro,
  id_servico,
  data_hora,
}: {
  id_cliente: string;
  id_barbeiro: string;
  id_servico: string;
  data_hora: string; // Ex: '2025-04-17T10:00'
}) {
  const docId = `${id_barbeiro}-${data_hora}`;
  const agendamentoRef = doc(db, "agendamentos", docId);

  await setDoc(agendamentoRef, {
    id_cliente,
    id_barbeiro,
    id_servico,
    data_hora: Timestamp.fromDate(new Date(data_hora)),
    status: "pendente",
  });

  return docId;
}
