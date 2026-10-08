import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { DocTemplate, DocContent } from '../../core';
import { DocTemplateSchema, DocContentSchema } from '../../core';
import { TemplateBuilder } from '../../admin/TemplateBuilder';
import { DocContentEditor } from '../../admin/ContentEditor';
import { DocRenderer } from '../../client/DocRenderer';
import { useTableOfContents } from '../../hooks/useTableOfContents';
import { useDocSearch } from '../../hooks/useDocSearch';
import { renderHook } from '@testing-library/react';

describe('End-to-End Workflow & Integration Test', () => {
  it('executes the full lifecycle: TemplateBuilder -> DocContentEditor -> DocRenderer -> Navigation Hooks', () => {
    // Step 1: Initial template state
    const initialTemplate: DocTemplate = {
      id: 'custom-integration-template',
      name: 'Integration Doc Template',
      layoutType: 'two-column',
      metadataFields: [
        {
          id: 'title',
          name: 'Document Title',
          type: 'string',
          required: true,
          defaultValue: 'My API Integration Guide',
        },
        {
          id: 'version',
          name: 'API Version',
          type: 'string',
          required: false,
          defaultValue: 'v2.0',
        },
      ],
      sections: [
        {
          id: 'sec-intro',
          title: 'Introduction',
          allowedBlocks: ['markdown', 'callout'],
        },
        {
          id: 'sec-endpoints',
          title: 'API Endpoints',
          allowedBlocks: ['api_endpoint', 'code_sample'],
        },
      ],
    };

    // Verify template passes core schema validation
    const parsedTemplate = DocTemplateSchema.parse(initialTemplate);
    expect(parsedTemplate.id).toBe('custom-integration-template');

    // Step 2: Render TemplateBuilder and simulate builder interaction
    const onSaveTemplate = vi.fn();
    const { unmount: unmountBuilder } = render(
      <TemplateBuilder initialTemplate={initialTemplate} onSave={onSaveTemplate} />
    );

    // Assert builder rendered with initial name and metadata keys
    expect(screen.getByDisplayValue('Integration Doc Template')).toBeDefined();
    expect(screen.getByDisplayValue('Document Title')).toBeDefined();

    // Trigger save from builder
    const saveTemplateBtn = screen.getByRole('button', { name: /save template/i });
    fireEvent.click(saveTemplateBtn);
    expect(onSaveTemplate).toHaveBeenCalledTimes(1);
    expect(onSaveTemplate).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'custom-integration-template' })
    );

    unmountBuilder();

    // Step 3: Populate content based on the template
    const initialContent: DocContent = {
      id: 'doc-content-1',
      templateId: parsedTemplate.id,
      metadata: {
        title: 'Payments Integration Guide',
        version: 'v2.4.0',
      },
      sections: [
        {
          sectionId: 'sec-intro',
          blocks: [
            {
              id: 'blk-md-1',
              type: 'markdown',
              data: {
                content: '# Getting Started\nThis document describes how to use our payment gateway.\n## Quick Authentication\nPass your Bearer token in the header.',
              },
            },
            {
              id: 'blk-co-1',
              type: 'callout',
              data: {
                title: 'Sandbox Environment',
                message: 'All requests must use sandbox keys during development.',
                variant: 'info',
              },
            },
          ],
        },
        {
          sectionId: 'sec-endpoints',
          blocks: [
            {
              id: 'blk-ep-1',
              type: 'api_endpoint',
              data: {
                method: 'POST',
                path: '/v2/charges',
                description: 'Create a new credit card charge.',
                parameters: [
                  {
                    name: 'amount',
                    in: 'body',
                    type: 'number',
                    required: true,
                    description: 'Amount in cents',
                  },
                ],
                responses: [
                  {
                    status: 201,
                    description: 'Charge created successfully',
                    body: '{"id": "ch_123", "status": "succeeded"}',
                  },
                ],
              },
            },
          ],
        },
      ],
    };

    // Verify content passes schema validation against template
    const parsedContent = DocContentSchema.parse(initialContent);
    expect(parsedContent.id).toBe('doc-content-1');

    // Step 4: Render DocContentEditor and verify editing capabilities
    const onSaveContent = vi.fn();
    const onChangeContent = vi.fn();
    const { unmount: unmountEditor } = render(
      <DocContentEditor
        template={parsedTemplate}
        initialContent={parsedContent}
        onSave={onSaveContent}
        onChange={onChangeContent}
      />
    );

    // Verify editor displays section titles and metadata inputs
    expect(screen.getByDisplayValue('Payments Integration Guide')).toBeDefined();
    expect(screen.getByText('Introduction')).toBeDefined();
    expect(screen.getByText('API Endpoints')).toBeDefined();

    // Trigger save in content editor
    const saveContentBtn = screen.getByRole('button', { name: /save content/i });
    fireEvent.click(saveContentBtn);
    expect(onSaveContent).toHaveBeenCalledTimes(1);
    expect(onSaveContent).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'doc-content-1' })
    );

    unmountEditor();

    // Step 5: Render in DocRenderer (Client Viewer)
    const { container, unmount: unmountRenderer } = render(
      <DocRenderer template={parsedTemplate} content={parsedContent} />
    );

    // Verify layout rendered
    expect(container.querySelector('.doc-sdk-layout-two-column')).not.toBeNull();
    expect(container.querySelector('.doc-sdk-sidebar-left')).not.toBeNull();
    expect(container.querySelector('.doc-sdk-toc-right')).not.toBeNull();

    // Verify rendered content blocks
    expect(screen.getByText('Getting Started')).toBeDefined();
    expect(screen.getByText('Sandbox Environment')).toBeDefined();
    expect(screen.getByText('POST')).toBeDefined();
    expect(screen.getByText('/v2/charges')).toBeDefined();
    expect(screen.getByText('Create a new credit card charge.')).toBeDefined();

    unmountRenderer();

    // Step 6: Navigation Hooks validation on the generated document
    const { result: tocResult } = renderHook(() => useTableOfContents(parsedContent));
    expect(tocResult.current).toHaveLength(2);
    expect(tocResult.current[0].title).toBe('Getting Started');
    expect(tocResult.current[0].level).toBe(1);
    expect(tocResult.current[1].title).toBe('Quick Authentication');
    expect(tocResult.current[1].level).toBe(2);

    const { result: searchResult } = renderHook(() => useDocSearch(parsedContent));
    const hits = searchResult.current.search('charges');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].blockId).toBe('blk-ep-1');
  });
});
