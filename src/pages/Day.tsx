import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { FocusHourDialog } from "@/components/FocusHourDialog";
import { ProblemDefinitionDialog } from "@/components/ProblemDefinitionDialog";
import { TargetAudienceDialog } from "@/components/TargetAudienceDialog";
import { ResearchSourcesDialog } from "@/components/ResearchSourcesDialog";
import { SolutionExamplesDialog } from "@/components/SolutionExamplesDialog";
import { InsightsDialog } from "@/components/InsightsDialog";
import { SolutionStepsDialog } from "@/components/SolutionStepsDialog";
import { ResourcesDialog } from "@/components/ResourcesDialog";
import { MVPDialog } from "@/components/MVPDialog";
import { ToolSelectionDialog } from "@/components/ToolSelectionDialog";
import { WireframeDialog } from "@/components/WireframeDialog";
import { ProjectSummaryDialog } from "@/components/ProjectSummaryDialog";
import { TitleGeneratorDialog } from "@/components/TitleGeneratorDialog";
import { ContentEditorDialog } from "@/components/ContentEditorDialog";
import { CTADialog } from "@/components/CTADialog";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import { SuggestionsDialog } from "@/components/SuggestionsDialog";
import { ReviewChecklistDialog } from "@/components/ReviewChecklistDialog";
import { SourceValidationDialog } from "@/components/SourceValidationDialog";
import { SourcesSummaryDialog } from "@/components/SourcesSummaryDialog";
import { PublishLinkDialog } from "@/components/PublishLinkDialog";
import { CelebrationCard } from "@/components/CelebrationCard";
import { ConfettiAnimation } from "@/components/ConfettiAnimation";
import { ArrowLeft, ArrowRight, CheckCircle2, Target, Lightbulb, ExternalLink } from "lucide-react";
import { toast } from "sonner";

// Day content data
const dayContent = [
  {
    day: 1,
    theme: "Clareza de Foco",
    objective: "Definir o problema ou desafio central que você quer resolver.",
    checklist: [
      "Bloqueie 1 hora sem interrupções",
      "Escreva o problema em uma frase clara",
      "Identifique o público-alvo afetado"
    ],
    tip: "Use a técnica dos '5 Porquês' para chegar à raiz do problema.",
    deliverable: "Um documento de uma página com: Problema, Público, Impacto Esperado.",
    principle: "STEPPS: Emocional - conecte-se com o porquê do problema."
  },
  {
    day: 2,
    theme: "Pesquisa Rápida",
    objective: "Validar que o problema existe e é relevante para outros.",
    checklist: [
      "Pesquise 3 fontes confiáveis sobre o tema",
      "Encontre 2 exemplos de soluções existentes",
      "Anote 3 insights principais"
    ],
    tip: "Use Google Scholar, Medium ou Reddit para pesquisa rápida e prática.",
    deliverable: "Lista de insights e referências em um arquivo de notas.",
    principle: "SUCCESs: Concreto - baseie-se em dados e exemplos reais."
  },
  {
    day: 3,
    theme: "Solução Simples",
    objective: "Propor uma solução mínima e testável.",
    checklist: [
      "Desenhe ou descreva sua solução em 3 passos",
      "Liste os recursos necessários",
      "Identifique o MVP (produto mínimo viável)"
    ],
    tip: "Pense no menor experimento que pode validar sua ideia.",
    deliverable: "Esboço visual ou texto descritivo da solução proposta.",
    principle: "Design: Prototipagem rápida - comece simples, itere depois."
  },
  {
    day: 4,
    theme: "Estrutura Visual",
    objective: "Criar um wireframe, slide ou mockup básico.",
    checklist: [
      "Use uma ferramenta simples (Canva, Figma, papel)",
      "Organize as informações de forma clara",
      "Inclua título, problema e solução"
    ],
    tip: "Não precisa ser bonito — precisa ser funcional e claro.",
    deliverable: "Wireframe ou slide inicial da sua solução.",
    principle: "SUCCESs: Visual - mostre, não apenas conte."
  },
  {
    day: 5,
    theme: "Conteúdo Magnético",
    objective: "Escrever uma mensagem clara que explique seu projeto.",
    checklist: [
      "Crie um título chamativo",
      "Escreva uma descrição em 3 parágrafos",
      "Adicione um call-to-action (próximo passo)"
    ],
    tip: "Use storytelling: Situação → Problema → Solução → Resultado.",
    deliverable: "Post de LinkedIn, email ou slide de pitch.",
    principle: "STEPPS: Compartilhável - torne fácil para outros entenderem e falarem sobre."
  },
  {
    day: 6,
    theme: "Validação Externa",
    objective: "Compartilhar sua ideia e coletar feedback.",
    checklist: [
      "Envie para 3 pessoas de confiança",
      "Pergunte: 'O que não ficou claro?'",
      "Anote todas as sugestões sem julgar"
    ],
    tip: "Feedback honesto é mais valioso que elogios vazios.",
    deliverable: "Relatório de feedback com 3 insights principais.",
    principle: "Design: Teste com usuários - valide antes de escalar."
  },
  {
    day: 7,
    theme: "Entrega e Reflexão",
    objective: "Finalizar e publicar seu trabalho da semana.",
    checklist: [
      "Revise e faça ajustes finais",
      "Publique em uma plataforma (opcional)"
    ],
    tip: "Feito é melhor que perfeito. Publique e itere depois.",
    deliverable: "Link público do seu projeto + post de reflexão.",
    principle: "STEPPS: Triggers - crie o hábito de entregar semanalmente."
  }
];

