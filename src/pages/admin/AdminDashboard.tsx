// src/pages/admin/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import {
  subDays,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Agendamento {
  id: string;
  clienteId: string;
  barbeiroNome: string;
  servicoNome: string;
  preco: number;
  data_hora: Date;
  status: string;
}

type Period = "today" | "week" | "month" | "custom";

export default function AdminDashboard() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [filteredAgendamentos, setFilteredAgendamentos] = useState<Agendamento[]>([]);
  const [period, setPeriod] = useState<Period>("month");
  const [customFrom, setCustomFrom] = useState<string>("");
  const [customTo, setCustomTo] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Métricas
  const [totalCount, setTotalCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [mostBarber, setMostBarber] = useState("");
  const [mostService, setMostService] = useState("");
  const [dailyCounts, setDailyCounts] = useState<{ day: string; count: number }[]>([]);

  // Buscar agendamentos
  useEffect(() => {
    async function fetchAgendamentos() {
      setLoading(true);
      setError(null);
      try {
        const snap = await getDocs(collection(db, "agendamentos"));
        
        if (snap.empty) {
          setLoading(false);
          return;
        }

        const detailed = await Promise.all(
          snap.docs.map(async (docSnap) => {
            const d = docSnap.data();
            
            // Pula agendamentos cancelados
            if (d.status === "cancelado") return null;

            // Converte a data para Date object
            let dataAgendamento: Date;
            if (typeof d.data_hora === 'string') {
              dataAgendamento = new Date(d.data_hora);
            } else {
              dataAgendamento = d.data_hora.toDate();
            }

            // Verifica se a data é válida
            if (isNaN(dataAgendamento.getTime())) {
              console.warn("Data inválida no agendamento:", docSnap.id);
              return null;
            }

            // Busca informações do barbeiro e serviço
            const [barberSnap, serviceSnap] = await Promise.all([
              getDoc(doc(db, "barbeiros", d.id_barbeiro)),
              getDoc(doc(db, "servicos", d.id_servico))
            ]);

            return {
              id: docSnap.id,
              clienteId: d.id_cliente || "cliente_desconhecido",
              barbeiroNome: barberSnap.exists() ? barberSnap.data()?.nome : d.id_barbeiro,
              servicoNome: serviceSnap.exists() ? serviceSnap.data()?.nome : d.id_servico,
              preco: serviceSnap.exists() ? serviceSnap.data()?.preco || 0 : 0,
              data_hora: dataAgendamento,
              status: d.status || "ativo"
            } as Agendamento;
          })
        );
        
        // Filtra nulls (agendamentos cancelados ou inválidos)
        const validAgendamentos = detailed.filter(a => a !== null) as Agendamento[];
        setAgendamentos(validAgendamentos);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        setError("Erro ao carregar agendamentos");
      } finally {
        setLoading(false);
      }
    }
    
    fetchAgendamentos();
  }, []);

  // Filtrar e calcular métricas
  useEffect(() => {
    if (agendamentos.length === 0) return;

    const now = new Date();
    let from: Date;
    let to: Date = now;

    switch (period) {
      case "today":
        from = new Date(now);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "week":
        from = subDays(new Date(), 6);
        from.setHours(0, 0, 0, 0);
        break;
      case "month":
        from = startOfMonth(new Date());
        to = endOfMonth(new Date());
        break;
      case "custom":
        from = customFrom ? new Date(customFrom) : startOfMonth(new Date());
        to = customTo ? new Date(customTo + "T23:59:59") : endOfMonth(new Date());
        break;
    }

    const filtered = agendamentos.filter((a) => {
      const dataAgendamento = a.data_hora;
      return dataAgendamento >= from && dataAgendamento <= to;
    });

    setFilteredAgendamentos(filtered);
    setTotalCount(filtered.length);
    setTotalRevenue(filtered.reduce((sum, a) => sum + a.preco, 0));

    // Barbeiro e serviço mais frequentes
    const barberCount: Record<string, number> = {};
    const serviceCount: Record<string, number> = {};
    const dailyMap: Record<string, number> = {};

    filtered.forEach((a) => {
      barberCount[a.barbeiroNome] = (barberCount[a.barbeiroNome] || 0) + 1;
      serviceCount[a.servicoNome] = (serviceCount[a.servicoNome] || 0) + 1;
      const day = format(a.data_hora, 'EEEE', { locale: ptBR });
      dailyMap[day] = (dailyMap[day] || 0) + 1;
    });

    setMostBarber(
      Object.entries(barberCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"
    );
    setMostService(
      Object.entries(serviceCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"
    );
    setDailyCounts(
      Object.entries(dailyMap).map(([day, count]) => ({ day, count }))
    );
  }, [agendamentos, period, customFrom, customTo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Carregando dados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (agendamentos.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Nenhum agendamento encontrado</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Geral */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Geral</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded">
            <h4>Total de Agendamentos</h4>
            <p className="text-2xl font-bold">{totalCount}</p>
          </div>
          <div className="p-4 border rounded">
            <h4>Receita no Período</h4>
            <p className="text-2xl font-bold">
              R$ {totalRevenue.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <div className="p-4 border rounded">
            <h4>Barbeiro Mais Requisitado</h4>
            <p className="text-xl">{mostBarber}</p>
          </div>
          <div className="p-4 border rounded">
            <h4>Serviço Mais Popular</h4>
            <p className="text-xl">{mostService}</p>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico por Dia da Semana */}
      <Card>
        <CardHeader>
          <CardTitle>Agendamentos por Dia da Semana</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={dailyCounts} margin={{ left: 0, right: 30 }}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Relatório de Atendimento */}
      <Card>
        <CardHeader>
          <CardTitle>Relatório de Atendimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filtros de Período */}
          <div className="flex flex-wrap gap-2 items-end">
            <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Últimos 7 dias</SelectItem>
                <SelectItem value="month">Mês Atual</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
            {period === "custom" && (
              <>
                <Input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                />
                <Input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                />
              </>
            )}
            <Button onClick={() => {}}>Aplicar</Button>
          </div>

          {/* Tabela de Agendamentos */}
          <div className="overflow-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Data/Hora</th>
                  <th className="border px-2 py-1">ID Cliente</th>
                  <th className="border px-2 py-1">Barbeiro</th>
                  <th className="border px-2 py-1">Serviço</th>
                  <th className="border px-2 py-1">Valor</th>
                  <th className="border px-2 py-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgendamentos.map((a) => (
                  <tr key={a.id}>
                    <td className="border px-2 py-1">
                      {format(a.data_hora, "dd/MM/yyyy HH:mm")}
                    </td>
                    <td className="border px-2 py-1">{a.clienteId}</td>
                    <td className="border px-2 py-1">{a.barbeiroNome}</td>
                    <td className="border px-2 py-1">{a.servicoNome}</td>
                    <td className="border px-2 py-1">
                      R$ {a.preco.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="border px-2 py-1">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}