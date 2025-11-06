import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface SourceValidationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceUrl: string;
  sourceIndex: number;
  onValidate: () => void;
}

const validationCriteria = [
  { id: "current", label: "A fonte é atual e relevante?" },
  { id: "reliable", label: "É de um site ou autor confiável?" },
  { id: "author", label: "Tem autor ou instituição identificada?" },
];

export function SourceValidationDialog({ 
  open, 
  onOpenChange, 
  sourceUrl,
  sourceIndex,
  onValidate 
}: SourceValidationDialogProps) {
  const [checkedCriteria, setCheckedCriteria] = useState<string[]>([]);

  const handleCriteriaChange = (criteriaId: string) => {
    setCheckedCriteria(prev => 
      prev.includes(criteriaId) 
        ? prev.filter(id => id !== criteriaId)
        : [...prev, criteriaId]
    );
  };

  const handleValidate = () => {
    if (checkedCriteria.length !== validationCriteria.length) {
      toast.error("Confirme todos os critérios para validar a fonte");
      return;
    }

    onValidate();
    onOpenChange(false);
    setCheckedCriteria([]);
    
    toast.success(
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-success" />
        <span>+1 Ponto de Foco! Fonte validada com sucesso</span>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Validar Fonte {sourceIndex + 1}
          </DialogTitle>
          <DialogDescription>
            Confirme que a fonte atende aos critérios de confiabilidade
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-accent rounded-lg p-3">
            <p className="text-sm font-medium text-accent-foreground break-all">
              {sourceUrl}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Critérios de validação:</p>
            {validationCriteria.map((criteria) => (
              <div key={criteria.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <Checkbox
                  id={criteria.id}
                  checked={checkedCriteria.includes(criteria.id)}
                  onCheckedChange={() => handleCriteriaChange(criteria.id)}
                />
                <label
                  htmlFor={criteria.id}
                  className="text-sm cursor-pointer flex-1"
                >
                  {criteria.label}
                </label>
              </div>
            ))}
          </div>

          <div className="pt-2 flex gap-2">
            <Button 
              onClick={() => onOpenChange(false)} 
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleValidate}
              disabled={checkedCriteria.length !== validationCriteria.length}
              className="flex-1"
            >
              <CheckCircle2 className="mr-2 w-4 h-4" />
              Validar Fonte
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
