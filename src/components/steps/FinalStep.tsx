import React from 'react';
import { BriefingData } from '../../types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface StepProps {
  data: BriefingData;
  updateData: (data: Partial<BriefingData>) => void;
}

export default function FinalStep({ data, updateData }: StepProps) {
  return (
    <div className="space-y-12">
      <div className="relative">
        <span className="absolute -top-10 -left-6 text-[12rem] font-black text-primary/5 select-none pointer-events-none">
          06
        </span>
        <div className="relative z-10 space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Seção 06 de 06</p>
          <h2 className="text-5xl font-black tracking-tight text-foreground">Finalização</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Última etapa. Adicione qualquer informação que não foi coberta acima.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="additionalInfo" className="text-base font-bold">Informações adicionais</Label>
          <Textarea
            id="additionalInfo"
            placeholder="Fique à vontade para adicionar qualquer coisa relevante que não foi perguntada..."
            value={data.additionalInfo}
            onChange={(e) => updateData({ additionalInfo: e.target.value })}
            className="min-h-[200px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all resize-none p-5"
          />
        </div>

        <div className="bg-secondary/5 border border-secondary/10 rounded-3xl p-8 space-y-4">
          <h4 className="font-bold text-secondary">Quase lá!</h4>
          <p className="text-muted-foreground leading-relaxed">
            Ao clicar em "Enviar Briefing", todas as suas respostas serão compiladas e enviadas para nossa equipe. Entraremos em contato em breve para dar os próximos passos no seu projeto.
          </p>
        </div>
      </div>
    </div>
  );
}
