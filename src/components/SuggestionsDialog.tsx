import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

interface Suggestion {
  text: string;
  status: "useful" | "discard" | "pending";
}

interface SuggestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (suggestions: Suggestion[]) => void;
}

export function SuggestionsDialog({ open, onOpenChange, onComplete }: SuggestionsDialogProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { text: "", status: "pending" }
  ]);

  const addSuggestion = () => {
    setSuggestions([...suggestions, { text: "", status: "pending" }]);
  };

  const updateText = (index: number, text: string) => {
    const updated = [...suggestions];
    updated[index].text = text;
    setSuggestions(updated);
  };

  const markStatus = (index: number, status: "useful" | "discard") => {
    const updated = [...suggestions];
    updated[index].status = status;
    setSuggestions(updated);
  };

  const handleSubmit = () => {
    const validSuggestions = suggestions.filter(s => s.text.trim());
    
    if (validSuggestions.length === 0) {
      toast.error("Adicione pelo menos uma sugestão");
      return;
    }

    onComplete(validSuggestions);
    onOpenChange(false);
    toast.success("Sugestões registradas!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Anote todas as sugestões</DialogTitle>
          <DialogDescription>
            Registre as sugestões recebidas e marque como úteis ou descartáveis.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="space-y-2">
              <Textarea
                placeholder={`Sugestão ${index + 1}...`}
                value={suggestion.text}
                onChange={(e) => updateText(index, e.target.value)}
                className="min-h-20"
              />
              <div className="flex gap-2">
                <Button
                  variant={suggestion.status === "useful" ? "default" : "outline"}
                  size="sm"
                  onClick={() => markStatus(index, "useful")}
                  className="flex-1"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Útil
                </Button>
                <Button
                  variant={suggestion.status === "discard" ? "default" : "outline"}
                  size="sm"
                  onClick={() => markStatus(index, "discard")}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Descartar
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addSuggestion} className="w-full">
            + Adicionar Sugestão
          </Button>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar Sugestões
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
