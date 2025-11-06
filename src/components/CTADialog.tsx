import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CTADialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (cta: string) => void;
}

const ctaExamples = [
  "Teste agora",
  "Participe do desafio",
  "Saiba mais",
  "Comece gratuitamente",
  "Junte-se a nós",
  "Experimente hoje"
];

export function CTADialog({ open, onOpenChange, onComplete }: CTADialogProps) {
  const [cta, setCta] = useState("");

  const handleSubmit = () => {
    if (!cta.trim()) {
      toast.error("Escolha ou escreva um call-to-action");
      return;
    }

    onComplete(cta);
    onOpenChange(false);
    toast.success("Call-to-action salvo!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicione um call-to-action</DialogTitle>
          <DialogDescription>
            Um bom CTA incentiva a ação e deixa claro o próximo passo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-accent p-3 rounded-lg">
            <p className="text-sm text-accent-foreground">
              💡 <strong>Dica:</strong> Use verbos de ação e crie senso de urgência ou benefício claro.
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Escolha ou crie seu CTA</label>
            <Input
              placeholder="Ex: Teste agora, Participe..."
              value={cta}
              onChange={(e) => setCta(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Exemplos prontos:</p>
            <div className="grid grid-cols-2 gap-2">
              {ctaExamples.map((example) => (
                <button
                  key={example}
                  onClick={() => setCta(example)}
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar CTA
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
