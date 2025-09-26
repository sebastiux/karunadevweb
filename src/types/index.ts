// Make sure to use 'export' keyword properly
export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ServicesProps {
  services: Service[];
}

// Also export as type for better TypeScript support
export type { Service as ServiceType };