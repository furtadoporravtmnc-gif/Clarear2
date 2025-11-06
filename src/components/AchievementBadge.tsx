import { Trophy, Star, Zap, Award, Medal } from "lucide-react";
import { useEffect, useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: typeof Trophy;
  unlocked: boolean;
  requirement: number;
}

export function AchievementBadge() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const completed: number[] = [];
    for (let i = 1; i <= 7; i++) {
      const saved = localStorage.getItem(`day-${i}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.completed) {
          completed.push(i);
        }
      }
    }

    const allAchievements: Achievement[] = [
      {
        id: "primeiro-passo",
        title: "Primeiro Passo",
        description: "Complete o primeiro dia",
        icon: Star,
        unlocked: completed.length >= 1,
        requirement: 1,
      },
      {
        id: "momentum",
        title: "Ganhando Momentum",
        description: "Complete 3 dias consecutivos",
        icon: Zap,
        unlocked: completed.length >= 3,
        requirement: 3,
      },
      {
        id: "quase-la",
        title: "Quase Lá",
        description: "Complete 5 dias da jornada",
        icon: Award,
        unlocked: completed.length >= 5,
        requirement: 5,
      },
      {
        id: "mestre-do-foco",
        title: "Mestre do Foco",
        description: "Complete todos os 7 dias",
        icon: Trophy,
        unlocked: completed.length === 7,
        requirement: 7,
      },
    ];

    setAchievements(allAchievements);

    // Check for new achievement
    const savedAchievements = localStorage.getItem("unlocked-achievements");
    const previouslyUnlocked = savedAchievements ? JSON.parse(savedAchievements) : [];
    
    const newlyUnlocked = allAchievements.find(
      (achievement) => achievement.unlocked && !previouslyUnlocked.includes(achievement.id)
    );

    if (newlyUnlocked) {
      setNewAchievement(newlyUnlocked);
      localStorage.setItem(
        "unlocked-achievements",
        JSON.stringify([...previouslyUnlocked, newlyUnlocked.id])
      );
      
      // Auto hide after 5 seconds
      setTimeout(() => setNewAchievement(null), 5000);
    }
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <>
      {/* New Achievement Popup */}
      {newAchievement && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
          <div className="bg-gradient-success rounded-2xl p-6 shadow-elevated max-w-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-success-foreground/20 rounded-2xl flex items-center justify-center animate-pulse">
                <newAchievement.icon className="w-8 h-8 text-success-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-success-foreground/80 mb-1">
                  🎉 Conquista Desbloqueada!
                </p>
                <h3 className="text-lg font-bold text-success-foreground">
                  {newAchievement.title}
                </h3>
                <p className="text-sm text-success-foreground/90">
                  {newAchievement.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Grid */}
      <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Medal className="w-5 h-5 text-primary" />
            Conquistas
          </h3>
          <span className="text-sm text-muted-foreground">
            {unlockedCount}/{achievements.length}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  achievement.unlocked
                    ? "bg-gradient-success shadow-card"
                    : "bg-muted opacity-50"
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center ${
                    achievement.unlocked
                      ? "bg-success-foreground/20"
                      : "bg-background"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      achievement.unlocked
                        ? "text-success-foreground"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <p
                  className={`text-xs font-semibold mb-1 ${
                    achievement.unlocked
                      ? "text-success-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {achievement.title}
                </p>
                <p
                  className={`text-xs ${
                    achievement.unlocked
                      ? "text-success-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
