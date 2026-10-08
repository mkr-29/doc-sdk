import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DocContentEditor } from '../../../admin';
import {
  mockApiReferenceTemplate,
  mockApiReferenceContent,
  validateContent,
  type DocContent,
} from '../../../core';

describe('Admin DocContentEditor Engine', () => {
  it('renders metadata fields and sections from template and content', () => {
    render(
      <DocContentEditor
        template={mockApiReferenceTemplate}
        initialContent={mockApiReferenceContent}
      />
    );

    expect(screen.getByDisplayValue('Authentication & Session API')).toBeDefined();
    expect(screen.getByDisplayValue('v1.2.0')).toBeDefined();
    expect(screen.getByText('Valid Content')).toBeDefined();
    expect(screen.getByText('Overview')).toBeDefined();
    expect(screen.getByText('Authentication')).toBeDefined();
    expect(screen.getByText('Endpoints')).toBeDefined();
  });

  it('updates metadata fields and triggers onChange', async () => {
    const handleChange = vi.fn();
    render(
      <DocContentEditor
        template={mockApiReferenceTemplate}
        initialContent={mockApiReferenceContent}
        onChange={handleChange}
      />
    );

    const titleInput = screen.getByDisplayValue('Authentication & Session API');
    fireEvent.change(titleInput, { target: { value: 'New Auth API Title' } });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as DocContent;
      expect(lastCall.metadata.title).toBe('New Auth API Title');
    });
  });

  it('injects new block allowed in the section', async () => {
    const handleChange = vi.fn();
    render(
      <DocContentEditor
        template={mockApiReferenceTemplate}
        initialContent={mockApiReferenceContent}
        onChange={handleChange}
      />
    );

    // Find "Add Block" buttons. Click the first one (in Overview section)
    const addBlockBtns = screen.getAllByRole('button', { name: /add block/i });
    fireEvent.click(addBlockBtns[0]);

    // Overview section allows 'markdown' and 'callout'
    expect(screen.getByText('+ MARKDOWN')).toBeDefined();
    expect(screen.getByText('+ CALLOUT')).toBeDefined();
    // 'stepper' should NOT be permitted
    expect(screen.queryByText('+ STEPPER')).toBeNull();

    // Click to add CALLOUT
    fireEvent.click(screen.getByText('+ CALLOUT'));

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as DocContent;
      const overviewBlocks = lastCall.sections[0].blocks;
      expect(overviewBlocks[overviewBlocks.length - 1].type).toBe('callout');
    });
  });

  it('supports duplicate and delete block actions', async () => {
    const handleChange = vi.fn();
    render(
      <DocContentEditor
        template={mockApiReferenceTemplate}
        initialContent={mockApiReferenceContent}
        onChange={handleChange}
      />
    );

    // Overview section has 2 initial blocks: blk-ov-1 and blk-ov-2
    const duplicateBtns = screen.getAllByLabelText(/duplicate block/i);
    fireEvent.click(duplicateBtns[0]);

    await waitFor(() => {
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as DocContent;
      expect(lastCall.sections[0].blocks.length).toBe(3);
    });

    // Now delete the middle duplicated block
    const deleteBtns = screen.getAllByLabelText(/delete block/i);
    fireEvent.click(deleteBtns[1]);

    await waitFor(() => {
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as DocContent;
      expect(lastCall.sections[0].blocks.length).toBe(2);
    });
  });

  it('handles Save Content button and validates payload against schema', () => {
    const handleSave = vi.fn();
    render(
      <DocContentEditor
        template={mockApiReferenceTemplate}
        initialContent={mockApiReferenceContent}
        onSave={handleSave}
      />
    );

    const saveBtn = screen.getByRole('button', { name: /save content/i });
    expect(saveBtn).not.toBeNull();
    fireEvent.click(saveBtn);

    expect(handleSave).toHaveBeenCalled();
    const savedContent = handleSave.mock.calls[0][0];
    expect(() => validateContent(savedContent)).not.toThrow();
  });
});
