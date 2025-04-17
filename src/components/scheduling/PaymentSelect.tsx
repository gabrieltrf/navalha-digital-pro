//C:\projetos\App Barbearia\navalha-digital-pro\src\components\scheduling\PaymentSelect.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, DollarSign, QrCode, Scissors } from "lucide-react";

// Opções de pagamento
const paymentOptions = [
  {
    id: "card",
    name: "Cartão de Crédito/Débito",
    description: "Pague com seu cartão no dia do atendimento",
    icon: CreditCard,
  },
  {
    id: "cash",
    name: "Dinheiro",
    description: "Pague em dinheiro no dia do atendimento",
    icon: DollarSign,
  },
  {
    id: "pix",
    name: "PIX",
    description: "Pague com PIX no dia do atendimento",
    icon: QrCode,
  },
];

type PaymentSelectProps = {
  selectedPayment: string | null;
  onSelectPayment: (payment: string) => void;
};

export function PaymentSelect({ selectedPayment, onSelectPayment }: PaymentSelectProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-white mb-4">Selecione a Forma de Pagamento</h2>
      
      <RadioGroup value={selectedPayment || ""} onValueChange={onSelectPayment}>
        <div className="grid grid-cols-1 gap-4">
          {paymentOptions.map((option) => (
            <Card 
              key={option.id} 
              className={`transition-all cursor-pointer bg-barber-dark-alt border ${
                selectedPayment === option.id 
                  ? "border-primary" 
                  : "border-white/10 hover:border-white/30"
              }`}
              onClick={() => onSelectPayment(option.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id} 
                    className="text-primary border-primary"
                  />
                  <div className={`p-2 rounded-full ${
                    selectedPayment === option.id 
                      ? "bg-primary/20" 
                      : "bg-white/5"
                  }`}>
                    <option.icon className={`h-5 w-5 ${
                      selectedPayment === option.id 
                        ? "text-primary" 
                        : "text-white"
                    }`} />
                  </div>
                  <div>
                    <Label htmlFor={option.id} className="text-white cursor-pointer">
                      {option.name}
                    </Label>
                    <CardDescription className="mt-1">{option.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
