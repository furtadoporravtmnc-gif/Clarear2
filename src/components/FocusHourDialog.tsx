import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

interface FocusHourDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (plan: string) => void;
}

export const FocusHourDialog = ({ open, onOpenChange, onComplete }: FocusHourDialogProps) => {
  const [plan, setPlan] = useState("");
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (!plan.trim()) {
      toast.error("Escreva seu plano de ação antes de começar!");
      return;
    }
    setStarted(true);
    onComplete(plan);
    toast.success("Hora de foco iniciada! 60 minutos no cronômetro.", {
      description: "Desligue notificações e foque no seu objetivo."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Prepare seu ambiente de foco
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Sugestões */}
          <div className="bg-accent rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-sm">Checklist de preparação:</h4>
            <ul className="space-y-2 text-sm text-accent-foreground/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Desligue notificações do celular e computador</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Use fones de ouvido (música ou silêncio)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Avise colegas/familiares que estará ocupado</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Tenha água e o material necessário por perto</span>
              </li>
            </ul>
          </div>

          {/* Plano de ação */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              O que você pretende fazer nessa hora?
            </label>
            <Textarea
              placeholder="Ex: Vou definir o problema central do meu projeto e escrever 3 possíveis soluções..."
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="min-h-24"
            />
          </div>

          <Button onClick={handleStart} className="w-full" size="lg">
            Iniciar Hora de Foco
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
