import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTableOfContents } from '../../hooks/useTableOfContents';
import { useDocSearch } from '../../hooks/useDocSearch';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useAnchorScroll } from '../../hooks/useAnchorScroll';
import { mockApiReferenceContent, mockWalkthroughContent } from '../../core/fixtures/mockContents';
import type { DocContent } from '../../core';

describe('Headless Hooks & Navigation Suite', () => {
  describe('useTableOfContents', () => {
    it('returns empty array when content is undefined or empty', () => {
      const { result } = renderHook(() => useTableOfContents(undefined));
      expect(result.current).toEqual([]);

      const { result: emptyResult } = renderHook(() =>
        useTableOfContents({ id: '1', templateId: 't1', metadata: {}, sections: [] })
      );
      expect(emptyResult.current).toEqual([]);
    });

    it('extracts h1, h2, h3 headings from markdown blocks', () => {
      const sampleDoc: DocContent = {
        id: 'doc-toc',
        templateId: 't1',
        metadata: {},
        sections: [
          {
            sectionId: 'sec-1',
            blocks: [
              {
                id: 'b1',
                type: 'markdown',
                data: {
                  content: '# Main Title\nSome content\n## Secondary Title\n### Deep Subsection',
                },
              },
            ],
          },
        ],
      };

      const { result } = renderHook(() => useTableOfContents(sampleDoc));
      expect(result.current).toHaveLength(3);
      expect(result.current[0]).toEqual({
        id: 'main-title',
        title: 'Main Title',
        level: 1,
        sectionId: 'sec-1',
      });
      expect(result.current[1]).toEqual({
        id: 'secondary-title',
        title: 'Secondary Title',
        level: 2,
        sectionId: 'sec-1',
      });
      expect(result.current[2]).toEqual({
        id: 'deep-subsection',
        title: 'Deep Subsection',
        level: 3,
        sectionId: 'sec-1',
      });
    });

    it('extracts headings from mockApiReferenceContent', () => {
      const { result } = renderHook(() => useTableOfContents(mockApiReferenceContent));
      expect(result.current.length).toBeGreaterThan(0);
      expect(result.current.some((item) => item.title === 'Authentication Overview')).toBe(true);
    });
  });

  describe('useDocSearch', () => {
    it('handles empty content gracefully', () => {
      const { result } = renderHook(() => useDocSearch(undefined));
      expect(result.current.totalIndexed).toBe(0);
      expect(result.current.search('test')).toEqual([]);
    });

    it('indexes metadata, markdown, code_sample, and endpoints', () => {
      const { result } = renderHook(() => useDocSearch(mockApiReferenceContent));
      expect(result.current.totalIndexed).toBeGreaterThan(0);

      // Search for something in metadata
      const metaResults = result.current.search('OAuth2');
      expect(metaResults.length).toBeGreaterThan(0);

      // Search for endpoint path
      const epResults = result.current.search('/oauth/token');
      expect(epResults.length).toBeGreaterThan(0);
      expect(epResults[0].blockId).toBe('blk-ep-1');

      // Search for empty string returns empty
      expect(result.current.search('   ')).toEqual([]);

      // Search non-existent term
      expect(result.current.search('xyzNonExistentQuery123')).toEqual([]);
    });

    it('indexes text, callout, and stepper blocks properly', () => {
      const { result } = renderHook(() => useDocSearch(mockWalkthroughContent));
      const stepResults = result.current.search('Install the package');
      expect(stepResults.length).toBeGreaterThan(0);
    });
  });

  describe('useScrollSpy', () => {
    let mockObserve: ReturnType<typeof vi.fn>;
    let mockUnobserve: ReturnType<typeof vi.fn>;
    let mockDisconnect: ReturnType<typeof vi.fn>;
    let observerCallback: (entries: Array<{ target: { id: string }; isIntersecting: boolean }>) => void;

    beforeEach(() => {
      mockObserve = vi.fn();
      mockUnobserve = vi.fn();
      mockDisconnect = vi.fn();

      window.IntersectionObserver = vi.fn().mockImplementation((cb) => {
        observerCallback = cb;
        return {
          observe: mockObserve,
          unobserve: mockUnobserve,
          disconnect: mockDisconnect,
        };
      }) as unknown as typeof IntersectionObserver;

      document.body.innerHTML = `
        <div id="section-1">Section 1</div>
        <div id="section-2">Section 2</div>
      `;
    });

    it('observes target elements by id and updates activeId on intersection', () => {
      const { result } = renderHook(() => useScrollSpy(['section-1', 'section-2']));
      expect(result.current).toBeNull();
      expect(mockObserve).toHaveBeenCalledTimes(2);

      act(() => {
        observerCallback([{ target: { id: 'section-2' }, isIntersecting: true }]);
      });

      expect(result.current).toBe('section-2');
    });

    it('handles empty target list gracefully', () => {
      const { result } = renderHook(() => useScrollSpy([]));
      expect(result.current).toBeNull();
      expect(mockObserve).not.toHaveBeenCalled();
    });
  });

  describe('useAnchorScroll', () => {
    beforeEach(() => {
      window.scrollTo = vi.fn();
      document.body.innerHTML = `<div id="target-anchor">Heading Content</div>`;
    });

    it('scrolls to anchor element with offset calculation', () => {
      const { result } = renderHook(() => useAnchorScroll({ offset: 50, behavior: 'auto' }));

      act(() => {
        result.current.scrollToAnchor('#target-anchor');
      });

      expect(window.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: 'auto',
        })
      );
    });

    it('handles non-existent target id safely', () => {
      const { result } = renderHook(() => useAnchorScroll());

      act(() => {
        result.current.scrollToAnchor('#non-existent-id');
      });

      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });
});
