import { useState, type FC } from 'react';
import { X, Plus } from 'lucide-react';
import type { FieldDefinition } from '../../core';

interface MetaPanelProps {
  fields: FieldDefinition[];
  metadata: Record<string, unknown>;
  onChange: (metadata: Record<string, unknown>) => void;
}

export const MetaPanel: FC<MetaPanelProps> = ({
  fields,
  metadata,
  onChange,
}) => {
  const [newTagInput, setNewTagInput] = useState<Record<string, string>>({});

  const updateField = (key: string, value: unknown) => {
    onChange({
      ...metadata,
      [key]: value,
    });
  };

  const addArrayTag = (fieldId: string) => {
    const tag = (newTagInput[fieldId] || '').trim();
    if (!tag) return;
    const currentList = Array.isArray(metadata[fieldId])
      ? (metadata[fieldId] as string[])
      : [];
    if (!currentList.includes(tag)) {
      updateField(fieldId, [...currentList, tag]);
    }
    setNewTagInput((prev) => ({ ...prev, [fieldId]: '' }));
  };

  const removeArrayTag = (fieldId: string, tagToRemove: string) => {
    const currentList = Array.isArray(metadata[fieldId])
      ? (metadata[fieldId] as string[])
      : [];
    updateField(
      fieldId,
      currentList.filter((t) => t !== tagToRemove)
    );
  };

  if (fields.length === 0) return null;

  return (
    <div className="doc-sdk-card">
      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem', fontWeight: 600 }}>
        Document Metadata
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: 'var(--doc-sdk-text-muted)' }}>
        Metadata values configured by the selected template schema.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {fields.map((field) => {
          const value = metadata[field.id] !== undefined ? metadata[field.id] : field.defaultValue || '';

          return (
            <div key={field.id} className="doc-sdk-form-group" style={{ margin: 0 }}>
              <label className="doc-sdk-label" htmlFor={`meta-${field.id}`}>
                {field.name}
                {field.required && (
                  <span style={{ color: 'var(--doc-sdk-danger)', marginLeft: '0.25rem' }}>*</span>
                )}
              </label>

              {field.type === 'string' && (
                <input
                  id={`meta-${field.id}`}
                  type="text"
                  className="doc-sdk-input"
                  value={String(value)}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.name}`}
                />
              )}

              {field.type === 'rich-text' && (
                <textarea
                  id={`meta-${field.id}`}
                  className="doc-sdk-textarea"
                  rows={3}
                  value={String(value)}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.name} markdown`}
                />
              )}

              {field.type === 'code' && (
                <textarea
                  id={`meta-${field.id}`}
                  className="doc-sdk-textarea"
                  rows={3}
                  value={String(value)}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={field.placeholder || '// Code snippet'}
                  style={{ fontFamily: 'var(--doc-sdk-font-mono)', fontSize: '0.8125rem' }}
                />
              )}

              {field.type === 'select' && (
                <select
                  id={`meta-${field.id}`}
                  className="doc-sdk-select"
                  value={String(value)}
                  onChange={(e) => updateField(field.id, e.target.value)}
                >
                  <option value="">-- Select {field.name} --</option>
                  {(field.options || []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'array' && (
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <input
                      id={`meta-${field.id}`}
                      type="text"
                      className="doc-sdk-input"
                      value={newTagInput[field.id] || ''}
                      onChange={(e) =>
                        setNewTagInput((prev) => ({
                          ...prev,
                          [field.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addArrayTag(field.id);
                        }
                      }}
                      placeholder="Add tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={() => addArrayTag(field.id)}
                      className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {(Array.isArray(value) ? (value as string[]) : []).map((item) => (
                      <span
                        key={item}
                        className="doc-sdk-chip doc-sdk-chip-active"
                        style={{ cursor: 'default' }}
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removeArrayTag(field.id, item)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: 0,
                            marginLeft: '0.2rem',
                            color: 'inherit',
                          }}
                          aria-label={`Remove tag ${item}`}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
