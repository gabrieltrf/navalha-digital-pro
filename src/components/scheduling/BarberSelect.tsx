// src/components/scheduling/BarberSelect.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { useBarbeiros } from "@/hooks/useBarbeiros";

type BarberSelectProps = {
  onSelectBarber: (barber: any | null) => void;
  selectedBarber: any | null;
};

export function BarberSelect({ onSelectBarber, selectedBarber }: BarberSelectProps) {
  const barbeiros = useBarbeiros();

  if (barbeiros.length === 0) {
    return <p className="text-white">Carregando barbeiros...</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-white mb-4">Selecione o Profissional</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {barbeiros.map((barber) => (
          <Card
            key={barber.id}
            className={`cursor-pointer transition-all ${
              selectedBarber?.id === barber.id
                ? "border-primary bg-barber-dark-alt"
                : "border-white/10 bg-barber-dark-alt"
            } hover:border-primary/50`}
            onClick={() => onSelectBarber(barber)}
          >
            <CardHeader className="flex flex-row gap-3 items-center pb-2">
              <Avatar className="h-14 w-14 border-2 border-primary">
                <AvatarImage src={barber.imagem} alt={barber.nome} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {barber.nome?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white">{barber.nome}</CardTitle>
                <CardDescription className="text-sm">{barber.especialidade}</CardDescription>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-xs text-white">{barber.nota}</span>
                  <span className="text-xs text-muted-foreground">
                    ({barber.avaliacoes} avaliações)
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3" />
          </Card>
        ))}
      </div>
    </div>
  );
}
