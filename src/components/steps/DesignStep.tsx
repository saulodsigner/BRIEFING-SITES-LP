import React from 'react';
import { BriefingData } from '../../types';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface StepProps {
  data: BriefingData;
  updateData: (data: Partial<BriefingData>) => void;
}

const BRAND_ATTRIBUTES = [
  'Sério', 'Elegante', 'Luxuoso', 'Moderno', 'Clean', 'Minimalista', 'Arrojado',
  'Colorido', 'Dark', 'Hightech', 'Amigável', 'Divertido', 'Ecológico', 'Tradicional', 'Vintage'
];

export default function DesignStep({ data, updateData }: StepProps) {
  const isLP = data.serviceType === 'landing_page_lancamento' || data.serviceType === 'site_institucional';
  const isSocial = data.serviceType === 'social_media';
  const isBrand = data.serviceType === 'identidade_visual';

  const toggleAttribute = (attr: string) => {
    const current = data.brandAttributes;
    if (current.includes(attr)) {
      updateData({ brandAttributes: current.filter((a) => a !== attr) });
    } else {
      updateData({ brandAttributes: [...current, attr] });
    }
  };

  return (
    <div className="space-y-12">
      <div className="relative">
        <span className="absolute -top-10 -left-6 text-[12rem] font-black text-primary/5 select-none pointer-events-none">
          04
        </span>
        <div className="relative z-10 space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Seção 04</p>
          <h2 className="text-5xl font-black tracking-tight text-foreground">Design</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Vamos alinhar o visual: estilo, referências e identidade visual.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="designStyle" className="text-base font-bold">
              {isSocial ? 'Como você imagina a aparência dos posts?' : isBrand ? 'Qual estilo visual você busca para a marca?' : 'Como você imagina a aparência do design?'}
            </Label>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
          </div>
          <Textarea
            id="designStyle"
            placeholder="Descreva o estilo, tom, sensação... Ex: moderno, minimalista, vibrante, luxuoso..."
            value={data.designStyle}
            onChange={(e) => updateData({ designStyle: e.target.value })}
            className="min-h-[120px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all resize-none p-5"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-base font-bold">Atributos da marca</Label>
          <p className="text-sm text-muted-foreground">Selecione os que melhor representam seu negócio</p>
          <div className="flex flex-wrap gap-2">
            {BRAND_ATTRIBUTES.map((attr) => (
              <button
                key={attr}
                onClick={() => toggleAttribute(attr)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  data.brandAttributes.includes(attr)
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white border border-border/50 text-muted-foreground hover:border-primary/50'
                }`}
              >
                {attr}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="designAvoid" className="text-base font-bold">O que você NÃO quer no visual?</Label>
          <Textarea
            id="designAvoid"
            placeholder="Ex: cores muito berrantes, fontes difíceis de ler, estilo infantil..."
            value={data.designAvoid}
            onChange={(e) => updateData({ designAvoid: e.target.value })}
            className="min-h-[120px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all resize-none p-5"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="referenceSites" className="text-base font-bold">
              {isSocial ? 'Perfis de referência' : isBrand ? 'Marcas ou logos de referência' : 'Sites de referência'}
            </Label>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {isSocial ? 'Links de perfis que você gosta do visual' : isBrand ? 'Nomes ou links de marcas que você admira' : 'Pode ser qualquer site — não precisa ser do mesmo nicho'}
          </p>
          <Textarea
            id="referenceSites"
            placeholder="..."
            value={data.referenceSites}
            onChange={(e) => updateData({ referenceSites: e.target.value })}
            className="min-h-[150px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all resize-none p-5"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="preferredColors" className="text-base font-bold">Cores preferidas</Label>
            <Input
              id="preferredColors"
              placeholder="..."
              value={data.preferredColors}
              onChange={(e) => updateData({ preferredColors: e.target.value })}
              className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="avoidColors" className="text-base font-bold">Cores a evitar</Label>
            <Input
              id="avoidColors"
              placeholder="..."
              value={data.avoidColors}
              onChange={(e) => updateData({ avoidColors: e.target.value })}
              className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {!isBrand && (
          <div className="space-y-3">
            <Label htmlFor="brandAssetsUrl" className="text-base font-bold">Arquivos de identidade visual</Label>
            <p className="text-sm text-muted-foreground">Link do Drive com logo, manual de marca, fotos...</p>
            <Input
              id="brandAssetsUrl"
              placeholder="https://..."
              value={data.brandAssetsUrl}
              onChange={(e) => updateData({ brandAssetsUrl: e.target.value })}
              className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all"
            />
          </div>
        )}
      </div>
    </div>
  );
}
