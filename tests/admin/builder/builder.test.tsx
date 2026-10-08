import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TemplateBuilder } from '../../../admin';
import { mockApiReferenceTemplate, type DocTemplate } from '../../../core';

describe('Admin TemplateBuilder Engine', () => {
  it('renders initial template configuration', () => {
    render(
      <TemplateBuilder initialTemplate={mockApiReferenceTemplate} />
    );

    expect(screen.getByDisplayValue('API Reference')).toBeDefined();
    expect(screen.getByDisplayValue('template-api-reference')).toBeDefined();
    expect(screen.getByText('Valid Schema')).toBeDefined();
  });

  it('updates template name and triggers onChange with valid schema', async () => {
    const handleChange = vi.fn();
    render(
      <TemplateBuilder
        initialTemplate={mockApiReferenceTemplate}
        onChange={handleChange}
      />
    );

    const nameInput = screen.getByDisplayValue('API Reference');
    fireEvent.change(nameInput, { target: { value: 'Updated API Reference' } });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as DocTemplate;
      expect(lastCall.name).toBe('Updated API Reference');
    });
  });

  it('updates layout type when selecting layout option card', async () => {
    const handleChange = vi.fn();
    render(
      <TemplateBuilder
        initialTemplate={mockApiReferenceTemplate}
        onChange={handleChange}
      />
    );

    const singleColCard = screen.getByText('Single-Column Guide');
    fireEvent.click(singleColCard);

    await waitFor(() => {
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as DocTemplate;
      expect(lastCall.layoutType).toBe('single-column');
    });
  });

  it('adds and removes metadata fields', async () => {
    const handleChange = vi.fn();
    render(
      <TemplateBuilder
        initialTemplate={mockApiReferenceTemplate}
        onChange={handleChange}
      />
    );

    const addFieldBtn = screen.getByText(/Add Field/i);
    fireEvent.click(addFieldBtn);

    expect(screen.getByDisplayValue('New Field')).toBeDefined();

    // Remove the newly created field
    const removeBtns = screen.getAllByLabelText(/Remove field/i);
    const lastRemoveBtn = removeBtns[removeBtns.length - 1];
    fireEvent.click(lastRemoveBtn);

    await waitFor(() => {
      expect(screen.queryByDisplayValue('New Field')).toBeNull();
    });
  });

  it('adds section and toggles allowed blocks', async () => {
    const handleChange = vi.fn();
    render(
      <TemplateBuilder
        initialTemplate={mockApiReferenceTemplate}
        onChange={handleChange}
      />
    );

    const addSecBtn = screen.getByText(/Add Section/i);
    fireEvent.click(addSecBtn);

    expect(screen.getByDisplayValue('New Section')).toBeDefined();

    // Toggle stepper block in New Section
    const chips = screen.getAllByText('stepper');
    const newSecStepperChip = chips[chips.length - 1];
    fireEvent.click(newSecStepperChip);

    await waitFor(() => {
      const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as DocTemplate;
      const addedSec = lastCall.sections[lastCall.sections.length - 1];
      expect(addedSec.allowedBlocks).toContain('stepper');
    });
  });

  it('opens JSON modal and copies or imports schema', () => {
    const handleSave = vi.fn();
    render(
      <TemplateBuilder
        initialTemplate={mockApiReferenceTemplate}
        onSave={handleSave}
      />
    );

    const jsonBtn = screen.getByRole('button', { name: /view json/i });
    fireEvent.click(jsonBtn);

    expect(screen.getByText('Export JSON')).toBeDefined();
    expect(screen.getByText('Import JSON')).toBeDefined();

    // Click close modal
    const closeBtn = screen.getByLabelText(/close modal/i);
    fireEvent.click(closeBtn);

    expect(screen.queryByText('Export JSON')).toBeNull();
  });

  it('invokes onSave when clicking Save Template button', () => {
    const handleSave = vi.fn();
    render(
      <TemplateBuilder
        initialTemplate={mockApiReferenceTemplate}
        onSave={handleSave}
      />
    );

    const saveBtn = screen.getByRole('button', { name: /save template/i });
    expect(saveBtn).not.toBeNull();
    fireEvent.click(saveBtn);

    expect(handleSave).toHaveBeenCalledWith(mockApiReferenceTemplate);
  });
});
