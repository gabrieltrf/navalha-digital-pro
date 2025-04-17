//navalha-digital-pro/src/components/scheduling/ServiceSelect.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Package, Paintbrush, Ruler } from "lucide-react";
import { useState } from "react";

// Definição dos serviços disponíveis
const services = [
  {
    id: 1,
    name: "Corte de Cabelo",
    description: "Cortes modernos e clássicos para todos os estilos.",
    price: 40,
    duration: 30,
    icon: Scissors,
  },
  {
    id: 2,
    name: "Barba",
    description: "Modelagem e aparagem de barba com toalha quente.",
    price: 35,
    duration: 25,
    icon: Scissors, // Usando Scissors como alternativa para barba
  },
  {
    id: 3,
    name: "Combo (Corte + Barba)",
    description: "O pacote completo por um preço especial.",
    price: 65,
    duration: 50,
    icon: Package,
  },
  {
    id: 4,
    name: "Coloração",
    description: "Novas cores para seu cabelo com produtos de qualidade.",
    price: 60,
    duration: 45,
    icon: Paintbrush,
  },
  {
    id: 5,
    name: "Design de Sobrancelha",
    description: "Modelagem com precisão e estilo.",
    price: 25,
    duration: 15,
    icon: Ruler,
  },
];

type ServiceSelectProps = {
  onSelectService: (service: typeof services[0] | null) => void;
  selectedService: typeof services[0] | null;
};

export function ServiceSelect({ onSelectService, selectedService }: ServiceSelectProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-white mb-4">Selecione o Serviço</h2>
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <Card 
            key={service.id} 
            className={`cursor-pointer transition-all bg-barber-dark-alt border ${
              selectedService?.id === service.id 
                ? "border-primary" 
                : "border-white/10 hover:border-white/30"
            }`}
            onClick={() => onSelectService(service)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    selectedService?.id === service.id 
                      ? "bg-primary/20" 
                      : "bg-white/5"
                  }`}>
                    <service.icon className={`h-5 w-5 ${
                      selectedService?.id === service.id 
                        ? "text-primary" 
                        : "text-white"
                    }`} />
                  </div>
                  <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{service.duration} min</span>
                  <span className="text-lg font-bold text-primary">R$ {service.price},00</span>
                </div>
              </div>
              <CardDescription className="mt-2">{service.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
