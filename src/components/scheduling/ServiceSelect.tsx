// src/components/scheduling/ServiceSelect.tsx
import { useEffect } from "react";
import { useServicos, Servicos as ServicoType } from "@/hooks/useServicos";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scissors, Package, Paintbrush, Ruler, Sparkles } from "lucide-react";

type ServiceSelectProps = {
  onSelectService: (service: ServicoType | null) => void;
  selectedService: ServicoType | null;
};

// Mapeamento de nomes de ícones para componentes Lucide
const iconMap: Record<string, any> = {
  scissors: Scissors,
  package: Package,
  paintbrush: Paintbrush,
  ruler: Ruler,
};

export function ServiceSelect({ onSelectService, selectedService }: ServiceSelectProps) {
  const servicos = useServicos();

  // Mostra loading enquanto busca
  if (servicos.length === 0) {
    return <p className="text-white">Carregando serviços...</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-white mb-4">Selecione o Serviço</h2>
      <div className="grid grid-cols-1 gap-4">
        {servicos.map((service) => {
          // Seleciona o ícone baseado na string retornada do Firebase
          const Icon = iconMap[service.icone] || Sparkles;
          const duration = service.duracao ? Number(service.duracao) : 30;

          return (
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
                    <div
                      className={`p-2 rounded-full ${
                        selectedService?.id === service.id
                          ? "bg-primary/20"
                          : "bg-white/5"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          selectedService?.id === service.id
                            ? "text-primary"
                            : "text-white"
                        }`}
                      />
                    </div>
                    <CardTitle className="text-white text-lg">
                      {service.nome}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {duration} min
                    </span>
                    <span className="text-lg font-bold text-primary">
                      R$ {service.preco.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {service.descricao}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
