import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface WireframeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: { title: string; problem: string; solution: string }) => void;
}

export function WireframeDialog({ open, onOpenChange, onComplete }: WireframeDialogProps) {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !problem.trim() || !solution.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }

    onComplete({ title, problem, solution });
    onOpenChange(false);
    toast.success("Wireframe estruturado!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Organize as informações</DialogTitle>
          <DialogDescription>
            Estruture seu projeto em três blocos principais: Título, Problema e Solução.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Título</label>
            <Input
              placeholder="Um título claro e direto..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Problema</label>
            <Textarea
              placeholder="Qual problema você está resolvendo?"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Solução</label>
            <Textarea
              placeholder="Como sua solução resolve esse problema?"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="min-h-20"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar Wireframe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
