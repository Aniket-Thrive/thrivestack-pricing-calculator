
export interface ProductConfig {
  id: string;
  name: string;
  tag?: string;
  description: string;
  features: string[];
  pricingType: 'mtu' | 'seat' | 'arr' | 'free' | 'abuse';
  dependencies?: string[];
  autoAdd?: boolean;
}
