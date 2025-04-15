
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Package, Paintbrush, Ruler, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Dados das categorias e serviços
const categories = [
  {
    id: "hair",
    name: "Cabelo",
    icon: Scissors,
  },
  {
    id: "beard",
    name: "Barba",
    icon: Scissors,
  },
  {
    id: "combo",
    name: "Combos",
    icon: Package,
  },
  {
    id: "color",
    name: "Coloração",
    icon: Paintbrush,
  },
  {
    id: "extra",
    name: "Extras",
    icon: Ruler,
  },
];

// Serviços detalhados por categoria
const services = {
  hair: [
    {
      id: 1,
      name: "Corte Masculino Clássico",
      description: "Corte tradicional mantendo linhas limpas e um visual elegante.",
      price: 40,
      duration: 30,
      popular: true,
    },
    {
      id: 2,
      name: "Corte Degradê",
      description: "Transição perfeita de vários comprimentos com acabamento suave.",
      price: 45,
      duration: 35,
      popular: true,
    },
    {
      id: 3,
      name: "Corte Navalhado",
      description: "Realizado com navalha para um visual arrojado e texturizado.",
      price: 50,
      duration: 40,
      popular: false,
    },
    {
      id: 4,
      name: "Corte Infantil",
      description: "Dedicado a crianças com atendimento especial e paciência.",
      price: 35,
      duration: 25,
      popular: false,
    },
  ],
  beard: [
    {
      id: 5,
      name: "Barba Completa",
      description: "Modelagem completa com toalha quente, óleo e finalização perfeita.",
      price: 35,
      duration: 25,
      popular: true,
    },
    {
      id: 6,
      name: "Barba Simples",
      description: "Aparagem rápida para manter o formato atual da sua barba.",
      price: 25,
      duration: 15,
      popular: false,
    },
    {
      id: 7,
      name: "Modelagem de Barba",
      description: "Criação de linhas e contorno perfeitos para valorizar seu rosto.",
      price: 30,
      duration: 20,
      popular: false,
    },
  ],
  combo: [
    {
      id: 8,
      name: "Combo Clássico (Corte + Barba)",
      description: "A combinação perfeita para quem busca um visual completo.",
      price: 65,
      duration: 50,
      popular: true,
      discount: "15% OFF",
    },
    {
      id: 9,
      name: "Combo VIP (Corte + Barba + Sobrancelha)",
      description: "Tratamento completo para uma aparência impecável.",
      price: 85,
      duration: 65,
      popular: true,
      discount: "12% OFF",
    },
    {
      id: 10,
      name: "Combo Pai e Filho",
      description: "Corte para você e seu filho com preço especial.",
      price: 70,
      duration: 60,
      popular: false,
      discount: "10% OFF",
    },
  ],
  color: [
    {
      id: 11,
      name: "Coloração Completa",
      description: "Coloração total dos cabelos com produtos de alta qualidade.",
      price: 60,
      duration: 45,
      popular: false,
    },
    {
      id: 12,
      name: "Matização",
      description: "Para neutralizar tons amarelados ou alaranjados indesejados.",
      price: 50,
      duration: 30,
      popular: false,
    },
    {
      id: 13,
      name: "Luzes/Mechas",
      description: "Destaque apenas algumas partes do cabelo para um visual moderno.",
      price: 80,
      duration: 60,
      popular: false,
    },
  ],
  extra: [
    {
      id: 14,
      name: "Design de Sobrancelha",
      description: "Modelagem precisa para harmonizar o rosto.",
      price: 25,
      duration: 15,
      popular: true,
    },
    {
      id: 15,
      name: "Hidratação Capilar",
      description: "Tratamento nutritivo para fortalecer e dar brilho aos fios.",
      price: 45,
      duration: 30,
      popular: false,
    },
    {
      id: 16,
      name: "Limpeza de Pele Masculina",
      description: "Cuidado facial para uma pele saudável e sem impurezas.",
      price: 55,
      duration: 35,
      popular: false,
    },
  ],
};

const Services = () => {
  return (
    <div className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium">NOSSOS SERVIÇOS</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-2">
            Serviços de Excelência
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Conheça nossa ampla gama de serviços, executados por profissionais
            altamente qualificados e apaixonados.
          </p>
        </div>

        <Tabs defaultValue="hair" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-barber-dark-alt border border-white/10 p-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white text-white hover:text-white data-[state=active]:shadow"
                >
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.keys(services).map((categoryKey) => (
            <TabsContent key={categoryKey} value={categoryKey} className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services[categoryKey as keyof typeof services].map((service) => (
                  <Card 
                    key={service.id} 
                    className="bg-barber-dark border border-white/10 hover:border-primary/50 transition-all overflow-hidden group"
                  >
                    {service.popular && (
                      <div className="absolute top-0 right-0">
                        <Badge className="bg-primary text-white rounded-none rounded-bl-lg">
                          Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-white">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{service.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {service.discount && (
                            <Badge variant="outline" className="text-accent border-accent/50 bg-accent/5">
                              {service.discount}
                            </Badge>
                          )}
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span className="text-xl font-bold text-primary">
                              {service.price},00
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-primary text-white hover:bg-primary/80" asChild>
                        <Link to={`/agendar?service=${service.id}`}>
                          Agendar Agora <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Seção de informações adicionais */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-barber-dark-alt border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Políticas de Cancelamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cancelamentos devem ser feitos com pelo menos 2 horas de antecedência. 
                Cancele pelo app ou telefone para evitar taxas.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-barber-dark-alt border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Formas de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aceitamos dinheiro, cartões de crédito/débito e PIX. 
                O pagamento é feito apenas no local após a conclusão do serviço.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-barber-dark-alt border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Horário de Funcionamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Segunda a Sábado: 9h às 20h<br />
                Domingos: 10h às 16h<br />
                Feriados: Consulte o app
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
