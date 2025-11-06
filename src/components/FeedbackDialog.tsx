import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (feedback: string[]) => void;
}

export function FeedbackDialog({ open, onOpenChange, onComplete }: FeedbackDialogProps) {
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [person3, setPerson3] = useState("");

  const handleSubmit = () => {
    const feedbacks = [person1, person2, person3].filter(f => f.trim());
    
    if (feedbacks.length === 0) {
      toast.error("Registre pelo menos um feedback");
      return;
    }

    onComplete(feedbacks);
    onOpenChange(false);
    toast.success("Feedbacks registrados!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registre os feedbacks recebidos</DialogTitle>
          <DialogDescription>
            Anote as respostas das pessoas que revisaram seu projeto. O que não ficou claro?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-accent p-3 rounded-lg">
            <p className="text-sm text-accent-foreground">
              💡 <strong>Lembre-se:</strong> Feedback honesto é mais valioso que elogios vazios.
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Feedback da pessoa 1</label>
            <Textarea
              placeholder="O que ela disse? Quais dúvidas teve?"
              value={person1}
              onChange={(e) => setPerson1(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Feedback da pessoa 2</label>
            <Textarea
              placeholder="O que ela disse? Quais dúvidas teve?"
              value={person2}
              onChange={(e) => setPerson2(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Feedback da pessoa 3</label>
            <Textarea
              placeholder="O que ela disse? Quais dúvidas teve?"
              value={person3}
              onChange={(e) => setPerson3(e.target.value)}
              className="min-h-20"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Salvar Feedbacks
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
