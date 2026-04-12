import React from 'react';
import { BriefingData } from '../../types';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';
import { Globe, Layout, Code, Zap, HelpCircle } from 'lucide-react';

interface StepProps {
  data: BriefingData;
  updateData: (data: Partial<BriefingData>) => void;
}

const INTEGRATIONS = [
  'Meta Pixel', 'Google Analytics', 'Google Tag Manager', 'ActiveCampaign', 'RD Station', 'Mailchimp', 'Hotjar', 'Outro'
];

export default function TechnicalStep({ data, updateData }: StepProps) {
  const toggleIntegration = (item: string) => {
    const current = data.requiredIntegrations;
    if (current.includes(item)) {
      updateData({ requiredIntegrations: current.filter((i) => i !== item) });
    } else {
      updateData({ requiredIntegrations: [...current, item] });
    }
  };

  return (
    <div className="space-y-12">
      <div className="relative">
        <span className="absolute -top-10 -left-6 text-[12rem] font-black text-primary/5 select-none pointer-events-none">
          05
        </span>
        <div className="relative z-10 space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Seção 05</p>
          <h2 className="text-5xl font-black tracking-tight text-foreground">Técnico</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Detalhes técnicos para garantir que o projeto funcione perfeitamente.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <Label className="text-base font-bold">Plataforma de desenvolvimento</Label>
          <RadioGroup
            value={data.devPlatform}
            onValueChange={(val) => updateData({ devPlatform: val })}
            className="grid sm:grid-cols-2 gap-4"
          >
            {[
              { id: 'webflow', label: 'Webflow', icon: Globe },
              { id: 'wordpress', label: 'WordPress/Elementor', icon: Layout },
              { id: 'framer', label: 'Framer', icon: Zap },
              { id: 'html', label: 'HTML/CSS puro', icon: Code },
              { id: 'none', label: 'Não tenho preferência', icon: HelpCircle }
            ].map((option) => (
              <Label
                key={option.id}
                className={`flex items-center gap-4 p-6 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                  data.devPlatform === option.id 
                    ? 'border-primary bg-white shadow-md shadow-primary/5' 
                    : 'border-border/50 bg-white/50'
                }`}
              >
                <RadioGroupItem value={option.id} className="border-primary text-primary" />
                <div className="flex items-center gap-3">
                  <option.icon className={`w-5 h-5 ${data.devPlatform === option.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-medium">{option.label}</span>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-bold">Integrações necessárias</Label>
          <p className="text-sm text-muted-foreground">Selecione todas que precisar</p>
          <div className="flex flex-wrap gap-2">
            {INTEGRATIONS.map((item) => (
              <button
                key={item}
                onClick={() => toggleIntegration(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  data.requiredIntegrations.includes(item)
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white border border-border/50 text-muted-foreground hover:border-primary/50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="technicalNotes" className="text-base font-bold">Observações técnicas</Label>
          <Textarea
            id="technicalNotes"
            placeholder="Redirects específicos, formulários de captura, requisitos de acessibilidade, integrações especiais..."
            value={data.technicalNotes}
            onChange={(e) => updateData({ technicalNotes: e.target.value })}
            className="min-h-[150px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all resize-none p-5"
          />
        </div>
      </div>
    </div>
  );
}
