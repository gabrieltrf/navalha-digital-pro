
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-barber-dark-alt border-t border-white/10 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold gold-gradient">BarberPro</h2>
            <p className="text-muted-foreground text-sm">
              A melhor experiência em barbearia da cidade, com profissionais especializados em técnicas modernas de corte e barba.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Youtube size={18} className="text-white" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white">Links Rápidos</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/agendar"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Agendar
                </Link>
              </li>
              <li>
                <Link
                  to="/loja"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Loja
                </Link>
              </li>
              <li>
                <Link
                  to="/galeria"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Galeria
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white">Serviços</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/servicos/corte"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Corte de Cabelo
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos/barba"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Barba
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos/combo"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Combo (Corte + Barba)
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos/pintura"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Coloração
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos/sobrancelha"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Design de Sobrancelha
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white">Contato</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                <span>Av. Exemplo, 1234 - Centro</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <span>(11) 95555-5555</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <span>contato@barberpro.com</span>
              </li>
            </ul>
            <div className="mt-2">
              <h4 className="text-sm font-medium text-white mb-2">Horário de Funcionamento</h4>
              <p className="text-sm text-muted-foreground">Seg - Sáb: 9h às 20h</p>
              <p className="text-sm text-muted-foreground">Dom: 10h às 16h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BarberPro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
