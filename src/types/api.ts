export interface WikipediaResponse {
  query: {
    pages: {
      [key: string]: {
        extract: string;
        title: string;
      };
    };
  };
}

export interface CrossRefResponse {
  items: Array<{
    title: string;
    author: Array<{
      given: string;
      family: string;
    }>;
    published: string;
    DOI: string;
  }>;
}

export interface ArxivResponse {
  entries: Array<{
    title: string;
    summary: string;
    authors: string[];
    published: string;
    link: string;
  }>;
}

export interface SemanticScholarResponse {
  papers: Array<{
    title: string;
    abstract: string;
    authors: string[];
    year: number;
    citationCount: number;
  }>;
}

export interface OpenLibraryResponse {
  docs: Array<{
    title: string;
    author_name: string[];
    first_publish_year: number;
    key: string;
  }>;
}

export interface ResearchResult {
  source: string;
  title: string;
  summary: string;
  authors?: string[];
  year?: number;
  link?: string;
}