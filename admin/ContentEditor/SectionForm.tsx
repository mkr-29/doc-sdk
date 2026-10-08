import type { FC } from 'react';
import type { SectionDefinition, SectionContent, BlockType, BlockContent } from '../../core';
import { BlockItemCard } from './BlockItemCard';
import { BlockInjector } from './BlockInjector';

interface SectionFormProps {
  sectionDef: SectionDefinition;
  sectionContent: SectionContent;
  onUpdateBlocks: (blocks: BlockContent[]) => void;
}

export const SectionForm: FC<SectionFormProps> = ({
  sectionDef,
  sectionContent,
  onUpdateBlocks,
}) => {
  const blocks = sectionContent.blocks || [];

  const handleAddBlock = (type: BlockType, defaultData: Record<string, unknown>) => {
    const newBlock: BlockContent = {
      id: `blk-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`,
      type,
      data: defaultData,
    };
    onUpdateBlocks([...blocks, newBlock]);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const reordered = [...blocks];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onUpdateBlocks(reordered);
  };

  const handleDuplicate = (index: number) => {
    const target = blocks[index];
    const duplicated: BlockContent = {
      ...target,
      id: `blk-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`,
      data: JSON.parse(JSON.stringify(target.data)),
    };
    const updated = [...blocks];
    updated.splice(index + 1, 0, duplicated);
    onUpdateBlocks(updated);
  };

  const handleDelete = (index: number) => {
    onUpdateBlocks(blocks.filter((_, idx) => idx !== index));
  };

  const handleUpdateData = (index: number, dataUpdates: Record<string, unknown>) => {
    const updated = blocks.map((b, idx) =>
      idx === index ? { ...b, data: { ...b.data, ...dataUpdates } } : b
    );
    onUpdateBlocks(updated);
  };

  return (
    <div className="doc-sdk-card">
      <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--doc-sdk-border)', paddingBottom: '0.75rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
          {sectionDef.title}
        </h3>
        {sectionDef.description && (
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--doc-sdk-text-muted)' }}>
            {sectionDef.description}
          </p>
        )}
      </div>

      {blocks.length === 0 ? (
        <div
          style={{
            padding: '1.5rem',
            textAlign: 'center',
            color: 'var(--doc-sdk-text-muted)',
            border: '1px dashed var(--doc-sdk-border)',
            borderRadius: 'var(--doc-sdk-radius)',
            fontSize: '0.875rem',
          }}
        >
          No content blocks yet in this section.
        </div>
      ) : (
        <div>
          {blocks.map((block, idx) => (
            <BlockItemCard
              key={block.id}
              block={block}
              index={idx}
              totalBlocks={blocks.length}
              onMove={handleMove}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onUpdateData={(newData) => handleUpdateData(idx, newData)}
            />
          ))}
        </div>
      )}

      <BlockInjector
        allowedBlocks={sectionDef.allowedBlocks}
        onAddBlock={handleAddBlock}
      />
    </div>
  );
};
