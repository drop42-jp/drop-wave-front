import { Theme } from '../types';

export const defaultTheme: Theme = {
  id: 'default',
  name: 'Modern Blue',
  description: 'Modern Blue theme with primary, secondary, and accent colors',
  colors: {
    primary: '#3B82F6',
    'primary-foreground': '#FFFFFF',
    secondary: '#1E40AF',
    'secondary-foreground': '#FFFFFF',
    accent: '#60A5FA',
    'accent-foreground': '#FFFFFF',
    background: '#F8FAFC',
    foreground: '#000000',
    card: '#FFFFFF',
    'card-foreground': '#000000',
    muted: '#D1D5DB',
    'muted-foreground': '#4B5563',
    border: '#E5E7EB',
    input: '#E5E7EB',
    ring: '#000000',
    destructive: '#EF4444',
    'destructive-foreground': '#FFFFFF',
    popover: '#FFFFFF',
    'popover-foreground': '#000000',
  },
};