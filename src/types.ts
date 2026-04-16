export interface BriefingData {
  serviceType: 'sites_lp' | 'brand_identity' | 'social_media' | '';

  // --- Sites & Landing Pages (Existing) ---
  projectName: string;
  contactEmail: string;
  mainObjective: string;
  productDescription: string;
  projectType: string;
  deadline: string;
  siteUrl: string;

  // --- Identidade Visual (New) ---
  brandName: string;
  brandNameMeaning: string;
  whyPeopleNeedYou: string;
  brandDescription: string;
  brandAge: string;
  productsServices: string;
  missionVisionValues: string;
  socialClass: string;
  brandAgeRange: string;
  howClientsDescribe: string;
  howClientsFind: string;
  brandPersonPositive: string;
  brandPersonNegative: string;
  slogan: string;
  brandHistory: string;
  brandValues: string;
  logoType: string; // Tipográfico, Iconográfico, Combinado
  brandApplications: string[]; // Digital, Impresso, etc.

  // --- Social Media (New) ---
  socialPlatforms: string[];
  postFrequency: string;
  toneOfVoice: string;
  contentThemes: string;
  hasBrandIdentity: string;

  // --- Common / Shared ---
  targetAudience: string;
  gender: string;
  ageRange: string[];
  competitors: string;
  differential: string;
  copyStatus: string;
  testimonials: string;
  vslStatus: string;
  photosStatus: string;
  paymentPlatform: string;
  designVibe: string;
  brandAttributes: string[];
  designAvoid: string;
  referenceSites: string;
  preferredColors: string;
  avoidColors: string;
  typographyPreference: string;
  brandAssetsUrl: string;
  devPlatform: string;
  integrations: string[];
  technicalNotes: string;
  additionalInfo: string;
}

export const initialData: BriefingData = {
  serviceType: '',
  projectName: "",
  contactEmail: "contatojsaulo@gmail.com",
  mainObjective: "",
  productDescription: "",
  projectType: "",
  deadline: "",
  siteUrl: "",
  brandName: "",
  brandNameMeaning: "",
  whyPeopleNeedYou: "",
  brandDescription: "",
  brandAge: "",
  productsServices: "",
  missionVisionValues: "",
  socialClass: "",
  brandAgeRange: "",
  howClientsDescribe: "",
  howClientsFind: "",
  brandPersonPositive: "",
  brandPersonNegative: "",
  slogan: "",
  brandHistory: "",
  brandValues: "",
  logoType: "",
  brandApplications: [],
  socialPlatforms: [],
  postFrequency: "",
  toneOfVoice: "",
  contentThemes: "",
  hasBrandIdentity: "",
  targetAudience: "",
  gender: "",
  ageRange: [],
  competitors: "",
  differential: "",
  copyStatus: "",
  testimonials: "",
  vslStatus: "",
  photosStatus: "",
  paymentPlatform: "",
  designVibe: "",
  brandAttributes: [],
  designAvoid: "",
  referenceSites: "",
  preferredColors: "",
  avoidColors: "",
  typographyPreference: "",
  brandAssetsUrl: "",
  devPlatform: "",
  integrations: [],
  technicalNotes: "",
  additionalInfo: "",
};
