// Example configuration file for SearchEngine
// Copy this to config.ts and update with your values

export const config = {
  // Backend API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    prefix: process.env.NEXT_PUBLIC_API_PREFIX || '/api/v1',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  },

  // Job Search Configuration
  jobSearch: {
    enabled: process.env.NEXT_PUBLIC_JOB_SEARCH_ENABLED === 'true',
    defaultCountry: process.env.NEXT_PUBLIC_DEFAULT_COUNTRY || 'US',
  },



  // Search API Configuration (Legacy - for external search APIs)
  search: {
    // Google Custom Search API
    google: {
      apiKey: process.env.GOOGLE_SEARCH_API_KEY || '',
      searchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID || '',
      enabled: !!(process.env.GOOGLE_SEARCH_API_KEY && process.env.GOOGLE_SEARCH_ENGINE_ID),
    },
    
    // Bing Search API
    bing: {
      apiKey: process.env.BING_SEARCH_API_KEY || '',
      enabled: !!process.env.BING_SEARCH_API_KEY,
    },
    
    // DuckDuckGo API (No API key required)
    duckduckgo: {
      enabled: process.env.DUCKDUCKGO_ENABLED === 'true',
    },
    
    // Elasticsearch
    elasticsearch: {
      url: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
      index: process.env.ELASTICSEARCH_INDEX || 'search_index',
      enabled: !!process.env.ELASTICSEARCH_URL,
    },
    
    // Algolia
    algolia: {
      appId: process.env.ALGOLIA_APP_ID || '',
      searchKey: process.env.ALGOLIA_SEARCH_KEY || '',
      indexName: process.env.ALGOLIA_INDEX_NAME || 'search_index',
      enabled: !!(process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_SEARCH_KEY),
    },
    
    // Meilisearch
    meilisearch: {
      url: process.env.MEILISEARCH_URL || 'http://localhost:7700',
      index: process.env.MEILISEARCH_INDEX || 'search_index',
      enabled: !!process.env.MEILISEARCH_URL,
    },
  },
  
  // Application Configuration
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Smart Job Parser Frontend',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development',
  },
  
  // Rate Limiting
  rateLimit: {
    maxRequests: parseInt(process.env.SEARCH_RATE_LIMIT || '100'),
    windowMs: parseInt(process.env.SEARCH_RATE_LIMIT_WINDOW || '60000'),
  },
  
  // Default search provider (fallback order)
  defaultSearchProvider: 'backend', // 'backend', 'google', 'bing', 'duckduckgo', 'elasticsearch', 'algolia', 'meilisearch', 'mock'
};

// Helper function to get the active search provider
export function getActiveSearchProvider() {
  if (config.jobSearch.enabled) return 'backend';
  if (config.search.google.enabled) return 'google';
  if (config.search.bing.enabled) return 'bing';
  if (config.search.duckduckgo.enabled) return 'duckduckgo';
  if (config.search.elasticsearch.enabled) return 'elasticsearch';
  if (config.search.algolia.enabled) return 'algolia';
  if (config.search.meilisearch.enabled) return 'meilisearch';
  return 'mock';
}

// Helper function to check if any real search provider is configured
export function hasRealSearchProvider() {
  return getActiveSearchProvider() !== 'mock';
}

// Helper function to get full API URL
export function getApiUrl(endpoint: string) {
  const baseUrl = config.api.baseUrl.endsWith('/') 
    ? config.api.baseUrl.slice(0, -1) 
    : config.api.baseUrl;
  const prefix = config.api.prefix.startsWith('/') 
    ? config.api.prefix 
    : '/' + config.api.prefix;
  const cleanEndpoint = endpoint.startsWith('/') 
    ? endpoint 
    : '/' + endpoint;
  
  return `${baseUrl}${prefix}${cleanEndpoint}`;
}

// Helper function to get backend API URL (without prefix for some endpoints)
export function getBackendUrl(endpoint: string) {
  const baseUrl = config.api.baseUrl.endsWith('/') 
    ? config.api.baseUrl.slice(0, -1) 
    : config.api.baseUrl;
  const cleanEndpoint = endpoint.startsWith('/') 
    ? endpoint 
    : '/' + endpoint;
  
  return `${baseUrl}${cleanEndpoint}`;
} 