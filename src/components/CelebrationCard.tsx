import { Sparkles, Trophy, Star } from "lucide-react";

export function CelebrationCard() {
  return (
    <div className="bg-gradient-success rounded-2xl p-6 shadow-elevated mb-6 relative overflow-hidden animate-fade-in">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-success-foreground/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-success-foreground/10 rounded-full blur-2xl" />
      
      <div className="relative">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-success-foreground/20 rounded-2xl flex items-center justify-center animate-bounce-in">
            <Trophy className="w-8 h-8 text-success-foreground" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-success-foreground text-center mb-3 flex items-center justify-center gap-2">
          <Star className="w-6 h-6 animate-pulse" />
          Celebre sua microvitória!
          <Star className="w-6 h-6 animate-pulse" />
        </h3>

        {/* Message */}
        <div className="text-center space-y-2 text-success-foreground/90">
          <p className="text-base font-medium">
            Você completou 7 dias de foco intenso. 🎉
          </p>
          <p className="text-sm">
            Não importa o tamanho do resultado — o que importa é que você <strong>começou, persistiu e entregou</strong>.
          </p>
          <p className="text-sm">
            Esta é sua microvitória. Reconheça-a, comemore-a e use-a como combustível para a próxima jornada.
          </p>
        </div>

        {/* Decorative sparkles */}
        <div className="flex justify-center gap-4 mt-4">
          <Sparkles className="w-5 h-5 text-success-foreground/60 animate-pulse" style={{ animationDelay: "0.1s" }} />
          <Sparkles className="w-6 h-6 text-success-foreground/80 animate-pulse" style={{ animationDelay: "0.3s" }} />
          <Sparkles className="w-5 h-5 text-success-foreground/60 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Quote */}
        <div className="mt-4 pt-4 border-t border-success-foreground/20">
          <blockquote className="text-center text-sm italic text-success-foreground/80">
            "Feito é melhor que perfeito. E você fez."
          </blockquote>
        </div>
      </div>
    </div>
  );
}
