import React from 'react';
import { BriefingData } from '../../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

interface StepProps {
  data: BriefingData;
  updateData: (data: Partial<BriefingData>) => void;
}

export default function ProjectStep({ data, updateData }: StepProps) {
  const isLP = data.serviceType === 'landing_page_lancamento';
  const isSocial = data.serviceType === 'social_media';
  const isBrand = data.serviceType === 'identidade_visual';

  const labels = {
    projectName: isSocial ? 'Nome da marca ou perfil' : isBrand ? 'Nome da marca' : 'Nome do projeto ou site',
    mainObjective: isSocial ? 'Qual o objetivo principal da gestão?' : isBrand ? 'Qual o objetivo da nova identidade?' : 'Qual é o objetivo principal do site?',
    productDescription: isSocial ? 'Descreva seu negócio ou nicho' : isBrand ? 'Descreva a essência da marca' : 'Descreva o produto ou oferta',
    deadline: isSocial ? 'Quando deseja iniciar?' : 'Prazo desejado de entrega',
    siteUrl: isSocial ? 'Link do perfil atual' : 'Endereço do site (se houver)'
  };

  const websiteCategories = [
    'Ecommerce',
    'Site Institucional',
    'Página de Vendas Perpétua',
    'Página de Vendas Infoproduto',
    'Página de Captura',
    'Lançamento Completo (Captura, Vendas e Obrigado)',
    'Outro'
  ];

  return (
    <div className="space-y-12">
      <div className="relative">
        <span className="absolute -top-10 -left-6 text-[12rem] font-black text-primary/5 select-none pointer-events-none">
          01
        </span>
        <div className="relative z-10 space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Seção 01</p>
          <h2 className="text-5xl font-black tracking-tight text-foreground">Projeto</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Informações gerais sobre o seu negócio e os objetivos deste serviço.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {isLP && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-bold">Qual tipo de site você precisa?</Label>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
            </div>
            <RadioGroup
              value={data.websiteCategory}
              onValueChange={(val) => updateData({ websiteCategory: val })}
              className="grid gap-3"
            >
              {websiteCategories.map((option) => (
                <Label
                  key={option}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                    data.websiteCategory === option 
                      ? 'border-primary bg-white shadow-md shadow-primary/5' 
                      : 'border-border/50 bg-white/50'
                  }`}
                >
                  <RadioGroupItem value={option} className="border-primary text-primary" />
                  <span className="font-medium">{option}</span>
                </Label>
              ))}
            </RadioGroup>
            {data.websiteCategory.startsWith('Outro') && (
              <Input
                placeholder="Especifique o tipo de site..."
                className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all mt-2"
                value={data.websiteCategory.replace('Outro: ', '').replace('Outro', '')}
                onChange={(e) => updateData({ websiteCategory: `Outro: ${e.target.value}` })}
              />
            )}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="projectName" className="text-base font-bold">{labels.projectName}</Label>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
          </div>
          <Input
            id="projectName"
            placeholder="..."
            value={data.projectName}
            onChange={(e) => updateData({ projectName: e.target.value })}
            className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="contactEmail" className="text-base font-bold">E-mail de contato</Label>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Onde envio o briefing compilado e entro em contato</p>
          <Input
            id="contactEmail"
            type="email"
            placeholder="seuemail@exemplo.com"
            value={data.contactEmail}
            onChange={(e) => updateData({ contactEmail: e.target.value })}
            className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all"
          />
        </div>

        {isLP && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-bold">{labels.mainObjective}</Label>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
            </div>
            <RadioGroup
              value={data.mainObjective}
              onValueChange={(val) => updateData({ mainObjective: val })}
              className="grid gap-3"
            >
              {[
                'Vender um produto ou serviço',
                'Capturar leads (e-mail, WhatsApp)',
                'Inscrição em evento ou webinar',
                'Agendamento de consulta',
                'Outro'
              ].map((option) => (
                <Label
                  key={option}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                    data.mainObjective === option 
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
        )}

        <div className="space-y-3">
          <Label htmlFor="productDescription" className="text-base font-bold">{labels.productDescription}</Label>
          <p className="text-sm text-muted-foreground">Quanto mais detalhado, melhor</p>
          <Textarea
            id="productDescription"
            placeholder="..."
            value={data.productDescription}
            onChange={(e) => updateData({ productDescription: e.target.value })}
            className="min-h-[150px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all resize-none p-5"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="deadline" className="text-base font-bold">{labels.deadline}</Label>
            <Input
              id="deadline"
              placeholder="Ex: 15 dias, até 10/05..."
              value={data.deadline}
              onChange={(e) => updateData({ deadline: e.target.value })}
              className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="siteUrl" className="text-base font-bold">{labels.siteUrl}</Label>
            <Input
              id="siteUrl"
              placeholder="..."
              value={data.siteUrl}
              onChange={(e) => updateData({ siteUrl: e.target.value })}
              className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
