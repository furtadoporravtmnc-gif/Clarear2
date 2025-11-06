import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Target, CheckCircle2, Lightbulb } from "lucide-react";

export default function Instrucoes() {
  return (
    <div className="min-h-screen pb-20 px-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Como usar este guia
          </h1>
          <p className="text-muted-foreground">
            Siga estas instruções para aproveitar ao máximo sua jornada de 7 dias
          </p>
        </div>

        {/* Objetivo */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Objetivo</h2>
              <p className="text-muted-foreground">
                Cada dia tem um foco específico. Seu objetivo é completar a tarefa proposta 
                e gerar um entregável mínimo viável. Não busque perfeição — busque progresso.
              </p>
            </div>
          </div>
        </div>

        {/* Regras de Ouro */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Regras de Ouro</h2>
            </div>
          </div>
          
          <ul className="space-y-3 ml-16">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-success mt-0.5">1</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Bloquear:</strong> Desligue notificações, silencie grupos, feche abas desnecessárias.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-success mt-0.5">2</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Fazer:</strong> Execute a tarefa do dia sem interrupções.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-success mt-0.5">3</span>
              <span className="text-muted-foreground"><strong className="text-foreground">Registrar:</strong> Anote insights, decisões e próximos passos.</span>
            </li>
          </ul>
        </div>

        {/* Tempo Estimado */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Tempo Estimado</h2>
              <p className="text-muted-foreground mb-3">
                Cada dia requer entre <strong className="text-foreground">45 minutos e 2 horas</strong> de trabalho focado. 
                Use o timer Pomodoro integrado para manter o ritmo.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-accent rounded-full text-sm font-medium">25 min</span>
                <span className="px-3 py-1 bg-accent rounded-full text-sm font-medium">45 min</span>
                <span className="px-3 py-1 bg-accent rounded-full text-sm font-medium">60 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recomendações */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Recomendações de Uso</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Faça um dia por vez. Não pule etapas.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Complete o checklist antes de marcar como concluído.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Use o campo de registro para capturar aprendizados.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Celebre cada pequena vitória — elas se acumulam.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-bounce-in">
          <Link to="/dia/1">
            <Button variant="hero" size="lg">
              Ir para Dia 1
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
