import { useEffect, useState } from "react";
import { toast } from "sonner";

interface NotificationPreferences {
  enabled: boolean;
  preferredTime: string; // HH:MM format
  frequency: "daily" | "every-other-day" | "weekly";
  lastNotificationDate: string | null;
}

interface UsagePattern {
  timestamps: number[];
  commonHour: number | null;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  enabled: false,
  preferredTime: "09:00",
  frequency: "daily",
  lastNotificationDate: null,
};

export function useNotifications() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    // Load preferences
    const saved = localStorage.getItem("notification-preferences");
    if (saved) {
      setPreferences(JSON.parse(saved));
    }

    // Check notification permission
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }

    // Track user activity to learn patterns
    trackUsagePattern();
  }, []);

  const trackUsagePattern = () => {
    const pattern = getUsagePattern();
    const now = Date.now();
    
    // Add current timestamp
    pattern.timestamps.push(now);
    
    // Keep only last 30 activities
    if (pattern.timestamps.length > 30) {
      pattern.timestamps = pattern.timestamps.slice(-30);
    }
    
    // Calculate common hour
    pattern.commonHour = calculateCommonHour(pattern.timestamps);
    
    localStorage.setItem("usage-pattern", JSON.stringify(pattern));
  };

  const getUsagePattern = (): UsagePattern => {
    const saved = localStorage.getItem("usage-pattern");
    if (saved) {
      return JSON.parse(saved);
    }
    return { timestamps: [], commonHour: null };
  };

  const calculateCommonHour = (timestamps: number[]): number | null => {
    if (timestamps.length < 3) return null;
    
    const hours = timestamps.map(ts => new Date(ts).getHours());
    const hourCounts: Record<number, number> = {};
    
    hours.forEach(hour => {
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    
    let maxCount = 0;
    let commonHour = null;
    
    for (const [hour, count] of Object.entries(hourCounts)) {
      if (count > maxCount) {
        maxCount = count;
        commonHour = parseInt(hour);
      }
    }
    
    return commonHour;
  };

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Notificações não são suportadas neste navegador");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    
    if (result === "granted") {
      toast.success("Notificações ativadas! 🔔");
      return true;
    } else {
      toast.error("Permissão negada para notificações");
      return false;
    }
  };

  const updatePreferences = (newPrefs: Partial<NotificationPreferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    localStorage.setItem("notification-preferences", JSON.stringify(updated));
  };

  const enableNotifications = async () => {
    const granted = await requestPermission();
    if (granted) {
      updatePreferences({ enabled: true });
      scheduleNotifications();
    }
  };

  const disableNotifications = () => {
    updatePreferences({ enabled: false });
    toast.success("Notificações desativadas");
  };

  const getMotivationalMessage = (): { title: string; body: string } => {
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

    const completedCount = completed.length;
    const lastDay = Math.max(...completed, 0);

    const messages = [
      // Início da jornada
      {
        condition: () => completedCount === 0,
        messages: [
          {
            title: "🌱 Que tal começar hoje?",
            body: "5 minutos de foco já é um ótimo começo. Sem pressão!",
          },
          {
            title: "✨ Seu momento de foco",
            body: "Pequenos passos levam a grandes conquistas.",
          },
          {
            title: "🎯 Pronto para focar?",
            body: "Não precisa ser perfeito, só precisa começar.",
          },
        ],
      },
      // 1 dia completo
      {
        condition: () => completedCount === 1,
        messages: [
          {
            title: "🌟 Você começou!",
            body: "Que tal manter o ritmo? Dia 2 te espera.",
          },
          {
            title: "💪 Primeiro passo dado",
            body: "Consistência é mais importante que intensidade.",
          },
        ],
      },
      // 2-3 dias
      {
        condition: () => completedCount >= 2 && completedCount <= 3,
        messages: [
          {
            title: `⚡ ${completedCount} dias completos!`,
            body: "Você está criando um hábito. Continue no seu ritmo!",
          },
          {
            title: "🔥 Ritmo mantido!",
            body: "Cada dia de foco é uma vitória. Vamos continuar?",
          },
        ],
      },
      // 4-5 dias
      {
        condition: () => completedCount >= 4 && completedCount <= 5,
        messages: [
          {
            title: `🚀 ${completedCount}/7 dias!`,
            body: "Você está quase lá! Mantenha o foco.",
          },
          {
            title: "💎 Mais da metade!",
            body: "Sua consistência está impressionante!",
          },
        ],
      },
      // 6 dias
      {
        condition: () => completedCount === 6,
        messages: [
          {
            title: "🏆 Último dia chegando!",
            body: "Você foi longe demais para desistir agora!",
          },
        ],
      },
      // Completou tudo
      {
        condition: () => completedCount === 7,
        messages: [
          {
            title: "🎉 Jornada completa!",
            body: "Que tal começar uma nova? O hábito já está criado!",
          },
        ],
      },
      // Parou no meio
      {
        condition: () => completedCount > 0 && completedCount < 7,
        messages: [
          {
            title: "💚 Sem pressão!",
            body: "Continue de onde parou. Seu progresso está salvo!",
          },
          {
            title: "🌈 Retome no seu tempo",
            body: `Dia ${lastDay + 1} te espera quando estiver pronto.`,
          },
        ],
      },
    ];

    // Find matching condition
    const matchingGroup = messages.find(group => group.condition());
    if (matchingGroup && matchingGroup.messages.length > 0) {
      const randomMessage = matchingGroup.messages[
        Math.floor(Math.random() * matchingGroup.messages.length)
      ];
      return randomMessage;
    }

    // Fallback
    return {
      title: "✨ Momento de foco",
      body: "Que tal dedicar alguns minutos hoje?",
    };
  };

  const showNotification = (title: string, body: string) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: "focus-reminder",
        requireInteraction: false,
      });
      
      updatePreferences({ lastNotificationDate: new Date().toISOString() });
    }
  };

  const shouldSendNotification = (): boolean => {
    if (!preferences.enabled || permission !== "granted") return false;

    const lastNotif = preferences.lastNotificationDate;
    if (!lastNotif) return true;

    const lastDate = new Date(lastNotif);
    const now = new Date();
    const hoursSinceLastNotif = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);

    switch (preferences.frequency) {
      case "daily":
        return hoursSinceLastNotif >= 20; // At least 20 hours apart
      case "every-other-day":
        return hoursSinceLastNotif >= 44;
      case "weekly":
        return hoursSinceLastNotif >= 164;
      default:
        return false;
    }
  };

  const scheduleNotifications = () => {
    if (!preferences.enabled) return;

    // Check if we should send a notification
    const checkAndNotify = () => {
      if (shouldSendNotification()) {
        const { title, body } = getMotivationalMessage();
        showNotification(title, body);
      }
    };

    // Check every hour
    const intervalId = setInterval(checkAndNotify, 60 * 60 * 1000);

    // Check immediately
    checkAndNotify();

    return () => clearInterval(intervalId);
  };

  const sendTestNotification = () => {
    const { title, body } = getMotivationalMessage();
    showNotification(title, body);
  };

  const getSuggestedTime = (): string => {
    const pattern = getUsagePattern();
    if (pattern.commonHour !== null) {
      return `${pattern.commonHour.toString().padStart(2, "0")}:00`;
    }
    return "09:00";
  };

  return {
    preferences,
    permission,
    enableNotifications,
    disableNotifications,
    updatePreferences,
    sendTestNotification,
    getSuggestedTime,
    requestPermission,
  };
}
