import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface LinksHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DayLinks {
  day: number;
  theme: string;
  links: string[];
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

export function LinksHistoryDialog({ open, onOpenChange }: LinksHistoryDialogProps) {
  const extractLinks = (text: string): string[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    return matches || [];
  };

  const getDaysLinks = (): DayLinks[] => {
    const daysLinks: DayLinks[] = [];
    
    for (let i = 1; i <= 7; i++) {
      const saved = localStorage.getItem(`day-${i}`);
      if (saved) {
        const data = JSON.parse(saved);
        const allLinks: string[] = [];
        
        // Extract links from notes
        if (data.notes) {
          allLinks.push(...extractLinks(data.notes));
        }
        
        // Extract research sources (Day 2)
        if (data.researchSources && Array.isArray(data.researchSources)) {
          data.researchSources.forEach((source: string) => {
            allLinks.push(...extractLinks(source));
          });
        }
        
        // Extract publish link (Day 7)
        if (data.publishLink) {
          allLinks.push(data.publishLink);
        }
        
        // Remove duplicates
        const uniqueLinks = [...new Set(allLinks)];
        
        if (uniqueLinks.length > 0) {
          daysLinks.push({
            day: i,
            theme: dayThemes[i - 1],
            links: uniqueLinks
          });
        }
      }
    }
    
    return daysLinks;
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copiado!");
  };

  const handleOpenLink = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleExportAll = () => {
    const daysLinks = getDaysLinks();
    let exportText = "HISTÓRICO DE LINKS E ANEXOS\n";
    exportText += "Do Ruído ao Resultado - Desafio 7 Dias\n\n";
    exportText += "=".repeat(50) + "\n\n";
    
    daysLinks.forEach(day => {
      exportText += `DIA ${day.day}: ${day.theme}\n`;
      exportText += "-".repeat(50) + "\n";
      day.links.forEach((link, idx) => {
        exportText += `${idx + 1}. ${link}\n`;
      });
      exportText += "\n";
    });
    
    navigator.clipboard.writeText(exportText);
    toast.success("Todos os links copiados para área de transferência!");
  };

  const daysLinks = getDaysLinks();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Histórico de Links e Anexos
          </DialogTitle>
        </DialogHeader>

        {daysLinks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum link encontrado ainda.</p>
            <p className="text-sm mt-2">Links adicionados nas anotações aparecerão aqui automaticamente.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {daysLinks.map((day, idx) => (
                  <div key={day.day} className="space-y-3">
                    <div className="bg-gradient-card rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h3 className="font-semibold">{day.theme}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        {day.links.map((link, linkIdx) => (
                          <div
                            key={linkIdx}
                            className="flex items-center gap-2 p-2 bg-background rounded-md hover:bg-accent/50 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <p className="text-sm flex-1 truncate" title={link}>
                              {link}
                            </p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopyLink(link)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleOpenLink(link)}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {idx < daysLinks.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Button onClick={handleExportAll} variant="outline" className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copiar Todos os Links
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
