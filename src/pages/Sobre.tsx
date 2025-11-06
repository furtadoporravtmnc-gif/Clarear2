import { Target, Zap, Users, Heart } from "lucide-react";
import { NotificationSettings } from "@/components/NotificationSettings";


export default function Sobre() {
  return (
    <div className="min-h-screen pb-20 px-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
            <Target className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Sobre o Guia
          </h1>
          <p className="text-muted-foreground">
            Do Ruído ao Resultado - Uma metodologia de foco e entrega
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Nossa Missão</h2>
              <p className="text-muted-foreground">
                Transformar intenções em ações concretas através de um framework prático 
                de 7 dias. Este guia foi criado para ajudar pessoas ocupadas a saírem do 
                modo planejamento e entrarem no modo execução.
              </p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Como Funciona</h2>
              <p className="text-muted-foreground mb-3">
                O método combina três princípios poderosos:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong className="text-foreground">STEPPS</strong> - Crie ideias que se espalham naturalmente</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong className="text-foreground">SUCCESs</strong> - Mensagens que grudam na memória</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong className="text-foreground">Design Thinking</strong> - Prototipe rápido, itere depois</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Who is it for */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Para Quem é Este Guia</h2>
              <p className="text-muted-foreground mb-3">
                Ideal para:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Empreendedores que precisam validar ideias rapidamente</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Profissionais que querem criar projetos paralelos</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Estudantes desenvolvendo portfólio</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Criadores de conteúdo buscando consistência</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-accent rounded-2xl p-6 mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-start gap-4">
            <Heart className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2 text-accent-foreground">Nossa Filosofia</h2>
              <p className="text-accent-foreground/80 italic">
                "Feito é melhor que perfeito. Progresso é mais valioso que planejamento. 
                Pequenas entregas semanais superam grandes promessas mensais. 
                Este guia existe para te ajudar a criar o hábito de entregar, 
                uma semana de cada vez."
              </p>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-xl font-semibold mb-4">Princípios Fundamentais</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-1">1. Foco Protegido</h3>
              <p className="text-sm text-muted-foreground">
                Bloqueie distrações antes de começar. Notificações podem esperar.
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h3 className="font-semibold mb-1">2. Execução Prioritária</h3>
              <p className="text-sm text-muted-foreground">
                Fazer é mais importante que planejar perfeitamente.
              </p>
            </div>
            <div className="border-l-4 border-success pl-4">
              <h3 className="font-semibold mb-1">3. Registro Constante</h3>
              <p className="text-sm text-muted-foreground">
                Capture aprendizados enquanto eles estão frescos na memória.
              </p>
            </div>
            <div className="border-l-4 border-accent-foreground/30 pl-4">
              <h3 className="font-semibold mb-1">4. Iteração Rápida</h3>
              <p className="text-sm text-muted-foreground">
                Versão 1 hoje vale mais que versão perfeita nunca.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <NotificationSettings />
        </div>

        {/* Credits */}
        <div className="text-center text-sm text-muted-foreground animate-fade-in">
          <p>
            Baseado nos conceitos de Contagious (Jonah Berger), 
            Made to Stick (Chip & Dan Heath) e Design Thinking (Stanford d.school)
          </p>
          <p className="mt-2">
            Desenvolvido com ❤️ para pessoas que entregam
          </p>
        </div>
      </div>
    </div>
  );
}
