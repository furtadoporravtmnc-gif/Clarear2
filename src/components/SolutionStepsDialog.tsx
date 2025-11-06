import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface SolutionStepsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (steps: string[]) => void;
}

export function SolutionStepsDialog({ open, onOpenChange, onComplete }: SolutionStepsDialogProps) {
  const [step1, setStep1] = useState("");
  const [step2, setStep2] = useState("");
  const [step3, setStep3] = useState("");

  const handleSubmit = () => {
    if (!step1.trim() || !step2.trim() || !step3.trim()) {
      toast.error("Preencha todos os 3 passos da solução");
      return;
    }

    onComplete([step1, step2, step3]);
    onOpenChange(false);
    toast.success("Solução em 3 passos salva!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Desenhe sua solução em 3 passos</DialogTitle>
          <DialogDescription>
            Simplifique sua ideia em 3 etapas claras. Pense no menor caminho para resolver o problema.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-accent p-3 rounded-lg">
            <p className="text-sm text-accent-foreground">
              💡 <strong>Dica:</strong> Comece pelo resultado final e trabalhe de trás para frente.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold mb-2 block">Passo 1</label>
              <Textarea
                placeholder="Descreva o primeiro passo da sua solução..."
                value={step1}
                onChange={(e) => setStep1(e.target.value)}
                className="min-h-20"
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Passo 2</label>
              <Textarea
                placeholder="Descreva o segundo passo..."
                value={step2}
                onChange={(e) => setStep2(e.target.value)}
                className="min-h-20"
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Passo 3</label>
              <Textarea
                placeholder="Descreva o terceiro passo..."
                value={step3}
                onChange={(e) => setStep3(e.target.value)}
                className="min-h-20"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar Solução
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
