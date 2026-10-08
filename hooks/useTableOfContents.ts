import { useMemo } from 'react';
import type { DocContent } from '../core';

export interface TocItem {
  id: string;
  title: string;
  level: 1 | 2 | 3;
  sectionId: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Headless hook to extract a structured Table of Contents from document markdown blocks and sections.
 */
export function useTableOfContents(content?: DocContent): TocItem[] {
  return useMemo(() => {
    if (!content || !content.sections) return [];

    const items: TocItem[] = [];

    for (const section of content.sections) {
      for (const block of section.blocks || []) {
        if (block.type === 'markdown') {
          const text = ((block.data as { content?: string })?.content || '');
          const lines = text.split('\n');

          for (const line of lines) {
            const h1Match = line.match(/^#\s+(.+)$/);
            const h2Match = line.match(/^##\s+(.+)$/);
            const h3Match = line.match(/^###\s+(.+)$/);

            if (h1Match) {
              const title = h1Match[1].trim();
              items.push({
                id: slugify(title),
                title,
                level: 1,
                sectionId: section.sectionId,
              });
            } else if (h2Match) {
              const title = h2Match[1].trim();
              items.push({
                id: slugify(title),
                title,
                level: 2,
                sectionId: section.sectionId,
              });
            } else if (h3Match) {
              const title = h3Match[1].trim();
              items.push({
                id: slugify(title),
                title,
                level: 3,
                sectionId: section.sectionId,
              });
            }
          }
        }
      }
    }

    return items;
  }, [content]);
}
