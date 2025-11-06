import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Settings2, Coffee, Lightbulb } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PomodoroTimerProps {
  onComplete?: () => void;
}

const PRESET_DURATIONS = [
  { focus: 15, break: 3, label: "15 min" },
  { focus: 20, break: 5, label: "20 min" },
  { focus: 25, break: 5, label: "25 min" },
];

const BREAK_OPTIONS = [3, 5, 10];

export const PomodoroTimer = ({ onComplete }: PomodoroTimerProps) => {
  // Load saved settings from localStorage
  const loadSettings = () => {
    const saved = localStorage.getItem("pomodoro-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      return {
        focusDuration: settings.focusDuration || 25,
        breakDuration: settings.breakDuration || 5,
      };
    }
    return { focusDuration: 25, breakDuration: 5 };
  };

  const initialSettings = loadSettings();
  const [focusDuration, setFocusDuration] = useState(initialSettings.focusDuration);
  const [breakDuration, setBreakDuration] = useState(initialSettings.breakDuration);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customFocusTime, setCustomFocusTime] = useState(focusDuration);
  const [selectedBreakTime, setSelectedBreakTime] = useState(breakDuration);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "pomodoro-settings",
      JSON.stringify({ focusDuration, breakDuration })
    );
  }, [focusDuration, breakDuration]);

  // Update timeLeft when focus/break duration changes
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft((isBreak ? breakDuration : focusDuration) * 60);
    }
  }, [focusDuration, breakDuration, isBreak, isRunning]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            
            // Switch between focus and break
            if (isBreak) {
              setIsBreak(false);
              onComplete?.();
            } else {
              setIsBreak(true);
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning, timeLeft, onComplete, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentDuration = (isBreak ? breakDuration : focusDuration) * 60;
  const progress = ((currentDuration - timeLeft) / currentDuration) * 100;

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(focusDuration * 60);
  };

  const handlePresetSelect = (focus: number, breakTime: number) => {
    setFocusDuration(focus);
    setBreakDuration(breakTime);
    setCustomFocusTime(focus);
    setSelectedBreakTime(breakTime);
    setIsRunning(false);
    setIsBreak(false);
  };

  const handleCustomTimeApply = () => {
    setFocusDuration(customFocusTime);
    setBreakDuration(selectedBreakTime);
    setIsRunning(false);
    setIsBreak(false);
    setShowSettings(false);
  };

  // Get smart suggestion based on completed days
  const getSmartSuggestion = () => {
    const completedDays = Array.from({ length: 7 }, (_, i) => {
      const saved = localStorage.getItem(`day-${i + 1}`);
      return saved ? JSON.parse(saved).completed : false;
    }).filter(Boolean).length;

    if (completedDays === 0) {
      return "Está começando? Tente 15 minutos para criar o hábito.";
    } else if (completedDays >= 3 && focusDuration < 25) {
      return "Já concluiu 3 dias! Que tal aumentar para 25 minutos?";
    } else if (completedDays >= 5 && focusDuration < 45) {
      return "Ótimo progresso! Considere sessões de 45 minutos.";
    }
    return null;
  };

  const suggestion = getSmartSuggestion();

  return (
    <div className="bg-gradient-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Timer Pomodoro</h3>
        <Collapsible open={showSettings} onOpenChange={setShowSettings}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings2 className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      {/* Smart Suggestion */}
      {suggestion && !showSettings && (
        <div className="mb-4 p-3 bg-accent/50 rounded-lg flex items-start gap-2 animate-fade-in">
          <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">{suggestion}</p>
        </div>
      )}

      <Collapsible open={showSettings} onOpenChange={setShowSettings}>
        <CollapsibleContent className="mb-4 space-y-4 animate-fade-in">
          {/* Custom Focus Time */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Tempo de foco: {customFocusTime} minutos
            </Label>
            <Slider
              value={[customFocusTime]}
              onValueChange={(value) => setCustomFocusTime(value[0])}
              min={5}
              max={60}
              step={5}
              className="w-full"
              disabled={isRunning}
            />
            <p className="text-xs text-muted-foreground">
              Ajuste o tempo de foco de 5 a 60 minutos
            </p>
          </div>

          {/* Break Time Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tempo de pausa</Label>
            <div className="flex gap-2">
              {BREAK_OPTIONS.map((mins) => (
                <button
                  key={mins}
                  onClick={() => setSelectedBreakTime(mins)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedBreakTime === mins
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                  disabled={isRunning}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleCustomTimeApply}
            className="w-full"
            size="sm"
            disabled={isRunning}
          >
            Aplicar configuração
          </Button>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Timer Display */}
      <div className="relative mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          {isBreak && <Coffee className="w-5 h-5 text-secondary" />}
          <div className="text-5xl font-bold text-center tabular-nums">
            {formatTime(timeLeft)}
          </div>
        </div>
        
        {isBreak && (
          <p className="text-center text-sm text-secondary font-medium mb-2">
            Pausa - Descanse um pouco
          </p>
        )}
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              isBreak ? "bg-secondary" : "bg-gradient-primary"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Preset Duration Selection */}
      {!showSettings && (
        <div className="flex gap-2 mb-4">
          {PRESET_DURATIONS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePresetSelect(preset.focus, preset.break)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                focusDuration === preset.focus && breakDuration === preset.break
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
              disabled={isRunning}
            >
              <div>{preset.label}</div>
              <div className="text-xs opacity-70">+{preset.break}min</div>
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          variant={isRunning ? "outline" : "default"}
          className="flex-1"
          size="lg"
        >
          {isRunning ? (
            <>
              <Pause className="mr-2" />
              Pausar
            </>
          ) : (
            <>
              <Play className="mr-2" />
              {isBreak ? "Continuar pausa" : "Iniciar foco"}
            </>
          )}
        </Button>
        
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
        >
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
};
