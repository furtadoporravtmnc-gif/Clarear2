import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ProjectSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: { title: string; problem: string; solution: string }) => void;
}

export function ProjectSummaryDialog({ open, onOpenChange, onComplete }: ProjectSummaryDialogProps) {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !problem.trim() || !solution.trim()) {
      toast.error("Preencha todos os 3 campos obrigatórios");
      return;
    }

    onComplete({ title, problem, solution });
    onOpenChange(false);
    toast.success("Resumo criado!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Resumo do Projeto</DialogTitle>
          <DialogDescription>
            Preencha os 3 campos essenciais para ter uma visão clara do seu projeto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              1. Título do Projeto <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Nome do seu projeto..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              2. Problema que resolve <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="Descreva o problema central..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              3. Solução proposta <span className="text-destructive">*</span>
            </label>
            <Textarea
              placeholder="Como você pretende resolver?"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div className="bg-accent p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Resumo Visual:</p>
            <div className="space-y-2 text-sm">
              <p><strong>Projeto:</strong> {title || "(preencha acima)"}</p>
              <p><strong>Problema:</strong> {problem || "(preencha acima)"}</p>
              <p><strong>Solução:</strong> {solution || "(preencha acima)"}</p>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar Resumo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
