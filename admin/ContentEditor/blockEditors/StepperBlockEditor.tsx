import type { FC } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { StepperBlockData, StepItem } from '../../../core';
import type { BlockEditorProps } from '../types';

export const StepperBlockEditor: FC<BlockEditorProps<StepperBlockData>> = ({
  block,
  onUpdate,
}) => {
  const { steps = [] } = (block.data || {}) as StepperBlockData;

  const addStep = () => {
    const newStep: StepItem = {
      stepNumber: steps.length + 1,
      title: `Step ${steps.length + 1}`,
      content: '',
    };
    onUpdate({ steps: [...steps, newStep] });
  };

  const updateStep = (index: number, updates: Partial<StepItem>) => {
    const updated = steps.map((s, idx) => (idx === index ? { ...s, ...updates } : s));
    onUpdate({ steps: updated });
  };

  const removeStep = (index: number) => {
    const updated = steps.filter((_, idx) => idx !== index);
    onUpdate({ steps: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label className="doc-sdk-label" style={{ margin: 0 }}>
          Walkthrough Steps ({steps.length})
        </label>
        <button
          type="button"
          onClick={addStep}
          className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
        >
          <Plus size={13} /> Add Step
        </button>
      </div>

      {steps.map((step, idx) => (
        <div
          key={idx}
          style={{
            border: '1px solid var(--doc-sdk-border)',
            borderRadius: 'var(--doc-sdk-radius-sm)',
            padding: '0.75rem',
            backgroundColor: 'var(--doc-sdk-surface)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '400px' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--doc-sdk-primary)' }}>
                #{idx + 1}
              </span>
              <input
                type="text"
                className="doc-sdk-input"
                value={step.title}
                onChange={(e) => updateStep(idx, { title: e.target.value })}
                placeholder="Step Title"
                aria-label="Step Title"
              />
            </div>

            <button
              type="button"
              onClick={() => removeStep(idx)}
              className="doc-sdk-btn doc-sdk-btn-danger doc-sdk-btn-sm"
              aria-label="Remove Step"
              style={{ padding: '0.3rem' }}
            >
              <Trash2 size={13} />
            </button>
          </div>

          <textarea
            className="doc-sdk-textarea"
            rows={2}
            value={step.content}
            onChange={(e) => updateStep(idx, { content: e.target.value })}
            placeholder="Step instructions or markdown content..."
            aria-label="Step Content"
          />
        </div>
      ))}
    </div>
  );
};
