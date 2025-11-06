import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Calendar, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AchievementBadge } from "@/components/AchievementBadge";
import { ProgressRing } from "@/components/ProgressRing";
import { NotificationSettings } from "@/components/NotificationSettings";

export default function Home() {
  const [nextDay, setNextDay] = useState(1);
  const [completedDays, setCompletedDays] = useState(0);

  useEffect(() => {
    const completed: number[] = [];
    for (let i = 1; i <= 7; i++) {
      const saved = localStorage.getItem(`day-${i}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.completed) {
          completed.push(i);
        }
      }
    }
    setCompletedDays(completed.length);
    
    // Find next available day
    if (completed.length === 7) {
      setNextDay(7); // Stay on day 7 if all complete
    } else {
      setNextDay(completed.length + 1);
    }
  }, []);

  const getButtonText = () => {
    if (completedDays === 0) {
      return "Começar jornada de 7 dias";
    } else if (completedDays === 7) {
      return "Ver reflexão final";
    } else {
      return `Continue no Dia ${nextDay}`;
    }
  };

  const getButtonLink = () => {
    if (completedDays === 7) {
      return "/reflexao";
    } else if (completedDays === 0) {
      return "/instrucoes";
    } else {
      return `/dia/${nextDay}`;
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Hero Section */}
      <div className="pt-12 pb-8 text-center animate-fade-in">
        {/* Progress Ring */}
        <div className="mb-6 flex justify-center">
          <ProgressRing 
            progress={(completedDays / 7) * 100} 
            showCheckmark={completedDays === 7}
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Do Ruído ao Resultado
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          Seu foco começa aqui. <br />
          <span className="font-semibold text-foreground">7 dias, 7 entregáveis, uma rotina transformada.</span>
        </p>
        
        {completedDays > 0 && completedDays < 7 && (
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-sm font-medium">
              {completedDays} de 7 dias concluídos
            </span>
          </div>
        )}
        
        <Link to={getButtonLink()}>
          <Button variant="hero" size="lg" className="animate-slide-up">
            {getButtonText()}
            <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>

      {/* Achievements Section */}
      <div className="max-w-2xl mx-auto mt-8">
        <AchievementBadge />
      </div>

      {/* Notification Settings */}
      <div className="max-w-2xl mx-auto mt-6">
        <NotificationSettings />
      </div>

      {/* Features Grid */}
      <div className="max-w-2xl mx-auto mt-16 grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">7 Dias Estruturados</h3>
          <p className="text-sm text-muted-foreground">
            Um dia por vez, um objetivo claro, um resultado tangível.
          </p>
        </div>

        <div className="bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="font-semibold mb-2">Checklists Práticos</h3>
          <p className="text-sm text-muted-foreground">
            Bloquear, Fazer, Registrar. Simples assim.
          </p>
        </div>

        <div className="bg-gradient-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-success" />
          </div>
          <h3 className="font-semibold mb-2">Foco e Entrega</h3>
          <p className="text-sm text-muted-foreground">
            Transforme intenção em ação com timer Pomodoro integrado.
          </p>
        </div>
      </div>

      {/* Quote Section */}
      <div className="max-w-2xl mx-auto mt-16 p-8 bg-accent rounded-2xl shadow-soft animate-fade-in">
        <blockquote className="text-center">
          <p className="text-lg italic text-accent-foreground mb-4">
            "O foco não é fazer mais. É fazer o que importa, com clareza e consistência."
          </p>
          <footer className="text-sm text-muted-foreground font-medium">
            — Seu guia para os próximos 7 dias
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
