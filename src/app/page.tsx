'use client';

import { useState } from 'react';
import { Search, Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface JobResult {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  job_employment_type: string;
  job_city: string;
  job_country: string;
  job_posted_at_datetime_utc?: string;
  job_description: string;
  job_apply_link: string;
  job_salary?: string;
}

export default function Home() {
  // Job search state
  const [jobQuery, setJobQuery] = useState('');
  const [country] = useState('US');
  const [jobResults, setJobResults] = useState<JobResult[]>([]);
  const [isJobLoading, setIsJobLoading] = useState(false);
  const [hasJobSearched, setHasJobSearched] = useState(false);

  const handleJobSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobQuery.trim()) return;

    setIsJobLoading(true);
    setHasJobSearched(true);

    try {
      const response = await fetch(`/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: jobQuery.trim(),
          country: country
        })
      });

      const data = await response.json();
      setJobResults(data.results || []);
    } catch (error) {
      console.error('Job search error:', error);
      setJobResults([]);
    } finally {
      setIsJobLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Header */}
      <header className="bg-black shadow-2xl border-b border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Oracul</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Find Your Dream Job
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Search for relevant job opportunities across different countries
          </p>

          {/* Job Search Form */}
          <form onSubmit={handleJobSearch} className="max-w-2xl mx-auto space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                placeholder="Enter job title, skills, or keywords..."
                className="block w-full pl-12 pr-12 py-5 text-lg border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:border-white shadow-2xl bg-gray-900/80 backdrop-blur-sm text-white placeholder-gray-400 transition-all duration-300"
              />
              <button
                type="submit"
                disabled={isJobLoading}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <ArrowRight className="h-5 w-5 text-white hover:text-gray-300 transition-colors" />
              </button>
            </div>
            
          </form>
        </div>

        {/* Job Loading State */}
        {isJobLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-2 text-gray-300">Searching for jobs...</p>
          </div>
        )}

        {/* Job Results */}
        {hasJobSearched && !isJobLoading && (
          <div className="space-y-6">
            {jobResults.length > 0 ? (
              <>
                <div className="text-sm text-gray-400">
                  Found {jobResults.length} jobs for &quot;{jobQuery}&quot; in {country}
                </div>
                {jobResults.map((job) => (
                  <div
                    key={job.job_id}
                    className="bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 p-6 hover:shadow-white/10 hover:border-gray-600 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="flex items-start space-x-4">
                      {job.employer_logo && (
                        <Image
                          src={job.employer_logo}
                          alt={job.employer_name}
                          className="w-16 h-16 rounded-lg object-cover bg-slate-700"
                        />
                      )}
                                              <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {job.job_title}
                          </h3>
                          <p className="text-lg text-gray-300 mb-2">{job.employer_name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.job_city}, {job.job_country}
                            </span>
                            <span className="bg-gray-800 px-2 py-1 rounded">
                              {job.job_employment_type}
                            </span>
                            {job.job_salary && (
                              <span className="text-white font-medium">{job.job_salary}</span>
                            )}
                          </div>
                          <p className="text-gray-300 mb-4 line-clamp-3">
                            {job.job_description.substring(0, 200)}...
                          </p>
                                                  <div className="flex items-center justify-between">
                            {job.job_posted_at_datetime_utc && (
                              <div className="flex items-center text-sm text-gray-400">
                                <Clock className="h-4 w-4 mr-1" />
                                {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}
                              </div>
                            )}
                            <a
                              href={job.job_apply_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                            >
                              Apply Now
                            </a>
                          </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or selecting a different country.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial Job State */}
        {!hasJobSearched && !isJobLoading && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Ready to find your next opportunity?
            </h3>
            <p className="text-gray-400">
              Enter your job search criteria above to discover relevant positions.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
