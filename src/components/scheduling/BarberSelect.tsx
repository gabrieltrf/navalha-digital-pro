
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

// Dados dos barbeiros
const barbers = [
  {
    id: 1,
    name: "Carlos Silva",
    specialty: "Cortes Clássicos",
    image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=1480&auto=format&fit=crop",
    rating: 4.9,
    reviews: 352,
    available: true,
  },
  {
    id: 2,
    name: "Ricardo Almeida",
    specialty: "Barbas e Estilos Modernos",
    image: "https://images.unsplash.com/photo-1615814608059-5442224c5671?q=80&w=1480&auto=format&fit=crop",
    rating: 4.8,
    reviews: 215,
    available: true,
  },
  {
    id: 3,
    name: "João Mendes",
    specialty: "Cortes Degradê e Navalhado",
    image: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?q=80&w=1476&auto=format&fit=crop",
    rating: 4.7,
    reviews: 189,
    available: true,
  },
  {
    id: 4,
    name: "André Costa",
    specialty: "Coloração e Estilos Alternativos",
    image: "https://images.unsplash.com/photo-1534469791285-baa529eba021?q=80&w=1480&auto=format&fit=crop",
    rating: 4.9,
    reviews: 231,
    available: false,
  },
];

type BarberSelectProps = {
  onSelectBarber: (barber: typeof barbers[0] | null) => void;
  selectedBarber: typeof barbers[0] | null;
};

export function BarberSelect({ onSelectBarber, selectedBarber }: BarberSelectProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-white mb-4">Selecione o Profissional</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {barbers.map((barber) => (
          <Card
            key={barber.id}
            className={`cursor-pointer transition-all ${
              !barber.available 
                ? "opacity-50 pointer-events-none" 
                : "hover:border-primary/50"
            } ${
              selectedBarber?.id === barber.id 
                ? "border-primary bg-barber-dark-alt" 
                : "border-white/10 bg-barber-dark-alt"
            }`}
            onClick={() => barber.available && onSelectBarber(barber)}
          >
            <CardHeader className="flex flex-row gap-3 items-center pb-2">
              <Avatar className="h-14 w-14 border-2 border-primary">
                <AvatarImage src={barber.image} alt={barber.name} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {barber.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white">{barber.name}</CardTitle>
                <CardDescription className="text-sm">{barber.specialty}</CardDescription>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-xs text-white">{barber.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({barber.reviews} avaliações)
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              {!barber.available && (
                <p className="text-xs text-accent">Indisponível no horário selecionado</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
