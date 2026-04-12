import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { BriefingData, initialData } from './types';

import { ChevronLeft, ChevronRight, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { sendBriefing } from './firebase';

// Step Components
import IntroStep from '@/components/steps/IntroStep';
import ServiceStep from '@/components/steps/ServiceStep';
import ProjectStep from '@/components/steps/ProjectStep';
import AudienceStep from '@/components/steps/AudienceStep';
import ContentStep from '@/components/steps/ContentStep';
import DesignStep from '@/components/steps/DesignStep';
import TechnicalStep from '@/components/steps/TechnicalStep';
import FinalStep from '@/components/steps/FinalStep';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BriefingData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const STEPS = [
    { id: 'intro', title: 'Introdução' },
    { id: 'service', title: 'Serviço' },
    { id: 'project', title: 'Projeto' },
    { id: 'audience', title: 'Público & Mercado' },
    { id: 'content', title: 'Conteúdo' },
    { id: 'design', title: 'Design' },
    ...(formData.serviceType !== 'social_media' && formData.serviceType !== 'identidade_visual' 
      ? [{ id: 'technical', title: 'Técnico' }] 
      : []),
    { id: 'final', title: 'Finalização' },
  ];

  useEffect(() => {
    if (currentStep >= STEPS.length) {
      setCurrentStep(STEPS.length - 1);
    }
  }, [STEPS.length, currentStep]);

  const updateFormData = (data: Partial<BriefingData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSend = async () => {
    setIsSubmitting(true);
    try {
      await sendBriefing(formData);
      setIsSuccess(true);
    } catch (error) {
      alert('Erro ao enviar o briefing. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    if (isSuccess) return true;
    const stepId = STEPS[currentStep].id;
    switch (stepId) {
      case 'intro':
        return true;
      case 'service':
        return formData.serviceType !== "";
      case 'project':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isSite = formData.serviceType === 'landing_page_lancamento';
        return (
          formData.projectName.trim() !== "" &&
          emailRegex.test(formData.contactEmail) &&
          (!isSite || (
            formData.websiteCategory !== "" && 
            formData.websiteCategory !== "Outro" && 
            formData.websiteCategory !== "Outro: " &&
            formData.mainObjective !== ""
          ))
        );
      case 'audience':
        return true;
      case 'content':
        if (formData.serviceType === 'social_media' || formData.serviceType === 'identidade_visual') return true;
        return formData.copyStatus !== "" && formData.paymentPlatform !== "";
      case 'design':
        return formData.designStyle.trim() !== "" && formData.referenceSites.trim() !== "";
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const progress = (currentStep / (STEPS.length - 1)) * 100;

  const renderStep = () => {
    const stepId = STEPS[currentStep].id;
    switch (stepId) {
      case 'intro':
        return <IntroStep onNext={nextStep} />;
      case 'service':
        return <ServiceStep data={formData} updateData={updateFormData} />;
      case 'project':
        return <ProjectStep data={formData} updateData={updateFormData} />;
      case 'audience':
        return <AudienceStep data={formData} updateData={updateFormData} />;
      case 'content':
        return <ContentStep data={formData} updateData={updateFormData} />;
      case 'design':
        return <DesignStep data={formData} updateData={updateFormData} />;
      case 'technical':
        return <TechnicalStep data={formData} updateData={updateFormData} />;
      case 'final':
        return <FinalStep data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Header / Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-3xl font-black tracking-tighter text-primary lowercase leading-none">
              zenith
            </h1>
          </div>
          {currentStep > 0 && (
            <div className="hidden sm:block w-48">
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border/50">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          {currentStep > 0 ? (
            <Button
              variant="ghost"
              onClick={prevStep}
              className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
          ) : (
            <div />
          )}

          {currentStep === 0 ? (
            <Button
              onClick={nextStep}
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Começar Briefing
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          ) : isSuccess ? (
            <Button
              disabled
              className="bg-green-500 text-white px-8 h-12 rounded-2xl shadow-xl shadow-green-500/20"
            >
              Enviado com Sucesso!
              <CheckCircle2 className="ml-2 w-4 h-4" />
            </Button>
          ) : currentStep === STEPS.length - 1 ? (
            <div className="flex flex-col items-end gap-2">
              {!isStepValid() && (
                <span className="text-[10px] font-bold text-destructive uppercase tracking-wider animate-pulse">
                  Preencha os campos obrigatórios *
                </span>
              )}
              <Button
                onClick={handleSend}
                disabled={!isStepValid() || isSubmitting}
                className="bg-secondary hover:bg-secondary/90 text-white px-8 h-12 rounded-2xl shadow-xl shadow-secondary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    Enviando...
                    <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Enviar Briefing
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-end gap-2">
              {!isStepValid() && (
                <span className="text-[10px] font-bold text-destructive uppercase tracking-wider animate-pulse">
                  Preencha os campos obrigatórios *
                </span>
              )}
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Próxima seção
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
