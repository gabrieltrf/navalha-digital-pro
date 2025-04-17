import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Scissors,
  Package,
  Paintbrush,
  Ruler,
  Clock,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useServicosPublicos } from "@/hooks/useServicosPublicos";

// Categorias fixas
const categories = [
  { id: "hair", name: "Cabelo", icon: Scissors },
  { id: "beard", name: "Barba", icon: Scissors },
  { id: "combo", name: "Combos", icon: Package },
  { id: "color", name: "Coloração", icon: Paintbrush },
  { id: "extra", name: "Extras", icon: Ruler },
];

const Services = () => {
  const servicos = useServicosPublicos();

  // Agrupar serviços por categoria
  const servicosPorCategoria: Record<string, typeof servicos> = {};
  servicos.forEach((servico) => {
    if (!servicosPorCategoria[servico.categoria]) {
      servicosPorCategoria[servico.categoria] = [];
    }
    servicosPorCategoria[servico.categoria].push(servico);
  });

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

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(servicosPorCategoria[category.id] || []).map((service) => (
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
                      <CardTitle className="text-white">{service.nome}</CardTitle>
                      <CardDescription>{service.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{service.duracao} min</span>
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
                              {service.preco},00
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
                Terça a Sábado: 9h às 20h<br />
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
