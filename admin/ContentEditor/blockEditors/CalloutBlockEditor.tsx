import type { FC } from 'react';
import type { CalloutBlockData } from '../../../core';
import type { BlockEditorProps } from '../types';

export const CalloutBlockEditor: FC<BlockEditorProps<CalloutBlockData>> = ({
  block,
  onUpdate,
}) => {
  const {
    title = '',
    message = '',
    variant = 'info',
  } = (block.data || {}) as CalloutBlockData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '0.5rem' }}>
        <div>
          <label className="doc-sdk-label">Variant</label>
          <select
            className="doc-sdk-select"
            value={variant}
            onChange={(e) => onUpdate({ variant: e.target.value as any })}
            aria-label="Callout Variant"
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="tip">Tip</option>
            <option value="danger">Danger</option>
          </select>
        </div>

        <div>
          <label className="doc-sdk-label">Title (Optional)</label>
          <input
            type="text"
            className="doc-sdk-input"
            value={title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="e.g. Important Note"
            aria-label="Callout Title"
          />
        </div>
      </div>

      <div>
        <label className="doc-sdk-label">Message</label>
        <textarea
          className="doc-sdk-textarea"
          rows={3}
          value={message}
          onChange={(e) => onUpdate({ message: e.target.value })}
          placeholder="Callout description message..."
          aria-label="Callout Message"
        />
      </div>
    </div>
  );
};
