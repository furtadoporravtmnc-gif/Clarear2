import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface TitleGeneratorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (title: string) => void;
}

export function TitleGeneratorDialog({ open, onOpenChange, onComplete }: TitleGeneratorDialogProps) {
  const [title, setTitle] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateVariations = () => {
    if (!title.trim()) {
      toast.error("Escreva um título primeiro");
      return;
    }

    const variations = [
      `Como ${title}`,
      `${title}: Um guia prático`,
      `7 passos para ${title}`,
      `Por que ${title} importa?`,
      `${title} sem complicação`
    ];
    
    setSuggestions(variations);
    toast.success("Variações geradas!");
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Escreva um título antes de continuar");
      return;
    }

    onComplete(title);
    onOpenChange(false);
    toast.success("Título salvo!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crie um título chamativo</DialogTitle>
          <DialogDescription>
            Um bom título desperta curiosidade e comunica valor de forma clara.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-accent p-3 rounded-lg">
            <p className="text-sm text-accent-foreground">
              💡 <strong>Exemplos:</strong> "Como criar um hábito em 7 dias", "Foco: o segredo da produtividade"
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Seu título</label>
            <Input
              placeholder="Digite seu título aqui..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <Button variant="outline" onClick={generateVariations} className="w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Gerar Variações
          </Button>

          {suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold">Sugestões:</p>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setTitle(suggestion)}
                  className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar Título
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
