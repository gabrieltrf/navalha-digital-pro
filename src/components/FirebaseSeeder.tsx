// src/testes/CriarAgendamento.tsx
import { useEffect } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";

const CriarAgendamento = () => {
  useEffect(() => {
    const criarAgendamento = async () => {
      try {
        const barbeiroId = "barbeiroA";
        const dataHoraISO = "2025-04-17T10:00";
        const docId = `${barbeiroId}-${dataHoraISO}`;

        const agendamentoRef = doc(db, "agendamentos", docId);

        await setDoc(agendamentoRef, {
          id_cliente: "cliente123",
          id_barbeiro: barbeiroId,
          id_servico: "servico1", // certifique-se de que esse ID exista
          data_hora: Timestamp.fromDate(new Date(dataHoraISO)),
          status: "pendente"
        });

        console.log("✅ Agendamento criado com ID:", docId);
      } catch (error) {
        console.error("❌ Erro ao criar agendamento:", error);
      }
    };

    criarAgendamento();
  }, []);

  return <div>Teste de criação de agendamento (ver console)</div>;
};

export default CriarAgendamento;
