"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "mr";

const translations = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.gapAnalysis": "Gap Analysis",
    "nav.forecasts": "Forecasts",
    "nav.methodology": "Methodology",
    "nav.lmisPlanner": "LMIS Planner",
    "dashboard.title": "Labour Market Intelligence",
    "dashboard.subtitle": "National / State Planner Overview",
    "metric.totalDemand": "Total Demand",
    "metric.totalCapacity": "Total Capacity",
    "metric.overallGap": "Overall Gap",
    "metric.highRiskTrades": "High Risk Trades",
    "dashboard.exportBtn": "Export JSON",
    "table.location": "Location",
    "table.sectorTrade": "Sector & Trade",
    "table.demand": "Demand",
    "table.capacity": "Capacity",
    "table.gap": "Gap",
    "table.earlyWarning": "Early Warning",
    "table.action": "Action",
    "table.analyze": "Analyze →",
  },
  hi: {
    "nav.dashboard": "डैशबोर्ड",
    "nav.gapAnalysis": "अंतराल विश्लेषण",
    "nav.forecasts": "पूर्वानुमान",
    "nav.methodology": "कार्यप्रणाली",
    "nav.lmisPlanner": "LMIS प्लानर",
    "dashboard.title": "श्रम बाजार बुद्धिमत्ता",
    "dashboard.subtitle": "राष्ट्रीय / राज्य प्लानर अवलोकन",
    "metric.totalDemand": "कुल मांग",
    "metric.totalCapacity": "कुल क्षमता",
    "metric.overallGap": "कुल अंतराल",
    "metric.highRiskTrades": "उच्च जोखिम वाले ट्रेड",
    "dashboard.exportBtn": "JSON निर्यात करें",
    "table.location": "स्थान",
    "table.sectorTrade": "क्षेत्र और ट्रेड",
    "table.demand": "मांग",
    "table.capacity": "क्षमता",
    "table.gap": "अंतराल",
    "table.earlyWarning": "प्रारंभिक चेतावनी",
    "table.action": "कार्रवाई",
    "table.analyze": "विश्लेषण करें →",
  },
  mr: {
    "nav.dashboard": "डॅशबोर्ड",
    "nav.gapAnalysis": "अंतर विश्लेषण",
    "nav.forecasts": "अंदाज",
    "nav.methodology": "कार्यप्रणाली",
    "nav.lmisPlanner": "LMIS प्लॅनर",
    "dashboard.title": "कामगार बाजार बुद्धिमत्ता",
    "dashboard.subtitle": "राष्ट्रीय / राज्य प्लॅनर विहंगावलोकन",
    "metric.totalDemand": "एकूण मागणी",
    "metric.totalCapacity": "एकूण क्षमता",
    "metric.overallGap": "एकूण अंतर",
    "metric.highRiskTrades": "उच्च जोखीम ट्रेड",
    "dashboard.exportBtn": "JSON निर्यात करा",
    "table.location": "स्थान",
    "table.sectorTrade": "क्षेत्र आणि ट्रेड",
    "table.demand": "मागणी",
    "table.capacity": "क्षमता",
    "table.gap": "अंतर",
    "table.earlyWarning": "प्रारंभिक चेतावणी",
    "table.action": "कृती",
    "table.analyze": "विश्लेषण करा →",
  }
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
