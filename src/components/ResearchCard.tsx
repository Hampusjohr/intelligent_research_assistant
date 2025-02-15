import React from 'react';
import { ExternalLink, BookOpen, FileText, Database, Book, Globe } from 'lucide-react';
import type { ResearchResult } from '../types/api';

const sourceIcons = {
  'Wikipedia': Globe,
  'CrossRef': Database,
  'arXiv': FileText,
  'Semantic Scholar': BookOpen,
  'Open Library': Book,
};

export function ResearchCard({ result }: { result: ResearchResult }) {
  const Icon = sourceIcons[result.source as keyof typeof sourceIcons] || FileText;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Icon className="text-blue-600" size={24} />
          <span className="text-sm font-medium text-blue-600">{result.source}</span>
        </div>
        {result.link && (
          <a
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-gray-900">{result.title}</h3>
      
      {result.authors && result.authors.length > 0 && (
        <p className="mt-2 text-sm text-gray-600">
          By {result.authors.join(', ')}
        </p>
      )}
      
      {result.year && (
        <p className="mt-1 text-sm text-gray-500">
          Published in {result.year}
        </p>
      )}
      
      <p className="mt-3 text-gray-700 line-clamp-3">
        {result.summary}
      </p>
    </div>
  );
}