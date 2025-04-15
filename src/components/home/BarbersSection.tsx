
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
    experience: "8 anos",
  },
  {
    id: 2,
    name: "Ricardo Almeida",
    specialty: "Barbas e Estilos Modernos",
    image: "https://images.unsplash.com/photo-1615814608059-5442224c5671?q=80&w=1480&auto=format&fit=crop",
    rating: 4.8,
    reviews: 215,
    experience: "6 anos",
  },
  {
    id: 3,
    name: "João Mendes",
    specialty: "Cortes Degradê e Navalhado",
    image: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?q=80&w=1476&auto=format&fit=crop",
    rating: 4.7,
    reviews: 189,
    experience: "5 anos",
  },
  {
    id: 4,
    name: "André Costa",
    specialty: "Coloração e Estilos Alternativos",
    image: "https://images.unsplash.com/photo-1534469791285-baa529eba021?q=80&w=1480&auto=format&fit=crop",
    rating: 4.9,
    reviews: 231,
    experience: "7 anos",
  },
];

export function BarbersSection() {
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
          {barbers.map((barber) => (
            <Card key={barber.id} className="bg-barber-dark-alt border border-white/10 hover:border-primary/50 transition-all group">
              <CardHeader className="pb-2">
                <div className="relative w-full h-56 mb-2 overflow-hidden rounded-md">
                  <img 
                    src={barber.image} 
                    alt={barber.name} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{barber.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                    <span className="text-sm font-medium text-white">{barber.rating}</span>
                  </div>
                </div>
                <CardDescription>{barber.specialty}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Experiência: {barber.experience}</span>
                  <span>{barber.reviews} avaliações</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
