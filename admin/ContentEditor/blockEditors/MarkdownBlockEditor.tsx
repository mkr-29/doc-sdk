import { useState, type FC } from 'react';
import type { MarkdownBlockData } from '../../../core';
import type { BlockEditorProps } from '../types';
import { MarkdownBlock } from '../../../client/blocks/MarkdownBlock';

export const MarkdownBlockEditor: FC<BlockEditorProps<MarkdownBlockData>> = ({
  block,
  onUpdate,
}) => {
  const { content = '' } = (block.data || {}) as MarkdownBlockData;
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label className="doc-sdk-label" style={{ margin: 0 }}>
          Markdown Editor
        </label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
        >
          {showPreview ? 'Edit Raw' : 'Preview Render'}
        </button>
      </div>

      {showPreview ? (
        <div
          style={{
            border: '1px solid var(--doc-sdk-border)',
            borderRadius: 'var(--doc-sdk-radius-sm)',
            padding: '0.85rem',
            backgroundColor: 'var(--doc-sdk-bg)',
            minHeight: '120px',
          }}
        >
          <MarkdownBlock
            block={block}
            sectionId=""
            template={{} as any}
            content={{} as any}
          />
        </div>
      ) : (
        <textarea
          className="doc-sdk-textarea"
          rows={6}
          value={content}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder="Write markdown here... (supports # Headings, **bold**, lists, tables)"
          aria-label="Markdown Block Content"
          style={{ fontFamily: 'var(--doc-sdk-font-mono)', fontSize: '0.8125rem' }}
        />
      )}
    </div>
  );
};
