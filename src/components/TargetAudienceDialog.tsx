import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { toast } from "sonner";

interface TargetAudienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: { audience: string; impact: string }) => void;
}

export const TargetAudienceDialog = ({ open, onOpenChange, onComplete }: TargetAudienceDialogProps) => {
  const [audience, setAudience] = useState("");
  const [impact, setImpact] = useState("");

  const handleComplete = () => {
    if (!audience.trim() || !impact.trim()) {
      toast.error("Preencha todos os campos para continuar!");
      return;
    }
    
    onComplete({ audience, impact });
    toast.success("Público-alvo identificado!", {
      description: "Essas informações ajudarão a guiar suas decisões."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Identifique o público-alvo afetado
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Orientação */}
          <div className="bg-accent rounded-lg p-4">
            <p className="text-sm text-accent-foreground/80">
              Pense em quem é diretamente impactado pelo problema que você identificou. 
              Pode ser você mesmo, sua equipe, clientes, ou um grupo específico de pessoas.
            </p>
          </div>

          {/* Campos */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Quem é o público-alvo?
              </label>
              <Input
                placeholder="Ex: Profissionais que trabalham remotamente..."
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Como esse problema afeta esse público?
              </label>
              <Textarea
                placeholder="Descreva o impacto específico no dia a dia desse público..."
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                className="min-h-24"
              />
            </div>
          </div>

          <Button onClick={handleComplete} className="w-full" size="lg">
            Salvar Público-Alvo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
