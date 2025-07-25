import { Theme } from '../types';

// Default theme - currently the only active theme
// Other theme definitions kept for future theme generation features
export const defaultTheme: Theme = {
  id: 'default',
  name: 'Default',
  description: 'Clean and professional theme',
  colors: {
    primary: '222.2 47.4% 11.2%',
    'primary-foreground': '210 40% 98%',
    secondary: '210 40% 96.1%',
    'secondary-foreground': '222.2 47.4% 11.2%',
    accent: '210 40% 96.1%',
    'accent-foreground': '222.2 47.4% 11.2%',
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    card: '0 0% 100%',
    'card-foreground': '222.2 84% 4.9%',
    muted: '210 40% 96.1%',
    'muted-foreground': '215.4 16.3% 46.9%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '222.2 84% 4.9%',
    destructive: '0 84.2% 60.2%',
    'destructive-foreground': '210 40% 98%',
    popover: '0 0% 100%',
    'popover-foreground': '222.2 84% 4.9%',
  },
}; 