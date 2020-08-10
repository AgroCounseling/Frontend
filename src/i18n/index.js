import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import kg from "./locales/kg";
import ru from "./locales/ru";
import { initReactI18next } from "react-i18next";

const options = {
  resources: {
    ru: {
      common: ru,
    },
    kg: {
      common: kg,
    },
  },

  fallbackLng: "kg",

  ns: ["common"],

  defaultNS: "common",

  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default",
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init(options);

export default i18n;
