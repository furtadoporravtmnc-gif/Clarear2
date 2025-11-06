import { useEffect, useState } from "react";

interface Confetti {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  color: string;
}

export function ConfettiAnimation({ show }: { show: boolean }) {
  const [confettiPieces, setConfettiPieces] = useState<Confetti[]>([]);

  useEffect(() => {
    if (show) {
      const colors = [
        "hsl(180 45% 40%)", // primary
        "hsl(140 60% 45%)", // success
        "hsl(75 30% 55%)", // secondary
        "hsl(145 60% 50%)", // green
        "hsl(174 62% 47%)", // turquoise
      ];

      const pieces: Confetti[] = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: 2 + Math.random() * 2,
          delay: Math.random() * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setConfettiPieces(pieces);

      // Clear after animation
      setTimeout(() => setConfettiPieces([]), 4000);
    }
  }, [show]);

  if (!show || confettiPieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute -top-10 w-3 h-3 animate-confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDuration: `${piece.animationDuration}s`,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}
