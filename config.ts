// Configuration file for Smart Job Parser Frontend
// This file imports from config.example.ts and can be customized

export * from './config.example';

// Override any specific configurations for local development if needed
export const localConfig = {
  // Local development overrides
  api: {
    baseUrl: 'http://localhost:8000',
    prefix: '/api/v1',
    timeout: 10000,
  },
  
  jobSearch: {
    enabled: true,
    defaultCountry: 'US',
  },
  

  
  app: {
    name: 'Smart Job Parser Frontend',
    url: 'http://localhost:3000',
    environment: 'development',
  },
}; 