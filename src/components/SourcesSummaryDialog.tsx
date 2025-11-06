import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink, Award } from "lucide-react";

interface SourcesSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sources: string[];
}

export function SourcesSummaryDialog({ open, onOpenChange, sources }: SourcesSummaryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-success" />
            Parabéns! Todas as fontes validadas
          </DialogTitle>
          <DialogDescription>
            Você conquistou 3 pontos de foco completando a pesquisa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-gradient-success text-success-foreground rounded-lg p-4 text-center">
            <p className="text-2xl font-bold mb-1">+3 Pontos de Foco</p>
            <p className="text-sm opacity-90">Continue assim para completar o desafio!</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Fontes Confirmadas
            </h3>
            <div className="space-y-2">
              {sources.map((source, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 bg-accent rounded-lg"
                >
                  <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm break-all">{source}</p>
                  </div>
                  {source.startsWith('http') && (
                    <a 
                      href={source} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent rounded-lg p-4">
            <p className="text-sm text-accent-foreground">
              <strong>Próximo passo:</strong> Use essas fontes como base para os dias seguintes. 
              Elas serão fundamentais para desenvolver sua solução com embasamento sólido.
            </p>
          </div>

          <Button onClick={() => onOpenChange(false)} className="w-full" size="lg">
            Continuar Desafio
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
