import { useMemo } from 'react';
import type { DocContent } from '../core';

export interface SearchResult {
  blockId: string;
  sectionId: string;
  title: string;
  snippet: string;
  score: number;
}

interface SearchIndexItem {
  blockId: string;
  sectionId: string;
  title: string;
  text: string;
}

/**
 * Headless hook indexing document content for in-memory client search.
 */
export function useDocSearch(content?: DocContent) {
  const index = useMemo(() => {
    if (!content || !content.sections) return [];

    const items: SearchIndexItem[] = [];

    // Index metadata
    if (content.metadata) {
      for (const [key, val] of Object.entries(content.metadata)) {
        if (typeof val === 'string' || Array.isArray(val)) {
          items.push({
            blockId: 'meta',
            sectionId: 'meta',
            title: `Metadata: ${key}`,
            text: Array.isArray(val) ? val.join(' ') : String(val),
          });
        }
      }
    }

    // Index sections & blocks
    for (const section of content.sections) {
      for (const block of section.blocks || []) {
        let blockText = '';
        let blockTitle = block.type.toUpperCase();

        if (block.type === 'text') {
          blockText = String((block.data as { text?: string })?.text || '');
        } else if (block.type === 'markdown') {
          blockText = String((block.data as { content?: string })?.content || '');
        } else if (block.type === 'code_sample') {
          const data = block.data as { title?: string; code?: string; language?: string };
          blockTitle = data.title || data.language || 'Code Sample';
          blockText = `${data.code || ''} ${data.language || ''}`;
        } else if (block.type === 'api_endpoint') {
          const data = block.data as { method?: string; path?: string; description?: string };
          blockTitle = `${data.method || 'GET'} ${data.path || ''}`;
          blockText = `${data.description || ''} ${data.path || ''}`;
        } else if (block.type === 'callout') {
          const data = block.data as { title?: string; message?: string };
          blockTitle = data.title || 'Callout';
          blockText = data.message || '';
        } else if (block.type === 'stepper') {
          const data = block.data as { steps?: Array<{ title?: string; content?: string }> };
          blockText = (data.steps || []).map((s) => `${s.title} ${s.content}`).join(' ');
        }

        if (blockText.trim()) {
          items.push({
            blockId: block.id,
            sectionId: section.sectionId,
            title: blockTitle,
            text: blockText,
          });
        }
      }
    }

    return items;
  }, [content]);

  const search = (query: string): SearchResult[] => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const results: SearchResult[] = [];

    for (const item of index) {
      const lowerText = item.text.toLowerCase();
      const lowerTitle = item.title.toLowerCase();

      const titleMatch = lowerTitle.includes(trimmed);
      const textMatch = lowerText.includes(trimmed);

      if (titleMatch || textMatch) {
        // Compute score
        let score = 0;
        if (titleMatch) score += 10;
        if (textMatch) score += 5;

        // Generate snippet around match
        let snippet = item.text;
        const matchIndex = lowerText.indexOf(trimmed);
        if (matchIndex !== -1 && item.text.length > 120) {
          const start = Math.max(0, matchIndex - 30);
          const end = Math.min(item.text.length, matchIndex + trimmed.length + 60);
          snippet = `...${item.text.substring(start, end)}...`;
        } else if (item.text.length > 120) {
          snippet = `${item.text.substring(0, 120)}...`;
        }

        results.push({
          blockId: item.blockId,
          sectionId: item.sectionId,
          title: item.title,
          snippet,
          score,
        });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  };

  return {
    search,
    isIndexing: false,
    totalIndexed: index.length,
  };
}
