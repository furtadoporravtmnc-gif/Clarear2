import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ContentEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (content: { intro: string; development: string; conclusion: string }) => void;
}

export function ContentEditorDialog({ open, onOpenChange, onComplete }: ContentEditorDialogProps) {
  const [intro, setIntro] = useState("");
  const [development, setDevelopment] = useState("");
  const [conclusion, setConclusion] = useState("");

  const handleSubmit = () => {
    if (!intro.trim() || !development.trim() || !conclusion.trim()) {
      toast.error("Preencha as 3 seções");
      return;
    }

    onComplete({ intro, development, conclusion });
    onOpenChange(false);
    toast.success("Conteúdo salvo!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Escreva sua descrição</DialogTitle>
          <DialogDescription>
            Organize seu texto em 3 parágrafos: Introdução, Desenvolvimento e Conclusão.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-accent p-3 rounded-lg">
            <p className="text-sm text-accent-foreground">
              💡 <strong>Dica:</strong> Seja claro e direto. Use frases curtas e evite jargões.
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              Introdução - Apresente o contexto
            </label>
            <Textarea
              placeholder="Qual é a situação atual? Por que isso importa?"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="min-h-24"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              Desenvolvimento - Explique a solução
            </label>
            <Textarea
              placeholder="Como você pretende resolver? O que torna sua solução única?"
              value={development}
              onChange={(e) => setDevelopment(e.target.value)}
              className="min-h-24"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              Conclusão - Mostre o resultado
            </label>
            <Textarea
              placeholder="Qual o impacto esperado? O que muda com sua solução?"
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              className="min-h-24"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar Descrição
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
