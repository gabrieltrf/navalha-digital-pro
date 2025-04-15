
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarClock, Scissors, Star, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image com Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-barber-dark/80 via-barber-dark/90 to-barber-dark"></div>
      </div>

      <div className="container relative z-10 animate-fade-in">
        <div className="flex flex-col gap-8 md:max-w-[60%]">
          <span className="text-primary text-lg font-medium">DESDE 2023</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white text-shadow">
            Realce seu <span className="gold-gradient">estilo</span> com precisão e classe
          </h1>
          <p className="text-lg text-muted-foreground md:max-w-[90%]">
            Experimente o melhor serviço de barbearia com profissionais especializados e técnicas exclusivas para destacar o seu estilo.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/80" asChild>
              <Link to="/agendar">Agendar Horário</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary" asChild>
              <Link to="/servicos">Ver Serviços</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="flex flex-col gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <Scissors className="text-primary h-8 w-8" />
              <h3 className="text-lg font-semibold text-white">Barbeiros Premium</h3>
              <p className="text-sm text-muted-foreground">Profissionais altamente qualificados</p>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <Star className="text-primary h-8 w-8" />
              <h3 className="text-lg font-semibold text-white">Experiência 5 Estrelas</h3>
              <p className="text-sm text-muted-foreground">Atendimento de qualidade</p>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <CalendarClock className="text-primary h-8 w-8" />
              <h3 className="text-lg font-semibold text-white">Agendamento Online</h3>
              <p className="text-sm text-muted-foreground">Reserve seu horário facilmente</p>
            </div>
            <div className="flex flex-col gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <Users className="text-primary h-8 w-8" />
              <h3 className="text-lg font-semibold text-white">+500 Clientes</h3>
              <p className="text-sm text-muted-foreground">Satisfeitos com nossos serviços</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
