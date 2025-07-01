import axios from 'axios';
import { config, getApiUrl, getBackendUrl } from '../../config';

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  timestamp: string;
}

export interface SearchResponse {
  results: SearchResult[];
  query: string;
  totalResults: number;
  searchTime: string;
}

export interface JobSearchResult {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  salary?: string;
  posted_date: string;
}

export interface JobSearchResponse {
  jobs: JobSearchResult[];
  query: string;
  country: string;
  totalResults: number;
}



// Enhanced search service with backend integration
export class SearchService {
  private static mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Next.js - The React Framework for Production',
      url: 'https://nextjs.org',
      description: 'Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      title: 'Tailwind CSS - A utility-first CSS framework',
      url: 'https://tailwindcss.com',
      description: 'A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.',
      timestamp: '1 day ago'
    },
    {
      id: '3',
      title: 'React - A JavaScript library for building user interfaces',
      url: 'https://reactjs.org',
      description: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.',
      timestamp: '3 days ago'
    },
    {
      id: '4',
      title: 'TypeScript - JavaScript with syntax for types',
      url: 'https://www.typescriptlang.org',
      description: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
      timestamp: '1 week ago'
    },
    {
      id: '5',
      title: 'Vercel - Deploy frontend developers love',
      url: 'https://vercel.com',
      description: 'Vercel is a cloud platform for static sites and Serverless Functions that fits perfectly with your workflow. It enables developers to host websites and web services that deploy instantly.',
      timestamp: '2 weeks ago'
    }
  ];

  // Backend job search
  static async searchJobs(query: string, country?: string): Promise<JobSearchResponse> {
    try {
      const searchCountry = country || config.jobSearch.defaultCountry;
      const url = getBackendUrl('/jobs');
      
      const response = await axios.get<JobSearchResponse>(url, {
        params: {
          query,
          country: searchCountry
        },
        timeout: config.api.timeout
      });

      return response.data;
    } catch (error) {
      console.error('Backend job search error:', error);
      
      // Fallback to mock job data
      const mockJobs: JobSearchResult[] = [
        {
          id: '1',
          title: `${query} Developer`,
          company: 'TechCorp Inc.',
          location: `${country || 'US'}`,
          description: `Looking for an experienced ${query} developer to join our team. Great benefits and remote work opportunities.`,
          url: 'https://example.com/job/1',
          salary: '$80,000 - $120,000',
          posted_date: '2024-01-15'
        },
        {
          id: '2',
          title: `Senior ${query} Engineer`,
          company: 'InnovateSoft',
          location: `${country || 'US'}`,
          description: `Senior position for ${query} expert. Lead technical decisions and mentor junior developers.`,
          url: 'https://example.com/job/2',
          salary: '$100,000 - $150,000',
          posted_date: '2024-01-14'
        }
      ];

      return {
        jobs: mockJobs,
        query,
        country: country || config.jobSearch.defaultCountry,
        totalResults: mockJobs.length
      };
    }
  }



  // Health check for backend
  static async checkBackendHealth(): Promise<boolean> {
    try {
      const url = getBackendUrl('/health');
      const response = await axios.get<{ status: string; message: string }>(url, { timeout: 5000 });
      return response.data.status === 'healthy';
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }

  // Legacy mock search (fallback)
  static async search(query: string): Promise<SearchResponse> {
    // Check if backend is available and job search is enabled
    if (config.jobSearch.enabled) {
      try {
        const jobResults = await this.searchJobs(query);
        
        // Convert job results to search results format
        const searchResults: SearchResult[] = jobResults.jobs.map(job => ({
          id: job.id,
          title: job.title,
          url: job.url,
          description: `${job.company} - ${job.location}\n${job.description}${job.salary ? `\nSalary: ${job.salary}` : ''}`,
          timestamp: job.posted_date
        }));

        return {
          results: searchResults,
          query,
          totalResults: jobResults.totalResults,
          searchTime: '0.5s'
        };
      } catch (error) {
        console.error('Job search failed, falling back to mock results:', error);
      }
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter results based on query (case-insensitive)
    const filteredResults = this.mockResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase())
    );

    return {
      results: filteredResults,
      query,
      totalResults: filteredResults.length,
      searchTime: '0.5s'
    };
  }

  // Example method for Google Custom Search API integration
  static async searchWithGoogle(query: string, apiKey: string, searchEngineId: string): Promise<SearchResponse> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Google Search API request failed');
      }

      const data = await response.json();
      
      const results: SearchResult[] = (data.items || []).map((item: any, index: number) => ({
        id: index.toString(),
        title: item.title,
        url: item.link,
        description: item.snippet,
        timestamp: new Date().toLocaleDateString()
      }));

      return {
        results,
        query,
        totalResults: parseInt(data.searchInformation?.totalResults || '0'),
        searchTime: data.searchInformation?.searchTime || '0'
      };
    } catch (error) {
      console.error('Google Search API error:', error);
      // Fallback to mock results
      return this.search(query);
    }
  }

  // Example method for Bing Search API integration
  static async searchWithBing(query: string, apiKey: string): Promise<SearchResponse> {
    try {
      const response = await fetch(
        `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': apiKey
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Bing Search API request failed');
      }

      const data = await response.json();
      
      const results: SearchResult[] = (data.webPages?.value || []).map((item: any, index: number) => ({
        id: index.toString(),
        title: item.name,
        url: item.url,
        description: item.snippet,
        timestamp: new Date().toLocaleDateString()
      }));

      return {
        results,
        query,
        totalResults: data.webPages?.totalEstimatedMatches || 0,
        searchTime: '0.5s'
      };
    } catch (error) {
      console.error('Bing Search API error:', error);
      // Fallback to mock results
      return this.search(query);
    }
  }
} 