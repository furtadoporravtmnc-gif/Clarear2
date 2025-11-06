import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Linkedin, FileText, Briefcase, ExternalLink, Check } from "lucide-react";
import { toast } from "sonner";

interface PublishLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (link: string, platform: string) => void;
  savedLink?: string;
  savedPlatform?: string;
}

const platforms = [
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-[#0A66C2]" },
  { id: "blog", name: "Blog Pessoal", icon: FileText, color: "text-primary" },
  { id: "portfolio", name: "Portfólio", icon: Briefcase, color: "text-secondary" },
  { id: "other", name: "Outra plataforma", icon: ExternalLink, color: "text-muted-foreground" },
];

export function PublishLinkDialog({
  open,
  onOpenChange,
  onComplete,
  savedLink = "",
  savedPlatform = "",
}: PublishLinkDialogProps) {
  const [selectedPlatform, setSelectedPlatform] = useState(savedPlatform || "");
  const [link, setLink] = useState(savedLink || "");

  const handleSave = () => {
    // Allow saving with just link, just platform, or both
    if (link.trim() && selectedPlatform) {
      // Both provided - validate URL
      try {
        new URL(link);
      } catch {
        toast.error("Por favor, insira uma URL válida (ex: https://...)");
        return;
      }
    } else if (link.trim()) {
      // Only link provided - validate URL
      try {
        new URL(link);
      } catch {
        toast.error("Por favor, insira uma URL válida (ex: https://...)");
        return;
      }
    }

    // Save even if empty (user is skipping)
    onComplete(link.trim(), selectedPlatform);
    if (link.trim() || selectedPlatform) {
      toast.success("Link salvo com sucesso! 🎉");
    }
    onOpenChange(false);
  };

  const handleSkip = () => {
    onComplete("", "");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            Publique seu trabalho
          </DialogTitle>
          <DialogDescription>
            Escolha onde você publicou e cole o link. Isso não é obrigatório, mas ajuda a registrar suas conquistas!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Platform Selection */}
          <div className="space-y-2">
            <Label>Escolha a plataforma</Label>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatform === platform.id;
                
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-soft"
                        : "border-border hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : platform.color}`} />
                    <span className="text-sm font-medium flex-1 text-left">
                      {platform.name}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Link Input */}
          <div className="space-y-2">
            <Label htmlFor="publish-link">Cole o link da publicação</Label>
            <Input
              id="publish-link"
              type="url"
              placeholder="https://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Ex: link do post no LinkedIn, URL do artigo no blog, etc.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Pular
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            className="flex-1"
          >
            Salvar Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
