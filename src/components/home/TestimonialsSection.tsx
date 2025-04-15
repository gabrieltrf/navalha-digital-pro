
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

// Dados dos depoimentos
const testimonials = [
  {
    id: 1,
    name: "Marcos Oliveira",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment:
      "Melhor barbearia da cidade! Atendimento impecável e o resultado ficou exatamente como eu queria. O ambiente é muito agradável e o Carlos é um profissional excepcional.",
    date: "Há 3 dias",
  },
  {
    id: 2,
    name: "Felipe Santos",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    comment:
      "Recomendo demais! Marquei pelo app e foi super rápido. O Ricardo fez um degradê perfeito e deu várias dicas de como manter o corte por mais tempo.",
    date: "Há 1 semana",
  },
  {
    id: 3,
    name: "Lucas Martins",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    rating: 4,
    comment:
      "Experiência muito boa. Ambiente clean, bem decorado e com ótimo atendimento. Preços justos para a qualidade oferecida.",
    date: "Há 2 semanas",
  },
  {
    id: 4,
    name: "Gabriel Costa",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    comment:
      "A melhor barbearia que já fui! Fiz o combo corte e barba, muito bem feito. O programa de fidelidade é um diferencial, já estou quase no meu corte grátis.",
    date: "Há 1 mês",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-barber-dark-alt">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium">DEPOIMENTOS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            O que nossos clientes dizem
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Veja a experiência de quem já utilizou nossos serviços e aproveitou
            o melhor da BarberPro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-barber-dark border border-white/10 hover:border-primary/50 transition-all"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white text-sm italic">"{testimonial.comment}"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src={testimonial.avatarUrl} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white text-sm font-medium">{testimonial.name}</p>
                  <CardDescription>{testimonial.date}</CardDescription>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
