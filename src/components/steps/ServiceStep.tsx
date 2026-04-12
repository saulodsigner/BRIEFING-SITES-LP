import React from 'react';
import { BriefingData } from '../../types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Layout, Share2, Globe, Rocket } from 'lucide-react';

interface StepProps {
  data: BriefingData;
  updateData: (data: Partial<BriefingData>) => void;
}

const SERVICES = [
  {
    id: 'landing_page_lancamento',
    title: 'Sites/Páginas de Vendas',
    description: 'Sites, páginas de vendas perpétuas, lançamento, & mais.',
    icon: Rocket,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    id: 'social_media',
    title: 'Social Media',
    description: 'Gestão de redes sociais, criação de conteúdo e estratégia de posicionamento.',
    icon: Share2,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10'
  },
  {
    id: 'identidade_visual',
    title: 'Identidade Visual',
    description: 'Criação de logo, paleta de cores, tipografia e manual da marca.',
    icon: Layout,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  }
];

export default function ServiceStep({ data, updateData }: StepProps) {
  return (
    <div className="space-y-12">
      <div className="relative">
        <span className="absolute -top-10 -left-6 text-[12rem] font-black text-primary/5 select-none pointer-events-none">
          *
        </span>
        <div className="relative z-10 space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Configuração Inicial</p>
          <h2 className="text-5xl font-black tracking-tight text-foreground">Qual o <span className="text-primary">Serviço?</span></h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Selecione o tipo de serviço para que possamos personalizar as próximas perguntas.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Label className="text-base font-bold">Escolha uma opção:</Label>
          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
        </div>

        <RadioGroup
          value={data.serviceType}
          onValueChange={(val) => updateData({ serviceType: val })}
          className="grid gap-4"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const isSelected = data.serviceType === service.id;
            
            return (
              <Label
                key={service.id}
                className={`flex items-start gap-4 p-6 rounded-3xl border transition-all cursor-pointer hover:bg-white group ${
                  isSelected 
                    ? 'border-primary bg-white shadow-xl shadow-primary/5 ring-1 ring-primary' 
                    : 'border-border/50 bg-white/50'
                }`}
              >
                <div className="pt-1">
                  <RadioGroupItem value={service.id} className="border-primary text-primary" />
                </div>
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${service.bgColor} ${service.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg leading-none">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Label>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}
