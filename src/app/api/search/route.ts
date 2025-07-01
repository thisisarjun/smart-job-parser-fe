import { NextRequest, NextResponse } from 'next/server';
import { SearchService } from '@/lib/searchService';

export async function POST(request: NextRequest) {
  try {
    const { query, country } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Check if backend is healthy first
    const isBackendHealthy = await SearchService.checkBackendHealth();
    
    if (isBackendHealthy) {
      // Use backend job search
      const jobSearchResponse = await SearchService.searchJobs(query, country);
      
      // Convert to search response format for compatibility
      const searchResults = jobSearchResponse.jobs.map(job => ({
        id: job.id,
        title: job.title,
        url: job.url,
        description: `${job.company} - ${job.location}\n${job.description}${job.salary ? `\nSalary: ${job.salary}` : ''}`,
        timestamp: job.posted_date
      }));

      return NextResponse.json({
        results: searchResults,
        query,
        totalResults: jobSearchResponse.totalResults,
        searchTime: '0.5s',
        source: 'backend'
      });
    } else {
      // Fallback to legacy search
      const searchResponse = await SearchService.search(query);
      return NextResponse.json({
        ...searchResponse,
        source: 'fallback'
      });
    }

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET method for simple queries
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const country = searchParams.get('country');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    );
  }

  // Reuse the same logic as POST
  const requestBody = { query, country };
  const mockRequest = new NextRequest('', {
    method: 'POST',
    body: JSON.stringify(requestBody)
  });

  return POST(mockRequest);
} 