
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Scissors, Scissors as Beard, Package, Paintbrush, Ruler } from "lucide-react";

// Definição de serviços
const services = [
  {
    id: 1,
    title: "Corte de Cabelo",
    description: "Cortes modernos e clássicos para todos os estilos.",
    price: "R$ 40,00",
    duration: "30 min",
    icon: Scissors,
    link: "/servicos/corte",
  },
  {
    id: 2,
    title: "Barba",
    description: "Modelagem e aparagem de barba com toalha quente.",
    price: "R$ 35,00",
    duration: "25 min",
    icon: Beard,
    link: "/servicos/barba",
  },
  {
    id: 3,
    title: "Combo (Corte + Barba)",
    description: "O pacote completo por um preço especial.",
    price: "R$ 65,00",
    duration: "50 min",
    icon: Package,
    link: "/servicos/combo",
  },
  {
    id: 4,
    title: "Coloração",
    description: "Novas cores para seu cabelo com produtos de qualidade.",
    price: "R$ 60,00",
    duration: "45 min",
    icon: Paintbrush,
    link: "/servicos/pintura",
  },
  {
    id: 5,
    title: "Design de Sobrancelha",
    description: "Modelagem com precisão e estilo.",
    price: "R$ 25,00",
    duration: "15 min",
    icon: Ruler,
    link: "/servicos/sobrancelha",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-barber-dark-alt">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium">NOSSOS SERVIÇOS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Escolha o serviço perfeito para você
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Oferecemos uma variedade de serviços de barbearia executados por profissionais
            experientes e apaixonados pelo que fazem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="bg-barber-dark border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden group">
              <CardHeader className="relative">
                <div className="bg-primary/10 p-4 rounded-full inline-flex">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-white mt-4">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  <span className="text-sm text-muted-foreground">{service.duration}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary" asChild>
                  <Link to={service.link}>
                    Saiba mais
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-primary text-white hover:bg-primary/80" size="lg" asChild>
            <Link to="/servicos">Ver todos os serviços</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
