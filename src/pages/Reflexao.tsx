import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Lightbulb, TrendingUp, Heart, FileText, Link } from "lucide-react";
import { toast } from "sonner";
import { NotesHistoryDialog } from "@/components/NotesHistoryDialog";
import { LinksHistoryDialog } from "@/components/LinksHistoryDialog";

interface ReflectionData {
  deliverables: string;
  insights: string;
  nextSteps: string;
  feeling: string;
  timestamp?: string;
}

export default function Reflexao() {
  const [reflection, setReflection] = useState<ReflectionData>({
    deliverables: "",
    insights: "",
    nextSteps: "",
    feeling: "",
  });

  const [completedDays, setCompletedDays] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showNotesHistory, setShowNotesHistory] = useState(false);
  const [showLinksHistory, setShowLinksHistory] = useState(false);

  useEffect(() => {
    // Count completed days
    let count = 0;
    for (let i = 1; i <= 7; i++) {
      const saved = localStorage.getItem(`day-${i}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.completed) count++;
      }
    }
    setCompletedDays(count);

    // Load saved reflection
    const savedReflection = localStorage.getItem("final-reflection");
    if (savedReflection) {
      setReflection(JSON.parse(savedReflection));
      setSaved(true);
    }
  }, []);

  const handleSave = () => {
    const data = {
      ...reflection,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("final-reflection", JSON.stringify(data));
    setSaved(true);
    toast.success("Reflexão salva com sucesso! 🎉");
  };

  const handleShare = () => {
    const text = `Concluí ${completedDays} dias do desafio "Do Ruído ao Resultado"! 🎯\n\n${reflection.insights}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Minha jornada de 7 dias",
        text: text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Texto copiado para área de transferência!");
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-success rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-success-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Reflexão Final
          </h1>
          <p className="text-muted-foreground">
            Você completou <strong className="text-foreground">{completedDays} de 7 dias</strong>
          </p>
        </div>

        {/* Progress Visualization */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up">
          <h2 className="text-lg font-semibold mb-4">Seu Progresso</h2>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => {
              const dayNum = i + 1;
              const saved = localStorage.getItem(`day-${dayNum}`);
              const isCompleted = saved ? JSON.parse(saved).completed : false;
              
              return (
                <div
                  key={dayNum}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-gradient-success text-success-foreground animate-bounce-in"
                      : "bg-muted text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : dayNum}
                </div>
              );
            })}
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Entregáveis Concluídos</h2>
          </div>
          <Textarea
            placeholder="Liste os principais entregáveis que você criou durante a semana..."
            value={reflection.deliverables}
            onChange={(e) =>
              setReflection({ ...reflection, deliverables: e.target.value })
            }
            className="min-h-24 resize-none"
          />
        </div>

        {/* Insights */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3 mb-3">
            <Lightbulb className="w-5 h-5 text-secondary" />
            <h2 className="text-lg font-semibold">Insights Principais</h2>
          </div>
          <Textarea
            placeholder="Quais foram os aprendizados mais importantes?"
            value={reflection.insights}
            onChange={(e) =>
              setReflection({ ...reflection, insights: e.target.value })
            }
            className="min-h-24 resize-none"
          />
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-success" />
            <h2 className="text-lg font-semibold">Próximos Passos</h2>
          </div>
          <Textarea
            placeholder="O que você vai fazer para manter o momentum?"
            value={reflection.nextSteps}
            onChange={(e) =>
              setReflection({ ...reflection, nextSteps: e.target.value })
            }
            className="min-h-24 resize-none"
          />
        </div>

        {/* Feeling */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-semibold">Sensação Geral</h2>
          </div>
          <Textarea
            placeholder="Como você se sente após essa jornada?"
            value={reflection.feeling}
            onChange={(e) =>
              setReflection({ ...reflection, feeling: e.target.value })
            }
            className="min-h-24 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-8">
          <Button
            onClick={handleSave}
            variant={saved ? "success" : "default"}
            size="lg"
            className="flex-1"
          >
            {saved ? (
              <>
                <CheckCircle2 className="mr-2" />
                Salvo
              </>
            ) : (
              "Salvar Reflexão"
            )}
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            size="lg"
            disabled={!saved}
          >
            Compartilhar
          </Button>
        </div>

        {/* History Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <Button
            onClick={() => setShowNotesHistory(true)}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <FileText className="mr-2 w-4 h-4" />
            Histórico de Anotações e Insights
          </Button>
          
          <Button
            onClick={() => setShowLinksHistory(true)}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Link className="mr-2 w-4 h-4" />
            Histórico de Links e Anexos
          </Button>
        </div>

        {/* Motivational Message */}
        {completedDays === 7 && (
          <div className="bg-accent rounded-2xl p-6 text-center animate-bounce-in">
            <h3 className="text-xl font-bold mb-2 text-accent-foreground">
              🎉 Você conseguiu!
            </h3>
            <p className="text-accent-foreground/80">
              Do ruído ao resultado. Do caos à clareza. Do sonho à execução.
              <br />
              <strong>Continue entregando, uma semana de cada vez.</strong>
            </p>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <NotesHistoryDialog 
        open={showNotesHistory} 
        onOpenChange={setShowNotesHistory} 
      />
      <LinksHistoryDialog 
        open={showLinksHistory} 
        onOpenChange={setShowLinksHistory} 
      />
    </div>
  );
}
