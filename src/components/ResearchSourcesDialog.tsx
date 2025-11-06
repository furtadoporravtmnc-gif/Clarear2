import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { SourceValidationDialog } from "./SourceValidationDialog";
import { SourcesSummaryDialog } from "./SourcesSummaryDialog";

interface ResearchSourcesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (sources: string[]) => void;
}

export function ResearchSourcesDialog({ open, onOpenChange, onComplete }: ResearchSourcesDialogProps) {
  const [sources, setSources] = useState(["", "", ""]);
  const [validated, setValidated] = useState([false, false, false]);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [currentValidatingIndex, setCurrentValidatingIndex] = useState<number | null>(null);

  const handleSourceChange = (index: number, value: string) => {
    const newSources = [...sources];
    newSources[index] = value;
    setSources(newSources);
  };

  const handleValidateClick = (index: number) => {
    if (!sources[index].trim()) {
      toast.error("Preencha a fonte antes de validar");
      return;
    }
    setCurrentValidatingIndex(index);
    setValidationDialogOpen(true);
  };

  const handleValidationComplete = () => {
    if (currentValidatingIndex === null) return;
    
    const newValidated = [...validated];
    newValidated[currentValidatingIndex] = true;
    setValidated(newValidated);
    
    // Check if all sources are now validated
    if (newValidated.every(v => v)) {
      setTimeout(() => {
        setSummaryDialogOpen(true);
      }, 500);
    }
  };

  const handleComplete = () => {
    const allFilled = sources.every(source => source.trim() !== "");
    const allValidated = validated.every(v => v);
    
    if (!allFilled) {
      toast.error("Preencha todas as 3 fontes antes de continuar");
      return;
    }

    if (!allValidated) {
      toast.error("Valide todas as fontes antes de concluir");
      return;
    }

    onComplete(sources);
    onOpenChange(false);
    toast.success("Fontes registradas com sucesso!");
  };

  const validatedCount = validated.filter(v => v).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Pesquise 3 Fontes Confiáveis
          </DialogTitle>
          <DialogDescription>
            Encontre e registre 3 fontes sobre o tema do seu projeto
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Examples */}
          <div className="bg-accent rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-2">Exemplos de fontes confiáveis:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Artigos acadêmicos (Google Scholar, ResearchGate)</li>
              <li>• Sites especializados e blogs de referência</li>
              <li>• Relatórios de empresas ou organizações</li>
              <li>• Documentação técnica oficial</li>
              <li>• Estudos de caso publicados</li>
            </ul>
          </div>

          {/* Progress indicator */}
          {validatedCount > 0 && (
            <div className="bg-gradient-success text-success-foreground rounded-lg p-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">
                    {validatedCount} de 3 fontes validadas
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  +{validatedCount}
                </div>
              </div>
            </div>
          )}

          {/* Source inputs */}
          {[0, 1, 2].map((index) => (
            <div 
              key={index} 
              className={`space-y-3 p-4 border-2 rounded-lg transition-all ${
                validated[index] 
                  ? 'border-success bg-success/5' 
                  : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between">
                <Label htmlFor={`source-${index}`} className="font-semibold flex items-center gap-2">
                  Fonte {index + 1}
                  {validated[index] && (
                    <CheckCircle2 className="w-4 h-4 text-success animate-scale-in" />
                  )}
                </Label>
                <Button
                  size="sm"
                  variant={validated[index] ? "success" : "outline"}
                  onClick={() => handleValidateClick(index)}
                  disabled={!sources[index].trim() || validated[index]}
                >
                  {validated[index] ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Validada
                    </>
                  ) : (
                    "Validar"
                  )}
                </Button>
              </div>
              <Input
                id={`source-${index}`}
                placeholder="Cole o link ou descreva a fonte..."
                value={sources[index]}
                onChange={(e) => handleSourceChange(index, e.target.value)}
                className="w-full"
                disabled={validated[index]}
              />
            </div>
          ))}

          <Button 
            onClick={handleComplete} 
            className="w-full" 
            size="lg"
            disabled={!validated.every(v => v)}
          >
            <CheckCircle2 className="mr-2" />
            Concluir Pesquisa
          </Button>
        </div>

        {currentValidatingIndex !== null && (
          <SourceValidationDialog
            open={validationDialogOpen}
            onOpenChange={setValidationDialogOpen}
            sourceUrl={sources[currentValidatingIndex]}
            sourceIndex={currentValidatingIndex}
            onValidate={handleValidationComplete}
          />
        )}

        <SourcesSummaryDialog
          open={summaryDialogOpen}
          onOpenChange={setSummaryDialogOpen}
          sources={sources}
        />
      </DialogContent>
    </Dialog>
  );
}
