export interface BriefingData {
  serviceType: string;
  websiteCategory: string;
  // Section 1: Projeto
  projectName: string;
  contactEmail: string;
  mainObjective: string;
  productDescription: string;
  launchType: string;
  deadline: string;
  siteUrl: string;

  // Section 2: Público & Mercado
  targetAudience: string;
  gender: string;
  ageRange: string[];
  competitors: string;
  differential: string;

  // Section 3: Conteúdo
  copyStatus: string;
  testimonials: string;
  hasVsl: string;
  hasPhotos: string;
  paymentPlatform: string;

  // Section 4: Design
  designStyle: string;
  brandAttributes: string[];
  designAvoid: string;
  referenceSites: string;
  preferredColors: string;
  avoidColors: string;
  brandAssetsUrl: string;

  // Section 5: Técnico
  devPlatform: string;
  requiredIntegrations: string[];
  technicalNotes: string;

  // Section 6: Finalização
  additionalInfo: string;
}

export const initialData: BriefingData = {
  serviceType: "",
  websiteCategory: "",
  projectName: "",
  contactEmail: "",
  mainObjective: "",
  productDescription: "",
  launchType: "",
  deadline: "",
  siteUrl: "",
  targetAudience: "",
  gender: "",
  ageRange: [],
  competitors: "",
  differential: "",
  copyStatus: "",
  testimonials: "",
  hasVsl: "",
  hasPhotos: "",
  paymentPlatform: "",
  designStyle: "",
  brandAttributes: [],
  designAvoid: "",
  referenceSites: "",
  preferredColors: "",
  avoidColors: "",
  brandAssetsUrl: "",
  devPlatform: "",
  requiredIntegrations: [],
  technicalNotes: "",
  additionalInfo: "",
};
