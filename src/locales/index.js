import React from "react";
import en from "./languages/en.json";
import vn from "./languages/vn.json";
import LOCAL_STORAGE from "../config/localStorage";

const locales = { en, vn };

const languages = [
  {
    key: "en",
    icon: <span className="flag-icon flag-icon-us" />,
    text: "English (US)",
  },
  {
    key: "vn",
    icon: <span className="flag-icon flag-icon-vn" />,
    text: "Tiếng Việt",
  },
];

class Locale {
  constructor(language) {
    this.strings = locales[language];
    this.currentLanguageKey = languages.find((item) => item.key === language);
    this.subscribers = [];
    this.languages = languages;
    this.trans = this.trans.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  setLanguage(language) {
    this.currentLanguageKey = languages.find((item) => item.key === language);
    localStorage.setItem(LOCAL_STORAGE.language, language);
    this.strings = locales[language];
    this.subscribers.forEach((subscriber) => subscriber.callback());
  }

  getLanguages() {
    return this.languages;
  }

  getCurrentLanguage() {
    return this.currentLanguageKey;
  }

  subscribe({ key, callback }) {
    this.subscribers.push({ key, callback });
  }

  unsubscribe(key) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber.key !== key
    );
  }

  trans(key) {
    const str = this.strings[key];
    return str === undefined ? '' : str;
  }
}

export default Locale;
