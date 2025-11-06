import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { AchievementBadge } from "@/components/AchievementBadge";

const daysData = [
  { day: 1, theme: "Clareza de Foco", color: "from-teal-500 to-teal-600" },
  { day: 2, theme: "Pesquisa Rápida", color: "from-cyan-500 to-cyan-600" },
  { day: 3, theme: "Solução Simples", color: "from-blue-500 to-blue-600" },
  { day: 4, theme: "Estrutura Visual", color: "from-indigo-500 to-indigo-600" },
  { day: 5, theme: "Conteúdo Magnético", color: "from-purple-500 to-purple-600" },
  { day: 6, theme: "Validação Externa", color: "from-pink-500 to-pink-600" },
  { day: 7, theme: "Entrega e Reflexão", color: "from-rose-500 to-rose-600" },
];

export default function Days() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);

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
    setCompletedDays(completed);
  }, []);

  const isDayAccessible = (dayNum: number) => {
    if (dayNum === 1) return true;
    return completedDays.includes(dayNum - 1);
  };

  const isDayCompleted = (dayNum: number) => completedDays.includes(dayNum);

  return (
    <div className="min-h-screen pb-20 px-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Jornada de 7 Dias
          </h1>
          <p className="text-muted-foreground">
            {completedDays.length} de 7 dias completos
          </p>
          
          {/* Progress Bar */}
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mt-4 relative">
            <div 
              className="h-full bg-gradient-primary transition-all duration-1000 ease-out animate-progress-fill relative"
              style={{ width: `${(completedDays.length / 7) * 100}%` }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-6">
          <AchievementBadge />
        </div>

        {/* Days List */}
        <div className="space-y-4">
          {daysData.map((day, index) => {
            const isAccessible = isDayAccessible(day.day);
            const isCompleted = isDayCompleted(day.day);
            
            const content = (
              <div 
                className={`bg-gradient-card rounded-2xl p-6 shadow-card transition-all duration-300 animate-slide-up ${
                  isAccessible 
                    ? "hover:shadow-elevated cursor-pointer" 
                    : "opacity-60 cursor-not-allowed"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  {/* Day Icon */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isCompleted 
                      ? "bg-gradient-success" 
                      : isAccessible 
                        ? "bg-gradient-primary" 
                        : "bg-muted"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-success-foreground" />
                    ) : isAccessible ? (
                      <span className="text-2xl font-bold text-primary-foreground">
                        {day.day}
                      </span>
                    ) : (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Day Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        Dia {day.day}
                      </span>
                      {isCompleted && (
                        <span className="px-2 py-0.5 bg-success/20 text-success text-xs font-medium rounded-full">
                          Concluído
                        </span>
                      )}
                      {!isAccessible && (
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                          Bloqueado
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold">{day.theme}</h3>
                  </div>

                  {/* Arrow */}
                  {isAccessible && (
                    <div className="text-primary">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );

            return isAccessible ? (
              <Link key={day.day} to={`/dia/${day.day}`}>
                {content}
              </Link>
            ) : (
              <div key={day.day}>{content}</div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedDays.length === 7 && (
          <div className="mt-8 bg-gradient-success rounded-2xl p-6 text-center shadow-card animate-bounce-in">
            <h3 className="text-2xl font-bold text-success-foreground mb-2">
              🎉 Parabéns!
            </h3>
            <p className="text-success-foreground/90 mb-4">
              Você completou todos os 7 dias da jornada!
            </p>
            <Link 
              to="/reflexao"
              className="inline-block px-6 py-2 bg-success-foreground text-success font-medium rounded-lg hover:bg-success-foreground/90 transition-colors"
            >
              Ver Reflexão Final
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
