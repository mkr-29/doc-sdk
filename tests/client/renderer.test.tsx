import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocRenderer } from '../../client';
import {
  mockWalkthroughTemplate,
  mockWalkthroughContent,
  mockApiReferenceTemplate,
  mockApiReferenceContent,
  mockSideBySideTemplate,
  mockSideBySideContent,
} from '../../core';

describe('Client Viewer Engine & Layouts', () => {
  it('renders SingleColumnLayout for walkthrough template', () => {
    const { container } = render(
      <DocRenderer
        template={mockWalkthroughTemplate}
        content={mockWalkthroughContent}
      />
    );

    expect(screen.getByText('5-Minute SDK Quickstart')).toBeDefined();
    expect(screen.getByText('Install the package')).toBeDefined();
    expect(screen.getByText('Render Document')).toBeDefined();
    expect(container.querySelector('.doc-sdk-layout-single-column')).not.toBeNull();
  });

  it('renders TwoColumnLayout with sidebar navigation and right TOC', () => {
    const handleAnchor = vi.fn();
    const { container } = render(
      <DocRenderer
        template={mockApiReferenceTemplate}
        content={mockApiReferenceContent}
        onAnchorClick={handleAnchor}
      />
    );

    expect(screen.getByText('Authentication & Session API')).toBeDefined();
    expect(container.querySelector('.doc-sdk-layout-two-column')).not.toBeNull();
    expect(container.querySelector('.doc-sdk-sidebar-left')).not.toBeNull();
    expect(container.querySelector('.doc-sdk-toc-right')).not.toBeNull();

    // Click navigation link
    const navLinks = screen.getAllByRole('link', { name: 'Authentication' });
    fireEvent.click(navLinks[0]);
    expect(handleAnchor).toHaveBeenCalledWith('sec-authentication');
  });

  it('renders SideBySideCodeLayout with split prose and code columns', () => {
    const { container } = render(
      <DocRenderer
        template={mockSideBySideTemplate}
        content={mockSideBySideContent}
      />
    );

    expect(screen.getByText('Users Resource API')).toBeDefined();
    expect(container.querySelector('.doc-sdk-layout-side-by-side')).not.toBeNull();
    expect(container.querySelector('.doc-sdk-col-prose')).not.toBeNull();
    expect(container.querySelector('.doc-sdk-col-code')).not.toBeNull();
    expect(screen.getByText('/users/{id}')).toBeDefined();
    expect(screen.getByText('Get User')).toBeDefined();
  });

  it('supports custom block overrides in blockRegistry prop', () => {
    const CustomCallout = () => (
      <div data-testid="custom-callout-override">Custom Callout Alert!</div>
    );

    render(
      <DocRenderer
        template={mockWalkthroughTemplate}
        content={mockWalkthroughContent}
        blockRegistry={{ callout: CustomCallout }}
      />
    );

    expect(screen.getByTestId('custom-callout-override')).toBeDefined();
    expect(screen.getByText('Custom Callout Alert!')).toBeDefined();
  });

  it('handles unrecognized block type gracefully with fallback card', () => {
    const contentWithUnknown = {
      ...mockWalkthroughContent,
      sections: [
        {
          sectionId: 'sec-intro',
          blocks: [
            {
              id: 'unknown-1',
              type: 'future_widget' as any,
              data: {},
            },
          ],
        },
      ],
    };

    render(
      <DocRenderer
        template={mockWalkthroughTemplate}
        content={contentWithUnknown as any}
      />
    );

    // Schema validation detects the invalid block type and displays error banner
    expect(screen.getByText(/Invalid Document Schema/i)).toBeDefined();
  });
});
