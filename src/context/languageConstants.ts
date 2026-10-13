
export type LanguageCode = "en" | "ar" | "es" | "de";

export type Language = {
  code: LanguageCode;
  name: string;
  dir: "ltr" | "rtl";
  flag?: string;
};

export const AVAILABLE_LANGUAGES: Language[] = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
  { code: "es", name: "Español", dir: "ltr" },
  { code: "de", name: "Deutsch", dir: "ltr" },
];
