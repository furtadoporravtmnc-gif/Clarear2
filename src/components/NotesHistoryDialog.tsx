import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, Copy } from "lucide-react";
import { toast } from "sonner";

interface NotesHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DayData {
  day: number;
  theme: string;
  notes: string;
  insights?: string[];
  feedback?: string[];
}

const dayThemes = [
  "Clareza de Foco",
  "Pesquisa Rápida",
  "Solução Simples",
  "Estrutura Visual",
  "Conteúdo Magnético",
  "Validação Externa",
  "Entrega e Reflexão"
];

export function NotesHistoryDialog({ open, onOpenChange }: NotesHistoryDialogProps) {
  const getDaysData = (): DayData[] => {
    const daysData: DayData[] = [];
    
    for (let i = 1; i <= 7; i++) {
      const saved = localStorage.getItem(`day-${i}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.notes || data.insights?.length > 0 || data.feedback?.length > 0) {
          daysData.push({
            day: i,
            theme: dayThemes[i - 1],
            notes: data.notes || "",
            insights: data.insights || [],
            feedback: data.feedback || []
          });
        }
      }
    }
    
    return daysData;
  };

  const handleExport = () => {
    const daysData = getDaysData();
    let exportText = "HISTÓRICO DE ANOTAÇÕES E INSIGHTS\n";
    exportText += "Do Ruído ao Resultado - Desafio 7 Dias\n\n";
    exportText += "=".repeat(50) + "\n\n";
    
    daysData.forEach(day => {
      exportText += `DIA ${day.day}: ${day.theme}\n`;
      exportText += "-".repeat(50) + "\n\n";
      
      if (day.notes) {
        exportText += "ANOTAÇÕES:\n";
        exportText += day.notes + "\n\n";
      }
      
      if (day.insights && day.insights.length > 0) {
        exportText += "INSIGHTS:\n";
        day.insights.forEach((insight, idx) => {
          exportText += `${idx + 1}. ${insight}\n`;
        });
        exportText += "\n";
      }
      
      if (day.feedback && day.feedback.length > 0) {
        exportText += "FEEDBACK RECEBIDO:\n";
        day.feedback.forEach((fb, idx) => {
          exportText += `${idx + 1}. ${fb}\n`;
        });
        exportText += "\n";
      }
      
      exportText += "\n";
    });
    
    navigator.clipboard.writeText(exportText);
    toast.success("Histórico copiado para área de transferência!");
  };

  const daysData = getDaysData();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Histórico de Anotações e Insights
          </DialogTitle>
        </DialogHeader>

        {daysData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma anotação encontrada ainda.</p>
            <p className="text-sm mt-2">Complete os dias para ver seu histórico aqui.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {daysData.map((day, idx) => (
                  <div key={day.day} className="space-y-3">
                    <div className="bg-gradient-card rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h3 className="font-semibold">{day.theme}</h3>
                      </div>
                      
                      {day.notes && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Anotações:</p>
                          <p className="text-sm whitespace-pre-wrap">{day.notes}</p>
                        </div>
                      )}
                      
                      {day.insights && day.insights.length > 0 && (
                        <div className="space-y-2 mt-3">
                          <p className="text-sm font-medium text-muted-foreground">Insights:</p>
                          <ul className="space-y-1">
                            {day.insights.map((insight, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-secondary">
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {day.feedback && day.feedback.length > 0 && (
                        <div className="space-y-2 mt-3">
                          <p className="text-sm font-medium text-muted-foreground">Feedback:</p>
                          <ul className="space-y-1">
                            {day.feedback.map((fb, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-accent">
                                {fb}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {idx < daysData.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Button onClick={handleExport} variant="outline" className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Exportar Resumo
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
