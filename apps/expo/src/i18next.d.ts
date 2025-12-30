import "i18next";

import type en from "@acme/translations/src/locales/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      translation: typeof en;
    };
  }
}
