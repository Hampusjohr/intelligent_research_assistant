import axios from 'axios';
import dotenv from 'dotenv';
import type { WikipediaResponse, CrossRefResponse, ArxivResponse, SemanticScholarResponse, OpenLibraryResponse, ResearchResult } from '../types/api';

// Load environment variables from .env file
dotenv.config();

// Access the Semantic Scholar API key from environment variables
const SEMANTIC_SCHOLAR_API_KEY = process.env.SEMANTIC_SCHOLAR_API_KEY;

export async function searchWikipedia(query: string): Promise<ResearchResult[]> {
  try {
    const response = await axios.get<WikipediaResponse>(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(query)}&origin=*`
    );
    
    return Object.values(response.data.query.pages).map(page => ({
      source: 'Wikipedia',
      title: page.title,
      summary: page.extract,
    }));
  } catch (error) {
    console.error('Error fetching data from Wikipedia:', error);
    return [];
  }
}

export async function searchCrossRef(query: string): Promise<ResearchResult[]> {
  try {
    const response = await axios.get<CrossRefResponse>(
      `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=5`
    );
    
    return response.data.items.map(item => ({
      source: 'CrossRef',
      title: item.title[0],
      summary: `Published work by ${item.author.map(a => `${a.given} ${a.family}`).join(', ')}`,
      authors: item.author.map(a => `${a.given} ${a.family}`),
      link: `https://doi.org/${item.DOI}`,
    }));
  } catch (error) {
    console.error('Error fetching data from CrossRef:', error);
    return [];
  }
}

export async function searchArxiv(query: string): Promise<ResearchResult[]> {
  try {
    const response = await axios.get<ArxivResponse>(
      `http://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}&max_results=5`
    );
    
    return response.data.entries.map(entry => ({
      source: 'arXiv',
      title: entry.title,
      summary: entry.summary,
      authors: entry.authors,
      link: entry.link,
    }));
  } catch (error) {
    console.error('Error fetching data from arXiv:', error);
    return [];
  }
}

export async function searchSemanticScholar(query: string): Promise<ResearchResult[]> {
  try {
    const response = await axios.get<SemanticScholarResponse>(
      `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=5`,
      {
        headers: SEMANTIC_SCHOLAR_API_KEY ? { 'x-api-key': SEMANTIC_SCHOLAR_API_KEY } : {},
      }
    );
    
    return response.data.papers.map(paper => ({
      source: 'Semantic Scholar',
      title: paper.title,
      summary: paper.abstract,
      authors: paper.authors,
      year: paper.year,
    }));
  } catch (error) {
    console.error('Error fetching data from Semantic Scholar:', error);
    return [];
  }
}

export async function searchOpenLibrary(query: string): Promise<ResearchResult[]> {
  try {
    const response = await axios.get<OpenLibraryResponse>(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`
    );
    
    return response.data.docs.map(doc => ({
      source: 'Open Library',
      title: doc.title,
      summary: `Published in ${doc.first_publish_year}`,
      authors: doc.author_name,
      year: doc.first_publish_year,
      link: `https://openlibrary.org${doc.key}`,
    }));
  } catch (error) {
    console.error('Error fetching data from Open Library:', error);
    return [];
  }
}