import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface InsightsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (insights: string[]) => void;
}

export function InsightsDialog({ open, onOpenChange, onComplete }: InsightsDialogProps) {
  const [insights, setInsights] = useState(["", "", ""]);

  const handleInsightChange = (index: number, value: string) => {
    const newInsights = [...insights];
    newInsights[index] = value;
    setInsights(newInsights);
  };

  const handleComplete = () => {
    const allFilled = insights.every(insight => insight.trim() !== "");
    
    if (!allFilled) {
      toast.error("Registre os 3 insights antes de continuar");
      return;
    }

    onComplete(insights);
    onOpenChange(false);
    toast.success("Insights registrados com sucesso!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Anote 3 Insights Principais
          </DialogTitle>
          <DialogDescription>
            Registre as descobertas mais importantes da sua pesquisa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Guide */}
          <div className="bg-accent rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">O que são insights?</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Insights são conclusões ou aprendizados que mudam sua perspectiva sobre o problema.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Uma descoberta surpreendente sobre o problema</li>
              <li>• Uma tendência ou padrão que você identificou</li>
              <li>• Uma oportunidade que não tinha visto antes</li>
              <li>• Uma confirmação importante de suas hipóteses</li>
            </ul>
          </div>

          {/* Insight inputs */}
          {[0, 1, 2].map((index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`insight-${index}`} className="font-semibold">
                Insight {index + 1}
              </Label>
              <Textarea
                id={`insight-${index}`}
                placeholder="Descreva o que você descobriu e por que é importante..."
                value={insights[index]}
                onChange={(e) => handleInsightChange(index, e.target.value)}
                className="min-h-24 resize-none"
              />
            </div>
          ))}

          <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Dica:</strong> Bons insights conectam informações de diferentes fontes 
              e revelam algo novo sobre o problema ou as soluções possíveis.
            </p>
          </div>

          <Button onClick={handleComplete} className="w-full" size="lg">
            <CheckCircle2 className="mr-2" />
            Salvar Insights
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
