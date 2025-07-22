
export interface Drop {
  id: string;
  title: string;
  image: string;
  status: 'coming-soon' | 'live' | 'ended';
  startDate?: Date;
  endDate?: Date;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes?: string[];
  isNew?: boolean;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    'primary-foreground': string;
    secondary: string;
    'secondary-foreground': string;
    accent: string;
    'accent-foreground': string;
    background: string;
    foreground: string;
    card: string;
    'card-foreground': string;
    muted: string;
    'muted-foreground': string;
    border: string;
    input: string;
    ring: string;
    destructive: string;
    'destructive-foreground': string;
    popover: string;
    'popover-foreground': string;
  };
}

// ThemeContextType removed - using simplified theme system
// Theme interface kept for future theme generation features
