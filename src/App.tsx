import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import Scheduling from "./pages/Scheduling";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import BarberDashboard from "./pages/BarberDashboard";
import NotFound from "./pages/NotFound";

// Defina o tema escuro como padrão
document.documentElement.classList.add("dark");

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/agendar" element={<Scheduling />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/barbeiro" element={<BarberDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
