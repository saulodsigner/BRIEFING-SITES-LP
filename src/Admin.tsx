import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase'; 
import { BriefingData } from './types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2, ChevronLeft, Calendar, User, Briefcase, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BriefingDoc extends BriefingData {
  id: string;
  createdAt: any;
}

const FIELD_LABELS: Record<string, string> = {
  projectName: "Nome do Projeto/LP",
  contactEmail: "E-mail de Contato",
  mainObjective: "Objetivo Principal",
  productDescription: "Descrição do Produto/Serviço",
  projectType: "Tipo de Projeto",
  deadline: "Prazo de Entrega",
  siteUrl: "URL do Site",
  brandName: "Nome da Marca",
  brandNameMeaning: "Significado do Nome",
  whyPeopleNeedYou: "Por que as pessoas precisam de você?",
  brandDescription: "Descrição da Marca",
  brandAge: "Tempo de Mercado",
  productsServices: "Produtos/Serviços",
  missionVisionValues: "Missão, Visão e Valores",
  socialClass: "Classe Social",
  brandAgeRange: "Faixa Etária da Marca",
  howClientsDescribe: "Como os clientes descrevem?",
  howClientsFind: "Como os clientes encontram?",
  brandPersonPositive: "Características Positivas",
  brandPersonNegative: "Características Negativas",
  slogan: "Slogan",
  brandHistory: "História da Marca",
  brandValues: "Valores da Marca",
  logoType: "Tipo de Logo",
  brandApplications: "Aplicações da Marca",
  socialPlatforms: "Redes Sociais",
  postFrequency: "Frequência de Posts",
  toneOfVoice: "Tom de Voz",
  contentThemes: "Temas de Conteúdo",
  hasBrandIdentity: "Possui Identidade Visual",
  targetAudience: "Público-Alvo",
  gender: "Gênero",
  ageRange: "Faixa Etária",
  competitors: "Concorrentes",
  differential: "Diferencial",
  copyStatus: "Status da Copy",
  testimonials: "Depoimentos",
  vslStatus: "Status do VSL",
  photosStatus: "Status das Fotos",
  paymentPlatform: "Plataforma de Pagamento",
  designVibe: "Vibe do Design",
  brandAttributes: "Atributos da Marca",
  designAvoid: "O que evitar no design",
  referenceSites: "Sites de Referência",
  preferredColors: "Cores Preferidas",
  avoidColors: "Cores a Evitar",
  typographyPreference: "Preferência de Tipografia",
  brandAssetsUrl: "URL dos Arquivos (Drive, etc)",
  devPlatform: "Plataforma de Desenvolvimento",
  integrations: "Integrações",
  technicalNotes: "Anotações Técnicas",
  additionalInfo: "Informações Adicionais",
};

export default function Admin() {
  const [briefings, setBriefings] = useState<BriefingDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingDoc | null>(null);

  useEffect(() => {
    const fetchBriefings = async () => {
      try {
        const q = query(collection(db, 'briefings'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BriefingDoc[];
        
        // Sort descending by createdAt manually, putting documents without createdAt at the bottom
        data.sort((a, b) => {
          const timeA = a.createdAt?.toMillis?.() || a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt?.toMillis?.() || b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });

        setBriefings(data);
      } catch (error) {
        console.error("Error fetching briefings: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBriefings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'sites_lp': return 'Sites & Landing Pages';
      case 'brand_identity': return 'Identidade Visual';
      case 'social_media': return 'Social Media';
      default: return type || 'Não especificado';
    }
  };

  const parseDate = (createdAt: any) => {
    if (!createdAt) return 'Data desconhecida';
    try {
      const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
      return format(date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
    } catch (e) {
      return 'Data inválida';
    }
  };

  const parseDateShort = (createdAt: any) => {
    if (!createdAt) return 'Data desc.';
    try {
      const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
      return format(date, "dd MMM yyyy", { locale: ptBR });
    } catch (e) {
      return 'Inválida';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Painel de Briefings</h1>
            <p className="text-muted mt-1">Gerencie as respostas dos seus clientes.</p>
          </div>
          <Link to="/" className="btn-secondary text-sm px-4 py-2">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar ao Formulário
          </Link>
        </div>

        {selectedBriefing ? (
          <div className="bg-white rounded-[2rem] card-shadow p-8">
            <button 
              onClick={() => setSelectedBriefing(null)}
              className="flex items-center text-sm font-medium text-muted hover:text-foreground mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar para a lista
            </button>

            <div className="space-y-8">
              <div className="border-b border-border pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                    {getServiceLabel(selectedBriefing.serviceType)}
                  </span>
                  <span className="text-sm text-muted flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {parseDate(selectedBriefing.createdAt)}
                  </span>
                </div>
                <h2 className="text-3xl font-black">{selectedBriefing.projectName || selectedBriefing.brandName || 'Projeto sem nome'}</h2>
                <div className="flex items-center gap-2 mt-4 text-muted">
                  <User className="w-4 h-4" />
                  <span>{selectedBriefing.contactEmail}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(selectedBriefing).map(([key, value]) => {
                  if (['id', 'createdAt', 'serviceType', 'projectName', 'brandName', 'contactEmail'].includes(key)) return null;
                  if (!value || (Array.isArray(value) && value.length === 0)) return null;

                  return (
                    <div key={key} className="space-y-2">
                      <span className="text-xs font-bold text-muted uppercase tracking-wider block">
                        {FIELD_LABELS[key] || key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="bg-background p-4 rounded-xl text-sm">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {briefings.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-[2rem] card-shadow">
                <Briefcase className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold">Nenhum briefing recebido</h3>
                <p className="text-muted">As respostas aparecerão aqui quando os primeiros formulários forem enviados. Verifique também no Console do Firebase se há envio.</p>
              </div>
            ) : (
              briefings.map((briefing) => (
                <div 
                  key={briefing.id} 
                  onClick={() => setSelectedBriefing(briefing)}
                  className="bg-white p-6 rounded-[2rem] card-shadow cursor-pointer hover:scale-[1.02] transition-transform flex flex-col justify-between"
                  style={{ minHeight: '160px' }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {getServiceLabel(briefing.serviceType)}
                      </span>
                    </div>
                    <h3 className="font-black text-xl mb-1 truncate">
                      {briefing.projectName || briefing.brandName || 'Projeto sem nome'}
                    </h3>
                    <p className="text-sm text-muted mb-4 truncate">{briefing.contactEmail || 'Sem email'}</p>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted font-medium mt-auto">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {parseDateShort(briefing.createdAt)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
