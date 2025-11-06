import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface ReviewChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (checklist: boolean[]) => void;
}

const reviewItems = [
  "Ortografia e gramática revisadas",
  "Informações claras e objetivas",
  "Consistência visual (cores, fontes)",
  "Links e referências funcionando",
  "Call-to-action visível",
  "Formato adequado para publicação"
];

export function ReviewChecklistDialog({ open, onOpenChange, onComplete }: ReviewChecklistDialogProps) {
  const [checklist, setChecklist] = useState<boolean[]>(Array(reviewItems.length).fill(false));

  const toggleItem = (index: number) => {
    const updated = [...checklist];
    updated[index] = !updated[index];
    setChecklist(updated);
  };

  const handleSubmit = () => {
    const allChecked = checklist.every(item => item);
    
    if (!allChecked) {
      toast.error("Revise todos os itens antes de finalizar");
      return;
    }

    onComplete(checklist);
    onOpenChange(false);
    toast.success("Revisão completa!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checklist de Revisão Final</DialogTitle>
          <DialogDescription>
            Revise todos os aspectos do seu projeto antes de publicar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-accent p-3 rounded-lg">
            <p className="text-sm text-accent-foreground">
              💡 <strong>Lembre-se:</strong> Feito é melhor que perfeito, mas revise o essencial!
            </p>
          </div>

          <div className="space-y-3">
            {reviewItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <Checkbox
                  id={`review-${index}`}
                  checked={checklist[index]}
                  onCheckedChange={() => toggleItem(index)}
                />
                <label
                  htmlFor={`review-${index}`}
                  className={`text-sm cursor-pointer flex-1 ${
                    checklist[index] ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item}
                </label>
              </div>
            ))}
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Confirmar Revisão
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
