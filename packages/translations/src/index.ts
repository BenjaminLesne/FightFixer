import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const resources = {
  en,
  fr,
} as const;

export const defaultNS = "common";

void i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
export { useTranslation, Trans } from "react-i18next";
