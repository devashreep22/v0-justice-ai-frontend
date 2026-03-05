'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'es' | 'fr' | 'hi' | 'de'
type Theme = 'light' | 'dark'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    'home': 'Home',
    'fileCase': 'File Case',
    'aiAnalysis': 'AI Analysis',
    'trackCases': 'Track Cases',
    'login': 'Login',
    'logout': 'Logout',
    'welcome': 'Welcome to JusticeAI',
    'description': 'AI-powered legal assistance for filing cases, understanding laws, and accessing government support.',
    'fileComplaint': 'File Complaint',
    'adminPortal': 'Admin Portal',
  },
  es: {
    'home': 'Inicio',
    'fileCase': 'Presentar Caso',
    'aiAnalysis': 'Análisis de IA',
    'trackCases': 'Rastrear Casos',
    'login': 'Iniciar sesión',
    'logout': 'Cerrar sesión',
    'welcome': 'Bienvenido a JusticeAI',
    'description': 'Asistencia legal impulsada por IA para presentar casos, comprender leyes y acceder a apoyo gubernamental.',
    'fileComplaint': 'Presentar Denuncia',
    'adminPortal': 'Portal de Administrador',
  },
  fr: {
    'home': 'Accueil',
    'fileCase': 'Déposer une Plainte',
    'aiAnalysis': 'Analyse IA',
    'trackCases': 'Suivi des Cas',
    'login': 'Connexion',
    'logout': 'Déconnexion',
    'welcome': 'Bienvenue sur JusticeAI',
    'description': 'Assistance juridique alimentée par l\'IA pour déposer des plaintes, comprendre les lois et accéder au soutien gouvernemental.',
    'fileComplaint': 'Déposer Plainte',
    'adminPortal': 'Portail Administrateur',
  },
  hi: {
    'home': 'होम',
    'fileCase': 'मामला दर्ज करें',
    'aiAnalysis': 'AI विश्लेषण',
    'trackCases': 'मामलों को ट्रैक करें',
    'login': 'लॉगिन',
    'logout': 'लॉगआउट',
    'welcome': 'JusticeAI में आपका स्वागत है',
    'description': 'मामलों को दर्ज करने, कानूनों को समझने और सरकारी समर्थन प्राप्त करने के लिए AI-संचालित कानूनी सहायता।',
    'fileComplaint': 'शिकायत दर्ज करें',
    'adminPortal': 'प्रशासक पोर्टल',
  },
  de: {
    'home': 'Startseite',
    'fileCase': 'Fall einreichen',
    'aiAnalysis': 'KI-Analyse',
    'trackCases': 'Fälle verfolgen',
    'login': 'Anmelden',
    'logout': 'Abmelden',
    'welcome': 'Willkommen bei JusticeAI',
    'description': 'KI-gestützte Rechtsberatung zum Einreichen von Fällen, zum Verstehen von Gesetzen und zum Zugriff auf staatliche Unterstützung.',
    'fileComplaint': 'Beschwerde einreichen',
    'adminPortal': 'Admin-Portal',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
