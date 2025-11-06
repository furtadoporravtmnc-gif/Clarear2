import { Bell, BellOff, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotifications } from "@/hooks/useNotifications";
import { toast } from "sonner";

export function NotificationSettings() {
  const {
    preferences,
    permission,
    enableNotifications,
    disableNotifications,
    updatePreferences,
    sendTestNotification,
    getSuggestedTime,
  } = useNotifications();

  const handleToggle = async (enabled: boolean) => {
    if (enabled) {
      await enableNotifications();
    } else {
      disableNotifications();
    }
  };

  const handleTestNotification = () => {
    if (permission !== "granted") {
      toast.error("Ative as notificações primeiro");
      return;
    }
    sendTestNotification();
    toast.success("Notificação de teste enviada!");
  };

  const suggestedTime = getSuggestedTime();

  return (
    <div className="bg-gradient-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
          <Bell className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Lembretes Motivacionais</h3>
          <p className="text-xs text-muted-foreground">
            Notificações gentis para manter seu hábito de foco
          </p>
        </div>
      </div>

      {/* Permission Status */}
      {permission === "denied" && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">
            Notificações foram bloqueadas. Ative nas configurações do navegador.
          </p>
        </div>
      )}

      {/* Enable/Disable Toggle */}
      <div className="flex items-center justify-between mb-6 p-3 bg-accent/50 rounded-lg">
        <div className="flex items-center gap-3">
          {preferences.enabled ? (
            <Bell className="w-5 h-5 text-success" />
          ) : (
            <BellOff className="w-5 h-5 text-muted-foreground" />
          )}
          <Label htmlFor="notifications" className="cursor-pointer">
            {preferences.enabled ? "Notificações Ativas" : "Notificações Desativadas"}
          </Label>
        </div>
        <Switch
          id="notifications"
          checked={preferences.enabled}
          onCheckedChange={handleToggle}
        />
      </div>

      {/* Settings (only show when enabled) */}
      {preferences.enabled && (
        <div className="space-y-4 animate-fade-in">
          {/* Frequency */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Frequência
            </Label>
            <Select
              value={preferences.frequency}
              onValueChange={(value: any) =>
                updatePreferences({ frequency: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Todos os dias</SelectItem>
                <SelectItem value="every-other-day">Dia sim, dia não</SelectItem>
                <SelectItem value="weekly">Uma vez por semana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Suggested Time */}
          {suggestedTime !== "09:00" && (
            <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-success" />
                <p className="text-sm font-medium text-success">
                  Dica inteligente
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Detectamos que você costuma usar o app por volta das {suggestedTime}.
                Quer receber lembretes nesse horário?
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-8"
                onClick={() => updatePreferences({ preferredTime: suggestedTime })}
              >
                Usar este horário
              </Button>
            </div>
          )}

          {/* Test Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleTestNotification}
            className="w-full"
          >
            <Bell className="w-4 h-4 mr-2" />
            Enviar notificação de teste
          </Button>

          {/* Info */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 <strong>Importante:</strong> As notificações são sutis e positivas.
              Nunca vamos pressionar você - apenas lembrar gentilmente que seu
              progresso está aqui esperando quando você estiver pronto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
