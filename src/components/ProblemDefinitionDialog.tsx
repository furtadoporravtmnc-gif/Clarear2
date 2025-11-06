import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface ProblemDefinitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: { problem: string; why: string; change: string }) => void;
}

export const ProblemDefinitionDialog = ({ open, onOpenChange, onComplete }: ProblemDefinitionDialogProps) => {
  const [problem, setProblem] = useState("");
  const [why, setWhy] = useState("");
  const [change, setChange] = useState("");

  const handleComplete = () => {
    if (!problem.trim() || !why.trim() || !change.trim()) {
      toast.error("Preencha todos os campos para continuar!");
      return;
    }
    
    onComplete({ problem, why, change });
    toast.success("Problema definido com clareza!", {
      description: "Esta frase estará visível durante todo o dia."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Defina seu problema com clareza
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Exemplo */}
          <div className="bg-accent rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Exemplo de problema bem formulado:</h4>
            <p className="text-sm text-accent-foreground/80 italic">
              "Estou tendo dificuldade em manter o foco por mais de 10 minutos seguidos durante o trabalho, 
              o que reduz minha produtividade e gera frustração."
            </p>
          </div>

          {/* Perguntas estruturadas */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                1. O que está acontecendo?
              </label>
              <Textarea
                placeholder="Descreva a situação atual de forma objetiva..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="min-h-20"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                2. Por que isso é um problema?
              </label>
              <Textarea
                placeholder="Qual o impacto negativo na sua vida ou trabalho?"
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                className="min-h-20"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                3. O que você quer mudar?
              </label>
              <Textarea
                placeholder="Descreva o resultado desejado..."
                value={change}
                onChange={(e) => setChange(e.target.value)}
                className="min-h-20"
              />
            </div>
          </div>

          <Button onClick={handleComplete} className="w-full" size="lg">
            Salvar Definição do Problema
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
