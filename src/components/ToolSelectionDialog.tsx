import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ToolSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: { tool: string; notes: string }) => void;
}

const tools = [
  "Canva",
  "Figma",
  "Papel e caneta",
  "PowerPoint/Keynote",
  "Miro",
  "Outra ferramenta"
];

export function ToolSelectionDialog({ open, onOpenChange, onComplete }: ToolSelectionDialogProps) {
  const [selectedTool, setSelectedTool] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!selectedTool) {
      toast.error("Selecione uma ferramenta");
      return;
    }

    onComplete({ tool: selectedTool, notes });
    onOpenChange(false);
    toast.success("Ferramenta selecionada!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Escolha sua ferramenta</DialogTitle>
          <DialogDescription>
            Selecione a ferramenta que você vai usar para criar seu wireframe ou mockup.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <RadioGroup value={selectedTool} onValueChange={setSelectedTool}>
            {tools.map((tool) => (
              <div key={tool} className="flex items-center space-x-2">
                <RadioGroupItem value={tool} id={tool} />
                <Label htmlFor={tool} className="cursor-pointer">{tool}</Label>
              </div>
            ))}
          </RadioGroup>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              Observações (opcional)
            </label>
            <Textarea
              placeholder="Anote ideias ou cole um link para seu rascunho..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-20"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Confirmar Escolha
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
