// src/components/BarbersSection.tsx

import { useBarbeiros } from "@/hooks/useBarbeiros";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export function BarbersSection() {
  const barbeiros = useBarbeiros();

  return (
    <section className="py-20 bg-barber-dark">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium">NOSSOS PROFISSIONAIS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Conheça nossa equipe de especialistas
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Barbeiros experientes e apaixonados, prontos para oferecer o melhor
            atendimento e resultado para você.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbeiros.map((barber) => (
            <Card
              key={barber.id}
              className="bg-barber-dark-alt border border-white/10 hover:border-primary/50 transition-all group"
            >
              <CardHeader className="pb-2">
                <div className="relative w-full h-56 mb-2 overflow-hidden rounded-md">
                  <img
                    src={barber.imagem}
                    alt={barber.nome}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{barber.nome}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span className="text-sm font-medium text-white">{barber.nota}</span>
                  </div>
                </div>
                <CardDescription>{barber.especialidade}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Experiência: {barber.experiencia}</span>
                  <span>{barber.avaliacoes} avaliações</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
