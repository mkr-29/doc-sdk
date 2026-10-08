import type { FC } from 'react';
import type { CodeSampleBlockData } from '../../../core';
import type { BlockEditorProps } from '../types';

const COMMON_LANGUAGES = [
  'typescript',
  'javascript',
  'python',
  'bash',
  'json',
  'html',
  'css',
  'sql',
  'go',
  'rust',
];

export const CodeSampleBlockEditor: FC<BlockEditorProps<CodeSampleBlockData>> = ({
  block,
  onUpdate,
}) => {
  const {
    code = '',
    language = 'typescript',
    title = '',
  } = (block.data || {}) as CodeSampleBlockData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: '0.5rem' }}>
        <div>
          <label className="doc-sdk-label">Snippet Title / Filename (Optional)</label>
          <input
            type="text"
            className="doc-sdk-input"
            value={title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="e.g. index.ts or Request Payload"
            aria-label="Code Title"
          />
        </div>

        <div>
          <label className="doc-sdk-label">Language</label>
          <select
            className="doc-sdk-select"
            value={language}
            onChange={(e) => onUpdate({ language: e.target.value })}
            aria-label="Code Language"
          >
            {COMMON_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="doc-sdk-label">Code</label>
        <textarea
          className="doc-sdk-textarea"
          rows={6}
          value={code}
          onChange={(e) => onUpdate({ code: e.target.value })}
          placeholder="// Paste or write code snippet..."
          aria-label="Code Snippet"
          style={{ fontFamily: 'var(--doc-sdk-font-mono)', fontSize: '0.8125rem' }}
        />
      </div>
    </div>
  );
};
