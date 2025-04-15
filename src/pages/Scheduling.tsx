
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceSelect } from "@/components/scheduling/ServiceSelect";
import { BarberSelect } from "@/components/scheduling/BarberSelect";
import { DateTimeSelect } from "@/components/scheduling/DateTimeSelect";
import { PaymentSelect } from "@/components/scheduling/PaymentSelect";
import { Check, ChevronRight, AlertCircle, Store, MapPin, Scissors, CreditCard, DollarSign, QrCode } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

const Scheduling = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("service");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedBarber, setSelectedBarber] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    // Verificar se pode avançar para a próxima etapa
    if (tab === "barber" && !selectedService) {
      toast({
        title: "Selecione um serviço",
        description: "É necessário selecionar um serviço para continuar",
        variant: "destructive",
      });
      return;
    }

    if (tab === "datetime" && !selectedBarber) {
      toast({
        title: "Selecione um profissional",
        description: "É necessário selecionar um profissional para continuar",
        variant: "destructive",
      });
      return;
    }

    if (tab === "payment" && (!selectedDate || !selectedTime)) {
      toast({
        title: "Selecione data e horário",
        description: "É necessário selecionar data e horário para continuar",
        variant: "destructive",
      });
      return;
    }

    if (tab === "confirm" && !selectedPayment) {
      toast({
        title: "Selecione forma de pagamento",
        description: "É necessário selecionar uma forma de pagamento para continuar",
        variant: "destructive",
      });
      return;
    }

    setActiveTab(tab);
  };

  const handleSelectService = (service: any) => {
    setSelectedService(service);
  };

  const handleSelectBarber = (barber: any) => {
    setSelectedBarber(barber);
  };

  const handleConfirmBooking = () => {
    toast({
      title: "Agendamento confirmado!",
      description: "Seu horário foi agendado com sucesso. Você receberá uma confirmação por e-mail.",
      variant: "default",
    });
    
    // Aqui você faria a lógica para salvar o agendamento no banco de dados
    // E depois redirecionaria para uma página de confirmação ou perfil
    
    // Reset do formulário
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setSelectedPayment(null);
    setActiveTab("service");
  };

  return (
    <div className="py-20">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Agende seu horário
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Siga os passos para agendar seu atendimento na BarberPro.
            Escolha o serviço, profissional, data e forma de pagamento.
          </p>
        </div>

        <Card className="bg-barber-dark border border-white/10">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Novo Agendamento</CardTitle>
              <Alert className="max-w-xs p-2 border-none bg-primary/10 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-xs text-primary">
                  Cancele com até 2h de antecedência
                </AlertDescription>
              </Alert>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} className="w-full">
              <TabsList className="w-full bg-barber-dark-alt mb-6 border border-white/10">
                <TabsTrigger 
                  value="service" 
                  onClick={() => handleTabChange("service")}
                  className={`${activeTab === "service" ? "bg-primary text-white" : "text-white"} flex-1`}
                >
                  Serviço
                </TabsTrigger>
                <TabsTrigger 
                  value="barber" 
                  onClick={() => handleTabChange("barber")}
                  className={`${activeTab === "barber" ? "bg-primary text-white" : "text-white"} flex-1`}
                >
                  Profissional
                </TabsTrigger>
                <TabsTrigger 
                  value="datetime" 
                  onClick={() => handleTabChange("datetime")}
                  className={`${activeTab === "datetime" ? "bg-primary text-white" : "text-white"} flex-1`}
                >
                  Data/Hora
                </TabsTrigger>
                <TabsTrigger 
                  value="payment" 
                  onClick={() => handleTabChange("payment")}
                  className={`${activeTab === "payment" ? "bg-primary text-white" : "text-white"} flex-1`}
                >
                  Pagamento
                </TabsTrigger>
                <TabsTrigger 
                  value="confirm" 
                  onClick={() => handleTabChange("confirm")}
                  className={`${activeTab === "confirm" ? "bg-primary text-white" : "text-white"} flex-1`}
                >
                  Confirmar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="service" className="mt-0">
                <ServiceSelect 
                  onSelectService={handleSelectService} 
                  selectedService={selectedService} 
                />
                <div className="flex justify-end mt-6">
                  <Button 
                    className="bg-primary text-white hover:bg-primary/80"
                    onClick={() => handleTabChange("barber")}
                    disabled={!selectedService}
                  >
                    Próximo <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="barber" className="mt-0">
                <BarberSelect 
                  onSelectBarber={handleSelectBarber} 
                  selectedBarber={selectedBarber} 
                />
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => handleTabChange("service")}
                  >
                    Voltar
                  </Button>
                  <Button 
                    className="bg-primary text-white hover:bg-primary/80"
                    onClick={() => handleTabChange("datetime")}
                    disabled={!selectedBarber}
                  >
                    Próximo <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="datetime" className="mt-0">
                <DateTimeSelect 
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSelectDate={setSelectedDate}
                  onSelectTime={setSelectedTime}
                />
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => handleTabChange("barber")}
                  >
                    Voltar
                  </Button>
                  <Button 
                    className="bg-primary text-white hover:bg-primary/80"
                    onClick={() => handleTabChange("payment")}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Próximo <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="mt-0">
                <PaymentSelect 
                  selectedPayment={selectedPayment}
                  onSelectPayment={setSelectedPayment}
                />
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => handleTabChange("datetime")}
                  >
                    Voltar
                  </Button>
                  <Button 
                    className="bg-primary text-white hover:bg-primary/80"
                    onClick={() => handleTabChange("confirm")}
                    disabled={!selectedPayment}
                  >
                    Próximo <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="confirm" className="mt-0">
                <div className="w-full">
                  <h2 className="text-xl font-bold text-white mb-4">Confirme seu Agendamento</h2>
                  
                  <Card className="bg-barber-dark-alt border border-white/10 mb-6">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Resumo do Agendamento</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedService && (
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Scissors className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-white">{selectedService.name}</p>
                              <p className="text-xs text-muted-foreground">{selectedService.duration} minutos</p>
                            </div>
                          </div>
                          <span className="text-primary font-bold">R$ {selectedService.price},00</span>
                        </div>
                      )}
                      
                      {selectedBarber && (
                        <div className="flex justify-between items-center pt-2 border-t border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img 
                                src={selectedBarber.image} 
                                alt={selectedBarber.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-white">{selectedBarber.name}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedDate && selectedTime && (
                        <div className="flex justify-between items-center pt-2 border-t border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Store className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-white">
                                {format(selectedDate, "dd 'de' MMMM', ' yyyy", { locale: pt })}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {selectedTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedPayment && (
                        <div className="flex justify-between items-center pt-2 border-t border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              {selectedPayment === "card" && <CreditCard className="h-4 w-4 text-primary" />}
                              {selectedPayment === "cash" && <DollarSign className="h-4 w-4 text-primary" />}
                              {selectedPayment === "pix" && <QrCode className="h-4 w-4 text-primary" />}
                            </div>
                            <p className="text-white">
                              {selectedPayment === "card" && "Cartão de Crédito/Débito"}
                              {selectedPayment === "cash" && "Dinheiro"}
                              {selectedPayment === "pix" && "PIX"}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="h-5 w-5 text-primary" />
                    <p className="text-white">BarberPro - Av. Exemplo, 1234 - Centro</p>
                  </div>
                  
                  <Alert className="bg-accent/10 border border-accent/20 mb-6">
                    <AlertCircle className="h-4 w-4 text-accent" />
                    <AlertTitle className="text-white">Importante</AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                      Chegue com 5 minutos de antecedência. Cancelamentos devem ser feitos 
                      com pelo menos 2 horas antes do horário agendado para evitar taxas.
                    </AlertDescription>
                  </Alert>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => handleTabChange("payment")}
                  >
                    Voltar
                  </Button>
                  <Button 
                    className="bg-primary text-white hover:bg-primary/80"
                    onClick={handleConfirmBooking}
                  >
                    Confirmar Agendamento <Check className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Scheduling;
