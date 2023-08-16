import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Config from "../config/config";
import HttpBackend from "i18next-http-backend";

//localstorage language
const language = localStorage.getItem("i18nextLng");

i18n
  .use(LanguageDetector)
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `https://app12.srvptt.com/translation/{{lng}}.json`,
      addPath: `https://app12.srvptt.com/translation/{{lng}}`,
    },

    whitelist: ["en-US", "zh-CN", "zh-TW", "th-TH", "id-ID", "vi-VN", "hi-IN", "ta-IN"],
    fallbackLng: [language || Config.defaultLanguage],
    detection: {
      order: ["path"],
      lookupFromPathIndex: 1,
      checkWhitelist: true,
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ".",
    },
    react: {
      wait: true,
    },
    debug: false,
  });

export default i18n;
