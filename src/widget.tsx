
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PricingCalculator } from './components/PricingCalculator';
import './index.css';

// Global widget interface
interface ThriveStackCalculatorConfig {
  container: string | HTMLElement;
  theme?: 'blue' | 'default';
  ctaUrl?: string;
}

class ThriveStackCalculatorWidget {
  private instances: Map<HTMLElement, any> = new Map();

  init(config: ThriveStackCalculatorConfig) {
    const container = typeof config.container === 'string' 
      ? document.querySelector(config.container) as HTMLElement
      : config.container;

    if (!container) {
      console.error('ThriveStack Calculator: Container not found');
      return;
    }

    // Prevent multiple instances on the same container
    if (this.instances.has(container)) {
      console.warn('ThriveStack Calculator: Instance already exists on this container');
      return;
    }

    // Create wrapper div with scoped styles
    const wrapper = document.createElement('div');
    wrapper.className = 'thrivestack-calculator-widget';
    wrapper.style.cssText = `
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-sizing: border-box;
      * { box-sizing: border-box; }
    `;
    
    container.appendChild(wrapper);

    // Create React root and render
    const root = createRoot(wrapper);
    root.render(React.createElement(PricingCalculator));
    
    this.instances.set(container, { root, wrapper });
  }

  destroy(container: string | HTMLElement) {
    const element = typeof container === 'string' 
      ? document.querySelector(container) as HTMLElement
      : container;

    if (!element) return;

    const instance = this.instances.get(element);
    if (instance) {
      instance.root.unmount();
      if (instance.wrapper.parentNode) {
        instance.wrapper.parentNode.removeChild(instance.wrapper);
      }
      this.instances.delete(element);
    }
  }
}

// Create global instance
const calculator = new ThriveStackCalculatorWidget();

// Export for UMD build
if (typeof window !== 'undefined') {
  (window as any).ThriveStackCalculator = calculator;
}

export default calculator;
