import type { FC } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { BLOCK_TYPES, type SectionDefinition, type BlockType } from '../../core';

interface SectionListProps {
  sections: SectionDefinition[];
  onChange: (sections: SectionDefinition[]) => void;
}

export const SectionList: FC<SectionListProps> = ({ sections, onChange }) => {
  const addSection = () => {
    const newSec: SectionDefinition = {
      id: `sec-${Date.now().toString(36)}`,
      title: 'New Section',
      allowedBlocks: ['markdown'],
      isRepeatable: false,
    };
    onChange([...sections, newSec]);
  };

  const removeSection = (index: number) => {
    onChange(sections.filter((_, idx) => idx !== index));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const reordered = [...sections];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered);
  };

  const updateSection = (index: number, updates: Partial<SectionDefinition>) => {
    const updated = sections.map((s, idx) => (idx === index ? { ...s, ...updates } : s));
    onChange(updated);
  };

  const toggleAllowedBlock = (sectionIndex: number, blockType: BlockType) => {
    const sec = sections[sectionIndex];
    const exists = sec.allowedBlocks.includes(blockType);
    let newBlocks: BlockType[];
    if (exists) {
      newBlocks = sec.allowedBlocks.filter((b) => b !== blockType);
    } else {
      newBlocks = [...sec.allowedBlocks, blockType];
    }
    updateSection(sectionIndex, { allowedBlocks: newBlocks });
  };

  return (
    <div className="doc-sdk-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
            Sections & Block Constraints
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--doc-sdk-text-muted)' }}>
            Define the document outline and control which block types are permitted in each section.
          </p>
        </div>
        <button
          type="button"
          onClick={addSection}
          className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
        >
          <Plus size={14} /> Add Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--doc-sdk-text-muted)', border: '1px dashed var(--doc-sdk-border)', borderRadius: 'var(--doc-sdk-radius)' }}>
          No sections configured. At least one section is required.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sections.map((section, idx) => (
            <div
              key={section.id}
              style={{
                border: '1px solid var(--doc-sdk-border)',
                borderRadius: 'var(--doc-sdk-radius)',
                padding: '1rem',
                backgroundColor: 'var(--doc-sdk-surface)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flex: 1, maxWidth: '500px' }}>
                  <input
                    type="text"
                    className="doc-sdk-input"
                    value={section.title}
                    onChange={(e) => updateSection(idx, { title: e.target.value })}
                    placeholder="Section Title"
                    aria-label="Section Title"
                  />
                  <input
                    type="text"
                    className="doc-sdk-input"
                    value={section.id}
                    onChange={(e) => updateSection(idx, { id: e.target.value })}
                    placeholder="Section ID"
                    aria-label="Section ID"
                    style={{ maxWidth: '160px' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <button
                    type="button"
                    onClick={() => moveSection(idx, 'up')}
                    disabled={idx === 0}
                    className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
                    aria-label={`Move section ${section.title} up`}
                    style={{ padding: '0.3rem' }}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(idx, 'down')}
                    disabled={idx === sections.length - 1}
                    className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
                    aria-label={`Move section ${section.title} down`}
                    style={{ padding: '0.3rem' }}
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(idx)}
                    className="doc-sdk-btn doc-sdk-btn-danger doc-sdk-btn-sm"
                    aria-label={`Remove section ${section.title}`}
                    style={{ padding: '0.3rem' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="checkbox"
                  id={`repeatable-${section.id}`}
                  checked={Boolean(section.isRepeatable)}
                  onChange={(e) => updateSection(idx, { isRepeatable: e.target.checked })}
                />
                <label htmlFor={`repeatable-${section.id}`} style={{ fontSize: '0.8125rem' }}>
                  Repeatable Section (authors can create multiple instances of this section)
                </label>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--doc-sdk-text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  Allowed Blocks:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {BLOCK_TYPES.map((blockType) => {
                    const isAllowed = section.allowedBlocks.includes(blockType);
                    return (
                      <button
                        key={blockType}
                        type="button"
                        onClick={() => toggleAllowedBlock(idx, blockType)}
                        className={`doc-sdk-chip ${isAllowed ? 'doc-sdk-chip-active' : ''}`}
                        aria-pressed={isAllowed}
                      >
                        {blockType}
                      </button>
                    );
                  })}
                </div>
                {section.allowedBlocks.length === 0 && (
                  <span style={{ color: 'var(--doc-sdk-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                    * Must select at least one allowed block
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
