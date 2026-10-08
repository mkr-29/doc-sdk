import type { FC } from 'react';
import type { TextBlockData } from '../../../core';
import type { BlockEditorProps } from '../types';

export const TextBlockEditor: FC<BlockEditorProps<TextBlockData>> = ({
  block,
  onUpdate,
}) => {
  const { text = '', variant = 'body' } = (block.data || {}) as TextBlockData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div>
        <label className="doc-sdk-label">Text Content</label>
        <textarea
          className="doc-sdk-textarea"
          rows={3}
          value={text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          placeholder="Enter text..."
          aria-label="Text Block Content"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <label className="doc-sdk-label" style={{ margin: 0 }}>
          Typography Variant:
        </label>
        <select
          className="doc-sdk-select"
          style={{ width: 'auto' }}
          value={variant}
          onChange={(e) =>
            onUpdate({ variant: e.target.value as 'lead' | 'body' | 'caption' })
          }
          aria-label="Text Variant"
        >
          <option value="body">Body (Standard)</option>
          <option value="lead">Lead (Introductory / Emphasized)</option>
          <option value="caption">Caption (Subtle / Footnote)</option>
        </select>
      </div>
    </div>
  );
};
