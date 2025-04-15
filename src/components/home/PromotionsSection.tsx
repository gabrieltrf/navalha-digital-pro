
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePercent, Gift, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Dados das promoções
const promotions = [
  {
    id: 1,
    title: "Combo Pai e Filho",
    description: "Corte para você e seu filho com 20% de desconto.",
    discount: "20% OFF",
    validUntil: "30/05/2025",
    color: "from-[#D4AF37] to-[#AA8C2C]",
    icon: Gift,
  },
  {
    id: 2,
    title: "Terça & Quinta Promocional",
    description: "Corte + barba por apenas R$55 nestes dias da semana.",
    discount: "15% OFF",
    validUntil: "Permanente",
    color: "from-[#ea384c] to-[#c72c3c]",
    icon: Clock,
  },
  {
    id: 3,
    title: "Indique um Amigo",
    description: "Ganhe 15% de desconto ao indicar um amigo que realizar um serviço.",
    discount: "15% OFF",
    validUntil: "Permanente",
    color: "from-[#3d4e81] to-[#252f4d]",
    icon: BadgePercent,
  },
];

export function PromotionsSection() {
  return (
    <section className="py-20 bg-barber-dark">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium">OFERTAS ESPECIAIS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Promoções e descontos imperdíveis
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Confira nossas promoções especiais e economize ao agendar os melhores serviços.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <Card 
              key={promo.id} 
              className="overflow-hidden border-0 shadow-lg relative h-full flex flex-col"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${promo.color} opacity-90`}></div>
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
              
              <CardHeader className="relative z-10">
                <div className="bg-white/20 p-3 rounded-full w-fit">
                  <promo.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl mt-4">{promo.title}</CardTitle>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white font-bold text-sm">{promo.discount}</span>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 flex-grow">
                <p className="text-white/80">{promo.description}</p>
                <p className="text-white/70 text-sm mt-4">
                  <span className="font-medium">Válido até:</span> {promo.validUntil}
                </p>
              </CardContent>
              <CardFooter className="relative z-10">
                <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20" asChild>
                  <Link to="/agendar">Aproveitar Agora</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-barber-dark-alt border border-white/10 p-6 inline-block max-w-2xl mx-auto">
            <CardContent className="p-0 pb-6">
              <h3 className="text-white text-2xl font-bold mb-4">Programa de Fidelidade</h3>
              <p className="text-muted-foreground">
                Ganhe pontos a cada serviço realizado e troque por descontos ou serviços gratuitos. 
                Quanto mais você visita, mais vantagens obtém!
              </p>
            </CardContent>
            <CardFooter className="p-0 flex justify-center">
              <Button className="bg-primary text-white hover:bg-primary/80" asChild>
                <Link to="/fidelidade">Ver Detalhes</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
