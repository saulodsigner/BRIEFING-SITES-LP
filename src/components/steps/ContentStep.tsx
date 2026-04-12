import React from 'react';
import { BriefingData } from '../../types';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

interface StepProps {
  data: BriefingData;
  updateData: (data: Partial<BriefingData>) => void;
}

export default function ContentStep({ data, updateData }: StepProps) {
  const isLP = data.serviceType === 'landing_page_lancamento';
  const isSocial = data.serviceType === 'social_media';
  const isBrand = data.serviceType === 'identidade_visual';

  return (
    <div className="space-y-12">
      <div className="relative">
        <span className="absolute -top-10 -left-6 text-[12rem] font-black text-primary/5 select-none pointer-events-none">
          03
        </span>
        <div className="relative z-10 space-y-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Seção 03</p>
          <h2 className="text-5xl font-black tracking-tight text-foreground">Conteúdo</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            O conteúdo é a base de tudo. Aqui entendo o que você já tem disponível.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {isLP && (
          <>
            {data.websiteCategory === 'Ecommerce' ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-bold">Quantos produtos o ecommerce terá inicialmente?</Label>
                  <Input 
                    placeholder="Ex: 10 a 50 produtos..."
                    className="h-14 rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-bold">Já possui as fotos e descrições dos produtos?</Label>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
                  </div>
                  <RadioGroup
                    value={data.copyStatus}
                    onValueChange={(val) => updateData({ copyStatus: val })}
                    className="grid sm:grid-cols-2 gap-3"
                  >
                    {['Sim, tudo pronto', 'Apenas fotos', 'Apenas descrições', 'Nada pronto'].map((option) => (
                      <Label
                        key={option}
                        className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                          data.copyStatus === option 
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
                  <Label className="text-base font-bold">Quais categorias de produtos você terá?</Label>
                  <Textarea 
                    placeholder="Ex: Roupas Masculinas, Acessórios, Calçados..."
                    className="min-h-[100px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all p-5"
                  />
                </div>
              </div>
            ) : data.websiteCategory === 'Site Institucional' ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-bold">Quais páginas o site deve ter?</Label>
                  <p className="text-sm text-muted-foreground">Ex: Home, Sobre Nós, Serviços, Blog, Contato...</p>
                  <Textarea 
                    placeholder="Liste as páginas desejadas..."
                    className="min-h-[120px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all p-5"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-bold">Os textos institucionais já estão prontos?</Label>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
                  </div>
                  <RadioGroup
                    value={data.copyStatus}
                    onValueChange={(val) => updateData({ copyStatus: val })}
                    className="grid sm:grid-cols-3 gap-3"
                  >
                    {['Sim, completos', 'Parcialmente', 'Não, preciso de ajuda'].map((option) => (
                      <Label
                        key={option}
                        className={`flex flex-col items-center justify-center text-center gap-3 p-6 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                          data.copyStatus === option 
                            ? 'border-primary bg-white shadow-md shadow-primary/5' 
                            : 'border-border/50 bg-white/50'
                        }`}
                      >
                        <RadioGroupItem value={option} className="border-primary text-primary" />
                        <span className="text-sm font-medium">{option}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-bold">A copy (texto de vendas) já está pronta?</Label>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
                  </div>
                  <RadioGroup
                    value={data.copyStatus}
                    onValueChange={(val) => updateData({ copyStatus: val })}
                    className="grid sm:grid-cols-3 gap-3"
                  >
                    {['Sim, está completa', 'Parcialmente pronta', 'Não, preciso de orientação'].map((option) => (
                      <Label
                        key={option}
                        className={`flex flex-col items-center justify-center text-center gap-3 p-6 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                          data.copyStatus === option 
                            ? 'border-primary bg-white shadow-md shadow-primary/5' 
                            : 'border-border/50 bg-white/50'
                        }`}
                      >
                        <RadioGroupItem value={option} className="border-primary text-primary" />
                        <span className="text-sm font-medium">{option}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-bold">Tem depoimentos ou provas sociais?</Label>
                  <RadioGroup
                    value={data.testimonials}
                    onValueChange={(val) => updateData({ testimonials: val })}
                    className="grid sm:grid-cols-2 gap-3"
                  >
                    {['Sim — texto + foto', 'Sim — vídeo', 'Tenho mas preciso organizar', 'Não tenho'].map((option) => (
                      <Label
                        key={option}
                        className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                          data.testimonials === option 
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
                  <Label className="text-base font-bold">Tem VSL (vídeo de vendas)?</Label>
                  <RadioGroup
                    value={data.hasVsl}
                    onValueChange={(val) => updateData({ hasVsl: val })}
                    className="grid sm:grid-cols-3 gap-3"
                  >
                    {['Sim, já gravado', 'Vou gravar', 'Não terá VSL'].map((option) => (
                      <Label
                        key={option}
                        className={`flex flex-col items-center justify-center text-center gap-3 p-6 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                          data.hasVsl === option 
                            ? 'border-primary bg-white shadow-md shadow-primary/5' 
                            : 'border-border/50 bg-white/50'
                        }`}
                      >
                        <RadioGroupItem value={option} className="border-primary text-primary" />
                        <span className="text-sm font-medium">{option}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </>
            )}
          </>
        )}

        {isSocial && (
          <>
            <div className="space-y-4">
              <Label className="text-base font-bold">Qual o tom de voz da marca?</Label>
              <p className="text-sm text-muted-foreground">Como a marca deve falar com o público?</p>
              <RadioGroup
                value={data.copyStatus}
                onValueChange={(val) => updateData({ copyStatus: val })}
                className="grid sm:grid-cols-2 gap-3"
              >
                {['Informativo e Educativo', 'Descontraído e Engraçado', 'Sério e Autoritário', 'Inspirador e Motivacional'].map((option) => (
                  <Label
                    key={option}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                      data.copyStatus === option 
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
              <Label className="text-base font-bold">Quais são os pilares de conteúdo?</Label>
              <p className="text-sm text-muted-foreground">Sobre o que vamos falar? (Ex: Dicas, Bastidores, Venda, Lifestyle)</p>
              <Textarea
                placeholder="Liste os temas principais que você gostaria de abordar nas redes..."
                className="min-h-[100px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all p-5"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-bold">Quais redes sociais serão geridas?</Label>
              <div className="grid grid-cols-2 gap-3">
                {['Instagram', 'LinkedIn', 'TikTok', 'YouTube', 'Facebook', 'Threads'].map((social) => (
                  <Label
                    key={social}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-white/50 cursor-pointer hover:bg-white transition-all"
                  >
                    <input type="checkbox" className="size-4 rounded border-primary text-primary" />
                    <span className="font-medium">{social}</span>
                  </Label>
                ))}
              </div>
            </div>
          </>
        )}

        {isBrand && (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-bold">Qual a mensagem principal que a marca deve passar?</Label>
              <Textarea
                placeholder="Ex: Autoridade, inovação, acolhimento, luxo..."
                className="min-h-[120px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all p-5"
              />
            </div>
            
            <div className="space-y-4">
              <Label className="text-base font-bold">Quem são os principais concorrentes visuais?</Label>
              <p className="text-sm text-muted-foreground">Marcas que você admira ou que disputam o mesmo espaço.</p>
              <Textarea
                placeholder="Liste nomes de marcas ou links..."
                className="min-h-[100px] rounded-2xl bg-white border-border/50 focus:ring-primary/20 transition-all p-5"
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Label className="text-base font-bold">Tem fotos profissionais do produto, pessoa ou equipe?</Label>
          <RadioGroup
            value={data.hasPhotos}
            onValueChange={(val) => updateData({ hasPhotos: val })}
            className="grid sm:grid-cols-3 gap-3"
          >
            {['Sim, tenho', 'Não tenho', 'Vou providenciar'].map((option) => (
              <Label
                key={option}
                className={`flex flex-col items-center justify-center text-center gap-3 p-6 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                  data.hasPhotos === option 
                    ? 'border-primary bg-white shadow-md shadow-primary/5' 
                    : 'border-border/50 bg-white/50'
                }`}
              >
                <RadioGroupItem value={option} className="border-primary text-primary" />
                <span className="text-sm font-medium">{option}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        {isLP && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-bold">Plataforma de pagamento / checkout</Label>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none text-[10px] uppercase tracking-wider">Obrigatório</Badge>
            </div>
            <RadioGroup
              value={data.paymentPlatform}
              onValueChange={(val) => updateData({ paymentPlatform: val })}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {['Hotmart', 'Kiwify', 'Stripe', 'Eduzz', 'Não precisa', 'Outro'].map((option) => (
                <Label
                  key={option}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:bg-white ${
                    data.paymentPlatform === option 
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
      </div>
    </div>
  );
}
