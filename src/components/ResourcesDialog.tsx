import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, CheckCircle2, Circle, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface Resource {
  name: string;
  hasIt: boolean;
}

interface ResourcesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (resources: Resource[]) => void;
}

export function ResourcesDialog({ open, onOpenChange, onComplete }: ResourcesDialogProps) {
  const [resources, setResources] = useState<Resource[]>([
    { name: "", hasIt: false }
  ]);

  const addResource = () => {
    setResources([...resources, { name: "", hasIt: false }]);
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const updateResource = (index: number, field: keyof Resource, value: string | boolean) => {
    const updated = [...resources];
    const wasHasIt = updated[index].hasIt;
    updated[index] = { ...updated[index], [field]: value };
    setResources(updated);

    // Show celebration toast when marking as "Já tenho"
    if (field === "hasIt" && value === true && !wasHasIt && updated[index].name.trim()) {
      toast.success(
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-success" />
          <span>Recurso disponível! Continue assim</span>
        </div>
      );
    }
  };

  const availableResources = resources.filter(r => r.hasIt && r.name.trim());
  const neededResources = resources.filter(r => !r.hasIt && r.name.trim());
  const totalValid = resources.filter(r => r.name.trim()).length;
  const progressPercentage = totalValid > 0 ? (availableResources.length / totalValid) * 100 : 0;

  const handleSubmit = () => {
    const validResources = resources.filter(r => r.name.trim());
    if (validResources.length === 0) {
      toast.error("Adicione pelo menos um recurso");
      return;
    }

    onComplete(validResources);
    onOpenChange(false);
    toast.success("Recursos salvos!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Liste os recursos necessários</DialogTitle>
          <DialogDescription>
            Identifique tempo, ferramentas, pessoas ou conhecimentos que você vai precisar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Progress Summary */}
          {totalValid > 0 && (
            <div className="bg-gradient-card rounded-lg p-4 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold">
                    Você já tem {availableResources.length} de {totalValid} recursos
                  </span>
                </div>
                {availableResources.length > 0 && (
                  <div className="flex items-center gap-1 text-success">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                )}
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}

          <div className="bg-accent p-3 rounded-lg">
            <p className="text-sm text-accent-foreground">
              💡 <strong>Exemplos:</strong> 2 horas/dia, Figma, mentor em UX, curso de marketing
            </p>
          </div>

          {/* Available Resources */}
          {availableResources.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <h3 className="font-semibold text-success">Recursos disponíveis</h3>
              </div>
              <div className="space-y-2 pl-7">
                {resources.map((resource, index) => 
                  resource.hasIt && resource.name.trim() ? (
                    <div 
                      key={index} 
                      className="flex gap-2 items-center p-3 bg-success/10 border border-success/20 rounded-lg animate-scale-in"
                    >
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="flex-1 text-sm font-medium text-success-foreground">
                        {resource.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateResource(index, "hasIt", false)}
                        className="text-xs h-8"
                      >
                        Marcar como pendente
                      </Button>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Resources to Get */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold">
                {neededResources.length > 0 ? "Recursos a conseguir" : "Adicione seus recursos"}
              </h3>
            </div>
            <div className="space-y-2 pl-7">
              {resources.map((resource, index) => 
                !resource.hasIt ? (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      placeholder="Ex: 2 horas por dia, Figma, mentor..."
                      value={resource.name}
                      onChange={(e) => updateResource(index, "name", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant={resource.name.trim() ? "outline" : "ghost"}
                      size="sm"
                      onClick={() => resource.name.trim() && updateResource(index, "hasIt", true)}
                      disabled={!resource.name.trim()}
                      className="mt-1 whitespace-nowrap"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Já tenho
                    </Button>
                    {resources.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeResource(index)}
                        className="mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>

          <Button variant="outline" onClick={addResource} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Recurso
          </Button>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar Recursos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
