import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Loader2, 
  Rocket, 
  ArrowRight, 
  Circle, 
  CheckCircle2,
  Globe,
  Palette,
  Layout,
  Settings,
  ShieldCheck,
  Users,
  MessageSquare,
  LayoutDashboard
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { BriefingData, initialData } from './types';
import { Routes, Route, Link } from 'react-router-dom';
import Admin from './Admin';

function BriefingForm() {
  const [step, setStep] = useState(0); // 0 is Intro
  const [data, setData] = useState<BriefingData>(initialData);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateData = (fields: Partial<BriefingData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(s => s + 1);
  };

  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(s => s - 1);
  };

  const getStepTitle = () => {
    if (step === 0) return 'Intro';
    if (step === 1) return 'Serviço';
    
    if (data.serviceType === 'sites_lp') {
      const titles = ['', '', 'Projeto', 'Público & Mercado', 'Conteúdo', 'Design', 'Técnico', 'Finalização'];
      return titles[step] || '';
    }
    if (data.serviceType === 'brand_identity') {
      const titles = ['', '', 'Sobre Você', 'Sobre a Empresa', 'Sobre o Público Alvo', 'Personalidade da Marca'];
      return titles[step] || '';
    }
    if (data.serviceType === 'social_media') {
      const titles = ['', '', 'Presença', 'Público', 'Comunicação', 'Identidade', 'Finalização'];
      return titles[step] || '';
    }
    return '';
  };

  const getTotalSteps = () => {
    if (data.serviceType === 'sites_lp') return 7; // Intro + Service + 6 sections
    if (data.serviceType === 'brand_identity') return 5; // Intro + Service + 4 sections
    if (data.serviceType === 'social_media') return 6; // Intro + Service + 5 sections
    return 2;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'briefings'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (error) {
      alert('Erro ao enviar o briefing. Por favor, tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- UI Components ---

  const RadioOption = ({ label, value, current, name, required = false }: { label: string, value: string, current: string, name: keyof BriefingData, required?: boolean }) => (
    <div 
      onClick={() => updateData({ [name]: value })}
      className={`radio-card ${current === value ? 'active' : ''}`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${current === value ? 'border-white' : 'border-border'}`}>
        {current === value && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );

  const CheckboxOption = ({ label, value, current, name }: { label: string, value: string, current: string[], name: keyof BriefingData }) => {
    const isActive = current.includes(value);
    const toggle = () => {
      const newValue = isActive 
        ? current.filter(v => v !== value)
        : [...current, value];
      updateData({ [name]: newValue });
    };
    return (
      <div 
        onClick={toggle}
        className={`checkbox-card ${isActive ? 'active' : ''}`}
      >
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isActive ? 'border-primary bg-primary' : 'border-border'}`}>
          {isActive && <Check className="w-3.5 h-3.5 text-white" />}
        </div>
        <span className="font-medium">{label}</span>
      </div>
    );
  };

  const AttributeChip = ({ label }: { label: string }) => {
    const isActive = data.brandAttributes.includes(label);
    const toggle = () => {
      const newValue = isActive 
        ? data.brandAttributes.filter(v => v !== label)
        : [...data.brandAttributes, label];
      updateData({ brandAttributes: newValue });
    };
    return (
      <button 
        onClick={toggle}
        className={`attribute-chip ${isActive ? 'active' : ''}`}
      >
        {label}
      </button>
    );
  };

  // --- Steps Content ---

  const renderStep = () => {
    if (step === 0) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center space-y-8 py-20"
        >
          <div className="w-24 h-24 bg-accent rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-accent/30 rotate-12">
            <Rocket className="w-12 h-12 text-white -rotate-12" />
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tighter text-primary leading-none">
              Zenith <br /> <span className="text-muted/20">Briefing</span>
            </h1>
            <p className="text-muted text-xl max-w-md mx-auto font-medium">
              Estamos prontos para transformar sua visão em realidade. Vamos começar?
            </p>
          </div>
          <button onClick={nextStep} className="btn-primary mx-auto group">
            Iniciar Briefing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      );
    }

    if (step === 1) {
      return (
        <div className="space-y-12 relative z-0">
          <div className="section-number">00</div>
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção de Início</span>
            <h2 className="text-5xl font-black tracking-tight">Qual o serviço?</h2>
            <p className="text-muted text-sm">Selecione o tipo de briefing que deseja preencher.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 relative z-10">
            <div 
              onClick={() => { updateData({ serviceType: 'sites_lp' }); nextStep(); }}
              className={`radio-card p-8 ${data.serviceType === 'sites_lp' ? 'active' : ''}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black">Sites & Landing Pages</h3>
                <p className="text-xs opacity-70">Focado em conversão e presença digital.</p>
              </div>
            </div>

            <div 
              onClick={() => { updateData({ serviceType: 'brand_identity' }); nextStep(); }}
              className={`radio-card p-8 ${data.serviceType === 'brand_identity' ? 'active' : ''}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black">Identidade Visual</h3>
                <p className="text-xs opacity-70">Criação de logo, cores e essência da marca.</p>
              </div>
            </div>

            <div 
              onClick={() => { updateData({ serviceType: 'social_media' }); nextStep(); }}
              className={`radio-card p-8 ${data.serviceType === 'social_media' ? 'active' : ''}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black">Social Media</h3>
                <p className="text-xs opacity-70">Estratégia e design para redes sociais.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (data.serviceType === 'sites_lp') {
      switch (step) {
        case 2: // Seção 01: Projeto (Sites/LP)
          return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">01</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 01 de 06</span>
              <h2 className="text-5xl font-black tracking-tight">Projeto</h2>
              <p className="text-muted text-sm">Informações gerais sobre o projeto, a oferta e o objetivo da landing page.</p>
            </div>

            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold flex items-center">Nome do projeto ou landing page <span className="badge-required">Obrigatório</span></label>
                <input 
                  type="text" 
                  value={data.projectName} 
                  onChange={e => updateData({ projectName: e.target.value })}
                  className="input-base" 
                  placeholder="..." 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold flex items-center">E-mail de contato <span className="badge-required">Obrigatório</span></label>
                <p className="text-[10px] text-muted">Onde envio o briefing compilado e entro em contato</p>
                <input 
                  type="email" 
                  value={data.contactEmail} 
                  onChange={e => updateData({ contactEmail: e.target.value })}
                  className="input-base bg-blue-50/50 border-blue-100" 
                  placeholder="contatojsaulo@gmail.com" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold flex items-center">Qual é o objetivo principal da LP? <span className="badge-required">Obrigatório</span></label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption label="Vender um produto ou serviço" value="vender" current={data.mainObjective} name="mainObjective" />
                  <RadioOption label="Capturar leads (e-mail, WhatsApp)" value="leads" current={data.mainObjective} name="mainObjective" />
                  <RadioOption label="Inscrição em evento ou webinar" value="evento" current={data.mainObjective} name="mainObjective" />
                  <RadioOption label="Agendamento de consulta" value="agendamento" current={data.mainObjective} name="mainObjective" />
                  <RadioOption label="Outro" value="outro" current={data.mainObjective} name="mainObjective" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Descreva o produto ou oferta</label>
                <p className="text-[10px] text-muted">Quanto mais detalhado, mais preciso será o design</p>
                <textarea 
                  value={data.productDescription}
                  onChange={e => updateData({ productDescription: e.target.value })}
                  className="textarea-base h-32" 
                  placeholder="Preço, bônus, garantia, o que o cliente recebe..." 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">É um lançamento ou produto perpétuo?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <RadioOption label="Lançamento" value="lancamento" current={data.projectType} name="projectType" />
                  <RadioOption label="Perpétuo" value="perpetuo" current={data.projectType} name="projectType" />
                  <RadioOption label="Ainda não definido" value="indefinido" current={data.projectType} name="projectType" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Prazo desejado de entrega</label>
                <input 
                  type="text" 
                  value={data.deadline}
                  onChange={e => updateData({ deadline: e.target.value })}
                  className="input-base" 
                  placeholder="Ex: 15 dias, até 10/05, o quanto antes..." 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Endereço do site</label>
                <p className="text-[10px] text-muted">Deixe em branco se ainda não tiver domínio definido</p>
                <input 
                  type="text" 
                  value={data.siteUrl}
                  onChange={e => updateData({ siteUrl: e.target.value })}
                  className="input-base" 
                  placeholder="Ex: meusite.com.br" 
                />
              </div>
            </div>
          </div>
        );

      case 3: // Seção 02: Público & Mercado (Sites/LP)
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">02</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 02 de 06</span>
              <h2 className="text-5xl font-black tracking-tight">Público & Mercado</h2>
              <p className="text-muted text-sm">Quem vai ver essa landing page? Entender o público é essencial para o design converter.</p>
            </div>

            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Descreva o público-alvo</label>
                <p className="text-[10px] text-muted">Quanto mais detalhado, mais assertivo será o design</p>
                <textarea 
                  value={data.targetAudience}
                  onChange={e => updateData({ targetAudience: e.target.value })}
                  className="textarea-base h-32" 
                  placeholder="Quem é o cliente ideal? Quais são suas dores, desejos, objeções? Faixa etária, profissão, situação de vida..." 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Gênero predominante do público</label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption label="Feminino" value="feminino" current={data.gender} name="gender" />
                  <RadioOption label="Masculino" value="masculino" current={data.gender} name="gender" />
                  <RadioOption label="Predominantemente feminino" value="pred_feminino" current={data.gender} name="gender" />
                  <RadioOption label="Predominantemente masculino" value="pred_masculino" current={data.gender} name="gender" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Faixa etária do público</label>
                <div className="grid grid-cols-2 gap-3">
                  <CheckboxOption label="Menos de 18" value="<18" current={data.ageRange} name="ageRange" />
                  <CheckboxOption label="18-24" value="18-24" current={data.ageRange} name="ageRange" />
                  <CheckboxOption label="25-35" value="25-35" current={data.ageRange} name="ageRange" />
                  <CheckboxOption label="35-45" value="35-45" current={data.ageRange} name="ageRange" />
                  <CheckboxOption label="Mais de 45" value=">45" current={data.ageRange} name="ageRange" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Principais concorrentes</label>
                <p className="text-[10px] text-muted">Ex: Curso X, Método Y, siteconcorrente.com</p>
                <input 
                  type="text" 
                  value={data.competitors}
                  onChange={e => updateData({ competitors: e.target.value })}
                  className="input-base" 
                  placeholder="Sites, produtos ou pessoas que disputam a mesma audiência" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Qual é o grande diferencial da sua oferta?</label>
                <textarea 
                  value={data.differential}
                  onChange={e => updateData({ differential: e.target.value })}
                  className="textarea-base h-32" 
                  placeholder="O que faz seu produto ser diferente ou melhor que os concorrentes? Por que o cliente deve escolher você?" 
                />
              </div>
            </div>
          </div>
        );

      case 4: // Seção 03: Conteúdo (Sites/LP)
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">03</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 03 de 06</span>
              <h2 className="text-5xl font-black tracking-tight">Conteúdo</h2>
              <p className="text-muted text-sm">O conteúdo é a base da LP. Aqui entendo o que você já tem disponível.</p>
            </div>

            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold flex items-center">A copy (texto de vendas) já está pronta? <span className="badge-required">Obrigatório</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <RadioOption label="Sim, está completa" value="completa" current={data.copyStatus} name="copyStatus" />
                  <RadioOption label="Parcialmente pronta" value="parcial" current={data.copyStatus} name="copyStatus" />
                  <RadioOption label="Não, preciso de orientação" value="orientacao" current={data.copyStatus} name="copyStatus" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Tem depoimentos ou provas sociais?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <RadioOption label="Sim — texto + foto" value="texto_foto" current={data.testimonials} name="testimonials" />
                  <RadioOption label="Sim — vídeo" value="video" current={data.testimonials} name="testimonials" />
                  <RadioOption label="Tenho mas preciso organizar" value="organizar" current={data.testimonials} name="testimonials" />
                  <RadioOption label="Não tenho" value="nao" current={data.testimonials} name="testimonials" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Tem VSL (vídeo de vendas)?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <RadioOption label="Sim, já gravado" value="gravado" current={data.vslStatus} name="vslStatus" />
                  <RadioOption label="Vou gravar" value="gravar" current={data.vslStatus} name="vslStatus" />
                  <RadioOption label="Não terá VSL" value="nao" current={data.vslStatus} name="vslStatus" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Tem fotos profissionais do produto, pessoa ou equipe?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <RadioOption label="Sim, tenho" value="tenho" current={data.photosStatus} name="photosStatus" />
                  <RadioOption label="Não tenho" value="nao" current={data.photosStatus} name="photosStatus" />
                  <RadioOption label="Vou providenciar" value="providenciar" current={data.photosStatus} name="photosStatus" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Plataforma de pagamento / checkout</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <RadioOption label="Hotmart" value="hotmart" current={data.paymentPlatform} name="paymentPlatform" />
                  <RadioOption label="Kiwify" value="kiwify" current={data.paymentPlatform} name="paymentPlatform" />
                  <RadioOption label="Stripe" value="stripe" current={data.paymentPlatform} name="paymentPlatform" />
                  <RadioOption label="Eduzz" value="eduzz" current={data.paymentPlatform} name="paymentPlatform" />
                  <RadioOption label="Outro" value="outro" current={data.paymentPlatform} name="paymentPlatform" />
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Seção 04: Design (Sites/LP)
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">04</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 04 de 06</span>
              <h2 className="text-5xl font-black tracking-tight">Design</h2>
              <p className="text-muted text-sm">Vamos alinhar o visual da landing page: estilo, referências e identidade visual.</p>
            </div>

            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Como você imagina a aparência do design?</label>
                <textarea 
                  value={data.designVibe}
                  onChange={e => updateData({ designVibe: e.target.value })}
                  className="textarea-base h-32" 
                  placeholder="Descreva o estilo, tom, sensação que quer transmitir... Ex: moderno e sério, colorido e jovem, dark e premium..." 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Atributos da marca</label>
                <p className="text-[10px] text-muted">Selecione os que melhor representam sua marca</p>
                <div className="flex flex-wrap gap-2">
                  {['Sério', 'Elegante', 'Luxuoso', 'Moderno', 'Clean', 'Minimalista', 'Arrojado', 'Colorido', 'Dark', 'Hightech', 'Amigável', 'Divertido', 'Ecológico', 'Tradicional', 'Vintage'].map(attr => (
                    <AttributeChip key={attr} label={attr} />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">O que você NÃO quer no design?</label>
                <textarea 
                  value={data.designAvoid}
                  onChange={e => updateData({ designAvoid: e.target.value })}
                  className="textarea-base h-32" 
                  placeholder="Seja específico — isso evita retrabalho. Ex: sem cores muito vibrantes, nada de stock photos genéricas..." 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold flex items-center">Sites de referência <span className="badge-required">Obrigatório</span></label>
                <p className="text-[10px] text-muted">Pode ser qualquer site — não precisa ser do mesmo nicho</p>
                <textarea 
                  value={data.referenceSites}
                  onChange={e => updateData({ referenceSites: e.target.value })}
                  className="textarea-base h-32 font-mono text-xs" 
                  placeholder="1. apple.com&#10;2. stripe.com&#10;3. linear.app&#10;&#10;Mínimo 3 sites que você admira visualmente" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Cores preferidas</label>
                <input 
                  type="text" 
                  value={data.preferredColors}
                  onChange={e => updateData({ preferredColors: e.target.value })}
                  className="input-base" 
                  placeholder="Ex: tons de azul escuro, dourado, off-white..." 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Cores a evitar</label>
                <input 
                  type="text" 
                  value={data.avoidColors}
                  onChange={e => updateData({ avoidColors: e.target.value })}
                  className="input-base" 
                  placeholder="Ex: não gosto de laranja, amarelo muito vivo..." 
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Arquivos de identidade visual</label>
                <p className="text-[10px] text-muted">Link do Drive, Dropbox ou WeTransfer com logo, manual de marca, fotos...</p>
                <input 
                  type="text" 
                  value={data.brandAssetsUrl}
                  onChange={e => updateData({ brandAssetsUrl: e.target.value })}
                  className="input-base" 
                  placeholder="https://drive.google.com/..." 
                />
              </div>
            </div>
          </div>
        );

      case 6: // Seção 05: Técnico (Sites/LP)
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">05</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 05 de 06</span>
              <h2 className="text-5xl font-black tracking-tight">Técnico</h2>
              <p className="text-muted text-sm">Detalhes técnicos para garantir que a LP funcione perfeitamente.</p>
            </div>

            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Plataforma de desenvolvimento</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div onClick={() => updateData({ devPlatform: 'webflow' })} className={`radio-card ${data.devPlatform === 'webflow' ? 'active' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-black italic">W</div>
                    <span className="font-bold">Webflow</span>
                  </div>
                  <div onClick={() => updateData({ devPlatform: 'wordpress' })} className={`radio-card ${data.devPlatform === 'wordpress' ? 'active' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-800"><Globe className="w-5 h-5" /></div>
                    <span className="font-bold">WordPress/Elementor</span>
                  </div>
                  <div onClick={() => updateData({ devPlatform: 'framer' })} className={`radio-card ${data.devPlatform === 'framer' ? 'active' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 italic font-black">F</div>
                    <span className="font-bold">Framer</span>
                  </div>
                  <div onClick={() => updateData({ devPlatform: 'html' })} className={`radio-card ${data.devPlatform === 'html' ? 'active' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 font-bold text-[10px]">HTML</div>
                    <span className="font-bold">HTML/CSS puro</span>
                  </div>
                  <div onClick={() => updateData({ devPlatform: 'none' })} className={`radio-card ${data.devPlatform === 'none' ? 'active' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">?</div>
                    <span className="font-bold">Não tenho preferência</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Integrações necessárias</label>
                <p className="text-[10px] text-muted">Selecione todas que precisar</p>
                <div className="flex flex-wrap gap-2">
                  {['Meta Pixel', 'Google Analytics', 'Google Tag Manager', 'ActiveCampaign', 'RD Station', 'Mailchimp', 'Hotjar', 'Outro'].map(int => (
                    <button 
                      key={int}
                      onClick={() => {
                        const newValue = data.integrations.includes(int) 
                          ? data.integrations.filter(v => v !== int)
                          : [...data.integrations, int];
                        updateData({ integrations: newValue });
                      }}
                      className={`px-4 py-2 rounded-full border border-border bg-white text-xs font-medium cursor-pointer transition-all ${data.integrations.includes(int) ? 'bg-primary text-white border-primary' : 'hover:border-primary/30'}`}
                    >
                      {int}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold">Observações técnicas</label>
                <textarea 
                  value={data.technicalNotes}
                  onChange={e => updateData({ technicalNotes: e.target.value })}
                  className="textarea-base h-32" 
                  placeholder="Redirects específicos, formulários de captura, requisitos de acessibilidade, integrações especiais..." 
                />
              </div>
            </div>
          </div>
        );

        case 7: // Seção 06: Finalização (Sites/LP)
          return (
            <div className="space-y-12 relative z-0">
              <div className="section-number">06</div>
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 06 de 06</span>
                <h2 className="text-5xl font-black tracking-tight">Finalização</h2>
                <p className="text-muted text-sm">Última etapa. Adicione qualquer informação que não foi coberta acima.</p>
              </div>

              <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
                <div className="space-y-4">
                  <label className="text-sm font-bold">Informações adicionais</label>
                  <textarea 
                    value={data.additionalInfo}
                    onChange={e => updateData({ additionalInfo: e.target.value })}
                    className="textarea-base h-48" 
                    placeholder="Fique à vontade para adicionar qualquer coisa relevante que não foi perguntada..." 
                  />
                </div>
              </div>
            </div>
          );
      }
    } else if (data.serviceType === 'brand_identity') {
      switch (step) {
        case 2:
          return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">01</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Fase 01 de 04</span>
              <h2 className="text-5xl font-black tracking-tight">Sobre Você</h2>
              <p className="text-muted text-sm">Informações básicas e o significado da marca.</p>
            </div>
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Email - Contato <span className="badge-required">Obrigatório</span></label>
                <input type="email" value={data.contactEmail} onChange={e => updateData({ contactEmail: e.target.value })} className="input-base" placeholder="seu@email.com" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Nome da marca que será desenvolvida <span className="badge-required">Obrigatório</span></label>
                <input type="text" value={data.brandName} onChange={e => updateData({ brandName: e.target.value })} className="input-base" placeholder="Ex: Zenith Design" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Por que a empresa tem esse nome? O que ele significa pra você?</label>
                <textarea value={data.brandNameMeaning} onChange={e => updateData({ brandNameMeaning: e.target.value })} className="textarea-base h-32" placeholder="Explique o significado..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Por que você acredita que as pessoas precisam da sua empresa?</label>
                <textarea value={data.whyPeopleNeedYou} onChange={e => updateData({ whyPeopleNeedYou: e.target.value })} className="textarea-base h-32" placeholder="Qual o seu diferencial ou impacto?" />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">02</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Fase 02 de 04</span>
              <h2 className="text-5xl font-black tracking-tight">Sobre a Empresa</h2>
              <p className="text-muted text-sm">Detalhes sobre o negócio e o mercado.</p>
            </div>
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Defina resumidamente do que se trata sua marca.</label>
                <textarea value={data.brandDescription} onChange={e => updateData({ brandDescription: e.target.value })} className="textarea-base h-32" placeholder="Resumo da marca..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Há quanto tempo sua marca existe?</label>
                <input type="text" value={data.brandAge} onChange={e => updateData({ brandAge: e.target.value })} className="input-base" placeholder="Ex: 2 anos, Acabou de nascer..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Quais produtos ou serviços sua marca oferece?</label>
                <textarea value={data.productsServices} onChange={e => updateData({ productsServices: e.target.value })} className="textarea-base h-32" placeholder="Liste os principais produtos/serviços..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">O que faz sua marca ser diferente?</label>
                <textarea value={data.differential} onChange={e => updateData({ differential: e.target.value })} className="textarea-base h-32" placeholder="Seu diferencial competitivo..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Sua marca tem algum slogan? Se sim, qual é?</label>
                <input type="text" value={data.slogan} onChange={e => updateData({ slogan: e.target.value })} className="input-base" placeholder="Ex: Transformando visões em realidade" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Sua marca tem concorrentes? Quem são? Fale um pouco sobre eles se achar necessário. Coloque nomes e links se puder.</label>
                <textarea value={data.competitors} onChange={e => updateData({ competitors: e.target.value })} className="textarea-base h-32" placeholder="Nomes, links e comentários sobre concorrentes..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Qual é a missão, visão e valores da sua marca?</label>
                <textarea value={data.missionVisionValues} onChange={e => updateData({ missionVisionValues: e.target.value })} className="textarea-base h-32" placeholder="Missão, visão e valores..." />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">03</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Fase 03 de 04</span>
              <h2 className="text-5xl font-black tracking-tight">Sobre o Público Alvo</h2>
              <p className="text-muted text-sm">Quem são seus clientes ideais.</p>
            </div>
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Qual a classe social do seu público-alvo?</label>
                <input type="text" value={data.socialClass} onChange={e => updateData({ socialClass: e.target.value })} className="input-base" placeholder="Ex: Classe A e B, Classe C..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Qual a faixa etária?</label>
                <input type="text" value={data.brandAgeRange} onChange={e => updateData({ brandAgeRange: e.target.value })} className="input-base" placeholder="Ex: 25 a 40 anos" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Gênero</label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption label="Feminino" value="Feminino" current={data.gender} name="gender" />
                  <RadioOption label="Masculino" value="Masculino" current={data.gender} name="gender" />
                  <RadioOption label="Feminino predominante, pouco masculino" value="Feminino predominante, pouco masculino" current={data.gender} name="gender" />
                  <RadioOption label="Masculino predominante, pouco feminino" value="Masculino predominante, pouco feminino" current={data.gender} name="gender" />
                  <RadioOption label="Ambos os gêneros" value="Ambos os gêneros" current={data.gender} name="gender" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Como você gostaria que os clientes descrevessem sua empresa?</label>
                <textarea value={data.howClientsDescribe} onChange={e => updateData({ howClientsDescribe: e.target.value })} className="textarea-base h-32" placeholder="Ex: Inovadora, confiável, rápida..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">De que forma você espera que seu cliente encontre sua empresa?</label>
                <textarea value={data.howClientsFind} onChange={e => updateData({ howClientsFind: e.target.value })} className="textarea-base h-32" placeholder="Ex: Redes sociais, indicação, Google..." />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">04</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Fase 04 de 04</span>
              <h2 className="text-5xl font-black tracking-tight">Personalidade da Marca</h2>
              <p className="text-muted text-sm">O estilo e a essência visual.</p>
            </div>
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Se a sua empresa fosse uma pessoa como ela seria? Defina em 3 palavras que você considera mais forte.</label>
                <input type="text" value={data.brandPersonPositive} onChange={e => updateData({ brandPersonPositive: e.target.value })} className="input-base" placeholder="Ex: Elegante, Inteligente, Acessível" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Se sua empresa fosse uma pessoa, como ela NÃO seria? Defina em 3 palavras.</label>
                <input type="text" value={data.brandPersonNegative} onChange={e => updateData({ brandPersonNegative: e.target.value })} className="input-base" placeholder="Ex: Arrogante, Lenta, Desorganizada" />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Há alguma cor que VOCÊ QUEIRA na sua marca?</label>
                <input type="text" value={data.preferredColors} onChange={e => updateData({ preferredColors: e.target.value })} className="input-base" placeholder="Cores desejadas..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Há alguma cor que você NÃO QUEIRA na sua marca?</label>
                <input type="text" value={data.avoidColors} onChange={e => updateData({ avoidColors: e.target.value })} className="input-base" placeholder="Cores a evitar..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Há algum elemento que você NÃO QUEIRA na sua marca?</label>
                <textarea value={data.designAvoid} onChange={e => updateData({ designAvoid: e.target.value })} className="textarea-base h-32" placeholder="Elementos a evitar..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Pensando apenas em aspectos visuais, selecione alguns atributos que têm alguma relação com a sua marca:</label>
                <div className="flex flex-wrap gap-2">
                  {['Séria', 'Extrovertida', 'Conservadora', 'Alegre', 'Aconchegante', 'Delicada', 'Moderna', 'Orgânica', 'Sofisticada', 'Elegante', 'Vibrante', 'Tradicional', 'Retrô', 'Digital', 'Pesada', 'Leve', 'Rústica', 'Discreta', 'Extravagante', 'Nobre', 'Popular', 'Romântica', 'Formal', 'Ousada', 'Humana', 'Rebelde', 'Irreverente'].map(attr => (
                    <CheckboxOption key={attr} label={attr} value={attr} current={data.brandAttributes} name="brandAttributes" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Fique a vontade para dizer mais sobre a sua empresa ou dar considerações finais.</label>
                <textarea value={data.additionalInfo} onChange={e => updateData({ additionalInfo: e.target.value })} className="textarea-base h-48" placeholder="Considerações finais..." />
              </div>
            </div>
          </div>
        );
      }
    } else if (data.serviceType === 'social_media') {
      switch (step) {
        case 2:
          return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">01</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 01 de 05</span>
              <h2 className="text-5xl font-black tracking-tight">Presença</h2>
              <p className="text-muted text-sm">Onde sua marca atua nas redes sociais.</p>
            </div>
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Plataformas</label>
                <div className="grid grid-cols-2 gap-3">
                  <CheckboxOption label="Instagram" value="instagram" current={data.socialPlatforms} name="socialPlatforms" />
                  <CheckboxOption label="LinkedIn" value="linkedin" current={data.socialPlatforms} name="socialPlatforms" />
                  <CheckboxOption label="TikTok" value="tiktok" current={data.socialPlatforms} name="socialPlatforms" />
                  <CheckboxOption label="YouTube" value="youtube" current={data.socialPlatforms} name="socialPlatforms" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Frequência de postagem desejada</label>
                <input type="text" value={data.postFrequency} onChange={e => updateData({ postFrequency: e.target.value })} className="input-base" placeholder="Ex: 3x por semana, Diário..." />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">02</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 02 de 05</span>
              <h2 className="text-5xl font-black tracking-tight">Público</h2>
              <p className="text-muted text-sm">Com quem sua marca fala nas redes sociais?</p>
            </div>
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Descreva o público-alvo</label>
                <textarea 
                  value={data.targetAudience}
                  onChange={e => updateData({ targetAudience: e.target.value })}
                  className="textarea-base h-32" 
                  placeholder="Quem é o seguidor ideal? Quais são suas dores, desejos, objeções? Faixa etária, profissão, situação de vida..." 
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Gênero predominante do público</label>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption label="Feminino" value="feminino" current={data.gender} name="gender" />
                  <RadioOption label="Masculino" value="masculino" current={data.gender} name="gender" />
                  <RadioOption label="Predominantemente feminino" value="pred_feminino" current={data.gender} name="gender" />
                  <RadioOption label="Predominantemente masculino" value="pred_masculino" current={data.gender} name="gender" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Faixa etária do público</label>
                <div className="grid grid-cols-2 gap-3">
                  <CheckboxOption label="Menos de 18" value="<18" current={data.ageRange} name="ageRange" />
                  <CheckboxOption label="18-24" value="18-24" current={data.ageRange} name="ageRange" />
                  <CheckboxOption label="25-35" value="25-35" current={data.ageRange} name="ageRange" />
                  <CheckboxOption label="35-45" value="35-45" current={data.ageRange} name="ageRange" />
                  <CheckboxOption label="Mais de 45" value=">45" current={data.ageRange} name="ageRange" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Principais concorrentes ou referências</label>
                <input 
                  type="text" 
                  value={data.competitors}
                  onChange={e => updateData({ competitors: e.target.value })}
                  className="input-base" 
                  placeholder="Perfis que disputam a mesma audiência" 
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">03</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 03 de 05</span>
              <h2 className="text-5xl font-black tracking-tight">Comunicação</h2>
              <p className="text-muted text-sm">Como a marca fala com o público.</p>
            </div>
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Tom de voz</label>
                <input type="text" value={data.toneOfVoice} onChange={e => updateData({ toneOfVoice: e.target.value })} className="input-base" placeholder="Ex: Descontraído, Educativo, Autoritário..." />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Temas principais de conteúdo</label>
                <textarea value={data.contentThemes} onChange={e => updateData({ contentThemes: e.target.value })} className="textarea-base h-32" placeholder="Sobre o que vamos falar?" />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-12 relative z-0">
            <div className="section-number">04</div>
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 04 de 05</span>
              <h2 className="text-5xl font-black tracking-tight">Identidade</h2>
              <p className="text-muted text-sm">Visual das redes sociais.</p>
            </div>
            <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
              <div className="space-y-4">
                <label className="text-sm font-bold">Já possui identidade visual definida?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <RadioOption label="Sim, completa" value="sim" current={data.hasBrandIdentity} name="hasBrandIdentity" />
                  <RadioOption label="Não, preciso criar" value="nao" current={data.hasBrandIdentity} name="hasBrandIdentity" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold">Referências de perfis (Links)</label>
                <textarea value={data.referenceSites} onChange={e => updateData({ referenceSites: e.target.value })} className="textarea-base h-32" placeholder="Links de perfis que você gosta do visual" />
              </div>
            </div>
          </div>
        );
        case 6:
          return (
            <div className="space-y-12 relative z-0">
              <div className="section-number">05</div>
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Seção 05 de 05</span>
                <h2 className="text-5xl font-black tracking-tight">Finalização</h2>
                <p className="text-muted text-sm">Informações adicionais para Social Media.</p>
              </div>
              <div className="space-y-8 bg-white p-10 rounded-[2.5rem] card-shadow">
                <div className="space-y-4">
                  <label className="text-sm font-bold">Observações finais</label>
                  <textarea value={data.additionalInfo} onChange={e => updateData({ additionalInfo: e.target.value })} className="textarea-base h-48" placeholder="..." />
                </div>
              </div>
            </div>
          );
      }
    }

    return null;
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] card-shadow text-center space-y-8"
        >
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-accent/20">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-primary">Briefing Enviado!</h2>
            <p className="text-muted text-lg">Recebemos suas informações. Nossa equipe entrará em contato em breve para os próximos passos.</p>
          </div>
          <button onClick={() => window.location.reload()} className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all">
            Voltar ao Início
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header / Progress Bar */}
      {step > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-white">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${(step / getTotalSteps()) * 100}%` }}
          />
        </div>
      )}

      <main className="max-w-3xl mx-auto px-6 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      {step > 0 && (
        <footer className="fixed bottom-10 left-0 right-0 z-40">
          <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
            <button 
              onClick={prevStep}
              className="flex items-center gap-2 font-bold text-muted hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>

            {step < getTotalSteps() ? (
              <button 
                onClick={nextStep}
                disabled={step === 1 && !data.serviceType}
                className="btn-primary"
              >
                Próxima seção
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="btn-accent"
              >
                {loading ? (
                  <>
                    Enviando...
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    Enviar briefing
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BriefingForm />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
