import { Globe, Clock } from 'lucide-react';

interface SearchResultProps {
  id: string;
  title: string;
  url: string;
  description: string;
  timestamp: string;
}

export default function SearchResult({ 
  title, 
  url, 
  description, 
  timestamp 
}: SearchResultProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Globe className="h-4 w-4 text-blue-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {title}
            </a>
          </h3>
          <p className="text-sm text-green-600 mt-1 break-all">{url}</p>
          <p className="text-gray-700 mt-2 leading-relaxed">{description}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
} 