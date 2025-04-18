import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Agendamento {
  id: string;
  id_cliente: string;
  id_barbeiro: string;
  id_servico: string;
  data_hora: string;
  status: string;
}

const statusOptions = ["pendente", "confirmado", "cancelado", "finalizado"];

export default function AdminAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const fetchAgendamentos = async () => {
    const snapshot = await getDocs(collection(db, "agendamentos"));
    const data = snapshot.docs.map((docSnap) => {
      const dados = docSnap.data();
      return {
        id: docSnap.id,
        ...dados,
        data_hora: dados.data_hora.toDate().toLocaleString("pt-BR"),
      } as Agendamento;
    });
    setAgendamentos(data);
  };

  const atualizarStatus = async (id: string, novoStatus: string) => {
    await updateDoc(doc(db, "agendamentos", id), { status: novoStatus });
    fetchAgendamentos();
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {agendamentos.map((agendamento) => (
        <Card key={agendamento.id}>
          <CardContent className="space-y-2 p-4">
            <p><strong>Cliente:</strong> {agendamento.id_cliente}</p>
            <p><strong>Barbeiro:</strong> {agendamento.id_barbeiro}</p>
            <p><strong>Serviço:</strong> {agendamento.id_servico}</p>
            <p><strong>Data/Hora:</strong> {agendamento.data_hora}</p>
            <div className="flex items-center gap-2">
              <strong>Status:</strong>
              <Select
                value={agendamento.status}
                onValueChange={(value) => atualizarStatus(agendamento.id, value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
