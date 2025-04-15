
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, Bell, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Função para alternar entre modo claro e escuro
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
  };

  // Detectar scroll para alterar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Serviços", path: "/servicos" },
    { name: "Agendar", path: "/agendar" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-barber-dark-alt/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold gold-gradient">BarberPro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-white hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:bg-white/10"
          >
            {isDarkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            asChild
          >
            <Link to="/notificacoes">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            asChild
          >
            <Link to="/chat">
              <MessageSquare className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 md:mr-0 mr-2"
            asChild
          >
            <Link to="/perfil">
              <User className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-[1.5rem] w-[1.5rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[250px] bg-barber-dark border-l border-barber-gold/20">
              <div className="flex flex-col gap-8 py-4">
                <span className="text-2xl font-bold gold-gradient">
                  BarberPro
                </span>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-base font-medium text-white hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-barber-gold/20 pt-4">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Área do Barbeiro</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
