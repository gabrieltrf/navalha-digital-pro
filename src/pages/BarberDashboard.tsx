
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { CalendarClock, Clock, Star, Phone, Mail, CheckCircle, XCircle, Users } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

// Agendamentos de exemplo para o barbeiro
const barberAppointments = [
  {
    id: 1,
    client: {
      name: "João Silva",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    service: "Corte de Cabelo",
    date: new Date(2025, 4, 15, 10, 0),
    price: 40,
    status: "confirmed", // confirmed, completed, canceled
    phone: "(11) 99999-9999",
  },
  {
    id: 2,
    client: {
      name: "Lucas Martins",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    service: "Barba",
    date: new Date(2025, 4, 15, 11, 0),
    price: 35,
    status: "confirmed",
    phone: "(11) 98888-8888",
  },
  {
    id: 3,
    client: {
      name: "Gabriel Costa",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    service: "Combo (Corte + Barba)",
    date: new Date(2025, 4, 15, 14, 0),
    price: 65,
    status: "confirmed",
    phone: "(11) 97777-7777",
  },
  {
    id: 4,
    client: {
      name: "Marcos Oliveira",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    service: "Design de Sobrancelha",
    date: new Date(2025, 4, 15, 16, 30),
    price: 25,
    status: "confirmed",
    phone: "(11) 96666-6666",
  },
  {
    id: 5,
    client: {
      name: "Felipe Santos",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    service: "Corte Degradê",
    date: new Date(2025, 4, 14, 11, 0),
    price: 45,
    status: "completed",
    phone: "(11) 95555-5555",
  },
];

// Avaliações dos clientes para o barbeiro
const barberReviews = [
  {
    id: 1,
    client: {
      name: "João Silva",
      avatar: "https://i.pravatar.cc/150?img=68",
    },
    rating: 5,
    comment: "Excelente atendimento! O corte ficou perfeito, exatamente como eu queria.",
    date: new Date(2025, 4, 10),
    service: "Corte de Cabelo",
  },
  {
    id: 2,
    client: {
      name: "Lucas Martins",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    rating: 5,
    comment: "O melhor barbeiro que já fui! Recomendo muito.",
    date: new Date(2025, 4, 8),
    service: "Combo (Corte + Barba)",
  },
  {
    id: 3,
    client: {
      name: "Gabriel Costa",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    rating: 4,
    comment: "Muito bom o atendimento. Só achei que demorou um pouco mais do que o esperado.",
    date: new Date(2025, 4, 5),
    service: "Barba",
  },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case "confirmed":
      return "text-primary bg-primary/20 border-primary/30";
    case "completed":
      return "text-green-500 bg-green-500/20 border-green-500/30";
    case "canceled":
      return "text-accent bg-accent/20 border-accent/30";
    default:
      return "text-muted-foreground bg-muted/20 border-muted/30";
  }
};

const getStatusText = (status: string) => {
  switch(status) {
    case "confirmed":
      return "Confirmado";
    case "completed":
      return "Concluído";
    case "canceled":
      return "Cancelado";
    default:
      return "Desconhecido";
  }
};

const BarberDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const today = new Date();

  // Filtrar agendamentos pela data selecionada
  const appointmentsForSelectedDate = barberAppointments.filter(
    app => 
      selectedDate && 
      app.date.getDate() === selectedDate.getDate() && 
      app.date.getMonth() === selectedDate.getMonth() && 
      app.date.getFullYear() === selectedDate.getFullYear() &&
      app.status !== "canceled"
  );

  const handleCompleteAppointment = (id: number) => {
    // Aqui seria a lógica para marcar um agendamento como concluído
    console.log(`Appointment ${id} marked as completed`);
  };

  const handleCancelAppointment = (id: number) => {
    // Aqui seria a lógica para cancelar um agendamento
    console.log(`Appointment ${id} canceled`);
  };

  return (
    <div className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar com informações do barbeiro */}
          <div className="space-y-6">
            <Card className="bg-barber-dark border border-white/10">
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-primary">
                  <AvatarImage src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=1480&auto=format&fit=crop" />
                  <AvatarFallback className="bg-primary/20 text-primary">CS</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white mt-4">Carlos Silva</CardTitle>
                <CardDescription>Barbeiro Senior</CardDescription>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-white">4.9</span>
                  <span className="text-muted-foreground text-sm">(352 avaliações)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-white">carlos.silva@barberpro.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-white">(11) 98765-4321</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className="text-primary border-primary bg-primary/10 px-3 hover:bg-primary/20">
                      8 anos de experiência
                    </Badge>
                    <Badge variant="outline" className="text-white border-white/20 bg-white/5 px-3 hover:bg-white/10">
                      Cortes Clássicos
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full bg-primary text-white hover:bg-primary/80 gap-2">
                  Editar Perfil
                </Button>
              </CardFooter>
            </Card>

            {/* Calendário */}
            <Card className="bg-barber-dark border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Calendário</CardTitle>
                <CardDescription>
                  Selecione uma data para ver os agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="bg-barber-dark text-white pointer-events-auto"
                />
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="bg-barber-dark border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-barber-dark-alt p-4 rounded-lg border border-white/10">
                    <div className="text-primary text-2xl font-bold">28</div>
                    <div className="text-muted-foreground text-sm">Agendamentos Hoje</div>
                  </div>
                  <div className="bg-barber-dark-alt p-4 rounded-lg border border-white/10">
                    <div className="text-primary text-2xl font-bold">165</div>
                    <div className="text-muted-foreground text-sm">Este Mês</div>
                  </div>
                  <div className="bg-barber-dark-alt p-4 rounded-lg border border-white/10">
                    <div className="text-primary text-2xl font-bold">4.9</div>
                    <div className="text-muted-foreground text-sm">Avaliação Média</div>
                  </div>
                  <div className="bg-barber-dark-alt p-4 rounded-lg border border-white/10">
                    <div className="text-primary text-2xl font-bold">R$ 5.670</div>
                    <div className="text-muted-foreground text-sm">Faturamento Mensal</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-2">
            <Card className="bg-barber-dark border border-white/10">
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full bg-barber-dark-alt border border-white/10">
                    <TabsTrigger 
                      value="appointments" 
                      className={`${activeTab === "appointments" ? "bg-primary text-white" : "text-white"} flex-1`}
                    >
                      Agenda do Dia
                    </TabsTrigger>
                    <TabsTrigger 
                      value="clients" 
                      className={`${activeTab === "clients" ? "bg-primary text-white" : "text-white"} flex-1`}
                    >
                      Clientes
                    </TabsTrigger>
                    <TabsTrigger 
                      value="reviews" 
                      className={`${activeTab === "reviews" ? "bg-primary text-white" : "text-white"} flex-1`}
                    >
                      Avaliações
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <TabsContent value="appointments" className="mt-0 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">
                      Agendamentos para {selectedDate ? format(selectedDate, "dd 'de' MMMM', ' yyyy", { locale: pt }) : "Hoje"}
                    </h3>
                    <Badge variant="outline" className="text-primary border-primary bg-primary/10">
                      {appointmentsForSelectedDate.length} Agendamentos
                    </Badge>
                  </div>
                  
                  {appointmentsForSelectedDate.length === 0 ? (
                    <div className="text-center py-8">
                      <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhum agendamento para esta data.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appointmentsForSelectedDate
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map(appointment => (
                          <Card key={appointment.id} className="bg-barber-dark-alt border border-white/10">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-12 w-12 border-2 border-primary">
                                    <AvatarImage src={appointment.client.avatar} />
                                    <AvatarFallback className="bg-primary/20 text-primary">
                                      {appointment.client.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <CardTitle className="text-white text-lg">{appointment.client.name}</CardTitle>
                                    <CardDescription>{appointment.service}</CardDescription>
                                  </div>
                                </div>
                                <Badge className={getStatusColor(appointment.status)}>
                                  {getStatusText(appointment.status)}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-primary" />
                                  <span className="text-white">
                                    {format(appointment.date, "HH:mm", { locale: pt })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-primary" />
                                  <span className="text-white">
                                    {appointment.phone}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between pt-2 border-t border-white/10">
                              <span className="text-primary font-bold">R$ {appointment.price},00</span>
                              <div className="flex gap-2">
                                {appointment.status === "confirmed" && (
                                  <>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="border-accent text-accent hover:bg-accent/10 gap-1"
                                      onClick={() => handleCancelAppointment(appointment.id)}
                                    >
                                      <XCircle className="h-4 w-4" />
                                      Cancelar
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="border-green-500 text-green-500 hover:bg-green-500/10 gap-1"
                                      onClick={() => handleCompleteAppointment(appointment.id)}
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                      Concluir
                                    </Button>
                                  </>
                                )}
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="clients" className="mt-0">
                  <h3 className="text-lg font-bold text-white mb-4">Meus Clientes</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="relative w-full max-w-sm">
                        <input 
                          type="text" 
                          placeholder="Buscar cliente..." 
                          className="w-full bg-barber-dark-alt border border-white/20 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                        />
                      </div>
                      <Button className="bg-primary text-white hover:bg-primary/80 gap-2">
                        <Users className="h-4 w-4" />
                        Todos os Clientes
                      </Button>
                    </div>
                    
                    <Card className="bg-barber-dark-alt border border-white/10">
                      <CardContent className="p-0">
                        <div className="p-4 border-b border-white/10">
                          <div className="text-xs text-muted-foreground font-medium grid grid-cols-12 gap-4">
                            <div className="col-span-5">Cliente</div>
                            <div className="col-span-2 text-center">Visitas</div>
                            <div className="col-span-3 text-center">Último Serviço</div>
                            <div className="col-span-2 text-center">Avaliação</div>
                          </div>
                        </div>
                        
                        {/* Lista de clientes */}
                        <div className="divide-y divide-white/10">
                          {[...new Set(barberAppointments.map(app => app.client.name))].map((clientName, index) => {
                            const client = barberAppointments.find(app => app.client.name === clientName)?.client;
                            const visits = barberAppointments.filter(app => app.client.name === clientName).length;
                            const lastService = barberAppointments
                              .filter(app => app.client.name === clientName)
                              .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
                            
                            return (
                              <div key={index} className="p-4 hover:bg-white/5 transition-colors grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-5 flex items-center gap-3">
                                  <Avatar className="h-10 w-10 border-2 border-primary">
                                    <AvatarImage src={client?.avatar} />
                                    <AvatarFallback className="bg-primary/20 text-primary">
                                      {clientName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-white font-medium">{clientName}</p>
                                    <p className="text-xs text-muted-foreground">{barberAppointments.find(app => app.client.name === clientName)?.phone}</p>
                                  </div>
                                </div>
                                <div className="col-span-2 text-center">
                                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">
                                    {visits}
                                  </Badge>
                                </div>
                                <div className="col-span-3 text-center text-sm text-muted-foreground">
                                  {lastService?.service} <br/>
                                  <span className="text-xs">{format(lastService?.date || new Date(), "dd/MM/yyyy", { locale: pt })}</span>
                                </div>
                                <div className="col-span-2 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    <span className="text-white">{(Math.random() * (5 - 4) + 4).toFixed(1)}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-0 space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Avaliações de Clientes</h3>
                  
                  <div className="flex items-center justify-between bg-barber-dark-alt rounded-lg p-4 mb-6 border border-white/10">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">4.9</div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">352 avaliações</div>
                      </div>
                      
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-white">5</div>
                          <div className="h-2 bg-white/10 rounded-full flex-1">
                            <div className="h-full bg-primary rounded-full" style={{ width: "90%" }}></div>
                          </div>
                          <div className="text-sm text-white">90%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-white">4</div>
                          <div className="h-2 bg-white/10 rounded-full flex-1">
                            <div className="h-full bg-primary rounded-full" style={{ width: "8%" }}></div>
                          </div>
                          <div className="text-sm text-white">8%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-white">3</div>
                          <div className="h-2 bg-white/10 rounded-full flex-1">
                            <div className="h-full bg-primary rounded-full" style={{ width: "2%" }}></div>
                          </div>
                          <div className="text-sm text-white">2%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-white">2</div>
                          <div className="h-2 bg-white/10 rounded-full flex-1">
                            <div className="h-full bg-primary rounded-full" style={{ width: "0%" }}></div>
                          </div>
                          <div className="text-sm text-white">0%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-white">1</div>
                          <div className="h-2 bg-white/10 rounded-full flex-1">
                            <div className="h-full bg-primary rounded-full" style={{ width: "0%" }}></div>
                          </div>
                          <div className="text-sm text-white">0%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {barberReviews.length === 0 ? (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Ainda não há avaliações.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {barberReviews.map(review => (
                        <Card key={review.id} className="bg-barber-dark-alt border border-white/10">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-primary">
                                  <AvatarImage src={review.client.avatar} />
                                  <AvatarFallback className="bg-primary/20 text-primary">
                                    {review.client.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-white">{review.client.name}</CardTitle>
                                  <CardDescription>{review.service}</CardDescription>
                                </div>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} 
                                  />
                                ))}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm italic">"{review.comment}"</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {format(review.date, "dd/MM/yyyy", { locale: pt })}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberDashboard;
