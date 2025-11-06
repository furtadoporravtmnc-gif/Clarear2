import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface MVPDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: { simplest: string; testable: string }) => void;
}

export function MVPDialog({ open, onOpenChange, onComplete }: MVPDialogProps) {
  const [simplest, setSimplest] = useState("");
  const [testable, setTestable] = useState("");

  const handleSubmit = () => {
    if (!simplest.trim() || !testable.trim()) {
      toast.error("Responda às duas perguntas");
      return;
    }

    onComplete({ simplest, testable });
    onOpenChange(false);
    toast.success("MVP definido!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Identifique o MVP</DialogTitle>
          <DialogDescription>
            Defina a versão mais simples que já resolve o problema e pode ser testada rapidamente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-accent p-3 rounded-lg">
            <p className="text-sm text-accent-foreground">
              💡 <strong>Lembre-se:</strong> MVP não precisa ser perfeito, só precisa funcionar e validar sua ideia.
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              Qual é a versão mais simples que já resolve o problema?
            </label>
            <Textarea
              placeholder="Descreva o essencial da sua solução..."
              value={simplest}
              onChange={(e) => setSimplest(e.target.value)}
              className="min-h-24"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              O que pode ser testado rapidamente?
            </label>
            <Textarea
              placeholder="O que você pode validar em poucos dias?"
              value={testable}
              onChange={(e) => setTestable(e.target.value)}
              className="min-h-24"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar MVP
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
