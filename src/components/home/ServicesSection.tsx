import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useServicos } from "@/hooks/useServicos";
import { Scissors, Package, Paintbrush, Ruler, Sparkles } from "lucide-react";

const iconMap: Record<string, any> = {
  scissors: Scissors,
  package: Package,
  paintbrush: Paintbrush,
  ruler: Ruler,
  sparkles: Sparkles, // ícone genérico caso não haja correspondência
};

export function ServicesSection() {
  const servicos = useServicos();

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
          {servicos.map((servico) => {
            const Icon = iconMap[servico.icone] || Sparkles;

            return (
              <Card key={servico.id} className="bg-barber-dark border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden group">
                <CardHeader className="relative">
                  <div className="bg-primary/10 p-4 rounded-full inline-flex">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-white mt-4 ">{servico.nome}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {servico.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      R$ {Number(servico.preco).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {servico.duracao || "30 min"}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary" asChild>
                    <Link to={`/servicos/${servico.id}`}>
                      Saiba mais
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
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
