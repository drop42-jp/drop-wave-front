
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
