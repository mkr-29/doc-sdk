import type { FC } from 'react';
import type { LayoutType } from '../../core';

interface GeneralSettingsProps {
  id: string;
  name: string;
  layoutType: LayoutType;
  onUpdate: (updates: { id?: string; name?: string; layoutType?: LayoutType }) => void;
}

export const GeneralSettings: FC<GeneralSettingsProps> = ({
  id,
  name,
  layoutType,
  onUpdate,
}) => {
  const layouts: Array<{ type: LayoutType; label: string; desc: string }> = [
    {
      type: 'two-column',
      label: 'Two-Column Docs',
      desc: 'Standard documentation layout with left navigation, main content, and sticky TOC.',
    },
    {
      type: 'single-column',
      label: 'Single-Column Guide',
      desc: 'Centered linear reading layout for articles, tutorials, and walkthroughs.',
    },
    {
      type: 'side-by-side-code',
      label: 'Side-by-Side Code',
      desc: 'Split-screen layout pairing API endpoints with sticky code samples.',
    },
  ];

  return (
    <div className="doc-sdk-card">
      <h3 style={{ margin: '0 0 1rem', fontSize: '1.125rem', fontWeight: 600 }}>
        General Settings
      </h3>

      <div className="doc-sdk-form-group">
        <label className="doc-sdk-label" htmlFor="template-id-input">
          Template Identifier (Unique ID)
        </label>
        <input
          id="template-id-input"
          className="doc-sdk-input"
          type="text"
          value={id}
          onChange={(e) => onUpdate({ id: e.target.value })}
          placeholder="e.g. api-reference-v1"
        />
      </div>

      <div className="doc-sdk-form-group">
        <label className="doc-sdk-label" htmlFor="template-name-input">
          Template Name
        </label>
        <input
          id="template-name-input"
          className="doc-sdk-input"
          type="text"
          value={name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="e.g. REST API Reference"
        />
      </div>

      <div className="doc-sdk-form-group">
        <label className="doc-sdk-label">Documentation Layout</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {layouts.map((item) => {
            const isSelected = layoutType === item.type;
            return (
              <div
                key={item.type}
                onClick={() => onUpdate({ layoutType: item.type })}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                style={{
                  border: isSelected
                    ? '2px solid var(--doc-sdk-primary)'
                    : '1px solid var(--doc-sdk-border)',
                  backgroundColor: isSelected
                    ? 'var(--doc-sdk-primary-light)'
                    : 'var(--doc-sdk-surface)',
                  padding: '0.85rem',
                  borderRadius: 'var(--doc-sdk-radius)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem', color: isSelected ? 'var(--doc-sdk-primary)' : 'inherit' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--doc-sdk-text-muted)', lineHeight: 1.4 }}>
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