export default function Day() {
  const { dayNumber } = useParams<{ dayNumber: string }>();
  const navigate = useNavigate();
  const currentDay = parseInt(dayNumber || "1");
  const content = dayContent[currentDay - 1];

  const [checklist, setChecklist] = useState<boolean[]>([]);
  const [notes, setNotes] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Dialog states
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  
  // Microexperience data - Day 1
  const [focusPlan, setFocusPlan] = useState("");
  const [problemDefinition, setProblemDefinition] = useState<{ problem: string; why: string; change: string } | null>(null);
  const [targetAudience, setTargetAudience] = useState<{ audience: string; impact: string } | null>(null);
  
  // Microexperience data - Day 2
  const [researchSources, setResearchSources] = useState<string[]>([]);
  const [solutionExamples, setSolutionExamples] = useState<Array<{ name: string; howItWorks: string; strengths: string; improvements: string }>>([]);
  const [insights, setInsights] = useState<string[]>([]);

  // Microexperience data - Day 3
  const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
  const [resources, setResources] = useState<Array<{ name: string; hasIt: boolean }>>([]);
  const [mvp, setMvp] = useState<{ simplest: string; testable: string } | null>(null);

  // Microexperience data - Day 4
  const [toolSelection, setToolSelection] = useState<{ tool: string; notes: string } | null>(null);
  const [wireframe, setWireframe] = useState<{ title: string; problem: string; solution: string } | null>(null);
  const [projectSummary, setProjectSummary] = useState<{ title: string; problem: string; solution: string } | null>(null);

  // Microexperience data - Day 5
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState<{ intro: string; development: string; conclusion: string } | null>(null);
  const [postCTA, setPostCTA] = useState("");

  // Microexperience data - Day 6
  const [feedback, setFeedback] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Array<{ text: string; status: "useful" | "discard" | "pending" }>>([]);

  // Microexperience data - Day 7
  const [reviewChecklist, setReviewChecklist] = useState<boolean[]>([]);
  const [publishLink, setPublishLink] = useState("");
  const [publishPlatform, setPublishPlatform] = useState("");
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(`day-${currentDay}`);
    if (saved) {
      const data = JSON.parse(saved);
      
      // Initialize checklist based on day
      const checklistLength = currentDay === 7 ? 2 : 3;
      setChecklist(data.checklist || Array(checklistLength).fill(false));
      
      setNotes(data.notes || "");
      setIsCompleted(data.completed || false);
      setFocusPlan(data.focusPlan || "");
      setProblemDefinition(data.problemDefinition || null);
      setTargetAudience(data.targetAudience || null);
      setResearchSources(data.researchSources || []);
      setSolutionExamples(data.solutionExamples || []);
      setInsights(data.insights || []);
      setSolutionSteps(data.solutionSteps || []);
      setResources(data.resources || []);
      setMvp(data.mvp || null);
      setToolSelection(data.toolSelection || null);
      setWireframe(data.wireframe || null);
      setProjectSummary(data.projectSummary || null);
      setPostTitle(data.postTitle || "");
      setPostContent(data.postContent || null);
      setPostCTA(data.postCTA || "");
      setFeedback(data.feedback || []);
      setSuggestions(data.suggestions || []);
      setReviewChecklist(data.reviewChecklist || []);
      setPublishLink(data.publishLink || "");
      setPublishPlatform(data.publishPlatform || "");
    } else {
      // Reset to initial state when navigating to a new day without saved progress
      const checklistLength = currentDay === 7 ? 2 : 3;
      setChecklist(Array(checklistLength).fill(false));
      setNotes("");
      setIsCompleted(false);
      setFocusPlan("");
      setProblemDefinition(null);
      setTargetAudience(null);
      setResearchSources([]);
      setSolutionExamples([]);
      setInsights([]);
      setSolutionSteps([]);
      setResources([]);
      setMvp(null);
      setToolSelection(null);
      setWireframe(null);
      setProjectSummary(null);
      setPostTitle("");
      setPostContent(null);
      setPostCTA("");
      setFeedback([]);
      setSuggestions([]);
      setReviewChecklist([]);
      setPublishLink("");
      setPublishPlatform("");
    }
  }, [currentDay]);

  // Save progress
  const saveProgress = (completed = false) => {
    const data = {
      checklist,
      notes,
      completed,
      focusPlan,
      problemDefinition,
      targetAudience,
      researchSources,
      solutionExamples,
      insights,
      solutionSteps,
      resources,
      mvp,
      toolSelection,
      wireframe,
      projectSummary,
      postTitle,
      postContent,
      postCTA,
      feedback,
      suggestions,
      reviewChecklist,
      publishLink,
      publishPlatform,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`day-${currentDay}`, JSON.stringify(data));
  };

  const handleChecklistChange = (index: number) => {
    // Open dialogs for microexperiences on Days 1-7
    if ((currentDay >= 1 && currentDay <= 7) && !checklist[index] && !isCompleted) {
      // Skip dialogs for Day 6 first item (just a reminder)
      if (currentDay === 6 && index === 0) {
        const newChecklist = [...checklist];
        newChecklist[index] = !newChecklist[index];
        setChecklist(newChecklist);
        saveProgress();
        return;
      }
      
      // Day 7: item 1 is the publish button
      if (currentDay === 7 && index === 1) {
        setShowPublishDialog(true);
        return;
      }
      
      setOpenDialog(index);
      return;
    }
    
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleFocusComplete = (plan: string) => {
    setFocusPlan(plan);
    const newChecklist = [...checklist];
    newChecklist[0] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleProblemComplete = (data: { problem: string; why: string; change: string }) => {
    setProblemDefinition(data);
    const newChecklist = [...checklist];
    newChecklist[1] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleAudienceComplete = (data: { audience: string; impact: string }) => {
    setTargetAudience(data);
    const newChecklist = [...checklist];
    newChecklist[2] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  // Day 2 handlers
  const handleResearchComplete = (sources: string[]) => {
    setResearchSources(sources);
    const newChecklist = [...checklist];
    newChecklist[0] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleSolutionsComplete = (solutions: Array<{ name: string; howItWorks: string; strengths: string; improvements: string }>) => {
    setSolutionExamples(solutions);
    const newChecklist = [...checklist];
    newChecklist[1] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleInsightsComplete = (insightsData: string[]) => {
    setInsights(insightsData);
    const newChecklist = [...checklist];
    newChecklist[2] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  // Day 3 handlers
  const handleSolutionStepsComplete = (steps: string[]) => {
    setSolutionSteps(steps);
    const newChecklist = [...checklist];
    newChecklist[0] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleResourcesComplete = (resourcesList: Array<{ name: string; hasIt: boolean }>) => {
    setResources(resourcesList);
    const newChecklist = [...checklist];
    newChecklist[1] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleMVPComplete = (mvpData: { simplest: string; testable: string }) => {
    setMvp(mvpData);
    const newChecklist = [...checklist];
    newChecklist[2] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  // Day 4 handlers
  const handleToolSelectionComplete = (toolData: { tool: string; notes: string }) => {
    setToolSelection(toolData);
    const newChecklist = [...checklist];
    newChecklist[0] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleWireframeComplete = (wireframeData: { title: string; problem: string; solution: string }) => {
    setWireframe(wireframeData);
    const newChecklist = [...checklist];
    newChecklist[1] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleProjectSummaryComplete = (summaryData: { title: string; problem: string; solution: string }) => {
    setProjectSummary(summaryData);
    const newChecklist = [...checklist];
    newChecklist[2] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  // Day 5 handlers
  const handleTitleComplete = (titleText: string) => {
    setPostTitle(titleText);
    const newChecklist = [...checklist];
    newChecklist[0] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleContentComplete = (contentData: { intro: string; development: string; conclusion: string }) => {
    setPostContent(contentData);
    const newChecklist = [...checklist];
    newChecklist[1] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleCTAComplete = (ctaText: string) => {
    setPostCTA(ctaText);
    const newChecklist = [...checklist];
    newChecklist[2] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  // Day 6 handlers
  const handleFeedbackComplete = (feedbackData: string[]) => {
    setFeedback(feedbackData);
    const newChecklist = [...checklist];
    newChecklist[1] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleSuggestionsComplete = (suggestionsData: Array<{ text: string; status: "useful" | "discard" | "pending" }>) => {
    setSuggestions(suggestionsData);
    const newChecklist = [...checklist];
    newChecklist[2] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  // Day 7 handlers
  const handleReviewComplete = (checklistData: boolean[]) => {
    setReviewChecklist(checklistData);
    const newChecklist = [...checklist];
    newChecklist[0] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handlePublishComplete = (link: string, platform: string) => {
    // Only save if user provided something, otherwise keep it empty
    if (link || platform) {
      setPublishLink(link);
      setPublishPlatform(platform);
    }
    // Always mark as complete (even if skipped)
    const newChecklist = [...checklist];
    newChecklist[1] = true;
    setChecklist(newChecklist);
    saveProgress();
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    saveProgress();
  };

  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    const allChecked = checklist.every(item => item);
    if (!allChecked) {
      toast.error("Complete todos os itens do checklist antes de finalizar!");
      return;
    }
    
    if (!notes.trim()) {
      toast.error("Adicione suas anotações antes de finalizar!");
      return;
    }

    setIsCompleted(true);
    saveProgress(true);
    setShowConfetti(true);
    
    // Check total completed days for milestone achievements
    const completed: number[] = [];
    for (let i = 1; i <= 7; i++) {
      const saved = localStorage.getItem(`day-${i}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.completed || i === currentDay) {
          completed.push(i);
        }
      }
    }
    
    const totalCompleted = completed.length;
    
    // Special messages for milestones
    if (totalCompleted === 7) {
      toast.success("🏆 Jornada Completa! 🏆", {
        description: "Você completou todos os 7 dias! Mestre do Foco desbloqueado!"
      });
    } else if (totalCompleted === 5) {
      toast.success("⭐ 5 Dias Completos! ⭐", {
        description: "Você está quase lá! Continue assim!"
      });
    } else if (totalCompleted === 3) {
      toast.success("⚡ Momentum Conquistado! ⚡", {
        description: "3 dias seguidos! Você ganhou o emblema 'Ganhando Momentum'!"
      });
    } else if (totalCompleted === 1) {
      toast.success("🌟 Primeiro Passo! 🌟", {
        description: "Parabéns! Você conquistou o emblema 'Primeiro Passo'!"
      });
    } else {
      toast.success("✅ Dia concluído! 🎉", {
        description: "Parabéns pela sua dedicação!"
      });
    }
    
    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const goToNextDay = () => {
    // Verify that the current day is actually completed
    const saved = localStorage.getItem(`day-${currentDay}`);
    if (!saved) {
      toast.error("Complete as tarefas antes de avançar!");
      return;
    }
    
    const data = JSON.parse(saved);
    if (!data.completed) {
      toast.error("Marque o dia como concluído antes de avançar!");
      return;
    }

    if (currentDay < 7) {
      navigate(`/dia/${currentDay + 1}`);
    } else {
      navigate("/reflexao");
    }
  };

  if (!content) {
    return <div className="p-4">Dia não encontrado</div>;
  }

  return (
    <div className="min-h-screen pb-20 px-4">
      <ConfettiAnimation show={showConfetti} />
      
      <div className="max-w-2xl mx-auto pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/dias">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2" />
              Voltar
            </Button>
          </Link>
          <span className="text-sm font-medium text-muted-foreground">
            Dia {currentDay} de 7
          </span>
        </div>

        {/* Theme Card */}
        <div className="bg-gradient-primary rounded-2xl p-6 mb-6 shadow-card animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary-foreground">
              {content.theme}
            </h1>
          </div>
          <p className="text-primary-foreground/90">
            {content.objective}
          </p>
        </div>

        {/* Problem Definition Banner (Day 1) */}
        {currentDay === 1 && problemDefinition && (
          <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-4 mb-6 animate-fade-in">
            <h3 className="font-semibold text-sm mb-2">Seu problema definido:</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Situação:</strong> {problemDefinition.problem}
            </p>
          </div>
        )}

        {/* Timer */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <PomodoroTimer onComplete={() => toast.success("Timer concluído!")} />
        </div>

        {/* Checklist */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Checklist do Dia
          </h2>
          <div className="space-y-3">
            {content.checklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="relative">
                  <Checkbox
                    id={`check-${index}`}
                    checked={checklist[index]}
                    onCheckedChange={() => handleChecklistChange(index)}
                    disabled={isCompleted}
                    className={checklist[index] ? "animate-check-pop" : ""}
                  />
                  {checklist[index] && (
                    <div className="absolute inset-0 bg-success/20 rounded-sm animate-ping" style={{ animationDuration: "0.6s", animationIterationCount: "1" }} />
                  )}
                </div>
                <label
                  htmlFor={`check-${index}`}
                  className={`text-sm cursor-pointer flex-1 transition-all ${
                    checklist[index] ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Celebration Card - Day 7 only */}
        {currentDay === 7 && <CelebrationCard />}

        {/* Published Link Display - Day 7 only */}
        {currentDay === 7 && publishLink && (
          <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-4 mb-6 animate-fade-in">
            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">Publicação registrada</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Plataforma: <span className="font-medium capitalize">{publishPlatform === 'other' ? 'Outra' : publishPlatform}</span>
                </p>
                <a 
                  href={publishLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {publishLink}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-lg font-semibold mb-3">Suas Anotações</h2>
          <Textarea
            placeholder="Registre insights, decisões e próximos passos..."
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            disabled={isCompleted}
            className="min-h-32 resize-none"
          />
        </div>

        {/* Tip */}
        <div className="bg-accent rounded-2xl p-5 mb-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1 text-accent-foreground">Dica do Dia</h3>
              <p className="text-sm text-accent-foreground/80">{content.tip}</p>
            </div>
          </div>
        </div>

        {/* Deliverable */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <h3 className="font-semibold mb-2">Entregável Mínimo</h3>
          <p className="text-muted-foreground text-sm mb-3">{content.deliverable}</p>
          <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg">
            <strong>Fundamento:</strong> {content.principle}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-8">
          {!isCompleted ? (
            <Button
              onClick={handleComplete}
              variant="success"
              size="lg"
              className="flex-1"
            >
              <CheckCircle2 className="mr-2" />
              Marcar como Concluído
            </Button>
          ) : (
            <Button
              onClick={goToNextDay}
              variant="hero"
              size="lg"
              className="flex-1"
              disabled={!isCompleted}
            >
              {currentDay < 7 ? "Próximo Dia" : "Ver Resumo"}
              <ArrowRight className="ml-2" />
            </Button>
          )}
        </div>

        {/* Microexperience Dialogs (Day 1) */}
        {currentDay === 1 && (
          <>
            <FocusHourDialog
              open={openDialog === 0}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleFocusComplete}
            />
            <ProblemDefinitionDialog
              open={openDialog === 1}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleProblemComplete}
            />
            <TargetAudienceDialog
              open={openDialog === 2}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleAudienceComplete}
            />
          </>
        )}

        {/* Microexperience Dialogs (Day 2) */}
        {currentDay === 2 && (
          <>
            <ResearchSourcesDialog
              open={openDialog === 0}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleResearchComplete}
            />
            <SolutionExamplesDialog
              open={openDialog === 1}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleSolutionsComplete}
            />
            <InsightsDialog
              open={openDialog === 2}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleInsightsComplete}
            />
          </>
        )}

        {/* Microexperience Dialogs (Day 3) */}
        {currentDay === 3 && (
          <>
            <SolutionStepsDialog
              open={openDialog === 0}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleSolutionStepsComplete}
            />
            <ResourcesDialog
              open={openDialog === 1}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleResourcesComplete}
            />
            <MVPDialog
              open={openDialog === 2}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleMVPComplete}
            />
          </>
        )}

        {/* Microexperience Dialogs (Day 4) */}
        {currentDay === 4 && (
          <>
            <ToolSelectionDialog
              open={openDialog === 0}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleToolSelectionComplete}
            />
            <WireframeDialog
              open={openDialog === 1}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleWireframeComplete}
            />
            <ProjectSummaryDialog
              open={openDialog === 2}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleProjectSummaryComplete}
            />
          </>
        )}

        {/* Microexperience Dialogs (Day 5) */}
        {currentDay === 5 && (
          <>
            <TitleGeneratorDialog
              open={openDialog === 0}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleTitleComplete}
            />
            <ContentEditorDialog
              open={openDialog === 1}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleContentComplete}
            />
            <CTADialog
              open={openDialog === 2}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleCTAComplete}
            />
          </>
        )}

        {/* Microexperience Dialogs (Day 6) */}
        {currentDay === 6 && (
          <>
            <FeedbackDialog
              open={openDialog === 1}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleFeedbackComplete}
            />
            <SuggestionsDialog
              open={openDialog === 2}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleSuggestionsComplete}
            />
          </>
        )}

        {/* Microexperience Dialogs (Day 7) */}
        {currentDay === 7 && (
          <>
            <ReviewChecklistDialog
              open={openDialog === 0}
              onOpenChange={(open) => !open && setOpenDialog(null)}
              onComplete={handleReviewComplete}
            />
            <PublishLinkDialog
              open={showPublishDialog}
              onOpenChange={setShowPublishDialog}
              onComplete={handlePublishComplete}
              savedLink={publishLink}
              savedPlatform={publishPlatform}
            />
          </>
        )}
      </div>
    </div>
  );
}
