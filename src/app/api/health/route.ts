import { NextResponse } from 'next/server';
import { SearchService } from '@/lib/searchService';
import { config } from '../../../../config';

export async function GET() {
  try {
    // Check backend health
    const backendHealthy = await SearchService.checkBackendHealth();
    
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      frontend: {
        status: 'healthy',
        version: '1.0.0',
        environment: config.app.environment
      },
      backend: {
        status: backendHealthy ? 'healthy' : 'unhealthy',
        url: config.api.baseUrl,
        jobSearchEnabled: config.jobSearch.enabled
      },
      services: {
        jobSearch: config.jobSearch.enabled && backendHealthy,
        fallbackSearch: true
      }
    };

    return NextResponse.json(healthStatus);
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        frontend: {
          status: 'healthy',
          version: '1.0.0'
        },
        backend: {
          status: 'unknown'
        }
      },
      { status: 500 }
    );
  }
} 