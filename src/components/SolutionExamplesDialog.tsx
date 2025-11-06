import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface Solution {
  name: string;
  howItWorks: string;
  strengths: string;
  improvements: string;
}

interface SolutionExamplesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (solutions: Solution[]) => void;
}

export function SolutionExamplesDialog({ open, onOpenChange, onComplete }: SolutionExamplesDialogProps) {
  const [solutions, setSolutions] = useState<Solution[]>([
    { name: "", howItWorks: "", strengths: "", improvements: "" },
    { name: "", howItWorks: "", strengths: "", improvements: "" }
  ]);

  const handleSolutionChange = (index: number, field: keyof Solution, value: string) => {
    const newSolutions = [...solutions];
    newSolutions[index][field] = value;
    setSolutions(newSolutions);
  };

  const handleComplete = () => {
    const allFilled = solutions.every(
      solution => solution.name.trim() !== "" && 
                  solution.howItWorks.trim() !== "" &&
                  solution.strengths.trim() !== "" &&
                  solution.improvements.trim() !== ""
    );
    
    if (!allFilled) {
      toast.error("Preencha todas as informações das 2 soluções");
      return;
    }

    onComplete(solutions);
    onOpenChange(false);
    toast.success("Soluções registradas com sucesso!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Encontre 2 Exemplos de Soluções
          </DialogTitle>
          <DialogDescription>
            Analise soluções existentes para entender o que já foi tentado
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {[0, 1].map((index) => (
            <div key={index} className="space-y-4 p-4 border-2 rounded-lg bg-gradient-card">
              <h3 className="font-semibold text-lg">Solução {index + 1}</h3>
              
              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>Nome da solução ou link</Label>
                <Input
                  id={`name-${index}`}
                  placeholder="Ex: Aplicativo Forest, Método Pomodoro..."
                  value={solutions[index].name}
                  onChange={(e) => handleSolutionChange(index, "name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`how-${index}`}>Como essa solução funciona?</Label>
                <Textarea
                  id={`how-${index}`}
                  placeholder="Descreva o funcionamento básico..."
                  value={solutions[index].howItWorks}
                  onChange={(e) => handleSolutionChange(index, "howItWorks", e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`strengths-${index}`}>O que ela resolve bem?</Label>
                <Textarea
                  id={`strengths-${index}`}
                  placeholder="Pontos fortes e benefícios..."
                  value={solutions[index].strengths}
                  onChange={(e) => handleSolutionChange(index, "strengths", e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`improvements-${index}`}>O que poderia melhorar?</Label>
                <Textarea
                  id={`improvements-${index}`}
                  placeholder="Limitações e oportunidades de melhoria..."
                  value={solutions[index].improvements}
                  onChange={(e) => handleSolutionChange(index, "improvements", e.target.value)}
                  className="min-h-20"
                />
              </div>
            </div>
          ))}

          <div className="bg-accent rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2">Comparativo automático:</h4>
            <p className="text-sm text-muted-foreground">
              Após preencher, você terá um panorama claro das soluções existentes e suas lacunas.
            </p>
          </div>

          <Button onClick={handleComplete} className="w-full" size="lg">
            <CheckCircle2 className="mr-2" />
            Concluir Análise
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
