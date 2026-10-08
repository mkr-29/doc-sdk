import { useState, type FC } from 'react';
import { Plus } from 'lucide-react';
import type { BlockType } from '../../core';

interface BlockInjectorProps {
  allowedBlocks: BlockType[];
  onAddBlock: (type: BlockType, defaultData: Record<string, unknown>) => void;
}

export function getDefaultBlockData(type: BlockType): Record<string, unknown> {
  switch (type) {
    case 'text':
      return { text: '', variant: 'body' };
    case 'markdown':
      return { content: '' };
    case 'code_sample':
      return { code: '', language: 'typescript', title: '' };
    case 'api_endpoint':
      return { method: 'GET', path: '/api/resource', parameters: [], responses: [] };
    case 'callout':
      return { title: 'Note', message: '', variant: 'info' };
    case 'stepper':
      return { steps: [{ title: 'Step 1', content: '' }] };
    default:
      return {};
  }
}

export const BlockInjector: FC<BlockInjectorProps> = ({
  allowedBlocks,
  onAddBlock,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (type: BlockType) => {
    onAddBlock(type, getDefaultBlockData(type));
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', marginTop: '1rem', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
        aria-expanded={isOpen}
      >
        <Plus size={14} /> Add Block
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 'calc(100% + 4px)',
            backgroundColor: 'var(--doc-sdk-bg)',
            border: '1px solid var(--doc-sdk-border)',
            borderRadius: 'var(--doc-sdk-radius)',
            padding: '0.4rem',
            boxShadow: 'var(--doc-sdk-shadow)',
            zIndex: 20,
            minWidth: '180px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
          }}
        >
          {allowedBlocks.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSelect(type)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                padding: '0.45rem 0.65rem',
                fontSize: '0.8125rem',
                borderRadius: 'var(--doc-sdk-radius-sm)',
                cursor: 'pointer',
                color: 'var(--doc-sdk-text)',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--doc-sdk-surface-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              + {type.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
