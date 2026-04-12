import React from 'react';
import { Card } from '../ui/card';
import { Info, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

interface IntroStepProps {
  onNext: () => void;
}

export default function IntroStep({ onNext }: IntroStepProps) {
  return (
    <div className="space-y-12">
      <div className="relative">
        <span className="absolute -top-10 -left-6 text-[12rem] font-black text-primary/5 select-none pointer-events-none">
          00
        </span>
        <div className="relative z-10 space-y-4">
          <h2 className="text-5xl font-black tracking-tight text-foreground">
            Instruções do <span className="text-primary">Briefing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
            Para que possamos criar o melhor design possível para o seu projeto, precisamos entender a fundo seus objetivos e visão.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="p-6 border-none shadow-sm bg-white/50 backdrop-blur-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">Tempo Estimado</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Este briefing leva cerca de 10 a 15 minutos para ser preenchido. Recomendamos que faça com calma.
          </p>
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white/50 backdrop-blur-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">Objetividade</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Seja o mais específico possível em suas respostas. Quanto mais detalhes, mais assertivo será o design.
          </p>
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white/50 backdrop-blur-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Info className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">Campos Obrigatórios</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Alguns campos são essenciais para o início do projeto e estão marcados como obrigatórios.
          </p>
        </Card>

        <Card className="p-6 border-none shadow-sm bg-white/50 backdrop-blur-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">Privacidade</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Suas informações estão seguras e serão utilizadas exclusivamente para o desenvolvimento do seu projeto.
          </p>
        </Card>
      </div>

      <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 space-y-4">
        <h4 className="font-bold text-primary flex items-center gap-2">
          <Info className="w-5 h-5" />
          Dica de Ouro
        </h4>
        <p className="text-muted-foreground leading-relaxed">
          Se você já tiver referências visuais (sites que gosta, paleta de cores, logo), tenha os links ou arquivos em mãos. Isso ajuda muito no processo criativo!
        </p>
      </div>
    </div>
  );
}
