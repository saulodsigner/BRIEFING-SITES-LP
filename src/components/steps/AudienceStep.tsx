import React from 'react';
import { BriefingData } from '../../types';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';

interface StepProps {
  data: BriefingData;
  updateData: (data: Partial<BriefingData>) => void;
}

const AGE_RANGES = ['Menos de 18', '18-24', '25-35', '35-45', 'Mais de 45'];

export default function AudienceStep({ data, updateData }: StepProps) {
  const isSocial = data.serviceType === 'social_media';
  const isBrand = data.serviceType === 'identidade_visual';

  const toggleAgeRange = (range: string) => {
    const current = data.ageRange;
    if (current.includes(range)) {
      updateData({ ageRange: current.filter((r) => r !== range) });
    } else {
      updateData({ ageRange: [...current, range] });
    }
  };

  return (
    <div className="space-y-12">
      <div className="relative">
        <span className="absolute -top-10 -left-6 text-[12rem] font-black text-primary/5 select-none pointer-events-none">
          02
        </span>
        <div className="relative z-10 space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Seção 02</p>
          <h2 className="text-5xl font-black tracking-tight text-foreground">Público & Mercado</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Quem vamos atingir? Entender o público é essencial para o design converter.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="targetAudience" className="text-base font-bold">Descreva o público-alvo</Label>
          <p className="text-sm text-muted-foreground">Quanto mais detalhado, melhor</p>
          <Textarea
            id="targetAudience"
            placeholder={isSocial ? 'Interesses, comportamentos, o que eles consomem no Instagram...' : 'Quem é o cliente ideal? Quais são suas dores, desejos, objeções?'}
            value={data.targetAudience}
            onChange={(e) => updateData({ targetAudience: e.target.value })}
            className="min-h-[150px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all resize-none p-5"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-base font-bold">Gênero predominante do público</Label>
          <RadioGroup
            value={data.gender}
            onValueChange={(val) => updateData({ gender: val })}
            className="grid sm:grid-cols-2 gap-3"
          >
            {['Feminino', 'Masculino', 'Predominantemente feminino', 'Predominantemente masculino'].map((option) => (
              <Label
                key={option}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                  data.gender === option 
                    ? 'border-primary bg-white shadow-md shadow-primary/5' 
                    : 'border-border/50 bg-white/50'
                }`}
              >
                <RadioGroupItem value={option} className="border-primary text-primary" />
                <span className="font-medium">{option}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-bold">Faixa etária do público</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {AGE_RANGES.map((range) => (
              <Label
                key={range}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                  data.ageRange.includes(range)
                    ? 'border-primary bg-white shadow-md shadow-primary/5'
                    : 'border-border/50 bg-white/50'
                }`}
              >
                <Checkbox
                  checked={data.ageRange.includes(range)}
                  onCheckedChange={() => toggleAgeRange(range)}
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
                <span className="text-sm font-medium">{range}</span>
              </Label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="competitors" className="text-base font-bold">Principais concorrentes</Label>
          <p className="text-sm text-muted-foreground">Ex: Curso X, Método Y, siteconcorrente.com</p>
          <Input
            id="competitors"
            placeholder="Sites, produtos ou pessoas que disputam a mesma audiência"
            value={data.competitors}
            onChange={(e) => updateData({ competitors: e.target.value })}
            className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="differential" className="text-base font-bold">Qual é o grande diferencial da sua oferta?</Label>
          <Textarea
            id="differential"
            placeholder="O que faz seu produto ser diferente ou melhor que os concorrentes? Por que o cliente deve escolher você?"
            value={data.differential}
            onChange={(e) => updateData({ differential: e.target.value })}
            className="min-h-[120px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all resize-none p-5"
          />
        </div>
      </div>
    </div>
  );
}
