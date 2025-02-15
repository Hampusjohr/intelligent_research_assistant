import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ResearchCard } from './components/ResearchCard';
import { Brain } from 'lucide-react';
import type { ResearchResult } from './types/api';
import {
  searchWikipedia,
  searchCrossRef,
  searchArxiv,
  searchSemanticScholar,
  searchOpenLibrary,
} from './services/api';

function App() {
  const [results, setResults] = useState<ResearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [wikipedia, crossref, arxiv, semanticScholar, openLibrary] = await Promise.all([
        searchWikipedia(query),
        searchCrossRef(query),
        searchArxiv(query),
        searchSemanticScholar(query),
        searchOpenLibrary(query),
      ]);

      const allResults = [...wikipedia, ...crossref, ...arxiv, ...semanticScholar, ...openLibrary];
      setResults(allResults);
    } catch (err) {
      setError('An error occurred while fetching research data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="text-blue-600 w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Intelligent Research Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search across multiple academic sources to find relevant research papers,
            articles, and publications.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching across multiple sources...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <ResearchCard key={index} result={result} />
            ))}
          </div>
        )}

        {!isLoading && results.length === 0 && (
          <div className="text-center text-gray-600">
            <p>Enter a topic above to start your research journey.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;