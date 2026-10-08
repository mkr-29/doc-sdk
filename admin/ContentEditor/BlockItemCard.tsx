import type { FC } from 'react';
import { ArrowUp, ArrowDown, Copy, Trash2 } from 'lucide-react';
import type { BlockContent } from '../../core';
import {
  TextBlockEditor,
  MarkdownBlockEditor,
  CodeSampleBlockEditor,
  ApiEndpointBlockEditor,
  CalloutBlockEditor,
  StepperBlockEditor,
} from './blockEditors';

interface BlockItemCardProps {
  block: BlockContent;
  index: number;
  totalBlocks: number;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onDuplicate: (index: number) => void;
  onDelete: (index: number) => void;
  onUpdateData: (data: Record<string, unknown>) => void;
}

export const BlockItemCard: FC<BlockItemCardProps> = ({
  block,
  index,
  totalBlocks,
  onMove,
  onDuplicate,
  onDelete,
  onUpdateData,
}) => {
  const renderEditor = () => {
    switch (block.type) {
      case 'text':
        return <TextBlockEditor block={block as any} onUpdate={onUpdateData} />;
      case 'markdown':
        return <MarkdownBlockEditor block={block as any} onUpdate={onUpdateData} />;
      case 'code_sample':
        return <CodeSampleBlockEditor block={block as any} onUpdate={onUpdateData} />;
      case 'api_endpoint':
        return <ApiEndpointBlockEditor block={block as any} onUpdate={onUpdateData} />;
      case 'callout':
        return <CalloutBlockEditor block={block as any} onUpdate={onUpdateData} />;
      case 'stepper':
        return <StepperBlockEditor block={block as any} onUpdate={onUpdateData} />;
      default:
        return <div>Unsupported block editor: {block.type}</div>;
    }
  };

  return (
    <div
      style={{
        border: '1px solid var(--doc-sdk-border)',
        borderRadius: 'var(--doc-sdk-radius)',
        padding: '1rem',
        backgroundColor: 'var(--doc-sdk-bg)',
        boxShadow: 'var(--doc-sdk-shadow-sm)',
        marginBottom: '0.75rem',
      }}
      data-block-id={block.id}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid var(--doc-sdk-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--doc-sdk-radius-sm)',
              backgroundColor: 'var(--doc-sdk-surface)',
              border: '1px solid var(--doc-sdk-border)',
              textTransform: 'uppercase',
              color: 'var(--doc-sdk-text)',
            }}
          >
            {block.type.replace('_', ' ')}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--doc-sdk-text-subtle)', fontFamily: 'var(--doc-sdk-font-mono)' }}>
            #{block.id}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={() => onMove(index, 'up')}
            disabled={index === 0}
            className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
            aria-label="Move Block Up"
            style={{ padding: '0.3rem' }}
          >
            <ArrowUp size={13} />
          </button>
          <button
            type="button"
            onClick={() => onMove(index, 'down')}
            disabled={index === totalBlocks - 1}
            className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
            aria-label="Move Block Down"
            style={{ padding: '0.3rem' }}
          >
            <ArrowDown size={13} />
          </button>
          <button
            type="button"
            onClick={() => onDuplicate(index)}
            className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
            aria-label="Duplicate Block"
            style={{ padding: '0.3rem' }}
          >
            <Copy size={13} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(index)}
            className="doc-sdk-btn doc-sdk-btn-danger doc-sdk-btn-sm"
            aria-label="Delete Block"
            style={{ padding: '0.3rem' }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <div>{renderEditor()}</div>
    </div>
  );
};
