
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Clock, Star, Settings, LogOut, Gift, Scissors, Award } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

// Dados de agendamentos fictícios
const appointments = [
  {
    id: 1,
    service: "Corte de Cabelo",
    barber: "Carlos Silva",
    date: new Date(2025, 4, 20, 14, 30),
    price: 40,
    status: "upcoming", // upcoming, completed, canceled
  },
  {
    id: 2,
    service: "Barba",
    barber: "Ricardo Almeida",
    date: new Date(2025, 4, 10, 11, 0),
    price: 35,
    status: "completed",
  },
  {
    id: 3,
    service: "Combo (Corte + Barba)",
    barber: "Carlos Silva",
    date: new Date(2025, 3, 15, 16, 0),
    price: 65,
    status: "completed",
  },
  {
    id: 4,
    service: "Design de Sobrancelha",
    barber: "João Mendes",
    date: new Date(2025, 3, 1, 9, 30),
    price: 25,
    status: "canceled",
  },
];

// Dados de avaliações fictícias
const reviews = [
  {
    id: 1,
    service: "Corte de Cabelo",
    barber: "Carlos Silva",
    date: new Date(2025, 3, 15),
    rating: 5,
    comment: "Excelente atendimento! O Carlos entendeu exatamente o que eu queria."
  },
  {
    id: 2,
    service: "Barba",
    barber: "Ricardo Almeida",
    date: new Date(2025, 2, 20),
    rating: 4,
    comment: "Ótimo serviço, apenas um pequeno detalhe no acabamento."
  },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case "upcoming":
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
    case "upcoming":
      return "Agendado";
    case "completed":
      return "Concluído";
    case "canceled":
      return "Cancelado";
    default:
      return "Desconhecido";
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const loyaltyPoints = 320; // Pontos de fidelidade fictícios
  const nextReward = 500; // Pontos para próxima recompensa
  const progress = (loyaltyPoints / nextReward) * 100;

  return (
    <div className="py-20">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar com informações do perfil */}
          <div className="space-y-6">
            <Card className="bg-barber-dark border border-white/10">
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-primary">
                  <AvatarImage src="https://i.pravatar.cc/150?img=68" />
                  <AvatarFallback className="bg-primary/20 text-primary">JS</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white mt-4">João Silva</CardTitle>
                <CardDescription>Cliente desde Abril 2023</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">E-mail:</span>
                    <span className="text-white">joao.silva@email.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Telefone:</span>
                    <span className="text-white">(11) 99999-9999</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className="text-primary border-primary bg-primary/10 px-3 hover:bg-primary/20">
                      Cliente Fiel
                    </Badge>
                    <Badge variant="outline" className="text-white border-white/20 bg-white/5 px-3 hover:bg-white/10">
                      10 visitas
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 gap-2">
                  <Settings className="h-4 w-4" />
                  Editar Perfil
                </Button>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 gap-2">
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </CardFooter>
            </Card>

            {/* Card de fidelidade */}
            <Card className="bg-barber-dark border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Programa de Fidelidade
                </CardTitle>
                <CardDescription>
                  Acumule pontos a cada serviço realizado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pontos</span>
                    <span className="text-primary font-bold">{loyaltyPoints}</span>
                  </div>
                  
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{loyaltyPoints} pontos</span>
                    <span className="text-muted-foreground">Meta: {nextReward} pontos</span>
                  </div>
                </div>
                
                <div className="bg-barber-dark-alt border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" />
                    <span className="text-white font-medium">Próxima Recompensa</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Faltam <span className="text-primary font-medium">{nextReward - loyaltyPoints}</span> pontos para ganhar um corte grátis!
                  </p>
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
                      Agendamentos
                    </TabsTrigger>
                    <TabsTrigger 
                      value="history" 
                      className={`${activeTab === "history" ? "bg-primary text-white" : "text-white"} flex-1`}
                    >
                      Histórico
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
                  <h3 className="text-lg font-bold text-white">Próximos Agendamentos</h3>
                  
                  {appointments.filter(a => a.status === "upcoming").length === 0 ? (
                    <div className="text-center py-8">
                      <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Você não possui agendamentos futuros.</p>
                      <Button className="mt-4 bg-primary text-white hover:bg-primary/80" size="sm">
                        Agendar Agora
                      </Button>
                    </div>
                  ) : (
                    appointments
                      .filter(a => a.status === "upcoming")
                      .map(appointment => (
                        <Card key={appointment.id} className="bg-barber-dark-alt border border-white/10">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-white">{appointment.service}</CardTitle>
                                <CardDescription>com {appointment.barber}</CardDescription>
                              </div>
                              <Badge className={getStatusColor(appointment.status)}>
                                {getStatusText(appointment.status)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <CalendarClock className="h-4 w-4 text-primary" />
                                <span className="text-white">
                                  {format(appointment.date, "dd 'de' MMMM', ' yyyy", { locale: pt })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="text-white">
                                  {format(appointment.date, "HH:mm", { locale: pt })}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-2 border-t border-white/10">
                            <span className="text-primary font-bold">R$ {appointment.price},00</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">
                                Cancelar
                              </Button>
                              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                                Reagendar
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </TabsContent>
                
                <TabsContent value="history" className="mt-0 space-y-4">
                  <h3 className="text-lg font-bold text-white">Histórico de Agendamentos</h3>
                  
                  {appointments.filter(a => a.status !== "upcoming").length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Seu histórico de agendamentos está vazio.</p>
                    </div>
                  ) : (
                    appointments
                      .filter(a => a.status !== "upcoming")
                      .map(appointment => (
                        <Card key={appointment.id} className="bg-barber-dark-alt border border-white/10">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-white">{appointment.service}</CardTitle>
                                <CardDescription>com {appointment.barber}</CardDescription>
                              </div>
                              <Badge className={getStatusColor(appointment.status)}>
                                {getStatusText(appointment.status)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <CalendarClock className="h-4 w-4 text-primary" />
                                <span className="text-white">
                                  {format(appointment.date, "dd 'de' MMMM', ' yyyy", { locale: pt })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="text-white">
                                  {format(appointment.date, "HH:mm", { locale: pt })}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between pt-2 border-t border-white/10">
                            <span className="text-primary font-bold">R$ {appointment.price},00</span>
                            {appointment.status === "completed" && !reviews.some(r => r.service === appointment.service && format(r.date, "dd/MM/yyyy") === format(appointment.date, "dd/MM/yyyy")) && (
                              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                                Avaliar
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      ))
                  )}
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-0 space-y-4">
                  <h3 className="text-lg font-bold text-white">Suas Avaliações</h3>
                  
                  {reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Você ainda não fez nenhuma avaliação.</p>
                    </div>
                  ) : (
                    reviews.map(review => (
                      <Card key={review.id} className="bg-barber-dark-alt border border-white/10">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-white">{review.service}</CardTitle>
                              <CardDescription>com {review.barber}</CardDescription>
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
                            Avaliado em {format(review.date, "dd/MM/yyyy")}
                          </p>
                        </CardContent>
                      </Card>
                    ))
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

export default Profile;
