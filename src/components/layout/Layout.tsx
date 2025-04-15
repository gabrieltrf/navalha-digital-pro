
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-barber-dark">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
