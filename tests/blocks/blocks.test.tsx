import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  TextBlock,
  MarkdownBlock,
  CodeSampleBlock,
  ApiEndpointBlock,
  CalloutBlock,
  StepperBlock,
  defaultBlockRegistry,
} from '../../client';
import {
  mockApiReferenceTemplate,
  mockApiReferenceContent,
} from '../../core';

const dummyProps = {
  sectionId: 'sec-test',
  template: mockApiReferenceTemplate,
  content: mockApiReferenceContent,
};

describe('Block Component Primitives', () => {
  describe('TextBlock', () => {
    it('renders text with body variant by default', () => {
      render(
        <TextBlock
          {...dummyProps}
          block={{
            id: 'txt-1',
            type: 'text',
            data: { text: 'Welcome to documentation' },
          }}
        />
      );

      const el = screen.getByText('Welcome to documentation');
      expect(el).toBeDefined();
      expect(el.className).toContain('doc-sdk-text-body');
    });

    it('renders text with lead and caption variants', () => {
      const { rerender } = render(
        <TextBlock
          {...dummyProps}
          block={{
            id: 'txt-lead',
            type: 'text',
            data: { text: 'Lead text', variant: 'lead' },
          }}
        />
      );
      expect(screen.getByText('Lead text').className).toContain('doc-sdk-text-lead');

      rerender(
        <TextBlock
          {...dummyProps}
          block={{
            id: 'txt-caption',
            type: 'text',
            data: { text: 'Caption text', variant: 'caption' },
          }}
        />
      );
      expect(screen.getByText('Caption text').className).toContain('doc-sdk-text-caption');
    });
  });

  describe('MarkdownBlock', () => {
    it('renders markdown content and generates slugified heading IDs', () => {
      const markdown = '# Quick Start Guide\n\nThis is a paragraph with **bold** text.\n\n## Step One Setup';
      const { container } = render(
        <MarkdownBlock
          {...dummyProps}
          block={{
            id: 'md-1',
            type: 'markdown',
            data: { content: markdown },
          }}
        />
      );

      expect(screen.getByText('Quick Start Guide')).toBeDefined();
      const h1 = container.querySelector('h1');
      expect(h1).not.toBeNull();
      expect(h1?.id).toBe('quick-start-guide');

      const h2 = container.querySelector('h2');
      expect(h2).not.toBeNull();
      expect(h2?.id).toBe('step-one-setup');
    });
  });

  describe('CodeSampleBlock', () => {
    it('renders code snippet and handles clipboard copy', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      render(
        <CodeSampleBlock
          {...dummyProps}
          block={{
            id: 'code-1',
            type: 'code_sample',
            data: {
              code: 'const x = 42;',
              language: 'typescript',
              title: 'index.ts',
            },
          }}
        />
      );

      expect(screen.getByText('index.ts')).toBeDefined();
      const copyBtn = screen.getByRole('button', { name: /copy/i });
      expect(copyBtn).toBeDefined();

      fireEvent.click(copyBtn);
      expect(writeTextMock).toHaveBeenCalledWith('const x = 42;');

      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeDefined();
      });
    });
  });

  describe('ApiEndpointBlock', () => {
    it('renders method badge, path, parameters table, and responses', () => {
      render(
        <ApiEndpointBlock
          {...dummyProps}
          block={{
            id: 'api-1',
            type: 'api_endpoint',
            data: {
              method: 'POST',
              path: '/api/v1/auth',
              description: 'Authenticate user account',
              parameters: [
                {
                  name: 'username',
                  in: 'body',
                  type: 'string',
                  required: true,
                  description: 'Account username',
                },
              ],
              responses: [
                {
                  status: 200,
                  description: 'Session active',
                  body: '{"ok": true}',
                },
              ],
            },
          }}
        />
      );

      expect(screen.getByText('POST')).toBeDefined();
      expect(screen.getByText('/api/v1/auth')).toBeDefined();
      expect(screen.getByText('Authenticate user account')).toBeDefined();
      expect(screen.getByText('username')).toBeDefined();
      expect(screen.getByText('*required')).toBeDefined();
      expect(screen.getByText('200')).toBeDefined();
      expect(screen.getByText('Session active')).toBeDefined();
    });
  });

  describe('CalloutBlock', () => {
    it('renders callout variant, title, and alert role', () => {
      render(
        <CalloutBlock
          {...dummyProps}
          block={{
            id: 'callout-1',
            type: 'callout',
            data: {
              title: 'Caution Ahead',
              message: 'Check your database credentials before deploying.',
              variant: 'warning',
            },
          }}
        />
      );

      const alert = screen.getByRole('alert');
      expect(alert).toBeDefined();
      expect(alert.className).toContain('doc-sdk-callout-warning');
      expect(screen.getByText('Caution Ahead')).toBeDefined();
      expect(screen.getByText('Check your database credentials before deploying.')).toBeDefined();
    });
  });

  describe('StepperBlock', () => {
    it('renders sequential steps with numbers and descriptions', () => {
      render(
        <StepperBlock
          {...dummyProps}
          block={{
            id: 'stepper-1',
            type: 'stepper',
            data: {
              steps: [
                { title: 'Initialize Git', content: 'Run git init' },
                { title: 'Commit Code', content: 'Run git commit' },
              ],
            },
          }}
        />
      );

      expect(screen.getByText('Initialize Git')).toBeDefined();
      expect(screen.getByText('Run git init')).toBeDefined();
      expect(screen.getByText('Commit Code')).toBeDefined();
      expect(screen.getByText('Run git commit')).toBeDefined();
      expect(screen.getByLabelText('Step 1')).toBeDefined();
      expect(screen.getByLabelText('Step 2')).toBeDefined();
    });
  });

  describe('defaultBlockRegistry', () => {
    it('contains all 6 core block types', () => {
      expect(defaultBlockRegistry.text).toBe(TextBlock);
      expect(defaultBlockRegistry.markdown).toBe(MarkdownBlock);
      expect(defaultBlockRegistry.code_sample).toBe(CodeSampleBlock);
      expect(defaultBlockRegistry.api_endpoint).toBe(ApiEndpointBlock);
      expect(defaultBlockRegistry.callout).toBe(CalloutBlock);
      expect(defaultBlockRegistry.stepper).toBe(StepperBlock);
    });
  });
});
