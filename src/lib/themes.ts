import { Theme } from '../types';

// Default theme - currently the only active theme
// Other theme definitions kept for future theme generation features
export const defaultTheme: Theme = {
  id: 'default',
  name: 'Default',
  description: 'Clean and professional theme',
  colors: {
    primary: '#1c1c1e',
    'primary-foreground': '#f8fafc',
    secondary: '#f1f5f9',
    'secondary-foreground': '#1c1c1e',
    accent: '#f1f5f9',
    'accent-foreground': '#1c1c1e',
    background: '#ffffff',
    foreground: '#0c0a09',
    card: '#ffffff',
    'card-foreground': '#0c0a09',
    muted: '#f1f5f9',
    'muted-foreground': '#64748b',
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: '#0c0a09',
    destructive: '#ef4444',
    'destructive-foreground': '#f8fafc',
    popover: '#ffffff',
    'popover-foreground': '#0c0a09',
  },
}; 