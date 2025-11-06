import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { BottomNav } from "./components/BottomNav";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Instrucoes from "./pages/Instrucoes";
import Days from "./pages/Days";
import Day from "./pages/Day";
import Reflexao from "./pages/Reflexao";
import Sobre from "./pages/Sobre";
import NotFound from "./pages/NotFound";

const RouterContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited && location.pathname !== "/home") {
      sessionStorage.setItem("hasVisited", "true");
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/instrucoes" element={<Instrucoes />} />
        <Route path="/dias" element={<Days />} />
        <Route path="/dia/:dayNumber" element={<Day />} />
        <Route path="/reflexao" element={<Reflexao />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="focus-app-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <RouterContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
